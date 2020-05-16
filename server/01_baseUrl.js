module.exports = function(App) {
  
  App.express.use(function(req, res, next) {
    // override redirect and render to use baseUrl
    let origRender = res.render
    let origRedirect = res.redirect
    
    res.render = function(template, params) {
      params.baseUrl = App.config.baseUrl
      return origRender.apply(this, [template, params])
    }
    
    res.redirect = function(url) {
      return origRedirect.apply(this, [App.config.baseUrl + url])
    }
    
    next()
  })
  
}
