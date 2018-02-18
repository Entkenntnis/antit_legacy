(function(Sim){

  // SUGAR

  function Sugar(pos) {

    Sugar.counter = Sugar.counter || 1;
    
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      amount: Sim.Opts.ZuckerGröße
    })
    
    var key = Sugar.counter++
    
    function updateGO() {
      var linScale = my.amount / Sim.Opts.ZuckerGröße * Sim.Opts.ZuckerVergrößerung
      var scale = Math.max(Math.pow(linScale, 1/2), 0.000001)
      Sim.Bus.emit('move-sugar', key, my.pos, scale)
    }
    
    this.unload1Sugar = function() {
      if (my.amount > 0) {
        my.amount--;
        updateGO();
        return true;
      } else {
        Sim.Bus.emit('remove-sugar', key)
        return false;
      }
    }
    
    this.getKey = function() {
      return key
    }
    
    // constructor
    updateGO();
  }
  
  Sim.Sugar = Sugar

})(AntIT._rawsim)
