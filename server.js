var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db.js');
var fs = require('fs');

var queryStore = {};

// authentication
passport.use(new Strategy(
  function(username, password, cb) {
    db.findByUsername(username, function(err, user) {
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
  
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  db.findById(id, function (err, user) {
    if (!user) { return cb("Can't find user"); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// connecting to db
var MongoClient = require('mongodb').MongoClient;
var dbUrl = process.env.ANTME_DB_URL || 'mongodb://admin:b8-RG5CJJ7rT@localhost/dal';
MongoClient.connect(dbUrl, {authSource:"admin"}, function(err, database) {
  if (err) {
    throw err
  }
  db.setDB(database);
  app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || "localhost");
  console.log("app started")
});

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
          globals : globalAnts
        });
      });
    });
  });

app.get('/edit',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    db.loadCode(req.user._id, req.query.id, function(err, code){
      if (!code) return res.redirect("/");
      return res.render('edit', { data:code, id:req.query.id });
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
      res.render('simulation', {code:ants});
    });    
  });

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
        res.render('users', {users:val});
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
    res.render('doku', { user: req.user });
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





