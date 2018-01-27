
// This module adds default headers from 'helmet'

module.exports = function(App) {
  App.express.use(function (req, res, next) {
    res.setHeader('X-DNS-Prefetch-Control', 'off')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.removeHeader('X-Powered-By')
    res.setHeader('Strict-Transport-Security', 'max-age=5184000')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
  })
}
