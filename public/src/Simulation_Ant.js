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
    my.jobs.splice(my.insertionPoint, 0, new Job(name, val, cb));
  }
  
  this.addSimpleJob = function(f) {
    this.addJob("SIMPLE", undefined, function(){
      f.apply(this)
      return true
    })
  }
  
  function removeOldJobs() {
    my.jobs.splice(0, my.insertionPoint);
    my.insertionPoint = 0;
  }
  
  function refreshInsertionPoint() {
    my.insertionPoint = my.jobs.length;
  }
  
  // jobs - basic movement
  this.addGoJob = function(steps) {
    this.addJob("GO", undefined, function(){
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
  
  this.addTurnJob = function(degree) {
    this.addJob("TURN", undefined, function(){
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
    var rotation = getRotation(my.heading, angle)
    if (rotation != 0)
      this.addTurnJob(rotation)
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
      var ret = f.apply(API.pushObj(API.curAnt));
      if (ret !== undefined)
        return ret;
      return true;
    })
  }
  
  // jobs - food
  this.addTakeJob = function() {
    this.addSimpleJob(function(){
      var sugar = closest(my.pos, Sim.sugars, Optionen.GrabToleranz)
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
      if (d <= Optionen.GrabToleranz) {
        addSugar(my.load)
      }
      my.load = 0;
      updateGO();
    })
  }
  
  this.addAppleJob = function() {
    var apple = undefined;
    var setup = false;
    var cb = function() {
      apple = closest(my.pos, Sim.apples, Optionen.GrabToleranz);
      if (!apple)
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
        return true;
      }
      my.heading = apple.heading;
      this.setPos({x:my.pos.x + apple.dx, y:my.pos.y + apple.dy});
      return false;
    };
    this.addJob("APPLE", apple, cb);
  }
  
  // jobs - communication
  this.addSendMemoryJob = function(topic) {
    this.addJob("SEND", undefined, function() {
      if (dist(my.pos, myHill().getPos()) < Optionen.HügelRadius) {
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
      if (type == "Apfel")
        snap = Optionen.ApfelRadius
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
          this.addTurnJob(rotation);
        this.addGoJob(Math.min(50, d));
        return false;
      }
    })
  }
  
  this.gotoHome = function(sense){
    this.addGotoJob(myHill(), undefined, "Bau", sense)
  }
  
  // jobs - sensing
  this.isSensing = function() {
    var sensing = true
    for (var i = my.jobs.length - 1; i >= 0; i--) {
      var curCmd = my.jobs[i]
      if (curCmd.type == "DEST" && curCmd.value[1] !== true) {
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
              API.message("Das Gedächtnis kann als Wert kein Sichtungsobjekt speichern.");
              delete my.memory[property];
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
    refreshInsertionPoint()
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
