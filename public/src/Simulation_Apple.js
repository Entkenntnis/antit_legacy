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
