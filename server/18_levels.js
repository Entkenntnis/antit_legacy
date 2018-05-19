 
var exercises = {}
var exIndex = {}
var tutorials = {}
var tutIndex = {}

function initExercises() {
  exercises = require('./exercises').exercises
  exIndex = {}
  for (var i = 1; i <= 9; i++) exIndex [i] = []
  for (var id in exercises) {
    var ex = exercises[id]
    exIndex[ex.level].push(id)
  }
  for (var id in exIndex) {
    exIndex[id].sort((a,b)=>a-b)
  }
  tutorials = require('./tutorials').tutorials
  tutIndex = {}
  for (var i = 1; i <= 9; i++) tutIndex [i] = []
  for (var id in tutorials) {
    var ex = tutorials[id]
    tutIndex[ex.level].push(id)
  }
  for (var id in tutIndex) {
    tutIndex[id].sort((a,b)=>a-b)
  }
}

function checkInt(val) {
  var i = parseInt(val)
  if (isNaN(i)) i = -1
  return i
}

function canUpgrade(user) {
  if (user.level < 9 && exIndex[user.level]) {
    var count = 0
    exIndex[user.level].forEach(function(l){
      if (user.solved.indexOf(parseInt(l)) >= 0) count++
    })
    if (count * 2 >= exIndex[user.level].length) return true
  }
  return false
}

const co = require('co')

module.exports = function(App) {
  initExercises()
  
  App.getNewTuts = function(user) {
    let count = 0
    for (var i = 1; i <= user.level; i++) {
      count += tutIndex[i].length
    }
    return count - user.done.length
  }
  
  App.express.get('/tutorial', App.users.auth, function(req, res) {
    var tutid = checkInt(req.query.id)
    if (tutid > 0 && (!tutorials[tutid] || tutorials[tutid].level > req.user.level))
      return res.redirect('/')
    
    //delete require.cache[require.resolve('./tutorials.js')]
    //initExercises()
    
    res.render('ants/tutorial', {
      user: req.user,
      id : tutid,
      tuts : tutorials,
      index : tutIndex,
      done : req.user.done,
      highlightElement:tutid > 0? -1 : 5,
      newtuts: App.getNewTuts(req.user),
    })
  })
  
  App.express.get('/tutorialcheck', App.users.auth, co.wrap(function*(req, res) {
    try {
      var x = JSON.parse(req.query.data)
      var id = checkInt(req.query.id)
      if (id > 0 && x && x.length) {
        if (tutorials[id]) {
          if (tutorials[id].solution.length == x.length) {
            var allright = true
            for (var i = 0; i < x.length; i++) {
              if (tutorials[id].solution[i] != x[i])
                allright = false
            }
            if (allright) {
              if (req.user.done.indexOf(id) < 0) {
                yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
                  { $addToSet: {
                    done: id}})
              }
              return res.send("ok")
            }
          }
        }
      }
    } catch (e) {}
    res.send("bad")
  }))
  
  App.express.get('/level', App.users.auth, co.wrap(function*(req, res) {
    
    
    //delete require.cache[require.resolve('./exercises.js')]
    //initExercises()
    
    var levelid = checkInt(req.query.id)
    if (!exercises[levelid] || exercises[levelid].level > req.user.level)
      levelid = -1
    var result = undefined
    var previous = undefined
    if (levelid > 0) {
      const userid = req.user ? req.user._id.toString() : undefined
      var val = yield App.colo.getCol(req.session.colony).find({}, {"ants.code":false})
      result = App.ants.prepareAnts(val, userid)
      if (req.session.levelCache) {
        previous = req.session.levelCache[levelid]
      }
    }
    res.render('ants/level', {
      user: req.user,
      ants: result ? result.ants : [],
      highlightElement:result ? -1 : 3,
      newtuts: App.getNewTuts(req.user),
      id:levelid,
      exercises: exercises,
      exIndex:exIndex,
      previous:previous,
      upgrade:canUpgrade(req.user),
      solved:req.user.solved,
    })
  }))
  
  App.express.get('/upgrade', App.users.auth, co.wrap(function*(req, res, next) {
    if (canUpgrade(req.user)) {
      yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
        { $set: {
          level: ++req.user.level}})
      return res.render('ants/levelup', {
        user : req.user,
        highlightElement:-1,
        newtuts: App.getNewTuts(req.user),
      })
    }
    res.redirect('/')
  }))
  
  App.express.get('/levelsim', App.users.auth, co.wrap(function*(req, res) {
    // eine Ameise laden
    if (!req.user) return res.redirect('/')
    var levelnum = checkInt(req.query.num)
    if (!req.session.levelCache) req.session.levelCache = {}
    req.session.levelCache[levelnum] = req.query.id
    if (exercises[levelnum] && exercises[levelnum].level <= req.user.level && req.query.id) {
      var users = yield App.colo.getCol(req.session.colony).find({
        _id: req.user._id,
        "ants.antid":req.query.id},
        {"ants.$":1,"level":1})
      if (users && users.length == 1) {
        var date = Date.now()
        var userid = req.user ? req.user._id : undefined
        var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
        req.session.currentSim = {startTime : date, level:levelnum, userid:userid}
        users[0].ants[0].level = users[0].level
        return res.render('ants/simulation', {
          code:[users[0].ants[0]],
          hash:hash,
          seed:undefined,
          repeat:undefined,
          prefix: "/level?id=" + levelnum,
          devMode:false,
          fightMode:false,
          level:levelnum,
          title:exercises[levelnum].name,
        })
      }
    } else
      res.redirect('/')
  }))
  
  App.express.get('/submitlevel', App.users.auth, co.wrap(function*(req, res) {
    var l = req.session.currentSim
    if (l) {
      yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
                { $addToSet: {
                  solved: l.level}})
      return res.send("ok")
    }
    res.send("bad")
  }))
}













