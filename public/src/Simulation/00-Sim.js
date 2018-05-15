// ALL MANAGER
"use strict";
(function(Optionen){

  var Simulation = function() {

    this.Bus = Minibus.create()
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
      Sim.poisons = []
      Sim.memories = {}
      
      if (Sim.Opts.Kampfmodus) Sim.Fight.init()
      if (Sim.Opts.Levelmodus) Sim.Level.init()
      
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
      } else if (Sim.Opts.Levelmodus) {
        Sim.Level.createPlayers()
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
      
      if (Sim.Opts.Kampfmodus) Sim.Fight.update()
      
      if (Sim.Opts.Levelmodus) Sim.Level.update()
      
      Sim.hills.forEach(function(hill) {
        hill.update();
      });
      
      Sim.poisons.forEach(function(poison){
        poison.update()
      })
      
      Sim.Util.removeIf(Sim.poisons, function(p){
        return p.getTtl() <= 0
      })
      
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
    getLevel : function() { return Sim.Level },
    getBus : function() { return Sim.Bus },
    getCycles : function() { return Sim.cycles },
    getPoints : function() { 
      return Sim.players.map(function(p){return p.getPoints()}).join(",")
    },
    placeGrid : function() {
      Sim.Bus.emit('show-grid', Sim.hills[0].getPos())
    }
  }

})(AntIT._optionen)
