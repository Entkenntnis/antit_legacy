 
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

const co = require('co')

module.exports = function(App) {
  initExercises()

  function canUpgrade(user, col) {
    if (user.level < 9 && exIndex[user.level]) {
      if (App.colo.get(col).competitionDone === false && user.level == 5)
        return false
      var count = 0
      exIndex[user.level].forEach(function(l){
        if (user.solved.indexOf(parseInt(l)) >= 0) count++
      })
      if (count * 2 >= exIndex[user.level].length) return true
    }
    return false
  }
  
  App.getNewTuts = function(user) {
    let count = 0
    for (var i = 1; i <= user.level; i++) {
      tutIndex[i].forEach(id => {
        if (user.done.indexOf(parseInt(id)) < 0)
          count++
      })
    }
    return count
  }
  
  App.express.get('/tutorial', App.users.auth, function(req, res) {
    var tutid = checkInt(req.query.id)
    if (tutid > 0 && (!tutorials[tutid] || tutorials[tutid].level > req.user.level))
      return res.redirect('/home')
    
    if (App.config.devmode) {
      delete require.cache[require.resolve('./tutorials.js')]
      initExercises()
    }
    
    res.render('ants/tutorial', {
      user: req.user,
      id : tutid,
      tuts : tutorials,
      index : tutIndex,
      done : req.user.done,
      highlightElement:5,
      newtuts: App.getNewTuts(req.user),
      isPublic : App.colo.get(req.session.colony).isPublic,
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
    
    if (App.config.devmode) {
      delete require.cache[require.resolve('./exercises.js')]
      initExercises()
    }
    
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
      highlightElement:3,
      newtuts: App.getNewTuts(req.user),
      id:levelid,
      exercises: exercises,
      exIndex:exIndex,
      previous:previous,
      upgrade:canUpgrade(req.user, req.session.colony),
      solved:req.user.solved,
      competitionDone : App.colo.get(req.session.colony).competitionDone,
    })
  }))
  
  App.express.get('/upgrade', App.users.auth, co.wrap(function*(req, res, next) {
    if (canUpgrade(req.user, req.session.colony)) {
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
  
  App.express.get('/downgrade', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.level>=2) {
      yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
                                                       { $set : {
                                                         level: --req.user.level}})
      res.redirect('/level')
    } else {
      res.redirect('/')
    }
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
          harmony:false,
          prefix: "/level?id=" + levelnum,
          devMode:false,
          fightMode:false,
          level:levelnum,
          title:exercises[levelnum].name,
          colors:[0,1,2,3,4,5,6,7],
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
  
  App.express.get('/competitionDone', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.superuser) {
      yield App.db.get('info').update({colonyName:req.session.colony},
                                      {$set : {competitionDone : true}})
      App.colo.refresh()
    }
    res.redirect('/home')
  }))
  
  App.express.get('/competitionUndone', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.superuser) {
      yield App.db.get('info').update({colonyName:req.session.colony},
                                      {$set : {competitionDone : false}})
      App.colo.refresh()
    }
    res.redirect('/home')
  }))
  
  App.express.get('/overview', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.superuser) {
      let users = yield App.colo.getCol(req.session.colony).find({}, {"ants" : false})
      // remove deprecated users
      users = users.filter(u => u.level)
      users.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1 )
      res.render('admin/overview', {users: users, exIndex, exercises, tutIndex, tutorials})
    } else
      res.redirect('/')
  }))
  
}













