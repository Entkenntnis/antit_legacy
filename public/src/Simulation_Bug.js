// BUG

function Bug(pos) {
  
  Bug.counter = Bug.counter || 1;
  
  var my = makeAttributes(this, {pos: pos})
  
  var key = Bug.counter++;
  var heading = Math.floor(Sim.rng()*360);
  var togo = 0;
  var torotate = 0;
  var towait = 0;
  
  function updateGO() {
    Sim.bus.emit('move-bug', key,
      Sim.playground.toViewPos(my.pos),
      -heading / 180 * Math.PI + Math.PI)
  }
  
  this.update = function() {
    var ant = closest(my.pos, Sim.ants, Optionen.WanzenKampfweite);
    if (ant !== undefined) {
      ant.subEnergy(Optionen.WanzenAngriff, this);
    }
    if (torotate != 0) {
      heading += Math.sign(torotate) * Optionen.WanzeDrehgeschwindigkeit;
      torotate -= Math.sign(torotate);
    } else if (togo > 0) {
      var newpos = moveDir(my.pos, heading, Optionen.WanzeGeschwindigkeit);
      if (!Sim.playground.isInBound(newpos, 10)) {
        torotate = Math.round(180 / Optionen.WanzeDrehgeschwindigkeit);
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
      var destHill = closest(my.pos, Sim.hills, Optionen.WanzenHügelAbstand);
      if (destHill !== undefined) {
        var angle = getDir(my.pos, destHill.getPos()) + 180;
        torotate = Math.round(getRotation(heading, angle)/Optionen.WanzeDrehgeschwindigkeit);
      } else {
        ant = closest(my.pos, Sim.ants, Optionen.WanzeSichtweite);
        if (ant!= undefined) {
          var dir = getDir(my.pos, ant.getPos());
          var rot = getRotation(heading, dir);
          torotate = Math.round(rot/Optionen.WanzeDrehgeschwindigkeit);
        }
      }
    }
    updateGO();
  }
  
  // constructor
  updateGO();
}
