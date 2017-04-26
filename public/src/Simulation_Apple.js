// APPLE

function Apple(pos) {
  
  Apple.counter = Apple.counter || 1;
  
  var my = makeAttributes(this, {pos:pos, pid:undefined})
  
  var key = Apple.counter++;
  var moving = false;
  
  this.ants = [];
  this.dx = 0;
  this.dy = 0;
  this.heading = 0;
  
  function updateGO() {
    var GO = Vw.appleStore.get(key);
    var height = moving?5:0;
    GO.position.copy(Sim.playground.toViewPos(my.pos, height));
  }
  
  this.addAnt = function(ant) {
    if (this.needHelp(ant)) {
      this.ants.push(ant);
    }
  }
  
  this.needHelp = function(ant) {
    if (my.pid === undefined) {
      return true;
    } else if (ant.getPlayerid() === my.pid && this.ants.length < Optionen.MaximumAmeisenFürApfel) {
      return true;
    }
    return false;
  }
  
  this.reachHome = function(id) {
    Vw.appleStore.remove(key);
    Sim.players[id].addPoints(Optionen.PunkteProApfel);
    Sim.hills[id].addEnergy(Optionen.EnergieProApfel);
    Sim.players[id].addApple();
  }
  
  this.update = function() {
    if (my.pid !== undefined) {
      this.heading = getDir(this.getPos(), Sim.hills[my.pid].getPos());
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
      my.pid = bestid;
    } else {
      moving = false;
      my.pid = undefined;
    }
  }
  
  // constructor
  updateGO();
}
