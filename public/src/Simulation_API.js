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
    return Math.floor(Math.random() * a);
  } else {
    if (typeof a !== "number" || typeof b!== "number") {
      API.message("Die Funktion 'Zufallszahl(min, max)' erwartet als Argument Zahlen.");
      return;
    }
    if (a >= b) {
      API.message("Die Funktion 'Zufallszahl(min, max)' erwartet, dass min < max ist.");
      return;
    }
    return Math.floor(Math.random() * (b - a) + a);
  }
})

API.addFunc("Stehe", function (runden) {
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
  var angle = getDir(API.curAnt.getPos(), objekt.getPos());
  API.curAnt.addTurnToJob(angle);
})

API.addFunc("DreheWegVonObjekt", function (objekt) {
  if (!(typeof objekt == "object") || !("getPos" in objekt)) {
    API.message("Die Funktion 'DreheWegVonObjekt(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
    return;
  }
  var angle = (getDir(API.curAnt.getPos(), objekt.getPos()) + 180) % 360;
  API.curAnt.addTurnToJob(angle);
})

API.addFunc("GeheZuZiel", function (ziel, sense)  {
  if (arguments.length != 1)
    return API.message("Die Funktion 'GeheZuZiel(ziel)' wurde ohne Argument aufgerufen");
  if (ziel.constructor.name == "Sugar")
    return API.curAnt.addGotoJob(ziel, Sim.sugars, "Zucker", sense);
  if (ziel.constructor.name == "Hill")
    return API.curAnt.addGotoJob(ziel, Sim.hills, "Bau", sense);
  if (ziel.constructor.name == "Apple")
    return API.curAnt.addGotoJob(ziel, Sim.apples, "Apfel", sense);
  if (ziel.constructor.name == "Position")
    return API.curAnt.gotoHome(sense);
   API.message("Die Funktion 'GeheZuZiel(ziel)' konnte das unbekannte Ziel nicht anvisieren.");
});

API.addFunc("BestimmeEntfernung", function (a, b) {
  if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
    API.message("Die Funktion 'BestimmeEntfernung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
    return;
  }
  return Math.round(dist(a.getPos(), b.getPos()));
});

API.addFunc("BestimmeRichtung", function (a, b) {
  if (!(typeof a == "object") || !("getPos" in a) || !(typeof b == "object") || !("getPos" in b)) {
    API.message("Die Funktion 'BestimmeRichtung(a, b)' konnte für die übergebenen Objekte keine Position bestimmen.");
    return;
  }
  return Math.round(getDir(a.getPos(), b.getPos()));
});

API.addFunc("Nimm", function (zucker) {
  if (!zucker || zucker.constructor.name !== "Sugar") {
    API.message("Die Funktion 'Nimm(zucker)' erwartet als Argument einen Zuckerobjekt.");
    return;
  }
  API.curAnt.addTakeJob(zucker);
})

API.addFunc("LadeZuckerAb", function() {
  API.curAnt.addDropJob();
});

API.addFunc("BrauchtNochTräger", function (apfel) {
  if (!apfel || apfel.constructor.name !== "Apple") {
    API.message("Die Funktion 'BrauchtNochTräger(apfel)' erwartet als Argument einen Apfelobjekt.");
    return;
  }
  return apfel.needHelp(API.curAnt);
})

API.addFunc("BringeApfelZuBau", function () {
  API.curAnt.addAppleJob();
});

API.addFunc("RiecheNachZucker", function () {
  var sugar = closest(API.curAnt.getPos(), Sim.sugars, Optionen.AmeiseSichtweite);
  if (sugar)
    return API.pushObj(sugar);
  else
    return undefined;
});

API.addFunc("RiecheNachApfel", function () {
  var apple = closest(API.curAnt.getPos(), Sim.apples, Optionen.AmeiseSichtweite);
  if (apple)
    return API.pushObj(apple);
  else
    return undefined;
});

API.addFunc("RiecheNachWanze", function () {
  var bug = closest(API.curAnt.getPos(), Sim.bugs, Optionen.AmeiseSichtweite);
  if (bug)
    return API.pushObj(bug);
  else
    return undefined;
});

API.addFunc("FühreAus", function (funktion) {
  if (typeof funktion != "function") {
    API.message("Die Funktion 'FühreAus(funktion)' erwartet als Argument eine Funktion.");
    return;
  }
  API.curAnt.addCustomJob(funktion);
})

API.addFunc("SendeNachricht", function(betreff, wert) {
  return API.curAnt.addSendMemoryJob(betreff);
});

API.addFunc("Zufallsname", function() {
  var parts = "bcdfghjklmnpqrstvwxyz";
  var consonants = parts.split("")
  var vocals = ['a', 'e', 'i', 'o', 'u', 'ei', 'au']
  var name = '';
  var length = Math.random()*3 + 1;
  for (var i = 0; i < length; i++) {
    name += consonants[Math.floor(Math.random()*consonants.length)]
    name += vocals[Math.floor(Math.random()*vocals.length)]
  }
  return capitalize(name);
});

Global.ZUCKER = SUGAR;
Global.BAU = HILL;
Global.APFEL = APPLE;
Global.POSITION = POSITION;

API.antProp('AktuellesZiel', function(){
  return API.curAnt.getDestination();
});

API.antProp('Untätig', function(){
  return API.curAnt.getJobs().length == 0;
});

API.antProp('AktuelleEnergie', function(){
  return API.curAnt.getEnergy();
});

API.antProp('AktuelleLast', function(){
  return API.curAnt.getLoad();
});

API.antProp('AktuelleReichweite', function(){
  return Optionen.AmeisenReichweite - API.curAnt.getLap();
});

API.antProp('Blickrichtung', function(){
  return API.curAnt.getHeading();
});

API.antProp('HeimatBau', function(){
  return API.pushObj(Sim.hills[API.curAnt.getPlayerid()]);
});

API.antProp('GetragenerApfel', function(){
  var jobs = API.curAnt.getJobs();
  if (jobs.length > 0) {
    var curJob = jobs[jobs.length - 1];
    if (curJob.type == "APPLE") {
      return API.pushObj(curJob.value);
    }
  }
  return undefined;
});

API.antProp('AktuellePosition', function(){
  return API.pushObj(new Position(API.curAnt.getPos()));
});

API.antProp('Gedächtnis', function(){
  return API.curAnt.getMemory();
});
  
AntMe.NeueAmeise = function (name) {
  var newAnt = {Name:name};
  if (API.ants.length < Optionen.MaximaleSpieler) {
    API.ants.push(newAnt);
  }
  return newAnt;
}

AntMe._abortSimulation = function () {
  var error =  document.createElement("DIV");
  error.innerHTML = "Simulationsfehler";
  error.style.color = "red";
  error.style.marginTop = "20px";
  error.style.marginLeft = "50px";
  error.style.fontWeight = "bold";
  document.getElementById("hud").appendChild(error);
  throw "Simulationsfehler";
}

if (Optionen.EntwicklerModus) {
  AntMe.Sim = Sim;
  AntMe.Vw = Vw;
  AntMe.Optionen = Optionen;
}
