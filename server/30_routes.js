 
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
  
  App.express.use(function(req, res, next){
    console.log("user auth middleware")
    if (req.session.loggedIn) {
      var col = App.colo.getCol(req.session.colony)
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

  App.express.get('/login/:colony', App.csurf, function(req, res, next) {
    if (req.session.loggedIn)
      res.redirect('/')
    else {
      console.log(App.colo.get(req.params.colony))
      if (App.colo.get(req.params.colony) !== null) {
        console.log("rendering login")
        res.render('ants/login', {
          fail: req.query.fail,
          description: App.colo.get(req.params.colony).description,
          colony: req.params.colony,
          csrfToken: req.csrfToken(),
        })
      } else
        res.redirect('/')
    }
  })

  App.express.post('/login/:colony', App.csurf, co.wrap(function*(req, res, next){
    var colony = req.params.colony
    var collection = App.colo.getCol(colony)
    if (collection) {
      var users = yield collection.find({
        username: req.body.username,
        password: req.body.password,
      }, {ants:false})
      if (users && users.length == 1) {
        users[0].colony = colony
        var user = users[0]
        // patching old users
        if (!user.level) {
          yield collection.update({_id:user._id},
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
        // now user is logged in
        return res.redirect('/')
      }
    }
    res.redirect(req.path + '/?fail=1')
  }))


  App.express.get("/", co.wrap(function*(req, res) {
    if (req.session.loggedIn) {
      const userid = req.user ? req.user._id.toString() : undefined
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
    }
    res.render('landing/main', {
      colonies : App.colo.all()
    })
  }))

  App.express.get("/logout", function(req, res) {
    if (req.session.loggedIn) {
      delete req.session.loggedIn
      delete req.session.userid
      delete req.session.colony
    }
    res.redirect('/')
})






}
