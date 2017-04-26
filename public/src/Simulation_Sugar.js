// SUGAR

function Sugar(pos) {

  Sugar.counter = Sugar.counter || 1;
  
  var my = makeAttributes(this, {
    pos: pos,
    key: Sugar.counter++,
    amount: Optionen.ZuckerGröße
  })
  
  function updateGO() {
    var GO = Vw.sugarStore.get(my.key);
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
      if (Vw.sugarStore.has(my.key))
        Vw.sugarStore.remove(my.key);
      return false;
    }
  }
  
  // constructor
  updateGO();
}
