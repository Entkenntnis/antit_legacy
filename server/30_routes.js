 
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
        res.redirect('/')
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
    } else
      res.render('landing/main', {
        colonies : App.colo.all()
      })
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
    res.render('ants/wettbewerb', {
      user: req.user,
      ants: result.ants,
      globals: result.globals,
      highlightElement: 4,
      newtuts: App.getNewTuts(req.user),
    })
  }))
  
  App.express.get('/doku', function(req, res) {
    res.render('__old/doku', {
      user: undefined,
      highlightElement:-1,
      newtuts: 0,
      prefix: '/' })
  })
  
  App.express.get('/guide', function(req, res) {
    res.render('__old/guide', {
      user: undefined,
      highlightElement:-1,
      newtuts: 0,
      prefix: '/' })
  })
  
  App.express.get('/overview', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.superuser) {
      let users = yield App.colo.getCol(req.session.colony).find({}, {"ants" : false})
      // remove deprecated users
      users = users.filter(u => u.level)
      users.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1 )
      res.render('admin/overview', {users: users})
    } else
      res.redirect('/')
  }))




}
