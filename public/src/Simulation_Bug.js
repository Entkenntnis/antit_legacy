// BUG

function Bug(_pos) {
  
  Bug.Counter = Bug.Counter || 1;
  var key = Bug.Counter++;
  var heading = Math.floor(Math.random()*360);
  var pos = _pos;
  var togo = 0;
  var torotate = 0;
  var towait = 0;
  
  function updateGO() {
    vw.bugStore.get(key).position.copy(Sim.playground.toViewPos(pos));
    vw.bugStore.get(key).rotation.y = -heading / 180 * Math.PI + Math.PI;
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.update = function() {
    var ant = closest(pos, Sim.ants, Optionen.WanzenKampfweite);
    if (ant !== undefined) {
      ant.subEnergy(Optionen.WanzenAngriff, this);
    }
    if (torotate != 0) {
      heading += Math.sign(torotate) * Optionen.WanzeDrehgeschwindigkeit;
      torotate -= Math.sign(torotate);
    } else if (togo > 0) {
      var newpos = moveDir(pos, heading, Optionen.WanzeGeschwindigkeit);
      if (!Sim.playground.isInBound(newpos, 10)) {
        torotate = Math.round(180 / Optionen.WanzeDrehgeschwindigkeit);
        togo = 0;
      } else {
        pos = newpos;
      }
      togo--;
    } else if (towait != 0){
      towait--;
    } else {
      towait = 30;
      torotate = Math.floor(Math.random()*40-20);
      togo = 60;
      var destHill = closest(pos, Sim.hills, Optionen.WanzenHügelAbstand);
      if (destHill !== undefined) {
        var angle = getDir(pos, destHill.getPos()) + 180;
        torotate = Math.round(getRotation(heading, angle)/Optionen.WanzeDrehgeschwindigkeit);
      } else {
        ant = closest(pos, Sim.ants, Optionen.WanzeSichtweite);
        if (ant!= undefined) {
          var dir = getDir(pos, ant.getPos());
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
