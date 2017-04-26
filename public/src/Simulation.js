// encapsulate our project

(function () {

"use strict";
  
var vw = AntMe._vw;
var Optionen = AntMe._optionen;
var global = window;
var am = AntMe;

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
  if (best < range) {
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
// Constants

var SUGAR = "Sugar";
var HILL = "Hill";
var APPLE = "Apple";
var POSITION = "Position";
// PLAYER 
  
function Player(_id, _KI) {

  var id = _id;
  var KI = _KI;
  var points = 0;
  var collectedSugar = 0;
  var ants = 0;
  var collectedApples = 0;
  var deadants = 0;
  var pointsE = document.createElement("DIV");
  var details = document.createElement("DIV");
  
  function initHTML() {
    var para = document.createElement("DIV");
    var nameE =document.createElement("DIV");
    nameE.innerHTML = KI.Name;
    nameE.style.minWidth = "180px";
    para.appendChild(nameE);
    para.style.display = "flex";
    para.style.fontWeight = "bold";
    var hex = Optionen.SpielerFarben[id];
    var hexS = hex.toString(16);
    while (hexS.length < 6)
      hexS = "0" + hexS;
    para.style.color = "#" + hexS;
    pointsE.id = "player" + id;
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
  
  this.getId = function() {
    return id;
  }
  
  this.getKI = function() {
    return KI;
  }
  
  this.getPoints = function() {
    return points;
  }
  
  this.addPoints = function(amount) {
    points = Math.max(0, points + amount);
    pointsE.innerHTML = points + " Punkte";
  }
  
  // constructor
  initHTML();
  updateDetails();
  this.addPoints(0);
}
// PLAYGROUND

function Playground(_width, _height) {

  var width = _width;
  var height = _height;
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
  
  this.getWidth = function() {
    return width;
  }
  
  this.getHeight = function() {
    return height;
  }
  
  this.randomPos = function() {
    return {
      x:Math.random()*width,
      y:Math.random()*height};
  }
  
  this.isInBound = function(pos, margin) {
    if (margin == undefined)
      margin = 0;
    if (pos.x < margin || pos.y < margin)
        return false;
    if (width - pos.x < margin || height - pos.y < margin)
      return false;
    return true;
  }
  
  this.toViewPos = function(pos, h){
    if (h === undefined) {
      h = 0;
    }
    return new THREE.Vector3(
      pos.x - width / 2.0,
      h,
      pos.y - height / 2.0);
  }
  
  this.getHillPos = function() {
    var topW = width - Optionen.EckenAbstand*2;
    var leftH = height - Optionen.EckenAbstand * 2;     
    var pos = {};
    var limit = 100;
    while(limit-- > 0) {
      pos.x = Math.random()*(topW+leftH);
      pos.y = Math.random()*Optionen.HügelStreifenBreite * 2;
      if (pos.x < topW) {
        if (pos.y >= Optionen.HügelStreifenBreite) {
          pos.y += (height - Optionen.HügelStreifenBreite*2 - Optionen.HügelRandAbstand*2);
        } 
        pos.x += Optionen.EckenAbstand;
        pos.y += Optionen.HügelRandAbstand;
      } else {
        var t = pos.y;
        pos.y = pos.x - topW;
        pos.x = t;
        if (pos.x >= Optionen.HügelStreifenBreite) {
          pos.x += (width - Optionen.HügelStreifenBreite * 2 - Optionen.HügelRandAbstand * 2);
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
      var id = apple.getPid();
      if (id !== undefined) {
        var d = dist(apple.getPos(), Sim.hills[id].getPos());
        if (d < 10) {
          apple.reachHome(id);
          return true;
        }
      }
      return false;
    });
    
    removeIf(Sim.ants, function(ant) {
      if (ant.getLap() > ant.getMaxDistance() || ant.getEnergy() <= 0) {
        ant.die();
        return true;
      }
      return false;
    })
  }
  
  // constructor
  vw.gamefloor.geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  vw.gamefloor.geometry.verticesNeedUpdate = true;
  vw.setControlsBounds(width/2, height/2);
}
// HILL

function Hill(_pos, _playerid) {

  Hill.counter = Hill.counter || 1;
  var pos = _pos;
  var playerid = _playerid;
  var key = Hill.counter++;
  var energy = Optionen.AnfangsEnergie;
  var cfi = 0;
  var timeToNextAnt = Optionen.AmeiseWartezeit;
  
  function updateGO() {
    vw.hillStore.get(key).position.copy(Sim.playground.toViewPos(pos));
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.getPlayerid = function() {
    return playerid;
  }
  
  this.getEnergy = function() {
    return energy;
  }
  
  this.addEnergy = function(val) {
    energy += val;
  }
  
  this.getFeedIndex = function() {
    return cfi;
  }
  
  this.addFeed = function(val) {
    cfi += val;
  }
  
  this.update = function() {
    var ownAnts = 0;
    Sim.ants.forEach(function(ant) {
      if (ant.getPlayerid() == playerid)
        ownAnts++;
    });
    if (timeToNextAnt-- <= 0 && ownAnts < Optionen.AmeisenMaximum
          && energy >= Optionen.EnergieFürAmeise) {
      timeToNextAnt = Optionen.AmeiseWartezeit;
      energy -= Optionen.EnergieFürAmeise;
      var antPos = {x:pos.x,y:pos.y};
      var angle = Math.random()*Math.PI*2;
      var radius = Optionen.HügelRadius + (Math.random()*10 - 5);
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      var newAnt = new Ant(antPos, playerid)
      Sim.ants.push(newAnt);
      Sim.players[playerid].addAnt();
      API.setAnt(newAnt);
      API.callUserFunc("IstGeboren");
      API.close();
    }
  }
  
  // constructor
  vw.setHillFlagColor(vw.hillStore.get(key), Optionen.SpielerFarben[playerid]);
  updateGO();
}
// SUGAR

function Sugar(_pos) {

  Sugar.counter = Sugar.counter || 1;
  var pos = _pos;
  var key = Sugar.counter++;
  var amount = Optionen.ZuckerGröße;
  
  function updateGO() {
    var GO = vw.sugarStore.get(key);
    GO.position.copy(Sim.playground.toViewPos(pos));
    var linScale = amount / Optionen.ZuckerGröße * Optionen.ZuckerVergrößerung;
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001);
    GO.scale.set(scale, scale, scale);
  }
  
  this.getAmount = function() {
    return amount;
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.unload1Sugar = function() {
    if (amount > 0) {
      amount--;
      updateGO();
      return true;
    } else {
      if (vw.sugarStore.has(key))
        vw.sugarStore.remove(key);
      return false;
    }
  }
  
  // constructor
  updateGO();
}
// APPLE

function Apple(_pos) {
  
  Apple.counter = Apple.counter || 1;
  var pos = _pos;
  var key = Apple.counter++;
  var moving = false;
  var pid = undefined;
  
  this.ants = [];
  this.dx = 0;
  this.dy = 0;
  this.heading = 0;
  
  function updateGO() {
    var GO = vw.appleStore.get(key);
    var height = moving?5:0;
    GO.position.copy(Sim.playground.toViewPos(pos, height));
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.addAnt = function(ant) {
    if (this.needHelp(ant)) {
      this.ants.push(ant);
    }
  }
  
  this.getPid = function() {
    return pid;
  }
  
  this.needHelp = function(ant) {
    if (pid === undefined) {
      return true;
    } else if (ant.getPlayerid() === pid && this.ants.length < Optionen.MaximumAmeisenFürApfel) {
      return true;
    }
    return false;
  }
  
  this.reachHome = function(id) {
    vw.appleStore.remove(key);
    Sim.players[id].addPoints(Optionen.PunkteProApfel);
    Sim.hills[id].addEnergy(Optionen.EnergieProApfel);
    Sim.players[id].addApple();
  }
  
  this.update = function() {
    if (pid !== undefined) {
      this.heading = getDir(this.getPos(), Sim.hills[pid].getPos());
      // Geschwindigkeit zwischen 0.2 und 1
      var speed = Optionen.ApfelMinGeschwindigkeit +
        (Optionen.ApfelMaxGeschwindigkeit - Optionen.ApfelMinGeschwindigkeit) *
        (this.ants.length / Optionen.MaximumAmeisenFürApfel);
      this.dx =  speed*Math.cos(this.heading/180*Math.PI);
      this.dy = speed*Math.sin(this.heading/180*Math.PI);
      pos.x += this.dx;
      pos.y += this.dy;
      updateGO();
      return;
    }
    // remove inactive ants
    removeIf(this.ants, function(ant){
      if (Sim.ants.indexOf(ant) < 0)
        return true;
      var jobs = ant.getJobs();
      if (jobs !== undefined) {
        var curJob = jobs[jobs.length - 1];
        if (curJob.type == "APPLE")
          return false;
      }
      return true;
    });
    // check parties
    var stats = {};
    var parties = [];
    this.ants.forEach(function(ant){
      var id = ant.getPlayerid();
      if (id in stats) {
        stats[id].push(ant);
      } else {
        stats[id] = [ant];
        parties.push(id);
      }
    });
    var vals = parties.map(function(e){
      return {id:e, len:stats[e].length};
    });
    var bestid = undefined;
    var bestlen = -1;
    vals.forEach(function(e){
      if (bestlen == e.len)
        bestlen = -1;
      else if (bestlen < e.len) {
        bestlen = e.len
        bestid = e.id;
      }
    });
    if (bestlen >= Optionen.AmeisenFürApfel) {
      var toKeep = [];
      this.ants.forEach(function(a){
        if (a.getPlayerid() == bestid) {
          toKeep.push(a);
        }
      });
      this.ants = toKeep;
      moving = true;
      pid = bestid;
    } else {
      moving = false;
      pid = undefined;
    }
  }
  
  // constructor
  updateGO();
}
// BUG

function Bug(_pos) {
  
  Bug.Counter = Bug.Counter || 1;
  var key = Bug.Counter++;
  var heading = Math.floor(Math.random()*360);
  var pos = _pos;
  var togo = 0;
  var torotate = 0;
  var towait = 0;
  
  function updateGO() {
    vw.bugStore.get(key).position.copy(Sim.playground.toViewPos(pos));
    vw.bugStore.get(key).rotation.y = -heading / 180 * Math.PI + Math.PI;
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.update = function() {
    var ant = closest(pos, Sim.ants, Optionen.WanzenKampfweite);
    if (ant !== undefined) {
      ant.subEnergy(Optionen.WanzenAngriff, this);
    }
    if (torotate != 0) {
      heading += Math.sign(torotate) * Optionen.WanzeDrehgeschwindigkeit;
      torotate -= Math.sign(torotate);
    } else if (togo > 0) {
      var newpos = moveDir(pos, heading, Optionen.WanzeGeschwindigkeit);
      if (!Sim.playground.isInBound(newpos, 10)) {
        torotate = Math.round(180 / Optionen.WanzeDrehgeschwindigkeit);
        togo = 0;
      } else {
        pos = newpos;
      }
      togo--;
    } else if (towait != 0){
      towait--;
    } else {
      towait = 30;
      torotate = Math.floor(Math.random()*40-20);
      togo = 60;
      var destHill = closest(pos, Sim.hills, Optionen.WanzenHügelAbstand);
      if (destHill !== undefined) {
        var angle = getDir(pos, destHill.getPos()) + 180;
        torotate = Math.round(getRotation(heading, angle)/Optionen.WanzeDrehgeschwindigkeit);
      } else {
        ant = closest(pos, Sim.ants, Optionen.WanzeSichtweite);
        if (ant!= undefined) {
          var dir = getDir(pos, ant.getPos());
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

function Ant(_pos, _playerid) {
  
  Ant.counter = Ant.counter || 1;
  var speed = Optionen.AmeiseGeschwindigkeit;
  var rotationSpeed = Optionen.AmeiseDrehgeschwindigkeit;
  var range = Optionen.AmeiseSichtweite;
  var maxLoad = Optionen.AmeiseTragkraft;
  var pos = _pos;
  var playerid = _playerid;
  var key = playerid + ":" + Ant.counter++;
  var heading = Math.floor(Math.random()*360);
  var load = 0;
  var jobs = [];
  var insertionPoint = 0;
  var maxDistance = Optionen.AmeisenReichweite;
  var lap = 0;
  var tired = false;
  var maxEnergy = Optionen.AmeisenEnergie;
  var energy = maxEnergy;
  var previousBug = undefined;
  var memory = {};
  
  function updateGO() {
    vw.antStore.get(key).position.copy(Sim.playground.toViewPos(pos));
    vw.antStore.get(key).rotation.y = -heading / 180 * Math.PI + Math.PI;
    if (load > 0) {
      var sugar = vw.sugarBoxStore.get(key);
      sugar.position.copy(Sim.playground.toViewPos(pos, 5.5));
    } else if (vw.sugarBoxStore.has(key)) {
      vw.sugarBoxStore.remove(key);
    }
  }
  
  function reachedHome() {
    Sim.players[playerid].addPoints(load*Optionen.PunkteProZucker);
    Sim.hills[playerid].addEnergy(load*Optionen.EnergieProZucker);
    Sim.players[playerid].addSugar(load);
    load = 0;
    lap = 0;
    tired = false;
    energy = maxEnergy;
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.getPlayerid = function() {
    return playerid;
  }
  
  this.getJobs = function() {
    return jobs;
  }
  
  this.getRange = function() {
    return range;
  }
  
  this.getLoad = function() {
    return load;
  }
  
  this.getHeading = function() {
    return heading;
  }
  
  this.getMaxLoad = function() {
    return maxLoad;
  }
  
  this.getKey = function() {
    return key;
  }
  
  this.getMaxSpeed = function() {
    return speed;
  }
  
  this.getMaxDistance = function() {
    return maxDistance;
  }
  
  this.getLap = function() {
    return lap;
  }
  
  this.getEnergy = function() {
    return energy;
  }
  
  this.subEnergy = function(val, obj) {
    energy -= val;
    API.setAnt(this);
    API.callUserFunc("WirdAngegriffen", [obj]);
    API.close();
  }
  
  this.getMaxEnergy = function() {
    return maxEnergy;
  }
  
  this.getMemory = function() {
    return memory;
  }
  
  this.die = function() {
    API.setAnt(this);
    API.callUserFunc("IstGestorben");
    API.close();
    vw.antStore.remove(key);
    if (vw.sugarBoxStore.has(key))
      vw.sugarBoxStore.remove(key);
    Sim.players[playerid].subAnt();
  }
  
  this.setPos = function(newpos) {
    lap += dist(pos, newpos);
    pos.x = newpos.x;
    pos.y = newpos.y;
    updateGO();
  }
  
  this.turn = function(degree) {
    heading += Math.round(degree);
    heading %= 360;
    while (heading < 0)
      heading += 360;
    heading = Math.round(heading);
    updateGO();
  }
  
  this.addJob = function(job) {
    jobs.splice(insertionPoint, 0, job);
  }
  
  this.stop = function() {
    jobs = [];
    insertionPoint = 0;
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
        if (curCmd.value.constructor.name == "Sugar") {
          destination = SUGAR;
        } else if (curCmd.value.constructor.name == "Hill") {
          destination = HILL;
        } else if (curCmd.value.constructor.name == "Apple") {
          destination = APPLE;
        } else if (curCmd.value.constructor.name == "Position") {
          destination = POSITION;
        }
      }
    }
    return destination;
  }
  
  this.addGoJob = function(_steps) {
    var steps = _steps;
    var cb = function() {
      var toMove = 0;
      var finished = false;
      var curSpeed = speed;
      if (load > 0)
          curSpeed *= Optionen.ZuckerVerlangsamung;
      if (steps < curSpeed) {
        finished = true;
        toMove = steps;
      } else {
        toMove = curSpeed;
        steps -= curSpeed;
      }
      var oldx = pos.x;
      var oldy = pos.y;
      var newpos = moveDir(pos, heading, toMove);
      if (Sim.playground.isInBound(newpos, 2)) {
        this.setPos(newpos);
      } else {
        finished = true;
        API.callUserFunc("RandErreicht", [steps]);
      }
      return finished;
    };
    this.addJob(new Job("GO", steps, cb));
  }
  
  this.addGoStraightJob = function() {
    var cb = function () {
      var newpos = moveDir(pos, heading, speed);
      if (Sim.playground.isInBound(newpos, 2)) {
        this.setPos(newpos);
      } else {
        API.callUserFunc("RandErreicht", [0]);
        return true;
      }
      return false;
    }
    this.addJob(new Job("GOSTRAIGHT", undefined, cb));
  }
  
  this.addTurnJob = function(_degree) {
    var degree = _degree;
    var cb = function() {
      var toTurn = 0;
      var finished = false;
      if (Math.abs(degree) < rotationSpeed) {
        finished = true;
        toTurn = degree;
      } else {
        toTurn = rotationSpeed * Math.sign(degree);
        degree -= rotationSpeed * Math.sign(degree);
      }
      this.turn(toTurn);
      return finished;
    };
    this.addJob(new Job("TURN", degree, cb));
  }
  
  this.addTakeJob = function(sugar) {
    var cb = function() {
      var d = dist(pos, sugar.getPos());
      if (d < 2) {
        while(load < maxLoad) {
          var t = sugar.unload1Sugar();
          if (t) {
            load++;
          } else {
            break;
          }
        }
      }
      updateGO();
      return true;
    };
    this.addJob(new Job("TAKE", sugar, cb));
  }
  
  this.addDropJob = function() {
    var cb = function() {
      load = 0;
      updateGO();
      return true;
    };
    this.addJob(new Job("DROP", undefined, cb));
  }
  
  this.addWaitJob = function(_rounds) {
    var rounds = _rounds;
    var cb = function() {
      if (rounds-- > 0) {
        return false;
      } else {
        return true;
      }
    };
    this.addJob(new Job("WAIT", rounds, cb));
  }
  
  this.addTurnToJob = function(_angle) {
    var angle = _angle;
    var cb = function() {
      var rotation = getRotation(heading, angle);
      if (rotation != 0)
        this.addTurnJob(rotation);
      return true;
    };
    this.addJob(new Job("TURNTO", angle, cb));
  }
  
  this.addSendMsgJob = function(_topic, _value) {
    var cb = function() {
      if (dist(this.getPos(), Sim.hills[playerid].getPos()) < Optionen.HügelRadius) {
        var curAnts = [];
        Sim.ants.forEach(function (ant) {
          if (ant.getPlayerid() != playerid)
            return;
          if (dist(ant.getPos(), Sim.hills[playerid].getPos()) < Optionen.AmeiseSichtweite)
            curAnts.push(ant);
        });
        curAnts.forEach(function (ant) {
          var bkup = API.curAnt;
          if (bkup !== undefined)
            API.close();
          API.setAnt(ant);
          API.callUserFunc("EmpfängtNachricht", [_topic, _value]);
          API.close();
          if (bkup !== undefined)
            API.setAnt(bkup);
        })
      }
      return true;
    }; 
    this.addJob(new Job("SEND", {topic:_topic,value:_value}, cb));
  }
  
  this.addSendMemoryJob = function() {
    var cb = function() {
      if (dist(this.getPos(), Sim.hills[playerid].getPos()) < Optionen.HügelRadius) {
        var curAnts = [];
        Sim.ants.forEach(function (ant) {
          if (ant.getPlayerid() != playerid)
            return;
          if (dist(ant.getPos(), Sim.hills[playerid].getPos()) < Optionen.AmeiseSichtweite)
            curAnts.push(ant);
        });
        curAnts.forEach(function (ant) {
          if (ant == API.curAnt)
            return
          var bkup = API.curAnt;
          if (bkup !== undefined)
            API.close();
          API.setAnt(ant);
          API.callUserFunc("EmpfängtNachricht", [bkup.getMemory()], true);
          API.close();
          if (bkup !== undefined)
            API.setAnt(bkup);
        })
      }
      return true;
    }; 
    this.addJob(new Job("SENDMEMORY", {}, cb));
  }
  
  this.addAppleJob = function() {
    var apple = undefined;
    var setup = false;
    var cb = function() {
      var apple = closest(API.curAnt.getPos(), Sim.apples, 30);
      if (!apple)
        return true;
      var d = dist(this.getPos(), apple.getPos());
      if (d > 11)
        return true;
      var index = Sim.apples.indexOf(apple);
      if (index < 0) {
        return true;
      }
      if (!setup) {
        setup = true;
        apple.addAnt(this);
        return false;
      }
      if (apple.ants.indexOf(this) < 0) {
        this.goToHome();
        return true;
      }
      heading = apple.heading;
      this.setPos({x:pos.x + apple.dx, y:pos.y + apple.dy});
      return false;
    };
    this.addJob(new Job("APPLE", apple, cb));
  }
  
  this.addCustomJob = function(_f) {
    var f = _f;
    var cb = function() {
      var ret = f.apply(API.pushObj(API.curAnt));
      if (ret !== undefined)
        return ret;
      return true;
    };
    this.addJob(new Job("CUSTOM", f, cb));
  }
  
  var gotoHelper = function(obj, snap, f, col) {
    var cb = function() {
      if (col !== undefined) {
        if (col.indexOf(obj) < 0)
          return true;
      }
      var des = obj.getPos();
      var d = dist(pos, des);
      if (d < snap) {
        f.bind(this)();
        return true;
      } else {
        var angle = getDir(pos, des);
        var rotation = getRotation(heading, angle);
        var v = Optionen.ZufallRichtungsVerschiebung;
        rotation += Math.floor(Math.random()*v*2-v);
        if (rotation != 0)
          this.addTurnJob(rotation);
        this.addGoJob(Math.min(50, d));
        return false;
      }
    };
    jobs.splice(0, insertionPoint);
    insertionPoint = 0;
    this.addJob(new Job("DEST", obj, cb));
  }.bind(this);
  
  this.goToSugar = function(sugar, parent) {
    gotoHelper(sugar, 1, function() {
      API.callUserFunc("ZuckerErreicht", [sugar]);
    }, Sim.sugars);
  }
  
  this.goToApple = function(apple, parent) {
    gotoHelper(apple, Optionen.ApfelRadius, function() {
      API.callUserFunc("ApfelErreicht", [apple]);
    }, Sim.apples)
  }
  
  this.goToPos = function(pos, parent) {
    gotoHelper(pos, 1, function () {
      API.callUserFunc("PositionErreicht");
    });
  }
  
  this.goToHome = function(parent) {
    if (this.getDestination() != HILL) {
      var hill = Sim.hills[playerid];
      gotoHelper(hill, Optionen.BauErreichtRadius, function() {
        reachedHome();
        API.callUserFunc("BauErreicht", [hill]);
      });
    }
  }
  
  this.update = function() {
    insertionPoint = jobs.length;
    API.setAnt(this);
    
    // jobs
    if (jobs.length > 0) {
      var curJob = jobs[jobs.length - 1];
      var finished = curJob.callback.bind(this)();
      if (finished) {
        var index = jobs.indexOf(curJob);
        if (index >= 0) {
          jobs.splice(index, 1);
          if (insertionPoint > index) {
            insertionPoint--
          }
        }
      }
    }
    
    // sights
    if (this.getDestination() === undefined) {
      var sugar = closest(pos, Sim.sugars, range);
      if (sugar != undefined) {
        API.callUserFunc("SiehtZucker", [sugar]);
      }
    }
    
    if (this.getDestination() === undefined) {
      var apple = closest(pos, Sim.apples, range);
      if (apple != undefined) {
        API.callUserFunc("SiehtApfel", [apple]);
      }
    }
    
    var bug = closest(pos, Sim.bugs, range);
    if (bug) {
      if (bug != previousBug) {
        API.callUserFunc("SiehtWanze", [bug]);
        previousBug = bug;
      }
    } else {
      previousBug = undefined;
    }
    
    if (lap > Optionen.AmeisenReichweite * 2 / 3) {
      if (!tired) {
        API.callUserFunc("WirdMüde");
        tired = true;
      }
    }
    
    if(this.getJobs().length == 0) {
      API.callUserFunc("Wartet");
    }
    
    API.callUserFunc("Tick");
    
    // manage memory
    for (var property in memory) {
      if (memory.hasOwnProperty(property)) {
        var cur = memory[property]
        if (typeof cur == "object" && cur.get) {
          var obj = cur.get(Sim);
          if (obj !== undefined) {
            if (obj.constructor.name == "Apple" || obj.constructor.name == "Sugar" ||
                obj.constructor.name == "Bug" || obj.constructor.name == "Hill") {
              API.message("Das Gedächtnis kann als Wert kein Sichtungsobjekt speichern.");
              delete memory[property];
            }
          }
          memory[property] = obj;
        }
      }
    }
    
    API.close();
  }
  
  // constructor
  vw.setAntBodyColor(vw.antStore.get(key), Optionen.SpielerFarben[playerid]);
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
    func.apply(API.pushObj(API.curAnt), arg.map(function (obj) {
      if (!pure && typeof obj == "object")
        return API.pushObj(obj);
      return obj;
    }));
  }
  
  this.pushObj = function(obj) {
    return new SimObject(obj);
  }
  
  this.getObj = function(simObj) {
    return simObj.get(Sim);
  }
  
  this.antProp = function(name, f) {
    Object.defineProperty(global, name, {
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
    global[name] = function() {
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
    am._abortSimulation();
  }
}

var API = new APIWrapper();
// Position
function Position(_pos) {

  var pos = {x:_pos.x,y:_pos.y};
  
  this.getPos = function() {
    return pos;
  }
}
// SimObject
function SimObject(_obj) {
  var roundId = API.callId;
  var obj = _obj;
  
  this.get = function(key) {
    if (key === Sim && API.callId == roundId) {
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

API.addFunc("GeheGeradeaus", function(){
  API.curAnt.addGoStraightJob();
});

API.addFunc("Stopp", function(){
  API.curAnt.addCustomJob(function(){
    API.curAnt.stop();
  })
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

API.addFunc("GeheZuBau", function () {
  API.curAnt.goToHome();
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

API.addFunc("GeheZuZiel", function (ziel)  {
  if (arguments.length != 1)
    return API.message("Die Funktion 'GeheZuZiel(ziel)' wurde ohne Argument aufgerufen");
  if (ziel.constructor.name == "Sugar")
    return API.curAnt.goToSugar(ziel);
  if (ziel.constructor.name == "Hill")
    return API.curAnt.goToHome();
  if (ziel.constructor.name == "Apple")
    return API.curAnt.goToApple(ziel);
  if (ziel.constructor.name == "Position")
    return API.curAnt.goToPos(ziel);
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

API.addFunc("BestimmePosition", function(objekt) {
  if (!(typeof objekt == "object") || !("getPos" in objekt)) {
    API.message("Die Funktion 'BestimmePosition(objekt)' konnte für das übergebene Objekt keine Position bestimmen.");
    return;
  }
  return API.pushObj(new Position(objekt.getPos()));
})

API.addFunc("Nimm", function (zucker) {
  if (!zucker || zucker.constructor.name !== "Sugar") {
    API.message("Die Funktion 'Nimm(zucker)' erwartet als Argument einen Zuckerobjekt.");
    return;
  }
  API.curAnt.addTakeJob(zucker);
})

API.addFunc("LasseZuckerFallen", function() {
  if (API.curAnt.getLoad() > 0) {
    API.curAnt.addDropJob();
  }
});

API.addFunc("BrauchtNochTräger", function (apfel) {
  if (!apfel || apfel.constructor.name !== "Apple") {
    API.message("Die Funktion 'BrauchtNochTräger(apfel)' erwartet als Argument einen Apfelobjekt.");
    return;
  }
  return apfel.needHelp(API.curAnt);
})

API.addFunc("BringeApfelZuBau", function () {
  //var apple = closest(API.curAnt.getPos(), Sim.apples, 100);
  //if (apple) {
    API.curAnt.addAppleJob();
    //API.curAnt.goToHome();
  //}
});

API.addFunc("RiecheNachZucker", function () {
  var sugar = closest(API.curAnt.getPos(), Sim.sugars, API.curAnt.getRange());
  if (sugar)
    return API.pushObj(sugar);
  else
    return undefined;
});

API.addFunc("RiecheNachApfel", function () {
  var apple = closest(API.curAnt.getPos(), Sim.apples, API.curAnt.getRange());
  if (apple)
    return API.pushObj(apple);
  else
    return undefined;
});

API.addFunc("RiecheNachWanze", function () {
  var bug = closest(API.curAnt.getPos(), Sim.bugs, API.curAnt.getRange());
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

API.addFunc("Merke", function(schlüssel, wert) {
  if (!(typeof schlüssel == "string") || schlüssel.length <= 0) {
    API.message("VERALTET Die Funktion 'Merke(schlüssel, wert)' erwartet als erstes Argument eine Zeichenkette.");
    return;
  }
  if (wert !== undefined) {
    if (wert.constructor.name == "Apple" || wert.constructor.name == "Sugar" ||
        wert.constructor.name == "Bug" || wert.constructor.name == "Hill") {
      API.message("VERALTET Die Funktion 'Merke(schlüssel, wert)' kann als Wert kein Sichtungsobjekt speichern.");
      return;
    }
  }
  
  var key = API.curAnt.getKey();
  if (!(key in Sim.memories)) {
    Sim.memories[key] = {};
  }
  Sim.memories[key][schlüssel] = wert;
});

API.addFunc("Erinnere", function(schlüssel) {
  if (!(typeof schlüssel == "string") || schlüssel.length <= 0) {
    API.message("VERALTET Die Funktion 'Erinnere(schlüssel)' erwartet als Argument eine Zeichenkette.");
    return;
  }
  var key = API.curAnt.getKey();
  if (key in Sim.memories && schlüssel in Sim.memories[key]) {
    return Sim.memories[key][schlüssel];
  }
  API.message("VERALTET Die Funktion 'Erinnere(schlüssel)' konnte den übergebenen Schlüssel nicht finden.");
})

API.addFunc("HatErinnerung", function (schlüssel) {
  if (!(typeof schlüssel == "string") || schlüssel.length <= 0) {
    API.message("VERALTET Die Funktion 'Erinnere(schlüssel)' erwartet als Argument eine Zeichenkette.");
    return;
  }
  var key = API.curAnt.getKey();
  if (key in Sim.memories) {
    return schlüssel in Sim.memories[key];
  }
  return false;
})

API.addFunc("Vergesse", function (schlüssel) {
  if (!(typeof schlüssel == "string") || schlüssel.length <= 0) {
    API.message("VERALTET Die Funktion 'Vergesse(schlüssel)' erwartet als Argument eine Zeichenkette.");
    return;
  }
  var key = API.curAnt.getKey();
  if (key in Sim.memories && schlüssel in Sim.memories[key]) {
    delete Sim.memories[key][schlüssel];
  }
});

API.addFunc("SendeNachricht", function(betreff, wert) {
  if (betreff == undefined && wert == undefined) {
    return API.curAnt.addSendMemoryJob();
  }
  if (!(typeof betreff == "string") || betreff.length <= 0) {
    API.message("VERALTET Die Funktion 'SendeNachricht(betreff, wert)' erwartet als erstes Argument eine Zeichenkette.");
    return;
  }
  API.curAnt.addSendMsgJob(betreff, wert);
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
  return name.charAt(0).toUpperCase() + name.slice(1);;
});

global.ZUCKER = SUGAR;
global.BAU = HILL;
global.APFEL = APPLE;
global.POSITION = POSITION;

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
  return API.curAnt.getMaxDistance() - API.curAnt.getLap();
});

API.antProp('Blickrichtung', function(){
  return API.curAnt.getHeading();
});

API.antProp('AmeisenSichtweite', function(){
  return API.curAnt.getRange();
});

API.antProp('MaximaleLast', function(){
  return API.curAnt.getMaxLoad();
});

API.antProp('MaximaleGeschwindigkeit', function(){
  return API.curAnt.getMaxSpeed();
});

API.antProp('AmeisenReichweite', function(){
  return API.curAnt.getMaxDistance();
});

API.antProp('MaximaleEnergie', function(){
  return API.curAnt.getMaxEnergy();
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

  
  
am.NeueAmeise = function (name) {
  var newAnt = {Name:name};
  if (API.ants.length < Optionen.MaximaleSpieler) {
    API.ants.push(newAnt);
  }
  return newAnt;
}

am._abortSimulation = function () {
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
  am.Sim = Sim;
  am.Vw = vw;
  am.Optionen = Optionen;
}
// end of Simulation.js

// access for SimPulse
am._sim = Sim;

// end of encapsulation
})();
