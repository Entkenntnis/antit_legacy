module.exports = function(app) {
  const db = require('monk')(app.config.databaseUrl, {authSource:"admin"})
  
  app.ready = db.then(() => {
    initColonys()
    initExercises()
  })
  
  app.colonyInfo = {}

  function initColonys() {
    return require('co')(function*(){
      var val = yield db.get('info').find({})
      val.forEach(function(colony){
        app.colonyInfo[colony.colonyName] = colony
      })
    })
  }

  app.getColonyCollection = function(path) {
    if (path && app.colonyInfo[path] && app.colonyInfo[path].colonyName == path)
      return db.get('colony_' + path)
    else
      return null
  }

  app.exercises = {}
  app.exIndex = {}
  app.tutorials = {}
  app.tutIndex = {}

  function initExercises() {
    app.exercises = require('./exercises').exercises
    app.exIndex = {}
    for (var i = 1; i <= 9; i++) app.exIndex[i] = []
    for (var id in app.exercises) {
      var ex = app.exercises[id]
      app.exIndex[ex.level].push(id)
    }
    for (var id in app.exIndex) {
      app.exIndex[id].sort((a,b)=>a-b)
    }
    app.tutorials = require('./tutorials').tutorials
    app.tutIndex = {}
    for (var i = 1; i <= 9; i++) app.tutIndex[i] = []
    for (var id in app.tutorials) {
      var ex = app.tutorials[id]
      app.tutIndex[ex.level].push(id)
    }
    for (var id in app.tutIndex) {
      app.tutIndex[id].sort((a,b)=>a-b)
    }
  }
  
}
