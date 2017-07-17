// encapsulate our project

(function () {

"use strict";
  
var Vw = AntJS._vw;
var Optionen = AntJS._optionen;
var Global = window;
var Am = AntJS;

// Helper functions

function dist(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function closest(pos, objs, range) {
  var best = Infinity;
  var bestobj = undefined;
  objs.forEach(function(obj) {
    var d = dist(obj.getPos(), pos);
    if (d < best) {
      bestobj = obj;
      best = d;
    }
  });
  if (best <= range) {
    return bestobj;
  }
  return undefined;
}

function getDir(pos, des) {
  var d = dist(pos, des);
  var dx = des.x - pos.x;
  var angle = 0;
  if (des.y < pos.y) {
    angle = (360-Math.acos(dx/d)/Math.PI*180.0)%360;
  } else {
    angle = (Math.acos(dx/d)/Math.PI*180.0)%360;
  }
  return Math.round(angle);
}

function getRotation(heading, angle) {
  var rotation = angle - (heading%360);
  if (rotation > 180) {
    rotation -= 360;
  }
  if (rotation < -180) {
    rotation += 360;
  }
  return rotation;
}

function moveDir(pos, heading, dist) {
  return {
    x:pos.x + dist*Math.cos(heading/180*Math.PI),
    y:pos.y + dist*Math.sin(heading/180*Math.PI)
  };
}

function removeIf(arr, f) {
  var i = arr.length;
  while (i--) {
      if (f(arr[i], i)) {
          arr.splice(i, 1);
      }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function makeAttributes(obj, opts) {
  var output = {}
  for (var k in opts) {
    output[k] = opts[k]
    obj['get' + capitalize(k)] = makeGetter(output, k)
  }
  return output
}

function makeGetter(output, key) {
  return function(){
    return output[key]
  }
}
// Constants

var SUGAR = "Zucker";
var HILL = "Bau";
var APPLE = "Apfel";
var POSITION = "Position";
// PLAYER 
  
function Player(id, KI) {

  var my = makeAttributes(this, {
    id: id,
    KI: KI,
    points: 0
  })
  
  var collectedSugar = 0;
  var ants = 0;
  var collectedApples = 0;
  var deadants = 0;
  var pointsE = document.createElement("DIV");
  var details = document.createElement("DIV");
  
  function initHTML() {
    var para = document.createElement("DIV");
    var nameE =document.createElement("DIV");
    nameE.innerHTML = my.KI.Name;
    nameE.style.minWidth = "180px";
    para.appendChild(nameE);
    para.style.display = "flex";
    para.style.fontWeight = "bold";
    var hex = Optionen.SpielerFarben[my.id];
    var hexS = hex.toString(16);
    while (hexS.length < 6)
      hexS = "0" + hexS;
    para.style.color = "#" + hexS;
    pointsE.id = "player" + my.id;
    pointsE.style.marginLeft = "10px";
    para.appendChild(pointsE);
    details.style.fontWeight = "normal";
    details.style.color = "black";
    details.style.marginLeft = "20px";
    para.appendChild(details);
    document.getElementById("hud").appendChild(para);
  }
  
  function updateDetails(){
    details.innerHTML = "(Ameisen: " + ants + " / Tote: " + deadants + 
      " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")";
  }
  
  this.addSugar = function(amount) {
    collectedSugar += amount;
    updateDetails();
  }
  
  this.addApple = function() {
    collectedApples++;
    updateDetails();
  }
  
  this.addAnt = function(){
    ants++;
    updateDetails();
  }
  
  this.subAnt = function(){
    ants--;
    deadants++;
    updateDetails();
  }
  
  this.addPoints = function(amount) {
    my.points = Math.max(0, my.points + amount);
    pointsE.innerHTML = my.points + " Punkte";
  }
  
  // constructor
  initHTML();
  updateDetails();
  this.addPoints(0);
}
// PLAYGROUND

function Playground(width, height) {

  var my = makeAttributes(this, {width:width, height:height})
  
  var timeToNextFeed = 30;
  var timeToNextBug = Optionen.WanzenWartezeit;
  
  function getFoodInRange(h, range) {
    var appleCount = 0;
    var sugarCount = 0;
    Sim.apples.forEach(function(a){
      if (dist(a.getPos(), h.getPos()) < range) {
        appleCount++;
      }
    })
    Sim.sugars.forEach(function(s){
      if (dist(s.getPos(), h.getPos()) < range) {
        sugarCount++;
      }
    })
    return {apples:appleCount, sugars:sugarCount};
  }
  
  this.randomPos = function() {
    return {
      x:Math.random()*my.width,
      y:Math.random()*my.height};
  }
  
  this.isInBound = function(pos, margin) {
    if (margin == undefined)
      margin = 0;
    if (pos.x < margin || pos.y < margin)
        return false;
    if (my.width - pos.x < margin || my.height - pos.y < margin)
      return false;
    return true;
  }
  
  this.toViewPos = function(pos, h){
    if (h === undefined) {
      h = 0;
    }
    return new THREE.Vector3(
      pos.x - my.width / 2.0,
      h,
      pos.y - my.height / 2.0);
  }
  
  this.getHillPos = function() {
    var topW = my.width - Optionen.EckenAbstand*2;
    var leftH = my.height - Optionen.EckenAbstand * 2;     
    var pos = {};
    var limit = 100;
    while(limit-- > 0) {
      pos.x = Math.random()*(topW+leftH);
      pos.y = Math.random()*Optionen.HügelStreifenBreite * 2;
      if (pos.x < topW) {
        if (pos.y >= Optionen.HügelStreifenBreite) {
          pos.y += (my.height - Optionen.HügelStreifenBreite*2 - Optionen.HügelRandAbstand*2);
        } 
        pos.x += Optionen.EckenAbstand;
        pos.y += Optionen.HügelRandAbstand;
      } else {
        var t = pos.y;
        pos.y = pos.x - topW;
        pos.x = t;
        if (pos.x >= Optionen.HügelStreifenBreite) {
          pos.x += (my.width - Optionen.HügelStreifenBreite * 2 - Optionen.HügelRandAbstand * 2);
        }
        pos.x += Optionen.HügelRandAbstand;
        pos.y += Optionen.EckenAbstand;
      }
      var isGood = true;
      for(var i = 0; i < Sim.hills.length; i++) {
        if (dist(Sim.hills[i].getPos(), pos) < Optionen.HügelAbstand) {
          isGood = false;
        }
      }
      if (!isGood) continue;
      return pos;
    }
    return pos;
  }
  
  this.update = function() {
    if (timeToNextFeed-- <= 0) {
      timeToNextFeed = Optionen.NahrungsWartezeit;
      var feedHills = [];
      Sim.hills.forEach(function(h){
        var counts = getFoodInRange(h, Optionen.NahrungMaximalEntfernung);
        if (counts.apples < 1 || counts.sugars < 2 || (counts.apples <= 2 && counts.sugars <= 3))
          feedHills.push(h);
      });
      for (var i = 0; i < feedHills.length; i++) {
        feedHills.sort(function(a,b){
          if (a.getFeedIndex() == b.getFeedIndex())
            return Math.random() >= 0.5 ? 1 : -1;
          return a.getFeedIndex() > b.getFeedIndex() ? 1 : -1;
        })
        var curHill = feedHills[0];
        
        var counts = getFoodInRange(curHill, Optionen.NahrungMaximalEntfernung);
        var type = "sugar";
        if (counts.sugars == counts.apples) {
          if (Math.random() > 0.7)
            type = "apple";
        } else {
          if (counts.sugars > counts.apples * 2)
            type = "apple";
        }     
        
        var counter = 100;
        while(counter-- > 0) {
          var randAngle = Math.random()*360;
          var minD = Optionen.NahrungMindestEntfernung;
          var randDist = Math.random()*(Optionen.NahrungMaximalEntfernung - minD) + minD;
          var pos = moveDir(curHill.getPos(), randAngle, randDist);
          if (!Sim.playground.isInBound(pos, 30))
            continue;
            
          // check collision
          var closestHill = closest(pos, Sim.hills, minD)
          if (closestHill !== undefined)
            continue;
          var closestApple = closest(pos, Sim.apples, Optionen.NahrungAbstand)
          if (closestApple !== undefined)
            continue;
          var closestSugar = closest(pos, Sim.sugars, Optionen.NahrungAbstand)
          if (closestSugar !== undefined)
            continue;
          
          if (type == "apple") {
            Sim.apples.push(new Apple(pos));
          } else {
            Sim.sugars.push(new Sugar(pos));
          }
          
          var affectedHills = [];
          Sim.hills.forEach(function(h){
            if (dist(pos, h.getPos()) < Optionen.NahrungMaximalEntfernung) {
              affectedHills.push(h);
            }
          })
          affectedHills.forEach(function(h){
            var f = 1 / affectedHills.length;
            f *= (2000 - dist(h.getPos(), pos)) / 2000;
            if (type == "apple") {
              h.addFeed(f * Optionen.EnergieProApfel);
            } else {
              h.addFeed(f * Optionen.EnergieProZucker * Optionen.ZuckerGröße);
            }              
          })
          break;
        }
      }
    }
        
    var maximalBugs = (Sim.playerCount() + 1) * Optionen.WanzenProSpieler;
    if (timeToNextBug-- <= 0 && Sim.bugs.length < maximalBugs) {
      timeToNextBug = Optionen.WanzenWartezeit;
      Sim.bugs.push(new Bug(this.randomPos()));
    }
    
    removeIf(Sim.sugars, function(sugar){
      if (sugar.getAmount() <= 0) {
        return true;
      }
      return false;
    })
    
    removeIf(Sim.apples, function(apple){
      return apple.reachedHome()
    });
    
    removeIf(Sim.ants, function(ant) {
      var reason = undefined
      if (ant.getLap() > Optionen.AmeisenReichweite) {
        reason = "Müdigkeit"
      } else if (ant.getEnergy() <= 0) {
        reason = "Wanze"
      }
      if (reason) {
        API.setAnt(ant)
        API.callUserFunc("IstGestorben", [reason])
        API.close()
        ant.die()
        return true
      }
      return false;
    })
  }
  
  // constructor
  Vw.gamefloor.geometry = new THREE.PlaneGeometry(my.width, my.height, 1, 1);
  Vw.gamefloor.geometry.verticesNeedUpdate = true;
  Vw.setControlsBounds(my.width/2, my.height/2);
}
// HILL

function Hill(pos, playerid) {

  Hill.counter = Hill.counter || 1;
  Hill.markerCounter = Hill.markerCounter || 1
  
  var my = makeAttributes(this, {
    pos: pos,
    playerid: playerid,
    energy: Optionen.AnfangsEnergie,
    feedIndex: 0,
    timeToNextAnt: Optionen.AmeiseWartezeit
  })
  
  var key = Hill.counter++
  var markers = []
  
  function updateGO() {
    Vw.hillStore.get(key).position.copy(Sim.playground.toViewPos(my.pos));
  }
  
  function setFlagColor() {
    Vw.setHillFlagColor(Vw.hillStore.get(key), Optionen.SpielerFarben[my.playerid]);
  }
  
  this.addMarker = function() {
    var key = Hill.markerCounter++
    var marker = Vw.markerStore.get(key)
    Vw.setMarkerColor(marker, Optionen.SpielerFarben[my.playerid])
    marker.position.copy(Sim.playground.toViewPos(my.pos))
    var s = Optionen.MarkerGröße
    marker.scale.set(s, s, s)
    marker.material.opacity = Optionen.MarkerDurchsichtigkeit
    marker.material.needsUpdate = true
    markers.push({
      key: key,
      cycle: 0
    })
  }
  
  this.addEnergy = function(val) {
    my.energy += val;
  }
  
  this.addFeed = function(val) {
    my.feedIndex += val;
  }
  
  this.update = function() {
    var ownAnts = 0;
    Sim.ants.forEach(function(ant) {
      if (ant.getPlayerid() == my.playerid)
        ownAnts++;
    });
    if (my.timeToNextAnt-- <= 0 && ownAnts < Optionen.AmeisenMaximum
          && my.energy >= Optionen.EnergieFürAmeise) {
      my.timeToNextAnt = Optionen.AmeiseWartezeit;
      my.energy -= Optionen.EnergieFürAmeise;
      var antPos = {x:pos.x,y:pos.y};
      var angle = Math.random()*Math.PI*2;
      var radius = Optionen.HügelRadius + (Math.random()*10 - 5);
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      var newAnt = new Ant(antPos, my.playerid)
      Sim.ants.push(newAnt);
      Sim.players[my.playerid].addAnt();
      API.setAnt(newAnt);
      API.callUserFunc("IstGeboren");
      API.close();
    }
    removeIf(markers, function(m){
      var marker = Vw.markerStore.get(m.key)
      m.cycle++
      if (m.cycle >= Optionen.MarkerDauer) {
        Vw.markerStore.remove(m.key)
        return true
      }
      var s = marker.scale.x * Optionen.MarkerVergrößerung
      marker.scale.set(s, s, s)
      marker.material.opacity *= Optionen.MarkerFading
      marker.material.needsUpdate = true
      return false
    })
  }
  
  
  // constructor
  setFlagColor()
  updateGO();
}
// SUGAR

function Sugar(pos) {

  Sugar.counter = Sugar.counter || 1;
  
  var my = makeAttributes(this, {
    pos: pos,
    amount: Optionen.ZuckerGröße
  })
  
  var key = Sugar.counter++
  
  function updateGO() {
    var GO = Vw.sugarStore.get(key);
    GO.position.copy(Sim.playground.toViewPos(my.pos));
    var linScale = my.amount / Optionen.ZuckerGröße * Optionen.ZuckerVergrößerung;
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001);
    GO.scale.set(scale, scale, scale);
  }
  
  this.unload1Sugar = function() {
    if (my.amount > 0) {
      my.amount--;
      updateGO();
      return true;
    } else {
      if (Vw.sugarStore.has(key))
        Vw.sugarStore.remove(key);
      return false;
    }
  }
  
  // constructor
  updateGO();
}
// APPLE

function Apple(pos) {
  
  Apple.counter = Apple.counter || 1;
  
  var my = makeAttributes(this, {pos:pos})
  
  var pid = undefined
  var key = Apple.counter++;
  
  this.ants = [];
  this.dx = 0;
  this.dy = 0;
  this.heading = undefined;
  
  function updateGO() {
    var go = Vw.appleStore.get(key);
    var height = pid!==undefined?5:0;
    go.position.copy(Sim.playground.toViewPos(my.pos, height));
  }
  
  this.addAnt = function(ant) {
    if (this.needHelp(ant)) {
      this.ants.push(ant);
    }
  }
  
  this.needHelp = function(ant) {
    if (pid === undefined) {
      return true;
    } else if (ant.getPlayerid() === pid && this.ants.length < Optionen.MaximumAmeisenFürApfel) {
      return true;
    }
    return false;
  }
  
  this.reachedHome = function() {
    if (pid !== undefined) {
      var d = dist(my.pos, Sim.hills[pid].getPos());
      if (d < 10) {
        Vw.appleStore.remove(key);
        Sim.players[pid].addPoints(Optionen.PunkteProApfel);
        Sim.hills[pid].addEnergy(Optionen.EnergieProApfel);
        Sim.players[pid].addApple();
        return true;
      }
    }
    return false;
  }
  
  this.letDown = function(){
    pid = undefined
    this.heading = undefined
    this.dx = 0
    this.dy = 0
    updateGO()
  }
  
  function removeInactiveAnts() {
    removeIf(this.ants, function(ant){
      if (Sim.ants.indexOf(ant) < 0)
        return true;
      if (dist(my.pos, ant.getPos()) > Optionen.ApfelRadius)
        return true
      var jobs = ant.getJobs();
      if (jobs !== undefined) {
        var curJob = jobs[jobs.length - 1];
        if (curJob.type == "APPLE")
          return false;
      }
      return true;
    });
  }
  
  function decideWinningTeam() {
    if (this.ants.length == 0) {
      this.letDown()
      return
    }
    var antsPerTeam = {}
    var teams = []
    this.ants.forEach(function(ant){
      var id = ant.getPlayerid()
      if (id in antsPerTeam) {
        antsPerTeam[id]++
      } else {
        antsPerTeam[id] = 1
        teams.push(id)
      }
    })
    teams = teams.sort(function(a, b){
      return antsPerTeam[b]-antsPerTeam[a]
    })
    var winnerID = teams[0]
    var winnerCount = antsPerTeam[winnerID]
    if (winnerCount >= Optionen.AmeisenFürApfel) {
      this.ants = this.ants.filter(function(a){
        return a.getPlayerid() == winnerID
      })
      pid = winnerID
    } else {
      this.letDown()
    }
  }
  
  function moveApple() {
    if (pid !== undefined) {
      this.heading = getDir(this.getPos(), Sim.hills[pid].getPos());
      // Geschwindigkeit zwischen 0.2 und 1
      var speed = Optionen.ApfelMinGeschwindigkeit +
        (Optionen.ApfelMaxGeschwindigkeit - Optionen.ApfelMinGeschwindigkeit) *
        (this.ants.length / Optionen.MaximumAmeisenFürApfel);
      this.dx =  speed*Math.cos(this.heading/180*Math.PI);
      this.dy = speed*Math.sin(this.heading/180*Math.PI);
      my.pos.x += this.dx;
      my.pos.y += this.dy;
      updateGO();
      return;
    }
  }
  
  this.update = function() {
    removeInactiveAnts.bind(this)()
    decideWinningTeam.bind(this)()
    moveApple.bind(this)()
  }
  
  // constructor
  updateGO();
}
// BUG

function Bug(pos) {
  
  Bug.counter = Bug.counter || 1;
  
  var my = makeAttributes(this, {pos: pos})
  
  var key = Bug.counter++;
  var heading = Math.floor(Math.random()*360);
  var togo = 0;
  var torotate = 0;
  var towait = 0;
  
  function updateGO() {
    Vw.bugStore.get(key).position.copy(Sim.playground.toViewPos(my.pos));
    Vw.bugStore.get(key).rotation.y = -heading / 180 * Math.PI + Math.PI;
  }
  
  this.update = function() {
    var ant = closest(my.pos, Sim.ants, Optionen.WanzenKampfweite);
    if (ant !== undefined) {
      ant.subEnergy(Optionen.WanzenAngriff, this);
    }
    if (torotate != 0) {
      heading += Math.sign(torotate) * Optionen.WanzeDrehgeschwindigkeit;
      torotate -= Math.sign(torotate);
    } else if (togo > 0) {
      var newpos = moveDir(my.pos, heading, Optionen.WanzeGeschwindigkeit);
      if (!Sim.playground.isInBound(newpos, 10)) {
        torotate = Math.round(180 / Optionen.WanzeDrehgeschwindigkeit);
        togo = 0;
      } else {
        my.pos = newpos;
      }
      togo--;
    } else if (towait != 0){
      towait--;
    } else {
      towait = 30;
      torotate = Math.floor(Math.random()*40-20);
      togo = 60;
      var destHill = closest(my.pos, Sim.hills, Optionen.WanzenHügelAbstand);
      if (destHill !== undefined) {
        var angle = getDir(my.pos, destHill.getPos()) + 180;
        torotate = Math.round(getRotation(heading, angle)/Optionen.WanzeDrehgeschwindigkeit);
      } else {
        ant = closest(my.pos, Sim.ants, Optionen.WanzeSichtweite);
        if (ant!= undefined) {
          var dir = getDir(my.pos, ant.getPos());
          var rot = getRotation(heading, dir);
          torotate = Math.round(rot/Optionen.WanzeDrehgeschwindigkeit);
        }
      }
    }
    updateGO();
  }
  
  // constructor
  updateGO();
}
// ANT

function Ant(pos, playerid) {
  
  Ant.counter = Ant.counter || 1;
  
  // attributes
  var my = makeAttributes(this, {
    pos: pos,
    playerid: playerid,
    key: playerid + ":" + Ant.counter++,
    heading: Math.floor(Math.random()*360),
    load: 0,
    jobs: [],
    insertionPoint: 0,
    lap: 0,
    energy: Optionen.AmeisenEnergie,
    previousBug: undefined,
    memory:{}
  })
  
  // helper
  function myPlayer() {
    return Sim.players[my.playerid]
  }
  
  function myHill() {
    return Sim.hills[my.playerid]
  }
  
  // movement
  this.setPos = function(newpos) {
    my.lap += dist(my.pos, newpos);
    my.pos.x = newpos.x;
    my.pos.y = newpos.y;
    updateGO();
  }
  
  this.turn = function(degree) {
    my.heading += Math.round(degree);
    my.heading %= 360;
    while (my.heading < 0)
      my.heading += 360;
    my.heading = Math.round(my.heading);
    updateGO();
  }
  
  // life
  this.subEnergy = function(val, obj) {
    my.energy -= val;
  }
  
  this.die = function() {
    removeGO()
    myPlayer().subAnt();
  }
  
  function reachedHome() {
    my.lap = 0;
  }
  
  function addSugar(load) {
    myPlayer().addPoints(load*Optionen.PunkteProZucker);
    myHill().addEnergy(load*Optionen.EnergieProZucker);
    myPlayer().addSugar(load);
  }
  
  // visuals
  function setColor() {
    Vw.setAntBodyColor(Vw.antStore.get(my.key), Optionen.SpielerFarben[my.playerid]);
  }
  
  function updateGO() {
    var antBody = Vw.antStore.get(my.key)
    antBody.position.copy(Sim.playground.toViewPos(my.pos));
    antBody.rotation.y = -my.heading / 180 * Math.PI + Math.PI;
    if (my.load > 0) {
      var sugarBox = Vw.sugarBoxStore.get(my.key);
      sugarBox.position.copy(Sim.playground.toViewPos(my.pos, Optionen.ZuckerStückchenHöhe));
    } else if (Vw.sugarBoxStore.has(my.key)) {
      Vw.sugarBoxStore.remove(my.key);
    }
  }
  
  function removeGO() {
    Vw.antStore.remove(my.key);
    if (Vw.sugarBoxStore.has(my.key))
      Vw.sugarBoxStore.remove(my.key);
  }
  
  // jobs - general
  this.addJob = function(name, val, cb) {
    if (my.jobs.length > Optionen.JobLimit) {
      API.message("Warteschlange der Ameise ist vollgelaufen!")
    }
    my.jobs.splice(my.insertionPoint, 0, new Job(name, val, cb));
  }
  
  this.addSimpleJob = function(f, val) {
    this.addJob("SIMPLE", val, function(){
      f.apply(this)
      return true
    })
  }
  
  function removeOldJobs() {
    my.jobs.splice(0, my.insertionPoint);
    my.insertionPoint = 0;
  }
  
  this.refreshInsertionPoint = function() {
    my.insertionPoint = my.jobs.length;
  }
  
  // jobs - basic movement
  this.addGoJob = function(steps, auto) {
    this.addJob("GO", auto, function(){
      var toMove = 0;
      var finished = false;
      var curSpeed = Optionen.AmeiseGeschwindigkeit;
      if (my.load > 0)
          curSpeed *= Optionen.ZuckerVerlangsamung;
      if (steps < curSpeed) {
        finished = true;
        toMove = steps;
      } else {
        toMove = curSpeed;
        steps -= curSpeed;
      }
      var oldx = my.pos.x;
      var oldy = my.pos.y;
      var newpos = moveDir(my.pos, my.heading, toMove);
      if (Sim.playground.isInBound(newpos, Optionen.Toleranz)) {
        this.setPos(newpos);
      } else {
        finished = true;
        API.callUserFunc("RandErreicht");
      }
      return finished;
    })
  }
  
  this.addTurnJob = function(degree, auto) {
    this.addJob("TURN", auto, function(){
      var toTurn = 0;
      var finished = false;
      if (Math.abs(degree) < Optionen.AmeiseDrehgeschwindigkeit) {
        finished = true;
        toTurn = degree;
      } else {
        toTurn = Optionen.AmeiseDrehgeschwindigkeit * Math.sign(degree);
        degree -= Optionen.AmeiseDrehgeschwindigkeit * Math.sign(degree);
      }
      this.turn(toTurn);
      return finished;
    })
  }
  
  // jobs - utils
  this.addTurnToJob = function(angle) {
    this.addSimpleJob(function(){
      var rotation = getRotation(my.heading, angle)
      if (rotation != 0)
        this.addTurnJob(rotation)
    })
  }
  
  this.addTurnToObj = function(obj) {
    this.addSimpleJob(function(){
      var angle = getDir(API.curAnt.getPos(), obj.getPos());
      API.curAnt.addTurnToJob(angle);
    })
  }
  
  this.addTurnAway = function(obj) {
    this.addSimpleJob(function(){
      var angle = (getDir(API.curAnt.getPos(), obj.getPos()) + 180) % 360;
      API.curAnt.addTurnToJob(angle);
    })
  }
  
  this.addWaitJob = function(rounds) {
    this.addJob("WAIT", undefined, function(){
      return rounds-- <= 0
    })
  }
  
  this.addStopJob = function() {
    this.addSimpleJob(function(){
      my.jobs = [];
      my.insertionPoint = 0;
    })
  }
  
  this.addCustomJob = function(f) {
    this.addJob("CUSTOM", undefined, function(){
      this.refreshInsertionPoint()
      var ret = f.apply(API.pushObj(API.curAnt));
      if (ret !== undefined)
        return ret;
      return true;
    })
  }
  
  // jobs - food
  this.addTakeJob = function() {
    this.addSimpleJob(function(){
      var sugar = closest(my.pos, Sim.sugars, Optionen.ZuckerRadius)
      if (!sugar)
        return true
      while(my.load < Optionen.AmeiseTragkraft) {
        var t = sugar.unload1Sugar();
        if (t) {
          my.load++;
        } else {
          break;
        }
      }
      updateGO();
    })
  }
  
  this.addDropJob = function() {
    this.addSimpleJob(function(){
      var d = dist(my.pos, myHill().getPos())
      if (d <= Optionen.HügelRadius) {
        addSugar(my.load)
      }
      my.load = 0;
      updateGO();
    })
  }
  
  this.addAppleSetupJob = function() {
    this.addSimpleJob(function(){
      var apple = closest(my.pos, Sim.apples, Optionen.ApfelRadius)
      if (apple && apple.needHelp(API.curAnt)) {
        apple.addAnt(API.curAnt)
        this.addAppleJob(apple)
      }
    }, "APPLESETUP")
  }
  
  this.addAppleJob = function(apple) {
    this.addJob("APPLE", apple, function(){
      if (Sim.apples.indexOf(apple) < 0)
        return true
      if (apple.ants.indexOf(this) < 0)
        return true
      if (apple.heading !== undefined)
        my.heading = apple.heading
      this.setPos({x:my.pos.x + apple.dx, y:my.pos.y + apple.dy});
      return false;
    })
  }
  
  // jobs - communication
  this.addSendMemoryJob = function(topic) {
    this.addJob("SEND", undefined, function() {
      if (dist(my.pos, myHill().getPos()) < Optionen.HügelRadius) {
        myHill().addMarker()
        var curAnts = [];
        Sim.ants.forEach(function (ant) {
          if (ant.getPlayerid() != my.playerid)
            return;
          if (dist(ant.getPos(), myHill().getPos()) < Optionen.AmeiseSichtweite)
            curAnts.push(ant);
        });
        curAnts.forEach(function (ant) {
          if (ant == API.curAnt || !ant.isSensing())
            return
          var bkup = API.curAnt;
          if (bkup !== undefined)
            API.close();
          API.setAnt(ant);
          API.callUserFunc("EmpfängtNachricht", [bkup.getMemory(), topic], true);
          API.close();
          if (bkup !== undefined)
            API.setAnt(bkup);
        })
      }
      return true;
    })
  }
  
  // jobs - aiming
  this.addGotoJob = function(destination, col, type, senses) {
    removeOldJobs()
    this.addJob("DEST", [destination, senses], function(){
      if (col !== undefined) {
        if (col.indexOf(destination) < 0)
          return true
      }
      var snap = Optionen.Toleranz
      if (type == "Apfel") {
        snap = Optionen.ApfelRadius / 3
        if (!destination.needHelp(API.curAnt))
          return true
      }
      var des = destination.getPos()
      var d = dist(my.pos, des)
      if (d <= snap){
        API.callUserFunc(type + "Erreicht");
        if (type == "Bau")
          reachedHome()
        return true;
      } else {
        var angle = getDir(my.pos, des);
        var rotation = getRotation(my.heading, angle);
        var v = Optionen.ZufallRichtungsVerschiebung;
        rotation += Math.floor(Math.random()*v*2-v);
        if (rotation != 0)
          this.addTurnJob(rotation, true);
        this.addGoJob(Math.min(50, d), true);
        return false;
      }
    })
  }
  
  this.gotoHome = function(sense){
    for (var i = my.jobs.length - 1; i >= 0; i--) {
      var cur = my.jobs[i]
      if (cur.type != "GO" && cur.type != "TURN" && cur.type != "DEST")
        break
      if (cur.value === true)
        continue
      if (cur.type == "DEST" && cur.value[0].constructor.name == "Hill")
        return
    }
    this.addGotoJob(myHill(), Sim.hills, "Bau", sense)
  }
  
  // jobs - sensing
  this.isSensing = function() {
    var sensing = true
    for (var i = my.jobs.length - 1; i >= 0; i--) {
      var curCmd = my.jobs[i]
      if (curCmd.type == "DEST") {
        if (curCmd.value[1] !== true)
          sensing = false
        break
      }
      if (curCmd.type == "APPLE" || curCmd.value == "APPLESETUP") {
        sensing = false
        break
      }
    }
    return sensing
  }
  
  this.getDestination = function() {
    var destination = undefined;
    var jobs = API.curAnt.getJobs();
    if (jobs.length > 0) {
      var index = jobs.length - 1;
      var curCmd = jobs[index];
      while(index > 0 && curCmd.type != "DEST") {
        curCmd = jobs[--index];
      }
      if (curCmd.type == "DEST") {
        if (curCmd.value[0].constructor.name == "Sugar") {
          destination = SUGAR;
        } else if (curCmd.value[0].constructor.name == "Hill") {
          destination = HILL;
        } else if (curCmd.value[0].constructor.name == "Apple") {
          destination = APPLE;
        } else if (curCmd.value[0].constructor.name == "Position") {
          destination = POSITION;
        }
      }
    }
    return destination;
  }
  
  // event loop
  function execJob() {
    this.refreshInsertionPoint()
    if (my.jobs.length > 0) {
      var curJob = my.jobs[my.jobs.length - 1];
      var finished = curJob.callback.bind(this)();
      if (finished) {
        var index = my.jobs.indexOf(curJob);
        if (index >= 0) {
          my.jobs.splice(index, 1);
          if (my.insertionPoint > index) {
            my.insertionPoint--
          }
        }
      }
    }
  }
  
  function validateMemory() {
    for (var property in my.memory) {
      if (my.memory.hasOwnProperty(property)) {
        var cur = my.memory[property]
        if (typeof cur == "object" && cur.get) {
          var obj = cur.get(Sim);
          if (obj !== undefined) {
            if (obj.constructor.name == "Apple" || obj.constructor.name == "Sugar" ||
                obj.constructor.name == "Bug" || obj.constructor.name == "Hill") {
              //API.message("Das Gedächtnis kann als Wert kein Sichtungsobjekt speichern.");
              my.memory[property] = API.pushObj(new Position(obj.getPos()), true)
            }
          }
        }
      }
    }
  }
  
  function senseSugar() {
    if (!this.isSensing()) return
    var sugar = closest(my.pos, Sim.sugars, Optionen.AmeiseSichtweite);
    if (sugar != undefined) {
      API.callUserFunc("SiehtZucker", [sugar]);
    }
  }
  
  function senseApple() {
    if (!this.isSensing()) return
    var apple = closest(my.pos, Sim.apples, Optionen.AmeiseSichtweite);
    if (apple != undefined && apple.needHelp(API.curAnt)) {
      API.callUserFunc("SiehtApfel", [apple]);
    }
  }
  
  function senseBug() {
    var bug = closest(my.pos, Sim.bugs, Optionen.AmeiseSichtweite);
    if (bug) {
      if (bug != my.previousBug) {
        API.callUserFunc("SiehtWanze", [bug]);
        my.previousBug = bug;
      }
    } else {
      my.previousBug = undefined;
    }
  }
  
  function wait() {
    if(my.jobs.length == 0) {
      API.callUserFunc("Wartet");
    }
  }
  
  // update
  this.update = function() {
    API.setAnt(this);
    execJob.bind(this)()
    senseSugar.bind(this)()
    senseApple.bind(this)()
    senseBug()
    wait()
    API.callUserFunc("Tick");
    validateMemory()
    API.close();
  }  
  
  // constructor
  setColor()
  updateGO();
}
// JOB

function Job(type, value, cb) {
  this.type = type;
  this.value = value;
  this.callback = cb;
}
// ALL MANAGER

var Simulation = function() {

  this.cycles = 0;
  this.playground = undefined
  this.players = []
  this.hills = []
  this.sugars = []
  this.ants = []
  this.apples = []
  this.bugs = []
  this.memories = {}
  
  this.playerCount = function() {
    return Sim.players.length;
  }
  
  this.init = function() {
    
    var area = (1 + (API.ants.length * Optionen.SpielfeldVerhältnis)) * Optionen.SpielfeldGrundGröße;
    var width = Math.round(Math.sqrt(area * Optionen.SpielfeldVerhältnis));
    var height = Math.round(Math.sqrt(area / Optionen.SpielfeldVerhältnis));
    Sim.playground = new Playground(width, height);
  
    for(var i = 0; i < API.ants.length; i++) {
      Sim.players.push(new Player(i, API.ants[i]));
      Sim.hills.push(new Hill(Sim.playground.getHillPos(), i));
    }
  }
  
  this.update = function() {
    Sim.apples.forEach(function(apple){
      apple.update();
    })
    
    Sim.bugs.forEach(function(bug) {
      bug.update();
    })
    
    Sim.ants.forEach(function(ant) {
      ant.update();
    });
    
    Sim.hills.forEach(function(hill) {
      hill.update();
    });
    
    Sim.playground.update();
  }
}

var Sim = new Simulation();
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
    API.curAnt.refreshInsertionPoint()
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
    AntJS._abortSimulation();
  }
}

var API = new APIWrapper();
// Position
function Position(pos) {
  
  makeAttributes(this, {
    pos: {x:pos.x,y:pos.y}
  })
}
// SimObject
function SimObject(obj, timeless) {
  
  var roundId = API.callId;
  
  this.get = function(key) {
    if (key === Sim && (API.callId == roundId || timeless === true)) {
      return obj;
    }
    API.message("Objekt ist abgelaufen und kann nicht mehr verwendet werden.")
    return;
  }
}
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

API.addFunc("NimmZucker", function (zucker) {
  API.curAnt.addTakeJob(zucker);
})

API.addFunc("LadeZuckerAb", function() {
  API.curAnt.addDropJob();
});

API.addFunc("TrageApfel", function () {
  API.curAnt.addAppleSetupJob();
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

Global.OFFEN = true

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

API.antProp('AktuelleReichweite', function(){
  return Optionen.AmeisenReichweite - API.curAnt.getLap();
});

API.antProp('Blickrichtung', function(){
  return API.curAnt.getHeading();
});

API.antProp('HeimatBau', function(){
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

API.antProp('AktuellePosition', function(){
  return API.pushObj(new Position(API.curAnt.getPos()), true);
});

API.antProp('AktuelleRunde', function(){
  return Sim.cycles
});

API.antProp('Gedächtnis', function(){
  return API.curAnt.getMemory();
});

var env = {}

Object.defineProperty(env, "ZuckerPosition", {
  get: function() {
    var sugar = closest(API.curAnt.getPos(), Sim.sugars, Optionen.AmeiseSichtweite)
    return sugar ? API.pushObj(new Position(sugar.getPos()), true) : undefined
  },
  set: function() {}
})

Object.defineProperty(env, "ApfelPosition", {
  get: function() {
    var apple = closest(API.curAnt.getPos(), Sim.apples, Optionen.AmeiseSichtweite)
    if (apple && !apple.needHelp(API.curAnt))
      return undefined
    return apple ? API.pushObj(new Position(apple.getPos()), true) : undefined
  },
  set: function() {}
})

Object.defineProperty(env, "WanzePosition", {
  get: function() {
    var bug = closest(API.curAnt.getPos(), Sim.bugs, Optionen.AmeiseSichtweite)
    return bug ? API.pushObj(new Position(bug.getPos()), true) : undefined
  },
  set: function() {}
})

API.antProp('Umgebung', function(){
  return env
})
  
AntJS.NeueAmeise = function (name) {
  var newAnt = {Name:name};
  if (API.ants.length < Optionen.MaximaleSpieler) {
    API.ants.push(newAnt);
  }
  return newAnt;
}

// backward compat
Global.AntMe = AntJS

AntJS._abortSimulation = function () {
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
  AntJS.Sim = Sim;
  AntJS.Vw = Vw;
  AntJS.Optionen = Optionen;
}
// end of Simulation.js

// access for SimPulse
AntJS._sim = Sim;

// end of encapsulation
})();
