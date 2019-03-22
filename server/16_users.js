
// stellt Funktionen bereit, um Benutzerdaten zu verwalten

const co = require('co')
const bcrypt = require('bcryptjs');

module.exports = function(App) {
  
  function login(uname, pwd, colony, req) {
    return co(function*(){
      var col = App.colo.getCol(colony)
      if (col) {
        if (colony == "public") {
          // Spezialfall für öffentlich
          var users = yield col.find({
            username: uname
          }, {ants:false})
          if (users && users.length == 1) {
            var user = users[0]
            let success = yield bcrypt.compare(pwd, user.password)
            if (success) {
              req.session.loggedIn = true
              req.session.userid = user._id
              req.session.colony = colony
            }
          }
        } else {
          var users = yield col.find({
            username: uname,
            password: pwd,
          }, {ants:false})
          if (users && users.length == 1) {
            var user = users[0]
            req.session.loggedIn = true
            req.session.userid = user._id
            req.session.colony = colony
          }
        }
      }
    })
  }
  
  function logout(req) {
    delete req.session.loggedIn
    delete req.session.userid
    delete req.session.colony
  }
  
  function normalAuthMiddleware(req, res, next) {
    if (req.session.loggedIn && App.colo.get(req.session.colony)) {
      next()
    } else
      res.redirect('/')
  }
  
  function* register(req, col) {
    // ein neuer Benutzer möchte sich registrieren
    let uname = req.body.username
    let pw1 = req.body.password1
    let pw2 = req.body.password2
    if (uname.length < 3) {
      return req.flash('landing/register', "Fehler: Benutzername zu kurz!")
    }
    let res = yield col.find({username:uname}, {"_id":1})
    if (res.length > 0) {
      return req.flash('landing/register', "Fehler: Benutzername bereits vergeben!")
    }
    if (pw1.length == 0 || pw2.length == 0) {
      return req.flash('landing/register', "Fehler: Bitte Passwort eingeben!")
    }
    
    if (pw1.length < 4 || pw2.length < 4) {
      req.body.password1 = req.body.password2 = ""
      return req.flash('landing/register', "Fehler: Passwort zu kurz!")
    }
    if (pw1 != pw2) {
      req.body.password1 = req.body.password2 = ""
      return req.flash('landing/register', "Fehler: Passwörter stimmen nicht überein!")
    }
    let pw = yield bcrypt.hash(pw1, 8)
    yield col.insert({
        username: uname,
        displayName: uname,
        password: pw,
        superuser: false,
        ants:[],
        level:1,
        done:[],
        solved:[],
        friends:[],
      })
    req.flash('landing/register', "Herzlichen Glückwunsch, die Registrierung war erfolgreich!")
  }
  
  App.users = {
    login: login,
    logout: logout,
    auth: normalAuthMiddleware,
    register: co.wrap(register),
  }
  
  // load user for every request
  App.express.use(function(req, res, next){
    if (req.session.loggedIn) {
      var col = App.colo.getCol(req.session.colony)
      co(function*(){
        var users = yield col.find({_id: req.session.userid}, {ants:false})
        users[0].colony = req.session.colony
        req.user = users[0]
        next()
      })
    } else
      next()
  })
  
  
  // user admin interface
  
  // root can access user interface
  App.express.get('/users/:colony', function(req, res) {
    if (!req.session.loggedIn && req.session.rootLoggedIn && App.colo.get(req.params.colony)) {
      req.session.colony = req.params.colony
      res.redirect('/users')
    } else
      res.redirect(req.session.rootLoggedIn?'/root':'/')
  })
  
  function auth(req, res, next) {
    if ((req.session.rootLoggedIn || (req.session.loggedIn && req.user.superuser))
         && App.colo.get(req.session.colony)) {
      // only good users have access
      next()
    } else
      res.redirect('/')
  }
      
  App.express.get('/users', auth, co.wrap(function*(req, res) {
    let users = yield App.colo.getCol(req.session.colony).find({}, {username:1, superuser:1})
    users.sort(function(a,b){
      return a.username.toLowerCase()>b.username.toLowerCase()?1:-1
    })
    let otherUsers = []
    if (req.session.rootLoggedIn) {
      for (let col of App.colo.all()) {
        if (col.colonyName == req.session.colony) continue
        let cusers = yield App.colo.getCol(col.colonyName).find({}, {username:1, superuser:1})
        cusers.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1 )
        cusers.forEach(u => {
          otherUsers.push({colony: col.colonyName, user: u})
        })
      }
    }
    
    res.render('admin/users', {
      users: users,
      root: req.session.rootLoggedIn,
      otherUsers: otherUsers,
      colony: App.colo.get(req.session.colony),
      message: req.flash('admin/users').join('<br>'),
    })
  }))
  
  App.express.get('/users/edit/:id', App.csurf, auth, co.wrap(function*(req, res) {
    var key = req.params.id
    if (key.length == 24) {
      var user = yield App.colo.getCol(req.session.colony).find({_id: req.params.id}, {"ants.code":false})
    }
    if (user && user.length == 1) {
      res.render('admin/useredit', {
        user: user[0],
        existing: true,
        csrf: req.csrfToken(),
      })
    } else {
      req.flash('admin/users', "Benutzer konnte nicht gefunden werden")
      res.redirect('/users')
    }
  }))
  
  App.express.get('/user/new', App.csurf, auth, function(req, res) {
    res.render('admin/useredit', {
      user: {},
      existing: false,
      csrf: req.csrfToken(),
    })
  })
  
  App.express.post('/user/save', auth, App.csurf, co.wrap(function*(req, res) {
    let id = req.body.userid
    let uname = req.body.username
    let pwd = req.body.password
    let dname = req.body.displayname
    if (!dname) dname = uname
    let ulevel = parseInt(req.body.level)
    if ([1,2,3,4,5,6,7,8,9].indexOf(ulevel) < 0) {
      ulevel = 1
      req.flash('admin/users', "Warnung: Level ungültig, wurde auf Level 1 gesetzt!")
    }
    let superuser = "superuser" in req.body
    let col = App.colo.getCol(req.session.colony)
    if (id && id.length == 24) {
      // we are doing user update
      col.update({_id:id}, {
        $set : {
          username: uname,
          password: pwd,
          displayName: dname,
          superuser: superuser,
          level: ulevel,
        }
      })
      req.flash('admin/users', "OK: Benutzerdaten wurden aktualisiert.")
    } else {
      col.insert({
        username: uname,
        displayName: dname,
        password: pwd,
        superuser: superuser,
        ants:[],
        level:ulevel,
        done:[],
        solved:[],
      })
      req.flash('admin/users', "OK: Neuer Benutzer wurde hinzugefügt.")
    }
    
    
    let existingUser = yield col.find({username:req.body.username})
    if (existingUser.length > 1) {
      req.flash('admin/users', "Warnung: mehrere Benutzer mit gleichen Namen!")
    }
    res.redirect('/users')
  }))
  
  App.express.post('/user/delete', auth, App.csurf, co.wrap(function*(req, res) {
    try {
      
      let result = yield App.colo.getCol(req.session.colony).remove({_id:req.body.userid}, {justOne: true})
      if (result.deletedCount == 1)
        req.flash('admin/users', "OK: Benutzer gelöscht.")
    } catch (e) { 
      console.log(e)
    }
    res.redirect('/users')
  }))
}
