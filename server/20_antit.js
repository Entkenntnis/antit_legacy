 

// ----------------------------
// level

var exercises = {}
var exIndex = {}
var tutorials = {}
var tutIndex = {}

function initExercises() {
  exercises = require('../exercises').exercises
  exIndex = {}
  for (var i = 1; i <= 9; i++) exIndex [i] = []
  for (var id in exercises) {
    var ex = exercises[id]
    exIndex[ex.level].push(id)
  }
  for (var id in exIndex) {
    exIndex[id].sort((a,b)=>a-b)
  }
  tutorials = require('../tutorials').tutorials
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



function setSimulation(req, ants) {
  var date = Date.now()
  var userid = req.user ? req.user._id : undefined
  var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
  var s = {
    antsID:ants.map(function(a){return a.antid}),
    antsName:ants.map(function(a){return a.name}),
    userid:userid,
    username:req.user?req.user.displayName : undefined,
    start:date,
    hash:hash,
    colony:req.params.colony
  }
  simulations.push(s)
  return hash
}

function submitSimulation(hash, points, colony) {
  for (var i = 0; i < simulations.length; i++) {
    var s = simulations[i]
    var timePassed = (Date.now() - s.start) / 1000
    if (s.hash == hash && !s.result && timePassed < 600 && colony == s.colony) {
      var results = points.split(",")
      if (results.length == s.antsName.length) {
        s.result = results
        return true
      }
    }
  }
  return false
}

function flattenQuery(query) {
  var antIds = []
  for (var i = 1; i <= 8; i++) {
    var val = query['team' + i]
    if (val && val != "none")
      antIds.push(val)
  }
  return antIds
}

function findAnts(users, userid, ids) {
  var ants = {}
  if (users) {
    users.forEach(function(user){
      user.ants.forEach(function(a){
        if (ids.indexOf(a.antid) >= 0) {
          if (a.published || user._id.toString() == userid) {
            ants[a.antid] = a
          }
        }
      })
    })
  }
  return ids.map(function(id){
    return ants[id]
  }).filter(function(ant){
    return ant !== undefined
  })
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

// ----------------------------
// route helper

const queryCache = {}


route({name:"/doku"}, function(req, res) {
  res.render('doku', {
    user: req.user,
    highlightElement:2,
    prefix: req.curHome })
})

route({name:"/guide"}, function(req, res) {
  res.render('guide', {
    user: req.user,
    highlightElement:1,
    prefix: req.curHome })
})

route({name:"/wettbewerb", login:true}, function(req, res) {
  res.render('ants/wettbewerb', {
    user: req.user,
    highlightElement:4,
    prefix: req.curHome })
})

route({name:"/tutorial", login:true}, function(req, res, next) {
  var tutid = checkInt(req.query.id)
  if (tutid > 0 && (!tutorials[tutid] || tutorials[tutid].level > req.user.level)) return next()
  
  delete require.cache[require.resolve('../tutorials.js')]
  initExercises()
  
  res.render('ants/tutorial', {
    user: req.user,
    id : tutid,
    tuts : tutorials,
    index : tutIndex,
    done : req.user.done,
    highlightElement:tutid > 0? -1 : 5,
    prefix: req.curHome })
})

route({name:"/tutorialcheck", login:true}, function*(req, res, next) {
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
            yield req.curCol.update({_id:req.user._id},
              { $addToSet: {
                done: id}})
          }
          return res.send("ok")
        }
      }
    }
  }
  res.send("bad")
})

var levelCache = {}

route({name:"/level", login:true}, function*(req, res) {

  // dynamisches Neuladen
  delete require.cache[require.resolve('../exercises.js')]
  initExercises()

  var levelid = checkInt(req.query.id)
  if (!exercises[levelid] || exercises[levelid].level > req.user.level)
    levelid = -1
  var result = undefined
  var previous = undefined
  if (levelid > 0) {
    const userid = req.user ? req.user._id.toString() : undefined
    var val = yield req.curCol.find({}, {"ants.code":false})
    result = prepareAnts(val, userid)
    if (levelCache[req.sessionID]) {
      previous = levelCache[req.sessionID][levelid]
    }
  }
  res.render('ants/level', {
    user: req.user,
    ants: result ? result.ants : [],
    highlightElement:result ? -1 : 3,
    id:levelid,
    exercises: exercises,
    exIndex:exIndex,
    previous:previous,
    upgrade:canUpgrade(req.user),
    solved:req.user.solved,
    prefix: req.curHome })
})

