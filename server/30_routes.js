 
const co = require('co')


module.exports = function(App) {
// ----------------------------
// routes
  

  App.express.get('/login/:colony', App.csurf, function(req, res, next) {
    if (req.session.loggedIn)
      res.redirect('/')
    else {
      if (App.colo.get(req.params.colony) !== null) {
        res.render('ants/login', {
          message: req.flash('/login'),
          description: App.colo.get(req.params.colony).description,
          colony: req.params.colony,
          csrfToken: req.csrfToken(),
        })
      } else
        res.redirect('/')
    }
  })

  App.express.post('/login/:colony', App.csurf, co.wrap(function*(req, res, next){
    if (!req.session.loggedIn) {
      yield App.users.login(req.body.username, req.body.password, req.params.colony, req)
      if (req.session.loggedIn)
        res.redirect('/home')
      else {
        req.flash('/login', "<strong>Anmeldung gescheitert!</strong> Überprüfe bitte Benutzername und Passwort.")
        res.redirect(req.path)
      }
    } else
      res.redirect('/')
  }))


  App.express.get("/", co.wrap(function*(req, res) {
    if (req.session.loggedIn) {
      let userid = req.user._id.toString()
      var val = yield App.colo.getCol(req.session.colony).find({username:req.user.username}, {"ants.code":false})
      var result = App.ants.prepareAnts(val, userid)
      return res.render('ants/home', {
        user: req.user,
        ants: result.ants,
        maximum: App.ants.maximumAnts(req.user.level),
        highlightElement: 0,
        newtuts: App.getNewTuts(req.user),
        colonyInfo : App.colo.get(req.session.colony).description,
      })
    } else {
      let col = App.colo.getCol("public")
      res.render(col?'landing/main2':'landing/main', {
        colonies : App.colo.all()
      })
    }
  }))

  App.express.get("/logout", App.users.auth, co.wrap(function*(req, res) {
    App.users.logout(req)
    res.redirect('/')
  }))

  App.express.get('/wettbewerb', App.users.auth, co.wrap(function*(req, res) {
    let userid = req.user._id.toString()
    var val = yield App.colo.getCol(req.session.colony).find({}, {"ants.code":false})
    var result = App.ants.prepareAnts(val, userid, true)
    if (req.session.cachedQuery) {
      req.user.previous = req.session.cachedQuery
    }
    
    // Demo-Ameisen
    if (App.config.devmode) {
      delete require.cache[require.resolve('./demos.js')]
    }
    let demos = require('./demos.js').demos.filter(d => d.level <= req.user.level)
    
    // Freunde beachten!
    if (App.colo.get(req.session.colony).isPublic && req.user.friends && !req.user.superuser) {
      result.globals = result.globals.filter(x => {
        return req.user.friends.indexOf(x.username) >= 0
      })
    }
    
    res.render('ants/wettbewerb', {
      user: req.user,
      ants: result.ants,
      globals: result.globals,
      demos: demos,
      highlightElement: 4,
      newtuts: App.getNewTuts(req.user),
      publicServer: App.colo.get(req.session.colony).isPublic,
      friendFlash: req.flash('friends').join('<br>')
    })
  }))
  
  // Freundes-Management ...
  App.express.get('/unfriend', App.users.auth, co.wrap(function*(req, res){
    if (req.user.friends && req.user.friends.indexOf(req.query.name) >= 0) {
      yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
                  { $pull: {
                    friends: req.query.name}})
    }
    return res.redirect('/wettbewerb')
  }))
  
  App.express.get('/addfriend', App.users.auth, co.wrap(function*(req, res){
    if (req.query.friendname.length > 0) {
      let users = yield App.colo.getCol(req.session.colony).find({username:req.query.friendname}, {_id:1})
      if (users.length == 1) {
        yield App.colo.getCol(req.session.colony).update({_id:req.user._id},
                  { $addToSet: {
                    friends: req.query.friendname}})
      } else {
        req.flash('friends', "Name konnte nicht gefunden werden!")
      }
    } else {
      req.flash('friends', "Bitte Name eingeben!")
    }
    return res.redirect('/wettbewerb')
  }))


  App.express.get('/home', App.users.auth, co.wrap(function*(req, res) {
    return res.render('ants/homeoverview', {
      user : req.user,
      highlightElement:-1,
      newtuts: App.getNewTuts(req.user),
      competitionDone : App.colo.get(req.session.colony).competitionDone,
    })
  }))

  App.express.get('/info', App.users.auth, co.wrap(function*(req, res) {
    return res.render('ants/info', {
      user : req.user,
      highlightElement:-1,
    })
  }))

  App.express.get('/abstract', App.users.auth, co.wrap(function*(req, res) {
    return res.render('ants/abstract', {
      user : req.user,
      highlightElement:-1,
    })
  }))
  
  App.express.get('/register', App.csurf, co.wrap(function*(req, res) {
    let col = App.colo.getCol("public")
    if (!col)
      return res.redirect('/')
    // limit checken
    let users = yield col.find({},  {"_id":1})
    let noregister = false
    if (App.colo.get("public").limit > 0 && users.length >= App.colo.get("public").limit) {
      req.flash('landing/register', "Fehler: Server hat Benutzerlimit erreicht.")
      noregister = true
    }
    res.render('landing/register', {req, noregister})
  }))
  
  App.express.post('/register', App.csurf, co.wrap(function*(req, res){
    let col = App.colo.getCol("public")
    if (!col)
      return res.redirect('/')
    yield App.users.register(req, col)
    res.render('landing/register', {req, noregister:false})
  }))
  
  App.express.get('/datenschutz', (req, res) => {
    res.render('landing/datenschutz', {})
  })
  
  App.express.get('/kontakt', (req, res) => {
    res.render('landing/kontakt', {post:App.config.post,mail:App.config.mail})
  })

}
