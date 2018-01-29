 
// Managing colonies and stuff
const co = require('co')

module.exports = function(App) {
  
  var colonyInfo, colonyIndex
  
  function readinColonies() {
    colonyInfo = {}
    colonyIndex = []
    return co(function*(){
      var val = yield App.db.get('info').find({})
      val.forEach(function(colony){
        colonyInfo[colony.colonyName] = colony
        colonyIndex.push(colony)
      })
      colonyIndex.sort((a, b) => {
        return b.created - a.created
      })
    })
  }
  
  function stringToCollection(path) {
    if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
      return App.db.get('colony_' + path)
    else
      return null
  }
  
  function stringToObj(path) {
    if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
      return colonyInfo[path]
    else
      return null
  }
  
  App.start = App.start.then(() => {
    return readinColonies()
  })
  
  App.colo = {
    getCol : stringToCollection,
    get : stringToObj,
    all : function() { return colonyIndex },
    refresh : readinColonies,
  }
  
  App.express.get('/root', App.csurf, function(req, res) {
    res.render('root/main.ejs', {
      auth: req.session.rootLoggedIn,
      csrf: req.csrfToken(),
      colonies: colonyIndex,
    })
  })
  
  App.express.post('/root', App.csurf, function(req, res) {
    if (req.body.password == App.config.managerPwd) {
      req.session.rootLoggedIn = true
    }
    res.redirect('/root')
  })
  
  App.express.get('/root/logout', function(req, res) {
    delete req.session.rootLoggedIn
    res.redirect('/')
  })
  
  App.express.post('/root/add', App.csurf, co.wrap(function*(req, res) {
    var path = req.body.path
    var desc = req.body.description
    // validation
    if (req.session.rootLoggedIn && path.length >= 3) {
      if (!colonyInfo[path]) {
        yield App.db.get('info').insert({
          colonyName: path,
          description: desc,
          active: true,
          created: new Date(),
        })
        yield readinColonies()
      }
    }
    res.redirect('/root')
  }))
  
  App.express.post('/root/activate', App.csurf, co.wrap(function*(req, res) {
    if (req.session.rootLoggedIn && colonyInfo[req.body.path]) {
      console.log(colonyInfo[req.body.path])
      yield App.db.get('info').update({colonyName: req.body.path}, { $set : {active: !colonyInfo[req.body.path].active} })
      yield readinColonies()
    }
    res.redirect('/root')
  }))
}
