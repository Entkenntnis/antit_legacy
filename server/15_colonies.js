 
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
  
  function generateStats(content) {
    let stats = {
      user: 0,
      superuser: 0,
      adminNames: [],
      userNames: [],
      ants: 0,
      published: 0,
    }
    content.forEach(function(user){
      stats.user++
      if (user.superuser) {
        stats.superuser++
        stats.adminNames.push(user.username)
      } else {
        stats.userNames.push(user.username)
      }
      user.ants.forEach(function(ant){
        stats.ants++
        if (ant.published) {
          stats.published
        }
      })
    })
    return stats
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
      message: req.flash('/root').join('<br>'),
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
  
  App.express.get('/root/edit/:colony', App.csurf, co.wrap(function*(req, res) {
    var data = stringToObj(req.params.colony)
    if (!data) {
      req.flash('/root', "Kolonie nicht gefunden")
      res.redirect('/root')
    }
    var content = yield stringToCollection(req.params.colony).find({}, {"ants.code":false})
    res.render('root/edit.ejs', {
      colony: data,
      existing: true,
      stats: generateStats(content),
      csrf: req.csrfToken(),
    })
  }))
  
  App.express.get('/root/new', App.csurf, function(req, res) {
    res.render('root/edit.ejs', {
      colony: {},
      existing: false,
      stats: undefined,
      csrf: req.csrfToken(),
    })
  })
  
  App.express.post('/root/save', App.csurf, co.wrap(function*(req, res) {
    let path = req.body.colonyName
    let desc = req.body.description
    let active = req.body.active
    let created =req.body.created
    let d = new Date(created)
    if (isNaN(d.getTime()))
      d = new Date()
    let errors = []
    if (typeof path != "string")
      errors.push("Name der Kolonie ist keine Zeichenkette")
    else {
      if (path.length < 3 || !path.match(/([a-z0-9])+/))
        errors.push("Name zu kurz oder enthält ungültige Zeichen")
      else {
        if (desc.length < 1)
          errors.push("Beschreibung darf nicht leer sein.")
      }
    }
    if (errors.length > 0) {
      req.flash('/root', "Fehler bei der Überprüfung der Eingaben:")
      errors.forEach((msg) => { req.flash('/root', msg ) } )
    } else {
      yield App.db.get('info').update({colonyName:path}, {
        colonyName: path,
        description: desc,
        active: active?true:false,
        created: d,
      }, {upsert: true})
      yield readinColonies()
      req.flash('/root', "OK: Eintrag gespeichert")
    }
    res.redirect('/root')
  }))
}
