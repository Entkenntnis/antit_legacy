 
module.exports = function(App) {
// ----------------------------
// application

const co = require('co')

App.db.then(() => {
  initColonys()
  initExercises()
})



// ----------------------------
// colony

const colonyInfo = {}

function initColonys() {
  return co(function*(){
    var val = yield App.db.get('info').find({})
    val.forEach(function(colony){
      colonyInfo[colony.colonyName] = colony
    })
  })
}

function getColonyCollection(path) {
  if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
    return App.db.get('colony_' + path)
  else
    return null
}


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

// ----------------------------
// auth

App.express.use(function(req, res, next){
  console.log("user auth middleware")
  if (req.session.loggedIn) {
    var col = getColonyCollection(req.session.colony)
    co(function*(){
      var users = yield col.find({_id: req.session.userid}, {ants:false})
      users[0].colony = req.session.colony
      req.user = users[0]
      console.log(req.user)
      console.log("user set up")
      next()
    })
  } else
    next()
})


// ----------------------------
// ant helper

var simulations = []

function prepareAnts(users, myid) {
  var result = {ants:[], globals:[]}
  users.forEach(function(v){
    if (v._id.toString() == myid) {
      result.ants = v.ants
      result.ants.forEach(function(a){
        a._id = a.antid
      })
    } else {
      v.ants.forEach(function(w){
        if (w.published) {
          w.publicName = "@" + v.displayName + "/" + w.name
          w._id = w.antid
          result.globals.push(w)
        }
      })
    }
  })
  return result
}

function getName(data) {
  var eofl = data.indexOf("\n");
  if (eofl >= 0) {
    data = data.substring(0, eofl);
  }
  var namestart = data.indexOf("\"");
  var nameend = data.lastIndexOf("\"");
  var name = data.substring(namestart + 1, nameend);
  if (namestart < 0 || nameend < 0) {
    name = "[ohne Namen]";
  }
  return name;
}

function insertAnt(code, userid, col) {
  var antName = getName(code)
  var antId = Math.floor(Date.now()*1000 + Math.random()*999).toString(16);
  return col.update({_id:userid},
      {$push: {ants: {antid:antId, name:antName, published:false,code:code}}})
}

function saveCode(userid, antid, data, col) {
  return col.update({_id:userid, "ants.antid" : antid},
    {$set : {"ants.$.code" : data, "ants.$.name": getName(data)}})
}

function setPublished(userid, antid, val, col) {
  return col.update({_id:userid, "ants.antid" : antid},
    {$set : {"ants.$.published": val}})
}

function deleteAnt(userid, antid, col) {
  return col.update({_id:userid},
    {$pull : {ants: {antid:antid}}})
}

function updateName(code) {
  var index = code.indexOf("\"") + 1;
  return code.slice(0, index) + "[Kopie] " + code.slice(index)
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

function maximumAnts(level) {
  var maximum = 10
  if (level >= 3) { maximum = 20 }
  if (level >= 5) { maximum = 30 }
  if (level >= 7) { maximum = 40 }
  if (level >= 9) { maximum = 50 }
  return maximum
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

function loginMiddleware(superuser) {
  return function(req, res, next) {
    if (!req.session.loggedIn ||
      (superuser && req.user.superuser == false)) {
      return res.redirect(req.curHome)
    }
    next()
  }
}

function checkColony() {
  return function handleColony(req, res, next) {
    var path = req.params.colony
    var collection = getColonyCollection(path)
    if (collection && (!req.user || req.user.colony == path)) {
      req.curCol = collection
      req.curHome = '/' + path
      next()
    } else {
      if (req.user)
        req.logout()
      res.redirect("/")
    }
  }
}

function route(options, cb) {
  function getLogin() {
    if (options.login)
      return loginMiddleware(options.superuser)
    else
      return function(req, res, next) { next() }
  }
  function returnHome(req, res) { res.redirect(req.curHome) }
  if (cb.constructor.name == 'GeneratorFunction')
    cb = co.wrap(cb)
  if (!options.post) {
    App.express.get('/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
  } else {
    App.express.post('/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
    App.express.get('/:colony' + options.name, checkColony(), getLogin(), returnHome)
  }
}


// ----------------------------
// routes

App.express.get("/", function(req, res) {
  res.render('landing/main', {
    colonies : Object.keys(colonyInfo).map(function(key) { return colonyInfo[key]})
  })
})

route({name:"/"}, function*(req, res) {
  console.log("home route")
  console.log(req.user)
  if (!req.user) {
    return res.render('ants/login', {
      fail: req.query.fail,
      description : colonyInfo[req.params.colony].description,
      prefix: req.curHome,
    })
  }
  const userid = req.user ? req.user._id.toString() : undefined
  var val = yield req.curCol.find({}, {"ants.code":false})
  var result = prepareAnts(val, userid)
  if (req.user && queryCache[req.sessionID])
    req.user.previous = queryCache[req.sessionID]
  res.render('ants/home', {
    user: req.user,
    fail: req.query.fail,
    ants: result.ants,
    maximum: maximumAnts(req.user.level),
    globals: result.globals,
    highlightElement: 0,
    devMode:colonyInfo[req.params.colony].debugging,
    prefix: req.curHome
  })
})

route({name:"/login", post:true}, function*(req, res, next) {
  
  console.log("posting to login")
  console.log(req.params)
  var colony = req.params.colony
  var users = yield req.curCol.find({
    username: req.body.username,
    password: req.body.password,
  }, {ants:false})
  
  console.log(req.params)
  if (users && users.length == 1) {
    users[0].colony = colony
    var user = users[0]
    // patching old users
    if (!user.level) {
      yield req.curCol.update({_id:user._id},
        { $set : {
          level : 1,
          done : [],
          solved : [],
        }})
      user.level = 1
      user.done = []
      user.solved = []
    }
    req.session.loggedIn = true
    req.session.userid = user._id
    req.session.colony = colony
    return res.redirect(req.curHome)
  }
  res.redirect(req.curHome + '/?fail=1')
})

route({name:"/logout"}, function(req, res, next) {
  delete req.session.loggedIn
  delete req.session.userid
  delete req.session.colony
  next()
})

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

route({name:"/new", login:true}, function*(req, res, next) {
  var val = yield req.curCol.find({_id: req.user._id}, {"ants.code":false})
  if (val[0].ants.length < maximumAnts(req.user.level)) {
    var codeString = `var Ameise = AntIT.NeueAmeise("` + req.query.name + `")

Ameise.wenn("", function(){
    
})`
    yield insertAnt(codeString, req.user._id, req.curCol)
  }
  next()
})

route({name:"/edit", login:true}, function*(req, res, next) {
  var users = yield req.curCol.find({
    _id: req.user._id,
    "ants.antid":req.query.id},
    {"ants.$":1})
  if (users && users.length == 1) {
    res.render('ants/edit', {
      data: users[0].ants[0].code,
      id: req.query.id,
      user : req.user,
      prefix: req.curHome })
  } else {
    next()
  }
})

route({name:"/save", login:true, post:true}, function*(req, res, next) {
  if (req.body.duplicate) {
    yield insertAnt(updateName(req.body.data), req.user._id, req.curCol)
  }
  yield saveCode(req.user._id, req.query.id, req.body.data, req.curCol)
  next()
})

route({name:"/delete", login:true}, function*(req, res, next) {
  yield deleteAnt(req.user._id, req.query.id, req.curCol)
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
      devMode:colonyInfo[req.params.colony].debugging,
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
    devMode:colonyInfo[req.params.colony].debugging,
    fightMode:false,level:NaN})
})

route({name:"/submit"}, function(req, res) {
  if (submitSimulation(req.query.hash, req.query.points, req.params.colony)) {
    res.send("ok")
  } else {
    res.send("fail")
  }
})

route({name:"/publish", login:true}, function*(req, res, next) {
  yield setPublished(req.user._id, req.query.id, true, req.curCol)
  next()
})

route({name:"/unpublish", login:true}, function*(req, res, next) {
  yield setPublished(req.user._id, req.query.id, false, req.curCol)
  next()
})

route({name:"/debug", login:true, superuser:true}, function(req, res) {
  colonyInfo[req.params.colony].debugging = true
  res.redirect(req.curHome)
})

route({name:"/nodebug", login:true, superuser:true}, function(req, res) {
  colonyInfo[req.params.colony].debugging = false
  res.redirect(req.curHome)
})

route({name:"/stats", login:true, superuser:true}, function(req, res) {
  res.render('stats', {data:simulations, prefix: req.curHome})
})

route({name:"/clearstats", login:true, superuser:true}, function(req, res, next) {
  simulations = []
  next()
})

route({name:"/users", login:true, superuser:true}, function*(req, res) {
  var users = yield req.curCol.find({}, {"ants.code":0})
  res.render('users', {users:users, msg: req.query.msg, prefix: req.curHome})
})

route({name:"/addUser", login:true, superuser:true, post:true}, function*(req, res) {
  var existing = undefined
  var user = yield req.curCol.find({username:req.body.username}, {_id:1})
  if (user && user.length == 1)
    existing = user[0]._id
  if (existing) {
    yield req.curCol.update({_id:existing},
      { $set: {
        displayName: req.body.displayName,
        password: req.body.password,
        superuser: ("superuser" in req.body)}})
    res.redirect(req.curHome + "/users?msg=3")
  } else {
    yield req.curCol.insert({
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
      superuser: ("superuser" in req.body),
      ants:[],
      level:1,
      done:[],
      solved:[]})
    res.redirect(req.curHome + "/users?msg=2")
  }
})

route({name:"/deleteUser", login:true, superuser:true}, function*(req, res) {
  var user = yield req.curCol.find({_id: req.query.id}, {superuser:1})
  if (user[0].superuser == false) {
    yield req.curCol.remove({_id: req.query.id})
    res.redirect(req.curHome + "/users?msg=4")
  } else {
    res.redirect(req.curHome + "/users?msg=1")
  }
})



}
