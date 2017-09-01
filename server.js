// ok, ab jetzt beginnt der Versuch, den Server auf komplett neue Beine zu stellen
// Schritt für Schritt ...


// ----------------------------
// db

var dbUrl = process.env.ANTME_DB_URL || 'mongodb://dal_mongoadmin:Theesh7aiB@localhost/dal';

const monkdb = require('monk')(dbUrl, {authSource:"admin"})
var colonyInfo = {}

monkdb.then(() => {
  console.log('Connected correctly to server')
  monkdb.get('info').find({}).then((val) => {
    val.forEach(function(v){
      colonyInfo[ v.colonyName] = v
    })
  })
})

function getCol(path) {
  if (colonyInfo[path] !== undefined) {
    return monkdb.get('colony_' + path)
  } else {
    console.log('Invalid colony')
    return null
  }
}




// ----------------------------
// setup

const express = require('express')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());







// ----------------------------
// old client

var db = require('./db.js'); 
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbUrl, {authSource:"admin"}, function(err, database) {
  if (err) {
    throw err
  }
  db.setDB(database);
  console.log('old client ok')
  app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || "localhost");
});









// ----------------------------
// auth

passport.use(new Strategy({passReqToCallback:true}, 
  function(req, username, password, cb) {
    
    if (req.params.colony) {
      var curCol = getCol(req.params.colony)
      if (curCol) {
        return curCol.find({username: username, password: password}).then((val) => {
          if (val && val.length == 1) {
            //console.log(val)
            val[0].colony = req.params.colony
            return cb(null, val[0])
          } else {
            return cb(null, false)
          }
        })
      } else {
        return cb(null, false)
      }
    }
    
    // old code
    console.log('running old stuff auth')
    db.findByUsername(username, function(err, user) {
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    })
    
  }));
  
passport.serializeUser(function(user, cb) {
  cb(null, user.colony + '#' + user._id);
});

passport.deserializeUser(function(id, cb) {
  const splitterIndex = id.indexOf('#')
  const colony = splitterIndex >= 0 ? id.substring(0, splitterIndex) : ""
  id = id.substr(splitterIndex + 1)
  if (colony && colony !== "undefined") {
    return getCol(colony).find({_id: id}).then((val) => {
      val[0].colony = colony
      return cb(null, val[0])
    })
  }
  
  
  // old code
  console.log('running old stuff des')
  db.findById(id, function (err, user) {
    if (!user) { return cb("Can't find user"); }
    cb(null, user);
  });
});

function loginMiddleware() {
  
  return function(req, res, next) {
    
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect('/n/' + req.params.colony)
    }
    next()
  }
}





// ----------------------------
// routes

function getHome(req) {
  return '/n/' + req.params.colony
}

var fs = require('fs');

app.get('/n/:colony', function(req, res) {
  const colony = req.params.colony
  const userid = req.user ? req.user._id.toString() : undefined
  const curCol = getCol(colony)
  if (!curCol) {
    res.send('bad colony')
  } else {
    curCol.find({}).then((val) => {
      var ants = []
      var globals = []
      val.forEach(function(v){
        if (v._id.toString() == userid) {
          ants = v.ants
          ants.forEach(function(a){
            a._id = a.antid
          })
        } else {
          v.ants.forEach(function(w){
            if (w.published) {
              w.publicName = "@" + v.displayName + "/" + w.name
              w._id = w.antid
              globals.push(w)
            }
          })
        }
      })
      res.render('home', {
        user: req.user,
        fail: req.query.fail,
        ants: ants,
        globals: globals,
        highlightElement: 0,
        prefix: getHome(req)
      })
    })
  }
})

app.post('/n/:colony/login',
  function(req, res, next) {
    passport.authenticate('local',
      { failureRedirect: getHome(req) + '/?fail=1' })(req, res, next)
  },
  function(req, res) {
    res.redirect(getHome(req))
})

app.get('/n/:colony/login',
  function(req, res) {
    res.redirect(getHome(req))
})

app.get('/n/:colony/logout',
  function(req, res){
    req.logout();
    res.redirect(getHome(req));
  });

app.get('/n/:colony/doku',
  function(req, res){
    res.render('doku', { user: req.user, highlightElement:2, prefix: getHome(req) });
  });

app.get('/n/:colony/guide',
  function(req, res){
    res.render('guide', { user: req.user, highlightElement:1, prefix: getHome(req) });
  });

app.get('/n/:colony/chals',
  function(req, res){
    res.render('chals', { user: req.user, highlightElement:3, prefix: getHome(req) });
  });

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

app.get('/n/:colony/new', loginMiddleware(),
  function(req, res){
    var codeString = fs.readFileSync("./newAnt.js", "utf8");
    const antName = getName(codeString)
    const antId = Math.floor(Date.now()*1000 + Math.random()*999).toString(16);
    getCol(req.params.colony).update({_id:req.user._id},
      {$push:{ants: {antid:antId, name:antName, published:false,code:codeString}}})
    res.redirect(getHome(req))
  });

