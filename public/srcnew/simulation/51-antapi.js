

(function(){

  var API = AntIT.API
  
  AntIT.Unit.Bus.on('ant-waiting', function(ant) {
    API.setAnt(ant)
    API.callUserFunc("Wartet")
    API.close()
  })
  
  AntIT.Unit.Bus.on('ant-born', function(ant) {
    API.setAnt(ant)
    API.callUserFunc("IstGeboren")
    API.close()
  })
  
  AntIT.Unit.Bus.on('ant-reached-boarder', function(ant) {
    API.setAnt(ant)
    API.callUserFunc("RandErreicht")
    API.close()
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
      API.getAnt().addGoJob(schritte)
  })

  API.addFunc("Stopp", function(){
    API.getAnt().addStopJob()
  })

  API.addFunc("Drehe", function (winkel) {
    if (typeof winkel !== "number") {
      API.fail("Die Funktion 'Drehe(winkel)' erwartet als Argument eine Zahl.")
    }
    winkel = Math.round(winkel)
    if (winkel != 0) {
      API.getAnt().addTurnJob(winkel)
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
    API.getAnt().addTurnToJob(richtung)
  })
  
  API.addFunc("Stehe", function (runden) {
    if (typeof runden !== "number" || runden < 0) {
      API.fail("Die Funktion 'Stehe(runden)' erwartet als Argument eine positive Zahl.")
      return
    }
    runden = Math.round(runden)
    if (runden > 0)
      API.getAnt().addWaitJob(runden)
  });

  API.addFunc("DreheZuObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.fail("Die Funktion 'DreheZuObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
      return;
    }
    API.getAnt().addTurnToObj(objekt)
  })

  API.addFunc("DreheWegVonObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheWegVonObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.")
      return
    }
    API.getAnt().addTurnAway(objekt)
  })

  API.addFunc("FühreAus", function (funktion) {
    if (typeof funktion != "function") {
      API.message("Die Funktion 'FühreAus(funktion)' erwartet als Argument eine Funktion.")
      return
    }
    API.getAnt().addCustomJob(funktion)
  })

})()
