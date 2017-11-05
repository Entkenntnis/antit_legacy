// ALL MANAGER
(function(Optionen){

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
    this.cycles = 0
    this.Opts = Optionen
    
    this.playerCount = function() {
      return Sim.players.length;
    }
    
    this.init = function() {
      Sim.rng = new Math.seedrandom("hello.")
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
      Sim.cycles++
    }
  }

  var Sim = new Simulation()
  
  AntIT._rawsim = Sim

  AntIT._sim = {
    Init : Sim.init,
    Update : Sim.update,
    getBus : function() { return Sim.bus },
    getCycles : function() { return Sim.cycles },
    getPoints : function() { 
      return Sim.players.map(function(p){return p.getPoints()}).join(",")
    },
  }

  if (Optionen.EntwicklerModus) {
    AntIT.Sim = Sim;
    AntIT.Optionen = Optionen;
  }

})(AntIT._optionen)
