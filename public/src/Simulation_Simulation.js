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
  this.bus = Minibus.create()
  this.rng = undefined
  
  this.playerCount = function() {
    return Sim.players.length;
  }
  
  this.init = function() {
    this.rng = new Math.seedrandom("hello.")
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
