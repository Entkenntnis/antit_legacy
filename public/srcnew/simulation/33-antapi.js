

(function(){

  var Sim = {value:"lalalala"}

  function SimObject(obj, timeless) {
    
    var roundId = API.callId;
    
    this.get = function(key) {
      if (key === Sim && (callId == roundId || timeless === true)) {
        return obj;
      }
      AntIT.Bus.emit('error', "Objekt ist abgelaufen und kann nicht mehr verwendet werden.")
      return;
    }
  }

  var staticPlayerId = undefined
  var curAnt = undefined
  var callId = 0
  var ctxt = ""
  
  function getAnt() {
    return curAnt
  }
  
  function setAnt(ant) {
    curAnt = ant
    staticPlayerId = ant.getAttr('playerid')
    callId++
  }
  
  function close() {
    curAnt = undefined
    staticPlayerId = undefined
    ctxt = ""
  }
  
  function callUserFunc(name, arg, pure) {
    var func = AntIT.Players[staticPlayerId].getKi()[name]
    if (arg == undefined)
      arg = []
    if (func == undefined)
      return
    if (staticPlayerId === undefined)
      return
    ctxt = "Ameise." + name + " = " func
    curAnt.refreshInsertionPoint()
    func.apply(pushObj(curAnt), arg.map(function (obj) {
      if (!pure && typeof obj == "object")
        return pushObj(obj)
      return obj
    }))
  }
  
  function pushObj(obj, timeless) {
    return new SimObject(obj, timeless)
  }
  
  function getObj(simObj) {
    return simObj.jet(Sim)
  }

  function antProp(name, f) {
    Object.defineProperty(window, name, {
      get: function() {
        if (staticPlayerId === undefined) {
          console.warn("Die Eigenschaft '" + name + "' kann nur innerhalb einer Ameise aufgerufen werden.")
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
        console.warn("Die Funktion '" + name + "()' kann nur innerhalb einer Ameise aufgerufen werden.")
        return
      }
      var args = []
      for(var i = 0; i < arguments.length; i++) {
        var e = arguments[i];
        if (typeof e == "object" && e.constructor.name == "SimObject") {
          args.push(e.get(Sim))
        } else
          args.push(e)
      }
      return f.apply(null, args)
    }
  }
  
  AntIT.AddProp("API", {
    setAnt : setAnt,
    getAnt : getAnt,
    close : close,
    callUserFunc : callUserFunc,
    pushObj : pushObj,
    antProp : antProp,
    addFunc : addFunc
  })

})()
