// ----------------------------
// application

const express = require('express')
const passport = require('passport')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

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
  'mongodb://dal_mongoadmin:Theesh7aiB@localhost/dal'

const db = require('monk')(dbUrl, {authSource:"admin"})

db.then(() => {
  initColonys()
  app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || "localhost");
})


// ----------------------------
// colony

const colonyInfo = {}

function initColonys() {
  db.get('info').find({}).then((val) => {
    val.forEach(function(colony){
      colonyInfo[colony.colonyName] = colony
    })
  })
}

function getColonyCollection(path) {
  if (path && colonyInfo[path].colonyName == path)
    return db.get('colony_' + path)
  else
    return null
}


// ----------------------------
// auth

passport.use(new (require('passport-local').Strategy)(
  {passReqToCallback:true}, 
  function(req, username, password, cb) {
    req.curCol.find({username: username, password: password}).then((users) => {
      if (users && users.length == 1) {
        users[0].colony = req.params.colony
        return cb(null, users[0])
      } else {
        return cb(null, false)
      }
    })    
}));
  
passport.serializeUser(function(user, cb) {
  cb(null, user.colony + '#' + user._id);
});

passport.deserializeUser(function(id, cb) {
  var splitterIndex = id.indexOf('#')
  var colony = splitterIndex >= 0 ? id.substring(0, splitterIndex) : ""
  var userid = id.substr(splitterIndex + 1)
  var col = getColonyCollection(colony)
  if (col) {
    col.find({_id: userid}).then((users) => {
      users[0].colony = colony
      return cb(null, users[0])
    })
  } else {
    cb("invalid id")
  }  
});


// ----------------------------
// ant helper


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
  col.update({_id:userid},
    {$push: {ants: {antid:antId, name:antName, published:false,code:code}}})
}

function saveCode(userid, antid, data, col) {
  col.update({_id:userid, "ants.antid" : antid},
    {$set : {"ants.$.code" : data, "ants.$.name": getName(data)}})
}

function updateName(code) {
  var index = code.indexOf("\"") + 1;
  return code.slice(0, index) + "[Kopie] " + code.slice(index)
}

// ----------------------------
// route helper

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
    if (collection) {
      req.curCol = collection
      req.curHome = '/n/' + path
      next()
    } else {
      res.send('bad colony')
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
  if (!options.post) {
    app.get('/n/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
  } else {
    app.post('/n/:colony' + options.name, checkColony(), getLogin(), cb, returnHome)
    app.get('/n/:colony' + options.name, checkColony(), getLogin(), returnHome)
  }
}


// ----------------------------
// routes

route({name:"/"}, function(req, res) {
  const userid = req.user ? req.user._id.toString() : undefined
  req.curCol.find({}).then((val) => {
    var result = prepareAnts(val, userid)
    res.render('home', {
      user: req.user,
      fail: req.query.fail,
      ants: result.ants,
      globals: result.globals,
      highlightElement: 0,
      prefix: req.curHome
    })
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

route({name:"/new", login:true}, function(req, res, next) {
  var codeString = require('fs').readFileSync("./newAnt.js", "utf8");
  insertAnt(codeString, req.user._id, req.curCol)
  next()
})

route({name:"/edit", login:true}, function(req, res, next) {
  req.curCol.find({
    _id: req.user._id,
    "ants.antid":req.query.id},
    {"ants.$":1})
  .then((users) =>{
    if (users && users.length == 1) {
      res.render('edit', {
        data: users[0].ants[0].code,
        id: req.query.id,
        prefix: req.curHome })
    } else {
      next()
    }
  })
})

route({name:"/save", login:true, post:true}, function(req, res, next) {
  if (req.query.duplicate) {
    insertAnt(updateName(req.body.data), req.user._id, req.curCol)
  }
  saveCode(req.user._id, req.query.id, req.body.data, req.curCol)
  next()
})




