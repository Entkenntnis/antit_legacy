const express = require('express')
const passport = require('passport')

module.exports = function(app) {
  const application = express()

  application.set('views', __dirname + '/views')
  application.set('view engine', 'ejs')
  application.use(express.static('public'))
  application.disable('x-powered-by')

  application.use(require('cookie-parser')())
  application.use(require('body-parser').urlencoded({extended: true }))
  application.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false }))

  application.use(passport.initialize())
  application.use(passport.session())
  
  app.express = application
  
  app.ready.then(() => {
    application.listen(app.config.serverPort, app.config.serverIp)
  })
}
