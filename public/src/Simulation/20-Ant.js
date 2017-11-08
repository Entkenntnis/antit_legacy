(function(Sim){

  // JOB

  function Job(type, value, cb) {
    this.type = type;
    this.value = value;
    this.callback = cb;
  }

  // ANT

  function Ant(pos, playerid) {
    
    Ant.counter = Ant.counter || 1;
    
    // attributes
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      playerid: playerid,
      key: playerid + ":" + Ant.counter++,
      heading: Math.floor(Sim.rng()*360),
      load: 0,
      jobs: [],
      insertionPoint: 0,
      lap: 0,
      energy: Sim.Opts.AmeisenEnergie,
      previousBug: undefined,
      memory:{},
      lp : Sim.Opts.Kampf.Arbeitermeise.Trefferpunkte,
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
      my.lap += Sim.Util.dist(my.pos, newpos);
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
    
    this.hit = function(impact) {
      my.lp -= impact
    }
    
    this.die = function() {
      removeGO()
      myPlayer().subAnt();
    }
    
    function reachedHome() {
      my.lap = 0;
    }
    
    function addSugar(load) {
      myPlayer().addPoints(load*Sim.Opts.PunkteProZucker);
      myHill().addEnergy(load*Sim.Opts.EnergieProZucker);
      myPlayer().addSugar(load);
    }
    
    // visuals
    function setColor() {
      Sim.Bus.emit('change-ant-color', my.key, Sim.Opts.SpielerFarben[my.playerid])
    }
    
    function updateGO() {
      Sim.Bus.emit('move-ant', my.key,
        my.pos,
        -my.heading / 180 * Math.PI + Math.PI)
      if (my.load > 0) {
        Sim.Bus.emit('move-sugarbox', my.key, my.pos)
      } else {
        Sim.Bus.emit('remove-sugarbox', my.key)
      }
    }
    
    function removeGO() {
      Sim.Bus.emit('remove-ant', my.key)
      Sim.Bus.emit('remove-sugarbox', my.key)
    }
    
    // jobs - general
    this.addJob = function(name, val, cb) {
      if (my.jobs.length > Sim.Opts.JobLimit) {
        Sim.API.message("Warteschlange der Ameise ist vollgelaufen!")
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
        var curSpeed = Sim.Opts.AmeiseGeschwindigkeit;
        if (my.load > 0)
            curSpeed *= Sim.Opts.ZuckerVerlangsamung;
        if (steps < curSpeed) {
          finished = true;
          toMove = steps;
        } else {
          toMove = curSpeed;
          steps -= curSpeed;
        }
        var oldx = my.pos.x;
        var oldy = my.pos.y;
        var newpos = Sim.Util.moveDir(my.pos, my.heading, toMove);
        if (Sim.playground.isInBound(newpos, Sim.Opts.Toleranz)) {
          this.setPos(newpos);
        } else {
          finished = true;
          Sim.API.callUserFunc("RandErreicht");
        }
        return finished;
      })
    }
    
    this.addTurnJob = function(degree, auto) {
      this.addJob("TURN", auto, function(){
        var toTurn = 0;
        var finished = false;
        if (Math.abs(degree) < Sim.Opts.AmeiseDrehgeschwindigkeit) {
          finished = true;
          toTurn = degree;
        } else {
          toTurn = Sim.Opts.AmeiseDrehgeschwindigkeit * Math.sign(degree);
          degree -= Sim.Opts.AmeiseDrehgeschwindigkeit * Math.sign(degree);
        }
        this.turn(toTurn);
        return finished;
      })
    }
    
    // jobs - utils
    this.addTurnToJob = function(angle) {
      this.addSimpleJob(function(){
        var rotation = Sim.Util.getRotation(my.heading, angle)
        if (rotation != 0)
          this.addTurnJob(rotation)
      })
    }
    
    this.addTurnToObj = function(obj) {
      this.addSimpleJob(function(){
        var angle = Sim.Util.getDir(Sim.API.curAnt.getPos(), obj.getPos());
        Sim.API.curAnt.addTurnToJob(angle);
      })
    }
    
    this.addTurnAway = function(obj) {
      this.addSimpleJob(function(){
        var angle = (Sim.Util.getDir(Sim.API.curAnt.getPos(), obj.getPos()) + 180) % 360;
        Sim.API.curAnt.addTurnToJob(angle);
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
        var ret = f.apply(Sim.API.pushObj(Sim.API.curAnt));
        if (ret !== undefined)
          return ret;
        return true;
      })
    }
    
    // jobs - food
    this.addTakeJob = function() {
      this.addSimpleJob(function(){
        var sugar = Sim.Util.closest(my.pos, Sim.sugars, Sim.Opts.ZuckerRadius)
        if (!sugar)
          return true
        while(my.load < Sim.Opts.AmeiseTragkraft) {
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
        var d = Sim.Util.dist(my.pos, myHill().getPos())
        if (d <= Sim.Opts.HügelRadius) {
          addSugar(my.load)
        }
        my.load = 0;
        updateGO();
      }, "DROPSUGAR")
    }
    
    this.addAppleSetupJob = function() {
      this.addSimpleJob(function(){
        var apple = Sim.Util.closest(my.pos, Sim.apples, Sim.Opts.ApfelRadius)
        if (apple && apple.needHelp(Sim.API.curAnt)) {
          apple.addAnt(Sim.API.curAnt)
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
        if (Sim.Util.dist(my.pos, myHill().getPos()) < Sim.Opts.HügelRadius) {
          myHill().addMarker()
          var curAnts = [];
          Sim.ants.forEach(function (ant) {
            if (ant.getPlayerid() != my.playerid)
              return;
            if (Sim.Util.dist(ant.getPos(), myHill().getPos()) < Sim.Opts.AmeiseSichtweite)
              curAnts.push(ant);
          });
          curAnts.forEach(function (ant) {
            if (ant == Sim.API.curAnt || !ant.isSensing())
              return
            var bkup = Sim.API.curAnt;
            if (bkup !== undefined)
              Sim.API.close();
            Sim.API.setAnt(ant);
            Sim.API.callUserFunc("EmpfängtNachricht", [bkup.getMemory(), topic], true);
            Sim.API.close();
            if (bkup !== undefined)
              Sim.API.setAnt(bkup);
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
        var snap = Sim.Opts.Toleranz
        if (type == "Apfel") {
          snap = Sim.Opts.ApfelRadius / 3
          if (!destination.needHelp(Sim.API.curAnt))
            return true
        }
        var des = destination.getPos()
        var d = Sim.Util.dist(my.pos, des)
        if (d <= snap){
          Sim.API.callUserFunc(type + "Erreicht");
          if (type == "Bau")
            reachedHome()
          return true;
        } else {
          var angle = Sim.Util.getDir(my.pos, des);
          var rotation = Sim.Util.getRotation(my.heading, angle);
          var v = Sim.Opts.ZufallRichtungsVerschiebung;
          rotation += Math.floor(Sim.rng()*v*2-v);
          if (rotation != 0)
            this.addTurnJob(rotation, true);
          this.addGoJob(Math.min(50, d), true);
          return false;
        }
      })
    }
    
    this.gotoHome = function(sense){
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
      if (my.jobs.length > 0 && my.jobs[my.jobs.length-1].value == "DROPSUGAR")
        sensing = false
      return sensing
    }
    
    this.getDestination = function() {
      var destination = undefined;
      var jobs = Sim.API.curAnt.getJobs();
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
                //Sim.API.message("Das Gedächtnis kann als Wert kein Sichtungsobjekt speichern.");
                my.memory[property] = Sim.API.pushObj(new Sim.Position(obj.getPos()), true)
              }
            }
          }
        }
      }
    }
    
    function senseSugar() {
      if (!this.isSensing()) return
      var sugar = Sim.Util.closest(my.pos, Sim.sugars, Sim.Opts.AmeiseSichtweite);
      if (sugar != undefined) {
        Sim.API.callUserFunc("SiehtZucker", [sugar]);
      }
    }
    
    function senseApple() {
      if (!this.isSensing()) return
      var apple = Sim.Util.closest(my.pos, Sim.apples, Sim.Opts.AmeiseSichtweite);
      if (apple != undefined && apple.needHelp(Sim.API.curAnt)) {
        Sim.API.callUserFunc("SiehtApfel", [apple]);
      }
    }
    
    function senseBug() {
      var bug = Sim.Util.closest(my.pos, Sim.bugs, Sim.Opts.AmeiseSichtweite);
      if (bug) {
        if (bug != my.previousBug) {
          Sim.API.callUserFunc("SiehtWanze", [bug]);
          my.previousBug = bug;
        }
      } else {
        my.previousBug = undefined;
      }
    }
    
    function wait() {
      if(my.jobs.length == 0) {
        Sim.API.callUserFunc("Wartet");
      }
    }
    
    // update
    this.update = function() {
      Sim.API.setAnt(this);
      execJob.bind(this)()
      senseSugar.bind(this)()
      senseApple.bind(this)()
      senseBug()
      wait()
      Sim.API.callUserFunc("Tick");
      validateMemory()
      Sim.API.close();
    }  
    
    // constructor
    setColor()
    updateGO();
  }
  
  Sim.Ant = Ant

})(AntIT._rawsim)
