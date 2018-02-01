 
const co = require('co')

function maximumAnts(level) {
  var maximum = 10
  if (level >= 3) { maximum = 20 }
  if (level >= 5) { maximum = 30 }
  if (level >= 7) { maximum = 40 }
  if (level >= 9) { maximum = 50 }
  return maximum
}

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
      var result = prepareAnts(val, userid)
      /*if (req.user && queryCache[req.sessionID])
        req.user.previous = queryCache[req.sessionID]*/
      return res.render('ants/home', {
        user: req.user,
        fail: req.query.fail,
        ants: result.ants,
        maximum: maximumAnts(req.user.level),
        globals: result.globals,
        highlightElement: 0,
        devMode: App.colo.get(req.session.colony).debugging,
        prefix: req.curHome,
        colonyInfo : App.colo.get(req.session.colony).description,
      })
    } else
      res.render('landing/main', {
        colonies : App.colo.all()
      })
  }))

  App.express.get("/logout", function(req, res) {
    App.users.logout(req)
    res.redirect('/')
  })






}
