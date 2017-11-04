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
    var height = pid!==undefined?5:0;
    Sim.bus.emit('move-apple', key, Sim.playground.toViewPos(my.pos, height))
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
        Sim.bus.emit('remove-apple', key)
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
