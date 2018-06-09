"use strict";
(function(Sim){
  
  var poisonCounter = 1

  function Poison(playerid, pos){
  
    var my = Sim.Util.makeAttributes(this, {
      id: poisonCounter++,
      ttl: 160,
      playerid: playerid,
      pos: pos,
    })
    
    Sim.Bus.emit('spawn-poison', my.id, pos, Sim.Opts.SpielerFarben[Sim.colors[playerid]])
    
    this.update = function(){
      my.ttl--
      if (my.ttl <= 0) {
        Sim.Bus.emit('remove-poison', my.id)
      }
    }
  
  }
  
  Sim.Poison = Poison

})(AntIT._rawsim)
