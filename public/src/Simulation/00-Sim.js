// ALL MANAGER
(function(Optionen){

  var Simulation = function() {

    this.bus = Minibus.create()
    this.Opts = Optionen
    
    this.init = function(seed) {
      Sim.cycles = 0
      Sim.playground = undefined
      Sim.players = []
      Sim.hills = []
      Sim.sugars = []
      Sim.ants = []
      Sim.apples = []
      Sim.bugs = []
      Sim.memories = {}
      
      if (Sim.Opts.Kampfmodus) Sim.Fight.init()
      
      if (seed) {
        Sim.rng = new Math.seedrandom(seed)
        console.log("Seed: " + seed)
      } else
        Sim.rng = new Math.seedrandom()
      
      var area = (1 + (Sim.API.ants.length * Optionen.SpielfeldVerhältnis))
        * Optionen.SpielfeldGrundGröße;
      var width = Math.round(Math.sqrt(area * Optionen.SpielfeldVerhältnis));
      var height = Math.round(Math.sqrt(area / Optionen.SpielfeldVerhältnis));
      Sim.playground = new Sim.Playground(width, height);
    
      if (Sim.Opts.Kampfmodus) {
        Sim.Fight.createPlayers()
      } else {
        for(var i = 0; i < Sim.API.ants.length; i++) {
          Sim.hills.push(new Sim.Hill(Sim.playground.getHillPos(), i));
          Sim.players.push(new Sim.Player(i, Sim.API.ants[i]));
        }
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
      
      if (Sim.units) {
        Sim.units[0].forEach(function(unit) {
          unit.update()
        })
        Sim.removeDeadUnits(Sim.units[0])
        Sim.units[1].forEach(function(unit) {
          unit.update()
        })
        Sim.removeDeadUnits(Sim.units[1])
        Sim.updateMissiles()
      }
      
      Sim.hills.forEach(function(hill) {
        hill.update();
      });
      
      Sim.playground.update();
      Sim.cycles++
    }
    
    this.playerCount = function() {
      return Sim.players.length;
    }
  }

  var Sim = new Simulation()
  
  AntIT._rawsim = Sim
  
  window.AntJS = AntIT

  AntIT._sim = {
    Init : Sim.init,
    Update : Sim.update,
    getBus : function() { return Sim.bus },
    getCycles : function() { return Sim.cycles },
    getPoints : function() { 
      return Sim.players.map(function(p){return p.getPoints()}).join(",")
    },
    setHillOverride : function() {
      Sim.hills.forEach(function(h){
        h.overrideUserControl()
      })
    },
  }

})(AntIT._optionen)
