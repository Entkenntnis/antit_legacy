(function(Sim){

  var API = Sim.API

  // WRAPPER to user space

  API.addFunc("Gehe", function (schritte) {
    if (typeof schritte !== "number" || schritte < 0) {
      API.message("Die Funktion 'Gehe(schritte)' erwartet als Argument eine positive Zahl.");
      return;
    }
    schritte = Math.round(schritte);
    if (schritte > 0)
      API.curAnt.addGoJob(schritte);
  })

  API.addFunc("Stopp", function(){
    API.curAnt.addStopJob();
  });

  API.addFunc("Drehe", function (winkel) {
    if (typeof winkel !== "number") {
      API.message("Die Funktion 'Drehe(winkel)' erwartet als Argument eine Zahl.");
      return;
    }
    winkel = Math.round(winkel);
    if (winkel != 0) {
      API.curAnt.addTurnJob(winkel);
    }
  });

  API.addFunc("DreheZuRichtung", function (richtung) {
    if (typeof richtung !== "number") {
      API.message("Die Funktion 'DreheZuRichtung(richtung)' erwartet als Argument eine Zahl.");
      return;
    }
    var richtung = Math.round(richtung) % 360;
    while (richtung < 0)
      richtung += 360;
    API.curAnt.addTurnToJob(richtung);
  });

  API.addFunc("GeheZuBau", function (sense) {
    API.curAnt.gotoHome(sense);
  })

  API.addFunc("Zufallszahl", function (a, b) {
    if (b === undefined) {
      if (typeof a !== "number" || a < 0) {
        API.message("Die Funktion 'Zufallszahl(max)' erwartet als Argument eine positive Zahl.");
        return;
      }
      return Math.floor(Sim.rng() * a);
    } else {
      if (typeof a !== "number" || typeof b!== "number") {
        API.message("Die Funktion 'Zufallszahl(min, max)' erwartet als Argument Zahlen.");
        return;
      }
      if (a >= b) {
        API.message("Die Funktion 'Zufallszahl(min, max)' erwartet, dass min < max ist.");
        return;
      }
      return Math.floor(Sim.rng() * (b - a) + a);
    }
  })

  // back compat
  API.addFunc("Stehe", function (runden) {
    if (typeof runden !== "number" || runden < 0) {
      API.message("Die Funktion 'Stehe(runden)' erwartet als Argument eine positive Zahl.");
      return;
    }
    runden = Math.round(runden);
    if (runden > 0)
      API.curAnt.addWaitJob(runden);
  });
  
  API.addFunc("Warte", function (runden) {
    if (typeof runden !== "number" || runden < 0) {
      API.message("Die Funktion 'Stehe(runden)' erwartet als Argument eine positive Zahl.");
      return;
    }
    runden = Math.round(runden);
    if (runden > 0)
      API.curAnt.addWaitJob(runden);
  });

  API.addFunc("DreheZuObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheZuObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
      return;
    }
    API.curAnt.addTurnToObj(objekt)
  })

  API.addFunc("DreheWegVonObjekt", function (objekt) {
    if (!(typeof objekt == "object") || !("getPos" in objekt)) {
      API.message("Die Funktion 'DreheWegVonObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
      return;
    }
    API.curAnt.addTurnAway(objekt)
  })

  API.addFunc("GeheZuZiel", function (ziel, sense)  {
    if (arguments.length < 1)
      return API.message("Die Funktion 'GeheZuZiel(ziel)' wurde ohne Argument aufgerufen");
    if (ziel.constructor.name == "Sugar")
      return API.curAnt.addGotoJob(ziel, Sim.sugars, "Zucker", sense);
    if (ziel.constructor.name == "Hill")
      return API.curAnt.gotoHome(sense);
    if (ziel.constructor.name == "Apple")
      return API.curAnt.addGotoJob(ziel, Sim.apples, "Apfel", sense);
    if (ziel.constructor.name == "Position")
      return API.curAnt.addGotoJob(ziel, undefined, "Position", sense);
     API.message("Die Funktion 'GeheZuZiel(ziel)' konnte das unbekannte Ziel nicht anvisieren.");
  });

  // back compat
  API.addFunc("BestimmeEntfernung", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'BestimmeEntfernung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
      return;
    }
    return Math.round(Sim.Util.dist(a.getPos(), b.getPos()));
  });

  API.addFunc("Distanz", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'Dist(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
      return;
    }
    return Math.round(Sim.Util.dist(a.getPos(), b.getPos()));
  });

  // back compat
  API.addFunc("BestimmeRichtung", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'BestimmeRichtung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
      return;
    }
    return Math.round(Sim.Util.getDir(a.getPos(), b.getPos()));
  });

  API.addFunc("Winkel", function (a, b) {
    if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
      API.message("Die Funktion 'BestimmeRichtung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
      return;
    }
    return Math.round(Sim.Util.getDir(a.getPos(), b.getPos()));
  });

  API.addFunc("NimmZucker", function (zucker) {
    API.curAnt.addTakeJob(zucker);
  })

  API.addFunc("LadeZuckerAb", function() {
    API.curAnt.addDropJob();
  });

  API.addFunc("TrageApfel", function () {
    API.curAnt.addAppleSetupJob();
  });
  
  API.addFunc("SetzeGift", function() {
    API.curAnt.addPoisonJob()
  })

  API.addFunc("FühreAus", function (funktion) {
    if (typeof funktion != "function") {
      API.message("Die Funktion 'FühreAus(funktion)' erwartet als Argument eine Funktion.");
      return;
    }
    API.curAnt.addCustomJob(funktion);
  })

  API.addFunc("SendeNachricht", function(betreff, wert) {
    return API.curAnt.addSendMemoryJob(betreff);
    // ok, jetzt wird gerockt!!!
  });

  API.addFunc("Zufallsname", function() {
    var parts = "bcdfghjklmnpqrstvwxyz";
    var consonants = parts.split("")
    var vocals = ['a', 'e', 'i', 'o', 'u', 'ei', 'au']
    var name = '';
    var length = Sim.rng()*3 + 1;
    for (var i = 0; i < length; i++) {
      name += consonants[Math.floor(Sim.rng()*consonants.length)]
      name += vocals[Math.floor(Sim.rng()*vocals.length)]
    }
    return Sim.Util.capitalize(name);
  });

  window.OFFEN = true

  API.antProp('AktuellesZiel', function(){
    return API.curAnt.getDestination();
  });

  API.antProp('Untätig', function(){
    return API.curAnt.getJobs().length == 0;
  });

  API.antProp('IstOffen', function(){
    return API.curAnt.isSensing()
  });

  API.antProp('AktuelleLast', function(){
    return API.curAnt.getLoad();
  });

  // back compat
  API.antProp('AktuelleReichweite', function(){
    return Sim.Opts.AmeisenReichweite - API.curAnt.getLap();
  });
  
  API.antProp('Reichweite', function(){
    return Sim.Opts.AmeisenReichweite - API.curAnt.getLap();
  });

  API.antProp('Blickrichtung', function(){
    return API.curAnt.getHeading();
  });
  
  // back compat
  API.antProp('HeimatBau', function(){
    return API.pushObj(Sim.hills[API.curAnt.getPlayerid()]);
  });

  API.antProp('Bau', function(){
    return API.pushObj(Sim.hills[API.curAnt.getPlayerid()]);
  });

  API.antProp('TrägtApfel', function(){
    var jobs = API.curAnt.getJobs();
    if (jobs.length > 0) {
      var curJob = jobs[jobs.length - 1];
      if (curJob.type == "APPLE" && Sim.apples.indexOf(curJob.value) >= 0) {
        return true
      }
    }
    return false;
  });

  // back compat
  API.antProp('AktuellePosition', function(){
    return API.pushObj(new Sim.Position(API.curAnt.getPos()), true);
  });

  API.antProp('Position', function(){
    return API.pushObj(new Sim.Position(API.curAnt.getPos()), true);
  });

  // back compat
  API.antProp('AktuelleRunde', function(){
    return Sim.cycles
  });

  API.antProp('Runde', function(){
    return Sim.cycles
  });

  API.antProp('Gedächtnis', function(){
    return API.curAnt.getMemory();
  });

  var env = {}

  Object.defineProperty(env, "ZuckerPosition", {
    get: function() {
      var sugar = Sim.Util.closest(API.curAnt.getPos(), Sim.sugars, Sim.Opts.AmeiseSichtweite)
      return sugar ? API.pushObj(new Sim.Position(sugar.getPos()), true) : undefined
    },
    set: function() {}
  })

  Object.defineProperty(env, "ApfelPosition", {
    get: function() {
      var apple = Sim.Util.closest(API.curAnt.getPos(), Sim.apples, Sim.Opts.AmeiseSichtweite)
      if (apple && !apple.needHelp(API.curAnt))
        return undefined
      return apple ? API.pushObj(new Sim.Position(apple.getPos()), true) : undefined
    },
    set: function() {}
  })

  Object.defineProperty(env, "WanzePosition", {
    get: function() {
      var bug = Sim.Util.closest(API.curAnt.getPos(), Sim.bugs, Sim.Opts.AmeiseSichtweite)
      return bug ? API.pushObj(new Sim.Position(bug.getPos()), true) : undefined
    },
    set: function() {}
  })

  API.antProp('Umgebung', function(){
    return env
  })

})(AntIT._rawsim)
