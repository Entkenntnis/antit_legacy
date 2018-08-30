(function(Sim){

  var API = Sim.API

  // API für Befehle
  API.addFunc("Gehe", function (schritte) {
    if (typeof schritte !== "number" || schritte < 0) {
      API.message("Die Funktion 'Gehe(schritte)' erwartet als Argument eine positive Zahl.")
      return;
    }
    schritte = Math.round(schritte)
    if (schritte > 0)
      return API.curAnt.addGoJob(schritte)
  })

  API.addFunc("Drehe", function (winkel) {
    if (typeof winkel !== "number") {
      API.message("Die Funktion 'Drehe(winkel)' erwartet als Argument eine Zahl.")
      return;
    }
    winkel = Math.round(winkel);
    if (winkel != 0) {
      return API.curAnt.addTurnJob(winkel)
    }
  })

  API.addFunc("DreheZuRichtung", function (richtung) {
    if (typeof richtung !== "number") {
      API.message("Die Funktion 'DreheZuRichtung(richtung)' erwartet als Argument eine Zahl.")
      return;
    }
    var richtung = Math.round(richtung) % 360
    while (richtung < 0)
      richtung += 360;
    return API.curAnt.addTurnToJob(richtung)
  })

  API.addFunc("DreheZuObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheZuObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.")
      return;
    }
    return API.curAnt.addTurnToObj(objekt)
  })

  API.addFunc("DreheWegVonObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheWegVonObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.")
      return;
    }
    return API.curAnt.addTurnAway(objekt)
  })
  
  API.addFunc("GeheZuBau", function () {
    return API.curAnt.gotoHome(false)
  })
  
  API.addFunc("GeheZuBauDirekt", function() {
    return API.curAnt.gotoHome(true)
  })
  
  function gotoDest(ziel, direkt) {
    var fname = direkt ? 'GeheZuZielDirekt' : 'GeheZuZiel'
    if (!ziel)
      return API.message("Die Funktion '" + fname + "(ziel)' wurde ohne Argument aufgerufen")
    if (ziel.constructor.name == "Sugar")
      return API.curAnt.addGotoJob(ziel, Sim.sugars, "Zucker", direkt)
    if (ziel.constructor.name == "Hill")
      return API.curAnt.gotoHome(direkt)
    if (ziel.constructor.name == "Apple")
      return API.curAnt.addGotoJob(ziel, Sim.apples, "Apfel", direkt)
    if (ziel.constructor.name == "Bug")
      return API.curAnt.addGotoJob(ziel, Sim.bugs, "Wanze", direkt)
    if (ziel.constructor.name == "Position" || ziel.getPos)
      return API.curAnt.addGotoJob(ziel, undefined, "Position", direkt)
    API.message("Die Funktion '" + fname + "(ziel)' konnte das unbekannte Ziel nicht anvisieren.")
  }

  API.addFunc("GeheZuZiel", function (ziel)  {
    gotoDest(ziel, false)
  })

  API.addFunc("GeheZuZielDirekt", function (ziel)  {
    gotoDest(ziel, true)
  })

  API.addFunc("NimmZucker", function () {
    return API.curAnt.addTakeJob()
  })

  API.addFunc("LadeZuckerAb", function() {
    return API.curAnt.addDropJob()
  })

  API.addFunc("TrageApfel", function () {
    return API.curAnt.addAppleSetupJob()
  })
  
  API.addFunc("Warte", function (runden) {
    if (typeof runden !== "number" || runden < 0) {
      API.message("Die Funktion 'Warte(runden)' erwartet als Argument eine positive Zahl.")
      return
    }
    runden = Math.round(runden)
    if (runden > 0) {
      return API.curAnt.addWaitJob(runden)
    }
  })
  
  API.addFunc("SetzeGift", function() {
    return API.curAnt.addPoisonJob()
  })

  API.addFunc("SendeNachricht", function(betreff, arg1, arg2, arg3) {
    var p = API.curAnt.addSendMessageJob(betreff, arg1, arg2, arg3, API.curAnt.messageLimit)
    API.curAnt.messageLimit = undefined
    return p
  })
  
  API.addFunc("SetzeLimit", function(limit) {
    if (typeof limit == "number")
      API.curAnt.messageLimit = limit
    else
      API.curAnt.messageLimit = undefined
  })
  
  API.addFunc("FühreAlteBefehleAus", function(){
    API.curAnt.insertOldJobs()
  })
  
  // API Zusatz: Teams
  API.addFunc("InTeam", function(number) {
    for (var i = 0; i < arguments.length; i++) {
      if (API.curAnt.getTeam() === arguments[i]) {
        return true
      }
    }
  })
  
  // API Zusatz: Zufall
  API.addFunc("Zufall", function(a, b) {
    return Math.floor(Sim.rng() * (b - a + 1) + a)
  })
  
  // API Zusatz: Vermessung
  API.addFunc("Distanz", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'Distanz(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.")
      return
    }
    return Math.round(Sim.Util.dist(a.getPos(), b.getPos()))
  })

  API.addFunc("Richtung", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'Richtung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.")
      return
    }
    return Math.round(Sim.Util.getDir(a.getPos(), b.getPos()))
  })

  API.antProp('Position', function(){
    return API.pushObj(new Sim.Position(API.curAnt.getPos()), true)
  })

  API.antProp('Bau', function(){
    return API.pushObj(Sim.hills[API.curAnt.getPlayerid()])
  })
  
  // API Zusatz: Gedächtnis
  API.antProp('Gedächtnis', function(){
    return API.curAnt.getMemory()
  })
  
  // API Zusatz: Nahrungsmittelstatus
  API.addFunc("Aktiv", function(x) {
    if (x.constructor.name == "Apple") {
      return Sim.apples.indexOf(x) >= 0
    }
    if (x.constructor.name == "Sugar") {
      return Sim.sugars.indexOf(x) >= 0
    }
    return false
  })
  
  // API Zusatz: Statusinformationen
  API.antProp('SchrittZahl', function(){
    return API.curAnt.getLap();
  })

  API.antProp('TickZahl', function(){
    return Sim.cycles
  })

  API.antProp('HatZucker', function(){
    return API.curAnt.getLoad() > 0
  })

  API.antProp('HatApfel', function(){
    return API.curAnt.isCarryingApple()
  })

  API.antProp('Blickrichtung', function(){
    return API.curAnt.getHeading()
  })

})(AntIT._rawsim)
