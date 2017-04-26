// SUGAR

function Sugar(_pos) {

  Sugar.counter = Sugar.counter || 1;
  var pos = _pos;
  var key = Sugar.counter++;
  var amount = Optionen.ZuckerGröße;
  
  function updateGO() {
    var GO = Vw.sugarStore.get(key);
    GO.position.copy(Sim.playground.toViewPos(pos));
    var linScale = amount / Optionen.ZuckerGröße * Optionen.ZuckerVergrößerung;
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001);
    GO.scale.set(scale, scale, scale);
  }
  
  this.getAmount = function() {
    return amount;
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.unload1Sugar = function() {
    if (amount > 0) {
      amount--;
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
