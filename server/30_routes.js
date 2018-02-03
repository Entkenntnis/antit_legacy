 
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
      var val = yield App.colo.getCol(req.session.colony).find({}, {"ants.code":false})
      var result = App.ants.prepareAnts(val, userid)
      if (req.session.cachedQuery)
        req.user.previous = req.session.cachedQuery
      return res.render('ants/home', {
        user: req.user,
        ants: result.ants,
        maximum: App.ants.maximumAnts(req.user.level),
        globals: result.globals,
        highlightElement: 0,
        colonyInfo : App.colo.get(req.session.colony).description,
      })
    } else
      res.render('landing/main', {
        colonies : App.colo.all()
      })
  }))

  App.express.get("/logout", co.wrap(function*(req, res) {
    App.users.logout(req)
    res.redirect('/')
  }))






}