app.get('/n/:colony/edit', loginMiddleware(),
  function(req, res){
    var done = false
    getCol(req.params.colony).find({_id: req.user._id}).then((val) => {
      for(var i = 0; i < val[0].ants.length; i++) {
        if (val[0].ants[i].antid == req.query.id) {
          done = true
          return res.render('edit', {data:val[0].ants[i].code, id:req.query.id, prefix:'/n/' + req.params.colony})
        }
      }
    }).then(()=>{
      if (!done)
        res.redirect(getHome(req))
    })
  });

// ----------------------------
// old stuff





var simulations = []

var queryStore = {};

// authentication




// connecting to db



// Define routes.
app.get('/',
  function(req, res) {
    var userid = req.user ? req.user._id : undefined;
    db.loadUserAnts(userid, function(err, userAnts){
      db.loadGlobalAnts(userid, function(err, globalAnts) {
        if (req.user && queryStore[req.user._id]) {
          req.user.previous = queryStore[req.user._id];
        }
        res.render('home', {
          user: req.user,
          fail : req.query.fail, 
          ants : userAnts,
          globals : globalAnts,
          highlightElement:0,
          prefix:""
        });
      });
    });
  });

app.get('/edit',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.loadCode(req.user._id, req.query.id, function(err, code){
      if (!code) return res.redirect("/");
      return res.render('edit', { data:code, id:req.query.id, prefix:"" });
    });
  });

app.post('/save',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.saveCode(req.user._id, req.query.id, req.body.data, function(){
      return res.redirect("/");
    });
  });

app.get('/simulation',
  function(req, res){
    if (req.user) {
      queryStore[req.user._id] = req.query;
    }
    var antIds = [];
    for (var i = 1; i <= 8; i++) {
      var val = req.query['team' + i];
      if (val && val != "none")
        antIds.push(val);
    }
    db.loadCodeArray(req.user, antIds, function(err, ants) {
      var date = Date.now()
      var userid = req.user ? req.user._id : undefined
      var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
      var s = {
        antsID:ants.map(function(a){return a._id}),
        antsName:ants.map(function(a){return db.getName(a.code)}),
        userid:userid,
        username:req.user?req.user.displayName : undefined,
        start:date,
        hash:hash
      }
      simulations.push(s)
      res.render('simulation', {code:ants, hash:hash});
    });    
  });

app.get('/submit',
  function(req, res) {
    var hash = req.query.hash
    var points = req.query.points
    for (var i = 0; i < simulations.length; i++) {
      var s = simulations[i]
      var timePassed = (Date.now() - s.start) / 1000
      if (s.hash == hash && !s.result && timePassed < 600) {
        var results = points.split(",")
        if (results.length == s.antsName.length) {
          s.result = results
          return res.send("ok")
        }
      }
    }
    res.send("fail")
  })

app.get('/publish',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.publishAnt(req.user._id, req.query.id, true, function() {  
      res.redirect("/");
    });
  });
  
app.get('/unpublish',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.publishAnt(req.user._id, req.query.id, false, function() {  
      res.redirect("/");
    });
  });
  
app.get('/new',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    var codeString = fs.readFileSync("./newAnt.js", "utf8");
    db.addAnt(req.user._id, codeString, function(){
      res.redirect("/");
    });
  });

app.get('/delete',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.deleteAnt(req.user._id, req.query.id, function() {
      res.redirect("/");
    });
  });

// administration
app.get('/stats',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res) {
    if (req.user.superuser) {
      res.render('stats', {data:simulations})
    } else {
      res.redirect("/")
    }
  })
  
app.get('/clearstats',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res) {
    if (req.user.superuser) {
      simulations = []
    }
    res.redirect("/stats")
  })

app.get('/repair',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    if (req.user.superuser) {
      db.repairDB(function(msg){
        res.send(msg + '<br><a href="/">zurück</a>');
      });
    } else {
      res.redirect("/");
    }
  });

app.get('/users',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    if (req.user.superuser) {
      db.userlist(function(err, val){
        res.render('users', {users:val, msg:undefined, prefix:""});
      });      
    } else {
      res.redirect("/");
    }
  });

app.post('/addUser',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    if (req.user.superuser){
      db.addUser(req.body, function(err, msg){
        return res.redirect("/users");
      });
    } else {
      res.redirect("/");
    }
  });

app.get('/deleteUser',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    if (req.user.superuser){
      db.deleteUser(req.query.id, function(err, msg){
        return res.redirect("/users");
      });
    } else {
      res.redirect("/");
    }
  });

// migration
// 

/*app.get('/migrate',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    var files = fs.readdirSync('./data');
    files.forEach(function(file){
      var value = fs.readFileSync('./data/' + file, "utf8");
      db.addAnt(req.user._id, value, function(){});
    });
    res.redirect("/");
  });*/
  
app.get('/doku',
  function(req, res){
    res.render('doku', { user: req.user, highlightElement:2,prefix:"" });
  });

app.get('/guide',
  function(req, res){
    res.render('guide', { user: req.user, highlightElement:1,prefix:"" });
  });

app.get('/chals',
  function(req, res){
    res.render('chals', { user: req.user, highlightElement:3,prefix:"" });
  });

app.get('/login',
  function(req, res){
    res.redirect('/');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/?fail=1' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
  
app.get('/save',
  function(req, res){
    res.redirect('/');
  });