route({name:"/upgrade", login:true}, function*(req, res, next) {
  if (canUpgrade(req.user)) {
    yield req.curCol.update({_id:req.user._id},
      { $set: {
        level: ++req.user.level}})
    return res.render('ants/levelup', {
      user : req.user,
      highlightElement:-1,
      prefix: req.curHome
    })
  }
  next()
})



var levelstuff = {}

route({name:"/submitlevel", login:true}, function*(req, res) {
  var l = levelstuff[req.query.hash]
  if (l) {
    yield req.curCol.update({_id:req.user._id},
              { $addToSet: {
                solved: l.level}})
    return res.send("ok")
  }
  res.send("bad")
})

route({name:"/levelsim", login:true}, function*(req, res, next) {
  // eine Ameise laden
  if (!req.user) return next()
  var levelnum = checkInt(req.query.num)
  if (!levelCache[req.sessionID]) levelCache[req.sessionID] = {}
  levelCache[req.sessionID][levelnum] = req.query.id
  if (exercises[levelnum] && exercises[levelnum].level <= req.user.level && req.query.id) {
    var users = yield req.curCol.find({
      _id: req.user._id,
      "ants.antid":req.query.id},
      {"ants.$":1})
    if (users && users.length == 1) {
      var date = Date.now()
      var userid = req.user ? req.user._id : undefined
      var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
      levelstuff[hash] = {startTime : date, level:levelnum, userid:userid}
      return res.render('ants/simulation', {
        code:[users[0].ants[0]],
        hash:hash,
        seed:undefined,
        repeat:undefined,
        prefix:req.curHome + "/level?id=" + levelnum,
        devMode:false,
        fightMode:false,
        level:levelnum,
        title:exercises[levelnum].name,
      })
    }
  } else
    next()
})

route({name:"/simulation"}, function*(req, res) {
  if (req.query.fight == 1) {
    res.render('simulation', {
      code:["", ""],
      hash:"",
      seed:undefined,
      repeat:undefined,
      prefix:req.curHome,
      devMode:App.colo.get(req.params.colony).debugging,
      fightMode:true,
      level:NaN
    })
    return
  }
  if (req.user)
    queryCache[req.sessionID] = req.query
  var antIds = flattenQuery(req.query)
  var users = yield req.curCol.find({"ants.antid" : {$in:antIds}})
  var ants = findAnts(users, req.user?req.user._id.toString():"", antIds)
  var hash = setSimulation(req, ants)
  var seed = req.query.seedon == 1 ? JSON.stringify(req.query.seed).slice(1, -1) : undefined
  var repeat = req.query.batchon == 1 ? parseInt(req.query.repeat) : undefined
  if (repeat == NaN) repeat = undefined
  res.render(repeat ? 'batch' : 'simulation', {
    code:ants,
    hash:hash,
    seed:seed,
    repeat:repeat,
    prefix:req.curHome,
    devMode:App.colo.get(req.params.colony).debugging,
    fightMode:false,level:NaN})
})

route({name:"/submit"}, function(req, res) {
  if (submitSimulation(req.query.hash, req.query.points, req.params.colony)) {
    res.send("ok")
  } else {
    res.send("fail")
  }
})


/*
route({name:"/debug", login:true, superuser:true}, function(req, res) {
  App.colo.get(req.params.colony).debugging = true
  res.redirect(req.curHome)
})

route({name:"/nodebug", login:true, superuser:true}, function(req, res) {
  App.colo.get(req.params.colony).debugging = false
  res.redirect(req.curHome)
})*/

route({name:"/stats", login:true, superuser:true}, function(req, res) {
  res.render('stats', {data:simulations, prefix: req.curHome})
})

route({name:"/clearstats", login:true, superuser:true}, function(req, res, next) {
  simulations = []
  next()
})


