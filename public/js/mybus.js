
var Minibus = {}

Minibus.create = function(){

  function EventBus() {
  
    var router = {}
    
    this.on = function(routes, f) {
      if (typeof routes == "string")
        routes = [routes]
      routes.forEach(function(r){
        if (r in router)
          router[r].push(f)
        else {
          router[r] = [f]
        }
      })
    }
    
    this.has = function(route) {
      return router[route] !== undefined
    }
    
    this.emit = function(route, arg1, arg2, arg3, arg4) { // Achtung hier!
      if (!(route in router))
        return
      router[route].forEach(function(f){
        var result = f(arg1, arg2, arg3, arg4)
        if (result && typeof result.next == 'function') {
          // Wir haben einen Generator erhalten. Diesen führen wir aus.
          // Das hier ist kompett rückwärtskompatibel.
          
          function runnext() {
            nextresult = result.next()
            if (nextresult.done === false) {
              if (nextresult.value && typeof nextresult.value.then == 'function') {
                // Haben eine Promise
                nextresult.value.then(runnext)
              } else {
                // einfach weitermachen
                runnext()
              }
            }
          }
          
          runnext()
        }
      })
    }
  }

  return new EventBus()
}
