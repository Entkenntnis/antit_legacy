(function(Sim){

  // JOB

  function Job(type, opts, cb) {
    this.type = type;
    this.opts = opts;
    this.callback = cb;
  }

  // ANT

  function Ant(pos, playerid, dummy) {
    
    Ant.counter = Ant.counter || 1;
    
    // attributes
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      playerid: playerid,
      key: playerid + ":" + Ant.counter++,
      heading: Sim.Opts.AnfangsRichtung !== undefined ? 
                Sim.Opts.AnfangsRichtung :
                Math.floor(Sim.rng()*360),
      load: 0,
      lap: 0,
      energy: Sim.Opts.AmeisenEnergie,
      memory:{},
      poison:true,
      team:undefined,
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
      my.pos = {x:newpos.x, y: newpos.y}
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
      if (myPlayer())
        myPlayer().subAnt();
    }
    
    function reachedHome() {
      my.lap = 0;
      my.poison = true
    }
    this.reachedHome = reachedHome
    
    function addSugar(load) {
      myPlayer().addPoints(load*Sim.Opts.PunkteProZucker);
      myHill().addEnergy(load*Sim.Opts.EnergieProZucker);
      myPlayer().addSugar(load);
    }
    
    // visuals
    function setColor() {
      Sim.Bus.emit('change-ant-color', my.key, Sim.Opts.SpielerFarben[Sim.colors[my.playerid]])
      var level = Sim.levels[my.playerid]
      if (!level)
        level = 1
      Sim.Bus.emit('change-ant-level-color',
                   my.key,
                   Sim.Opts.FühlerFarben[level-1][0],
                   Sim.Opts.FühlerFarben[level-1][1])
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
    var jobs = []
    var oldjobs = []
    var jobsoutofdate = false
    var execmode = false
    
    function addJob(type, opts, cb) {
      if (jobs.length > Sim.Opts.JobLimit) {
        //Sim.API.message("Warteschlange der Ameise ist vollgelaufen!") 
        console.warn("Warteschlange der Ameise ist vollgelaufen, neuer Befehl wird ignoriert!")
        return {then: function() {}}
      }
      if (jobsoutofdate && !execmode) {
        jobsoutofdate = false
        oldjobs = jobs
        jobs = []
      }
      var callback
      var newjob = new Job(type, opts, function(){
        return cb.call(this, function(){
          runNoExec(function(){
            if (callback)
              callback()
          })
        })
      })
      if (execmode)
        jobs.push(newjob)
      else
        jobs.unshift(newjob)
      return {then: function(cb){ callback = cb}}
    }
    
    function addSimpleJob(type, opts, f) {
      opts.direct = true
      return addJob(type, opts, function(callback){
        var result = f.call(this)
        if (result && result.then) {
          result.then(callback)
        } else {
          callback()
        }
        return true
      })
    }
    
    function runNoExec(f) {
      var flagbkup = execmode
      execmode = false
      f()
      execmode = flagbkup
    }
    
    this.markJobsAsOutOfDate = function(){
      jobsoutofdate = true
    }
    
    this.insertOldJobs = function(){
      if (jobsoutofdate) {
        jobsoutofdate = false
      } else {
        jobs = oldjobs.concat(jobs)
        oldjobs = []
      }
    }
    
    // jobs - basic movement
    this.addGoJob = function(steps, auto) {
      return addJob("GO", {auto: auto}, function(callback){
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
          finished = true
          runNoExec(function(){
            Sim.API.callUserFunc("RandErreicht")
          })
        }
        if (finished) callback()
        return finished;
      })
    }
    
    this.addTurnJob = function(degree, auto) {
      return addJob("TURN", {auto: auto}, function(callback){
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
        if (finished) callback()
        return finished;
      })
    }
    
    // jobs - composite movement
    this.addTurnToJob = function(angle) {
      return addSimpleJob("TURNTO", {}, function(){
        var rotation = Sim.Util.getRotation(my.heading, angle)
        if (rotation != 0)
          return this.addTurnJob(rotation)
      })
    }
    
    this.addTurnToObj = function(obj) {
      return addSimpleJob("TURNTOOBJ", {}, function(){
        var angle = Sim.Util.getDir(Sim.API.curAnt.getPos(), obj.getPos());
        return Sim.API.curAnt.addTurnToJob(angle)
      })
    }
    
    this.addTurnAway = function(obj) {
      return addSimpleJob("TURNAWAY", {}, function(){
        var angle = (Sim.Util.getDir(Sim.API.curAnt.getPos(), obj.getPos()) + 180) % 360;
        return Sim.API.curAnt.addTurnToJob(angle)
      })
    }
    
    // jobs - aiming movement
    this.addGotoJob = function(dest, col, type, direct) {
      return addJob("DEST", {direct:direct}, function(callback){
        if (col !== undefined) {
          if (col.indexOf(dest) < 0) {
            callback()
            return true
          }
        }
        var snap = Sim.Opts.Toleranz
        if (type == "Apfel") {
          snap = Sim.Opts.ApfelRadius / 3
          if (!dest.needHelp(Sim.API.curAnt)) {
            callback()
            return true
          }
        }
        if (type == "Wanze") {
          snap = Sim.Opts.WanzenKampfweite * 2
        }
        var des = dest.getPos()
        var d = Sim.Util.dist(my.pos, des)
        if (d <= snap){
          if (type == "Bau")
            reachedHome()
          callback()
          return true
        } else {
          var angle = Sim.Util.getDir(my.pos, des)
          var rotation = Sim.Util.getRotation(my.heading, angle)
          var v = Sim.Opts.ZufallRichtungsVerschiebung
          rotation += Math.floor(Sim.rng()*v*2-v)
          // prepend-mode, so take care of order
          if (type == "Wanze") {
            this.addGoJob(Math.min(50, Math.max(d-snap+0.5, 0)), true)
          } else {
            this.addGoJob(Math.min(50, d), true)
          }
          if (rotation != 0)
            this.addTurnJob(rotation, true)
          return false
        }
      })
    }
    
    this.gotoHome = function(direct){
      return this.addGotoJob(myHill(), Sim.hills, "Bau", direct)
    }
    
    // jobs - food
    this.addTakeJob = function() {
      return addSimpleJob("TAKESUGAR", {}, function(){
        var sugar = Sim.Util.closest(my.pos, Sim.sugars, Sim.Opts.ZuckerRadius)
        if (!sugar) {
          return
        }
        while(my.load < Sim.Opts.AmeiseTragkraft) {
          var t = sugar.unload1Sugar();
          if (t) {
            my.load++;
          } else {
            break;
          }
        }
        updateGO()
      })
    }
    
    this.addDropJob = function() {
      return addSimpleJob("DROPSUGAR", {}, function(){
        var d = Sim.Util.dist(my.pos, myHill().getPos())
        if (d <= Sim.Opts.HügelRadius) {
          addSugar(my.load)
        }
        my.load = 0;
        updateGO()
      })
    }
    
    this.addAppleSetupJob = function() {
      return addSimpleJob("APPLESETUP", {}, function(){
        var apple = Sim.Util.closest(my.pos, Sim.apples, Sim.Opts.ApfelRadius)
        if (apple && apple.needHelp(Sim.API.curAnt)) {
          apple.addAnt(Sim.API.curAnt)
          return this.addAppleJob(apple)
        }
      })
    }
    
    this.addAppleJob = function(apple) {
      return addJob("APPLE", {apple:apple, direct:true}, function(callback){
        var finished = false
        if (Sim.apples.indexOf(apple) < 0)
          finished = true
        else if (apple.ants.indexOf(this) < 0)
          finished = true
        else {
          if (apple.heading !== undefined)
            my.heading = apple.heading
          this.setPos({x:my.pos.x + apple.dx, y:my.pos.y + apple.dy});
        }
        if (finished) callback()
        return finished;
      })
    }
    
    this.isCarryingApple = function() {
      if (jobs.length > 0) {
        var curJob = jobs[jobs.length - 1];
        if (curJob.type == "APPLE" && Sim.apples.indexOf(curJob.opts.apple) >= 0) {
          return true
        }
      }
      return false
    }
    
    // jobs - misc
    this.addWaitJob = function(rounds) {
      return addJob("WAIT", {}, function(callback){
        var result = rounds-- <= 0
        if (result == true) {
          callback()
        }
        return result
      })
    }
    
    this.addPoisonJob = function() {
      return addSimpleJob("POISON", {}, function(){
        if (my.poison) {
          my.poison = false
          Sim.poisons.push(new Sim.Poison(my.playerid, {x:my.pos.x, y:my.pos.y}))
        }
      })
    }
    
    // jobs - communication
    this.addSendMessageJob = function(topic, arg1, arg2, arg3, limit) {
      return addSimpleJob("SEND", {}, function() {
        myHill().addMarker(my.pos)
        var curAnts = []
        Sim.ants.forEach(function (ant) {
          if (ant.getPlayerid() != my.playerid)
            return
          curAnts.push(ant);
        })
        curAnts.sort(function(a, b) {
          return Sim.Util.dist(a.getPos(), my.pos) > Sim.Util.dist(b.getPos(), my.pos) ? 1 : -1
        })
        var count = 0
        curAnts.forEach(function (ant) {
          if (ant == Sim.API.curAnt || !ant.isSensing())
            return
          if (limit && count >= limit)
            return
          var bkup = Sim.API.curAnt
          if (bkup !== undefined)
            Sim.API.close()
          Sim.API.setAnt(ant)
          runNoExec(function(){
            Sim.API.callUserFunc(":" + topic, [arg1, arg2, arg3])
          })
          count++
          Sim.API.close()
          if (bkup !== undefined)
            Sim.API.setAnt(bkup)
        })
      })
    }
    
    // event loop
    function execJob() {
      //if (my.key == "0:1")
      //  console.log(JSON.stringify(jobs))
      if (jobs.length > 0) {
        var curJob = jobs[jobs.length - 1];
        execmode = true
        var finished = curJob.callback.bind(this)();
        execmode = false
        if (finished) {
          var index = jobs.indexOf(curJob);
          if (index >= 0) {
            jobs.splice(index, 1)
          }
        }
      }
    }
    
    // sensing
    this.isSensing = function() {
      if (jobs.length == 0)
        return true

      var i = jobs.length - 1
      while (i > 0 && jobs[i].opts.auto)
        i--
      var curjob = jobs[i]
      return curjob.opts.direct ? false : true
    }
    
    var sugarSeen = []
    
    function senseSugar() {
      if (!this.isSensing()) return
      var sugars = Sim.Util.inRange(my.pos, Sim.sugars, Sim.Opts.AmeiseSichtweite)
      sugars.sort(function(a,b){
        return Sim.Util.dist(my.pos, a.getPos()) - Sim.Util.dist(my.pos, b.getPos())
      })
      sugars.forEach(function(sugar){
        if (sugarSeen.indexOf(sugar) < 0) {
          sugarSeen.push(sugar)
          Sim.API.callUserFunc("SiehtZucker", [sugar])
        }
      })
      sugarSeen = sugarSeen.filter(function(s) {
        return sugars.indexOf(s) >= 0
      })
    }
    
    var appleSeen = []
    
    function senseApple() {
      if (!this.isSensing()) return
      var apples = Sim.Util.inRange(my.pos, Sim.apples, Sim.Opts.AmeiseSichtweite)
      apples.sort(function(a,b){
        return Sim.Util.dist(my.pos, a.getPos()) - Sim.Util.dist(my.pos, b.getPos())
      })
      apples.forEach(function(apple){
        if (appleSeen.indexOf(apple) < 0) {
          appleSeen.push(apple)
          Sim.API.callUserFunc("SiehtApfel", [apple])
        }
      })
      appleSeen = appleSeen.filter(function(a) {
        return apples.indexOf(a) >= 0
      })
    }
    
    var previousBug
    var previousBugAhead
    
    function senseBug() {
      var bug = Sim.Util.closest(my.pos, Sim.bugs, Sim.Opts.AmeiseSichtweite);
      if (bug) {
        var delta = Math.abs(my.heading - Sim.Util.getDir(my.pos, bug.getPos()))
        if (delta > 180) {
          delta -= 360
          delta = Math.abs(delta)
        }
        if (delta < Sim.Opts.WanzeVorausWinkel) {
          if (bug != previousBugAhead) {
            Sim.API.callUserFunc("SiehtWanzeVoraus", [bug])
            previousBugAhead = bug
          }
        }
        if (bug != previousBug) {
          Sim.API.callUserFunc("SiehtWanze", [bug]);
          previousBug = bug;
        }
      } else {
        previousBug = undefined
        previousBugAhead = undefined
      }
    }
    
    var previousAnt
    
    function senseOtherTeam() {
      if (!Sim.players[my.playerid].getKI().Bus.has("SiehtGegner"))
        return
      var ant = Sim.Util.closest(my.pos, Sim.ants, Sim.Opts.AmeiseSichtweite,
        function(a){
          return a.getPlayerid() == my.playerid
        });
      if (ant) {
        if (ant != previousAnt) {
          Sim.API.callUserFunc("SiehtGegner", [ant]);
          previousAnt = ant;
        }
      } else {
        previousAnt = undefined;
      }
    }
    
    function wait() {
      if(jobs.length == 0) {
        Sim.API.callUserFunc("IstUntätig")
      }
    }
    
    // update
    this.update = function() {
      if (dummy) return
      Sim.API.setAnt(this);
      execJob.bind(this)()
      senseSugar.bind(this)()
      senseApple.bind(this)()
      senseBug()
      senseOtherTeam.bind(this)()
      wait()
      Sim.API.callUserFunc("Tick")
      Sim.API.close();
    }  
    
    // constructor
    setColor()
    updateGO()
    
    // Teams setzen
    if (!dummy) {
      var ki = myPlayer().getKI()
      if (ki.teams !== undefined) {
        my.team = ki.teams[ki.curTeamCount]
        ki.curTeamCount++
        if (ki.curTeamCount >= ki.teams.length) {
          ki.curTeamCount = 0
        }
      }
    }
  }
  
  Sim.Ant = Ant

})(AntIT._rawsim)
