

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
  
  
  API.addFunc("GeheZuBau", function (sense) {
    API.getUnit().gotoHome(sense);
  })
  
  API.addFunc("NimmZucker", function (zucker) {
    API.getUnit().addTakeJob(zucker);
  })

  API.addFunc("LadeZuckerAb", function() {
    API.getUnit().addDropJob();
  })

  API.addFunc("FühreAus", function (funktion) {
    if (typeof funktion != "function") {
      API.message("Die Funktion 'FühreAus(funktion)' erwartet als Argument eine Funktion.")
      return
    }
    API.getUnit().addCustomJob(funktion)
  })

})()
