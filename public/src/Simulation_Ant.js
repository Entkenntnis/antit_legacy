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
  
  this.addAppleJob = function(_apple) {
    var apple = _apple;
    var setup = false;
    var cb = function() {
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
