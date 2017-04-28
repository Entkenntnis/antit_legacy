var APIWrapper = function() {
  
  this.ants = []
  this.staticPlayerId = undefined;
  this.curAnt = undefined;
  this.callId = 0;
  this.ctxt = "";
  
  this.setAnt = function(ant) {
    API.curAnt = ant;
    API.staticPlayerId = ant.getPlayerid();
    this.callId++;
  }
  
  this.close = function() {
    API.curAnt = undefined;
    API.staticPlayerId = undefined;
    API.ctxt = undefined;
  }
  
  this.callUserFunc = function(name, arg, pure) {
    var func = Sim.players[API.curAnt.getPlayerid()].getKI()[name];
    if (arg == undefined)
      arg = [];
    if (func == undefined)
      return;
    if (API.staticPlayerId === undefined)
      return;
    API.ctxt = "Ameise." + name + " = " + func;
    func.apply(API.pushObj(API.curAnt), arg.map(function (obj) {
      if (!pure && typeof obj == "object")
        return API.pushObj(obj);
      return obj;
    }));
  }
  
  this.pushObj = function(obj, timeless) {
    return new SimObject(obj, timeless);
  }
  
  this.getObj = function(simObj) {
    return simObj.get(Sim);
  }
  
  this.antProp = function(name, f) {
    Object.defineProperty(Global, name, {
      get: function() {
        if (API.staticPlayerId === undefined) {
          console.warn("Die Eigenschaft '" + name + "' kann nur innerhalb einer Ameise aufgerufen werden.");
          return;
        }
        return f();
      },
      set: function(name) { }
    });
  };
  
  this.addFunc = function(name, f) {
    Global[name] = function() {
      if (API.staticPlayerId === undefined) {
        console.warn("Die Funktion '" + name + "()' kann nur innerhalb einer Ameise aufgerufen werden.");
        return;
      }
      var args = []
      for(var i = 0; i < arguments.length; i++) {
        var e = arguments[i];
        if (typeof e == "object" && e.constructor.name == "SimObject") {
          args.push(e.get(Sim));
        } else
          args.push(e);
      }
      return f.apply(undefined, args);
    }
  }
  
  this.message = function(text) {
    var details = "";
    if (API.ctxt !== undefined && API.staticPlayerId !== undefined) {
      details = "\nVolk: " + Sim.players[API.staticPlayerId].getKI().Name + "\nAufruf: " + API.ctxt;
    }
    alert("MELDUNG\n" + text + details);
    AntMe._abortSimulation();
  }
}

var API = new APIWrapper();
