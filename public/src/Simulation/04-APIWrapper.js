(function(Sim){

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
      if (API.staticPlayerId === undefined)
        return;
      
      var bus = Sim.players[API.curAnt.getPlayerid()].getKI().Bus
      if (bus.has(name)) {
        API.ctxt = "Ameise." + name // + " = " + func;
        API.curAnt.markJobsAsOutOfDate()
        var args = arg.map(function (obj) {
          if (!pure && typeof obj == "object")
            return API.pushObj(obj);
          return obj;
        })
        args.unshift(name)
        bus.emit.apply(null, args)
      }
    }
    
    this.pushObj = function(obj, timeless) {
      return new Sim.SimObject(obj, true);
    }
    
    this.getObj = function(simObj) {
      return simObj.get(Sim);
    }
    
    this.antProp = function(name, f) {
      Object.defineProperty(window, name, {
        get: function() {
          if (API.staticPlayerId === undefined) {
            alert("Die Eigenschaft '" + name + "' kann nur innerhalb einer Ameise aufgerufen werden.");
            return;
          }
          return f();
        },
        set: function(name) { }
      });
    };
    
    this.addFunc = function(name, f) {
      window[name] = function() {
        if (API.staticPlayerId === undefined && name != "Zufall") {
          alert("Die Funktion '" + name + "()' kann nur innerhalb einer Ameise aufgerufen werden.");
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
      Sim.Bus.emit('abort-simulation')
    }
  }
  
  AntIT.NeueAmeise = function (name) {
    var bus = Minibus.create()
    var newAnt = {Name:name,Bus:bus,wenn:bus.on,
      teams:undefined,
      curTeamCount:0,
      exports:[],
      SetzeTeams:function(count){
        if (!isNaN(count) && count === parseInt(count, 10) && count > 1) {
          var t = []
          for (var i = 0; i < count; i++) {
            t.push(i)
          }
          this.teams = t
        } else {
          alert('Setzen der Teams fehlgeschlagen')
        }
      },
      SetzeTeamFolge:function() {
        var arr = [].slice.call(arguments)
        var ok = arr.length > 0
        arr.forEach(function(entry) {
          if (isNaN(entry) || entry !== parseInt(entry, 10))
            ok = false
        })
        if (ok)
          this.teams = arr
        else
          alert('Setzen der Teams fehlgeschlagen')
      },
      Exportiere:function(f1, f2, f3, f4) {
        this.exports[0] = f1
        this.exports[1] = f2
        this.exports[2] = f3
        this.exports[3] = f4
      }
    };
    if (Sim.API.ants.length < Sim.Opts.MaximaleSpieler) {
      Sim.API.ants.push(newAnt);
    }
    return newAnt;
  }

  if (Sim.Opts.EntwicklerModus) {
    AntIT.Sim = Sim;
    AntIT.Optionen = Sim.Opts;
  }

  var API = new APIWrapper()
  Sim.API = API 

})(AntIT._rawsim)
