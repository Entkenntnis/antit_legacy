// APPLE

function Apple(pos) {
  
  Apple.counter = Apple.counter || 1;
  
  var my = makeAttributes(this, {pos:pos, pid:undefined})
  
  var key = Apple.counter++;
  var moving = false;
  
  this.ants = [];
  this.dx = 0;
  this.dy = 0;
  this.heading = undefined;
  
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
  
  this.letDown = function(){
    moving = false
    my.pid = undefined
    this.heading = undefined
    this.dx = 0
    this.dy = 0
    updateGO()
  }
  
  function moveApple() {
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
  }
  
  function removeInactiveAnts() {
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
      moving = true
      my.pid = winnerID
    } else {
      this.letDown()
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
