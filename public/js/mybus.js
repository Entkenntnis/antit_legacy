
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
    
    this.emit = function(route, arg1, arg2, arg3, arg4) { // Achtung hier!
      if (!(route in router))
        return
      router[route].forEach(function(f){
        f(arg1, arg2, arg3, arg4)
      })
    }
  }

  return new EventBus()
}
