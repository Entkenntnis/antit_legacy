// SUGAR

function Sugar(pos) {

  Sugar.counter = Sugar.counter || 1;
  
  var my = makeAttributes(this, {
    pos: pos,
    amount: Optionen.ZuckerGröße
  })
  
  var key = Sugar.counter++
  
  function updateGO() {
    var GO = Vw.sugarStore.get(key);
    GO.position.copy(Sim.playground.toViewPos(my.pos));
    var linScale = my.amount / Optionen.ZuckerGröße * Optionen.ZuckerVergrößerung;
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001);
    GO.scale.set(scale, scale, scale);
  }
  
  this.unload1Sugar = function() {
    if (my.amount > 0) {
      my.amount--;
      updateGO();
      return true;
    } else {
      if (Vw.sugarStore.has(key))
        Vw.sugarStore.remove(key);
      return false;
    }
  }
  
  // constructor
  updateGO();
}
