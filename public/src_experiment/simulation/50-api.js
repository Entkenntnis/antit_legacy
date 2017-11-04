

(function(){

  var Sim = {value:"lalalala"}
  
  var simobjcache = {}

  function SimObject(obj, timeless) {
    
    var key = callId + ":" + obj.getId() + ":" + Math.random()
    simobjcache[key] = obj
    
    this.getPos = obj.getPos
    
    this.get = function(){
      if (timeless)
        return obj
      if (key in simobjcache)
        return simobjcache[key]
      else
        AntIT.Bus.emit('error', "Objekt ist abgelaufen und ist nicht mehr verfügbar.")
    }
    
    this.isValid = function(){
      return timeless || key in simobjcache
    }
  }

  var staticPlayerId = undefined
  var curUnit = undefined
  var callId = 0
  var ctxt = ""
  
  function getUnit() {
    return curUnit
  }
  
  function setUnit(unit, playerid) {
    curUnit = unit
    staticPlayerId = playerid
    callId++
  }
  
  function close() {
    curUnit = undefined
    staticPlayerId = undefined
    ctxt = ""
    simobjcache = {}
  }
  
  function callUserFunc(name, arg, pure) {
    var func = AntIT.Players[staticPlayerId].getKi()[name]
    if (func == undefined)
      return
    if (staticPlayerId === undefined)
      return
    ctxt = AntIT.Players[staticPlayerId].getKi().Type + "." + name
    curUnit.refreshInsertionPoint()
    if (arg == undefined) {
      func.apply()
    } else {
      func.apply(pushObj(curUnit), arg.map(function (obj) {
        if (!pure && typeof obj == "object")
          return pushObj(obj)
        return obj
      }))
    }
  }
  
  function pushObj(obj) {
    return new SimObject(obj)
  }

  function addProp(name, f) {
    Object.defineProperty(window, name, {
      get: function() {
        if (staticPlayerId === undefined) {
          console.warn("Die Eigenschaft '" + name + "' kann nur innerhalb einer Einheit aufgerufen werden.")
          return
        }
        return f()
      },
      set: function(name) { }
    })
  }
  
  function addFunc(name, f) {
    window[name] = function() {
      if (staticPlayerId === undefined) {
        console.warn("Die Funktion '" + name + "()' kann nur innerhalb einer Einheit aufgerufen werden.")
        return
      }
      var args = []
      for(var i = 0; i < arguments.length; i++) {
        var e = arguments[i];
        if (typeof e == "object" && e.constructor.name == "SimObject" && e.isValid()) {
          args.push(e.get())
        } else
          args.push(e)
      }
      return f.apply(null, args)
    }
  }
  
  function fail(msg) {
    AntIT.Bus.emit('error', msg)
  }
  
  AntIT.AddProp("API", {
    setUnit : setUnit,
    getUnit : getUnit,
    close : close,
    callUserFunc : callUserFunc,
    pushObj : pushObj,
    addProp : addProp,
    addFunc : addFunc,
    fail : fail,
  })

})()
