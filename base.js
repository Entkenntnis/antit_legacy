var App = {}

try {
  App.config = require('./config')
} catch (e) {
  throw "Server-Einstellungen konnten nicht geladen werden."
}

App.express = require('express')()
App.express.set('views', __dirname + '/views')
App.express.set('view engine', 'ejs')
App.express.use(require('express').static('public'))
App.express.use(require('body-parser').urlencoded({extended: true }))

App.db = require('monk')(App.config.databaseUrl, {authSource:"admin"})

require('./server/00_safeHeaders')(App)
require('./server/10_dbSessions')(App)

process.on('unhandledRejection', function(reason, p){
  console.log("Unbehandelte Ausnahme:", p);
  throw "Es ist ein Fehler aufgetreten und der Server wird beendet."
})

App.db.then(() => {
  App.express.listen(App.config.serverPort, App.config.serverIp)
  console.log("Server gestartet!")
})














App.express.get('/', (req, res) => {
  if (!req.session.views) req.session.views = 0
  req.session.views++
  res.send(JSON.stringify(req.session))
})

App.express.get('/nop', (req, res) => {
  res.send(JSON.stringify(req.session))
  console.log(req.session.id)
})

