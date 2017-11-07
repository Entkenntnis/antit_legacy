
(function(Sim){

  // Fighting Unit
  
  function Unit(pos, playerid) {
    
    Unit.counter = Unit.counter || 1
    
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      playerid : playerid,
      key : "unit" + Unit.counter++,
      heading : Math.floor(Sim.rng()*360)
    })
    
    function updateGO() {
      Sim.bus.emit('move-unit', my.key,
        my.pos,
        -my.heading / 180 * Math.PI + Math.PI)
    }
    
    this.update = function(){
      pos.x += 1
      updateGO()
    }
    
    // constructor
    Sim.bus.emit('change-unit-color', my.key, Sim.Opts.SpielerFarben[my.playerid])
  }
  
  Sim.Unit = Unit


})(AntIT._rawsim)
