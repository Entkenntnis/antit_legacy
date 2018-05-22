(function(Sim){

  // BUG

  function Bug(pos) {
    
    Bug.counter = Bug.counter || 1;
    
    var my = Sim.Util.makeAttributes(this, {pos: pos})
    
    var key = Bug.counter++;
    var heading = Math.floor(Sim.rng()*360);
    var togo = 0;
    var torotate = 0;
    var towait = 0;
    var alive = true
    
    function updateGO() {
      if (!alive) return
      Sim.Bus.emit('move-bug', key,
        my.pos,
        -heading / 180 * Math.PI + Math.PI)
    }
    
    this.setHeading = function(h) {
      heading = h
      updateGO()
    }
    
    this.setPos = function(pos) {
      my.pos = pos
      updateGO()
    }
    
    this.update = function() {
      var ant = Sim.Util.closest(my.pos, Sim.ants, Sim.Opts.WanzenKampfweite);
      if (ant !== undefined) {
        ant.subEnergy(Sim.Opts.WanzenAngriff, this);
      }
      if (torotate != 0) {
        heading += Math.sign(torotate) * Sim.Opts.WanzeDrehgeschwindigkeit;
        torotate -= Math.sign(torotate);
      } else if (togo > 0) {
        var newpos = Sim.Util.moveDir(my.pos, heading, Sim.Opts.WanzeGeschwindigkeit);
        if (!Sim.playground.isInBound(newpos, 10)) {
          torotate = Math.round(180 / Sim.Opts.WanzeDrehgeschwindigkeit);
          togo = 0;
        } else {
          my.pos = newpos;
        }
        togo--;
      } else if (towait != 0){
        towait--;
      } else {
        towait = 30;
        torotate = Math.floor(Sim.rng()*40-20);
        togo = 60;
        var destHill = Sim.Util.closest(my.pos, Sim.hills, Sim.Opts.WanzenHügelAbstand);
        if (destHill !== undefined) {
          var angle = Sim.Util.getDir(my.pos, destHill.getPos()) + 180;
          torotate = Math.round(Sim.Util.getRotation(heading, angle)
            /Sim.Opts.WanzeDrehgeschwindigkeit);
        } else {
          ant = Sim.Util.closest(my.pos, Sim.ants, Sim.Opts.WanzeSichtweite);
          if (ant!= undefined) {
            var dir = Sim.Util.getDir(my.pos, ant.getPos());
            var rot = Sim.Util.getRotation(heading, dir);
            torotate = Math.round(rot/Sim.Opts.WanzeDrehgeschwindigkeit);
          }
        }
      }
      if (Sim.Opts.WanzeGeschwindigkeit > 0)
        updateGO()
    }
    
    this.die = function(){
      alive = false
      Sim.Bus.emit('remove-bug', key)
    }
    
    // constructor
    updateGO();
  }
  
  Sim.Bug = Bug

})(AntIT._rawsim)
