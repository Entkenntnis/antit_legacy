// ----------------------------
// application

const express = require('express')
const passport = require('passport')
const co = require('co')
const util = require('util')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.disable('x-powered-by')

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({extended: true }))
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())


// ----------------------------
// setup

const dbUrl = process.env.ANTME_DB_URL ||
  'mongodb://dal_mongoadmin:Theesh7aiB@localhost/antme'

const db = require('monk')(dbUrl, {authSource:"admin"})

db.then(() => {
  initColonys()
  app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || "localhost")
})

process.on('unhandledRejection', function(reason, p){
    console.log("Unhandled Rejection:", p);
    process.exit(1)
});


// ----------------------------
// colony

const colonyInfo = {}

function initColonys() {
  return co(function*(){
    var val = yield db.get('info').find({})
    val.forEach(function(colony){
      colonyInfo[colony.colonyName] = colony
    })
  })
}

function getColonyCollection(path) {
  if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
    return db.get('colony_' + path)
  else
    return null
}


// ----------------------------
// auth

passport.use(new (require('passport-local').Strategy)(
  {passReqToCallback:true}, 
  co.wrap(function*(req, uname, pw, cb) {
    var users = yield req.curCol.find({username: uname, password: pw}, {ants:false})
    if (users && users.length == 1) {
      users[0].colony = req.params.colony
      return cb(null, users[0])
    } else {
      return cb(null, false)
    }
})));
  
passport.serializeUser(function(user, cb) {
  cb(null, user.colony + '#' + user._id);
});

passport.deserializeUser(co.wrap(function*(id, cb) {
  var splitterIndex = id.indexOf('#')
  var colony = splitterIndex >= 0 ? id.substring(0, splitterIndex) : ""
  var userid = id.substr(splitterIndex + 1)
  var col = getColonyCollection(colony)
  if (col) {
    var users = yield col.find({_id: userid}, {ants:false})
    users[0].colony = colony
    return cb(null, users[0])
  } else {
    cb("invalid id")
  }
}));


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

// ----------------------------
// route helper

const queryCache = {}

function loginMiddleware(superuser) {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated() ||
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
    app.get('/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
  } else {
    app.post('/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
    app.get('/:colony' + options.name, checkColony(), getLogin(), returnHome)
  }
}


// ----------------------------
// routes

app.get("/", function(req, res) {
  res.redirect("/main")
})

route({name:"/"}, function*(req, res) {
  const userid = req.user ? req.user._id.toString() : undefined
  var val = yield req.curCol.find({}, {"ants.code":false})
  var result = prepareAnts(val, userid)
  if (req.user && queryCache[req.sessionID])
    req.user.previous = queryCache[req.sessionID]
  res.render('home', {
    user: req.user,
    fail: req.query.fail,
    ants: result.ants,
    globals: result.globals,
    highlightElement: 0,
    devMode:colonyInfo[req.params.colony].debugging,
    prefix: req.curHome
  })
})

route({name:"/login", post:true}, function(req, res, next) {
  passport.authenticate('local', {
    failureRedirect: req.curHome + '/?fail=1',
    successRedirect: req.curHome})(req, res, next)
})

route({name:"/logout"}, function(req, res, next) {
  req.logout()
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

route({name:"/chals"}, function(req, res) {
  res.render('chals', {
    user: req.user,
    highlightElement:3,
    prefix: req.curHome })
})

route({name:"/new", login:true}, function*(req, res, next) {
  var codeString = yield util.promisify(require('fs').readFile)("./newAnt.js", "utf8")
  yield insertAnt(codeString, req.user._id, req.curCol)
  next()
})

route({name:"/edit", login:true}, function*(req, res, next) {
  var users = yield req.curCol.find({
    _id: req.user._id,
    "ants.antid":req.query.id},
    {"ants.$":1})
  if (users && users.length == 1) {
    res.render('edit', {
      data: users[0].ants[0].code,
      id: req.query.id,
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

route({name:"/level"}, function*(req, res) {
  // eine Ameise laden
  var users = yield req.curCol.find({
    _id: req.user._id,
    "ants.antid":req.query.id},
    {"ants.$":1})
  if (users && users.length == 1) {
    res.render('simulation', {
      code:[users[0].ants[0]],
      hash:"",
      seed:undefined,
      repeat:undefined,
      prefix:req.curHome,
      devMode:false,
      fightMode:false,
      level:parseInt(req.query.num)
    })
  }
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
      ants:[]})
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

const rootCode = "xyBk4sp5Q"

app.get("/root/reload", function(req, res) {
  if (req.query.key == rootCode) {
    initColonys()
    res.send("ok")
  } else {
    res.send("invalid key")
  }
})

app.get("/root/newcolony", function*(req, res) {
  if (req.query.key == rootCode) {
    if (req.query.name &&
        !colonyInfo[req.query.name] &&
        req.query.name != "root" &&
        req.query.name.length >= 2) {
      db.create('colony_' + req.query.name)
      yield db.get('colony_' + req.query.name).insert({
        username:"admin",
        displayName:"Administrator",
        password:"bumblebee",
        ants:[],
        superuser:true})
      yield db.get('info').insert({
        colonyName:req.query.name,
        debugging:false
      })
      initColonys()
      res.send("ok")
    } else {
      res.send("invalid name")
    }
  } else {
    res.send("invalid key")
  }
})




