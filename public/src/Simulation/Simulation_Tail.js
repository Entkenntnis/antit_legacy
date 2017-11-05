// end of Simulation.js

// access for SimPulse
AntIT._sim = {
  Init : Sim.init,
  Update : Sim.update,
  getBus : function() { return Sim.bus },
  getCycles : function() { return Sim.cycles },
  getPoints : function() { 
    return Sim.players.map(function(p){return p.getPoints()}).join(",")
  },
}

// end of encapsulation
})();
