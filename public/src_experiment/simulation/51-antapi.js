

(function(){

  var API = AntIT.API
  
  AntIT.Unit.addFunction('Ant', 'emit', function(name, args){
    API.setUnit(this, this.getAttr('playerid'))
    API.callUserFunc(name, args)
    API.close()
  })
  
  AntIT.Bus.on('tick', function(){
    AntIT.Units.Ant.forEach(function(ant){
      ant.emit("Tick")
    })
  })
  
  AntIT.Unit.Bus.on('ant-waiting', function(ant) {
    ant.emit("Wartet")
  })
  
  AntIT.Unit.Bus.on('ant-born', function(ant) {
    ant.emit("IstGeboren")
  })
  
  AntIT.Unit.Bus.on('ant-died', function(ant, reason) {
    ant.emit("IstGestorben", [reason])
  })
  
  AntIT.Unit.Bus.on('ant-reached-boarder', function(ant) {
    ant.emit("RandErreicht")
  })
  
  AntIT.Unit.Bus.on('ant-sensed-sugar', function(ant, sugar) {
    ant.emit("SiehtZucker", [sugar])
  })
  
  AntIT.Unit.Bus.on('ant-sensed-apple', function(ant, apple) {
    ant.emit("SiehtApfel", [apple])
  })
  
  AntIT.Unit.Bus.on('ant-send-message', function(ant, info, type) {
    ant.emit('EmpfängtNachricht', [info, type])
  })
  
  AntIT.Unit.Bus.on('ant-reached-sugar', function(ant, dest) {
    ant.emit("ZuckerErreicht", [dest])
  })
  
  AntIT.Unit.Bus.on('ant-reached-apple', function(ant, dest) {
    ant.emit("ApfelErreicht", [dest])
  })
  
  AntIT.Unit.Bus.on('ant-custom-function', function(f, ant, cb) {
    cb(f.apply(API.pushObj(this)))
  })

  API.addFunc("Gehe", function (schritte) {
    if (typeof schritte !== "number" || schritte < 0) {
      API.fail("Die Funktion 'Gehe(schritte)' erwartet als Argument eine positive Zahl.")
      return
    }
    schritte = Math.round(schritte)
    if (schritte > 0)
      API.getUnit().addGoJob(schritte)
  })

  API.addFunc("Stopp", function(){
    API.getUnit().addStopJob()
  })

  API.addFunc("Drehe", function (winkel) {
    if (typeof winkel !== "number") {
      API.fail("Die Funktion 'Drehe(winkel)' erwartet als Argument eine Zahl.")
    }
    winkel = Math.round(winkel)
    if (winkel != 0) {
      API.getUnit().addTurnJob(winkel)
    }
  })

  API.addFunc("DreheZuRichtung", function (richtung) {
    if (typeof richtung !== "number") {
      API.fail("Die Funktion 'DreheZuRichtung(richtung)' erwartet als Argument eine Zahl.")
      return
    }
    var richtung = Math.round(richtung) % 360
    while (richtung < 0)
      richtung += 360
    API.getUnit().addTurnToJob(richtung)
  })
  
  API.addFunc("Stehe", function (runden) {
    if (typeof runden !== "number" || runden < 0) {
      API.fail("Die Funktion 'Stehe(runden)' erwartet als Argument eine positive Zahl.")
      return
    }
    runden = Math.round(runden)
    if (runden > 0)
      API.getUnit().addWaitJob(runden)
  });

  API.addFunc("DreheZuObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.fail("Die Funktion 'DreheZuObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
      return;
    }
    API.getUnit().addTurnToObj(objekt)
  })

  API.addFunc("DreheWegVonObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheWegVonObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.")
      return
    }
    API.getUnit().addTurnAway(objekt)
  })
  
  API.addFunc("GeheZuZiel", function (ziel, sense)  {
    if (arguments.length < 1)
      return API.fail("Die Funktion 'GeheZuZiel(ziel)' wurde ohne Argument aufgerufen")
    if (ziel.getType() == "Sugar")
      return API.getUnit().addGotoJob(ziel, "Sugar", sense);
    if (ziel.getType() == "Hill")
      return API.getUnit().gotoHome(sense);
    if (ziel.getType() == "Apple")
      return API.getUnit().addGotoJob(ziel, "Apple", sense);
    if (ziel.getType() == "Position")
      return API.getUnit().addGotoJob(ziel, "Position", sense);
    API.fail("Die Funktion 'GeheZuZiel(ziel)' konnte das unbekannte Ziel nicht anvisieren.")
  })
  
  window.OFFEN = true
  
  API.addFunc("TrageApfel", function () {
    API.getUnit().addAppleSetupJob();
  })  
  
  API.addFunc("GeheZuBau", function (sense) {
    API.getUnit().gotoHome(sense);
  })
  
  API.addFunc("NimmZucker", function (zucker) {
    API.getUnit().addTakeJob(zucker);
  })

  API.addFunc("LadeZuckerAb", function() {
    API.getUnit().addDropJob();
  })
  
  API.addFunc("SendeNachricht", function(betreff, wert) {
    return API.getUnit().addSendMemoryJob(betreff)
  })

  API.addFunc("FühreAus", function (funktion) {
    if (typeof funktion != "function") {
      API.fail("Die Funktion 'FühreAus(funktion)' erwartet als Argument eine Funktion.")
      return
    }
    API.getUnit().addCustomJob(funktion)
  })
  
  /*API.antProp('AktuellesZiel', function(){
    return API.curAnt.getDestination()
  })*/

  API.addProp('Untätig', function(){
    return API.getUnit().getAttr('jobs').length == 0;
  })

  API.addProp('IstOffen', function(){
    return API.getUnit().isSensing()
  })

  API.addProp('AktuelleLast', function(){
    return API.getUnit().getAttr('load')
  })

  API.addProp('AktuelleReichweite', function(){
    return Opts.AmeisenReichweite - API.getUnit().getAttr('lap')
  })

  API.addProp('Blickrichtung', function(){
    return API.getUnit().getAttr('heading')
  })

  API.addProp('HeimatBau', function(){
    return API.pushObj(AntIT.Units.Hill[API.getUnit().getAttr('playerid')])
  })

  API.addProp('TrägtApfel', function(){
    var jobs = API.getUnit().getAttr('jobs')
    if (jobs.length > 0) {
      var curJob = jobs[jobs.length - 1]
      if (curJob.type == "APPLE" && AntIT.Units.Apple.indexOf(curJob.value) >= 0) {
        return true
      }
    }
    return false
  })
  
  function Position(pos) {
    var posx = pos.x
    var posy = pos.y
    
    this.getPos = function() {
      return {x:posx, y: posy}
    }
  }
  
  API.addProp('AktuellePosition', function(){
    return API.pushObj(new Position(API.curAnt.getPos()), true);
  })

  API.addProp('AktuelleRunde', function(){
    //return AntIT.
  })

  API.addProp('Gedächtnis', function(){
    return API.getUnit().getAttr('memory')
  })
  
  var env = {}

  Object.defineProperty(env, "ZuckerPosition", {
    get: function() {
      var sugar = AntIT.Util2d.closest(API.getUnit().getPos(), 
        AntIT.Units.Sugar, Opts.AmeiseSichtweite)
      return sugar ? API.pushObj(new Position(sugar.getPos()), true) : undefined
    },
    set: function() {}
  })

  Object.defineProperty(env, "ApfelPosition", {
    get: function() {
      var apple = AntIT.Util2d.closest(API.getUnit().getPos(),
        AntIT.Units.Apple, Opts.AmeiseSichtweite)
      if (apple && !apple.needHelp(API.curAnt))
        return undefined
      return apple ? API.pushObj(new Position(apple.getPos()), true) : undefined
    },
    set: function() {}
  })

  /*Object.defineProperty(env, "WanzePosition", {
    get: function() {
      var bug = closest(API.curAnt.getPos(), Sim.bugs, Optionen.AmeiseSichtweite)
      return bug ? API.pushObj(new Position(bug.getPos()), true) : undefined
    },
    set: function() {}
  })*/

  API.addProp('Umgebung', function(){
    return env
  })
  
  API.addFunc("BestimmeEntfernung", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.fail("Die Funktion 'BestimmeEntfernung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.")
      return
    }
    return Math.round(AntIT.Util2d.dist(a.getPos(), b.getPos()))
  });

  API.addFunc("BestimmeRichtung", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.fail("Die Funktion 'BestimmeRichtung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.")
      return
    }
    return Math.round(AntIT.Util2d.getDir(a.getPos(), b.getPos()))
  })
  
  API.addFunc("Zufallszahl", function (a, b) {
    if (b === undefined) {
      if (typeof a !== "number" || a < 0) {
        API.fail("Die Funktion 'Zufallszahl(max)' erwartet als Argument eine positive Zahl.")
        return
      }
      return Math.floor(Math.random() * a)
    } else {
      if (typeof a !== "number" || typeof b!== "number") {
        API.fail("Die Funktion 'Zufallszahl(min, max)' erwartet als Argument Zahlen.")
        return
      }
      if (a >= b) {
        API.fail("Die Funktion 'Zufallszahl(min, max)' erwartet, dass min < max ist.")
        return
      }
      return Math.floor(Math.random() * (b - a) + a)
    }
  })
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  
  API.addFunc("Zufallsname", function() {
    var parts = "bcdfghjklmnpqrstvwxyz"
    var consonants = parts.split("")
    var vocals = ['a', 'e', 'i', 'o', 'u', 'ei', 'au']
    var name = ''
    var length = Math.random()*3 + 1
    for (var i = 0; i < length; i++) {
      name += consonants[Math.floor(Math.random()*consonants.length)]
      name += vocals[Math.floor(Math.random()*vocals.length)]
    }
    return capitalize(name)
  })

})()
