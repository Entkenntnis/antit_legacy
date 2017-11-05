// HILL

function Hill(pos, playerid) {

  Hill.counter = Hill.counter || 1;
  Hill.markerCounter = Hill.markerCounter || 1
  
  var my = makeAttributes(this, {
    pos: pos,
    playerid: playerid,
    energy: Optionen.AnfangsEnergie,
    feedIndex: 0,
    timeToNextAnt: Optionen.AmeiseWartezeit
  })
  
  var key = Hill.counter++
  var markers = []
  
  function updateGO() {
    Sim.bus.emit('move-hill', key, my.pos)
  }
  
  function setFlagColor() {
    Sim.bus.emit('change-hill-color', key, Optionen.SpielerFarben[my.playerid])
  }
  
  this.addMarker = function() {
    var key = Hill.markerCounter++
    Sim.bus.emit('add-marker', key,
      my.pos,
      Optionen.SpielerFarben[my.playerid])
    markers.push({
      key: key,
      cycle: 0
    })
  }
  
  this.addEnergy = function(val) {
    my.energy += val;
  }
  
  this.addFeed = function(val) {
    my.feedIndex += val;
  }
  
  this.update = function() {
    var ownAnts = 0;
    Sim.ants.forEach(function(ant) {
      if (ant.getPlayerid() == my.playerid)
        ownAnts++;
    });
    if (my.timeToNextAnt-- <= 0 && ownAnts < Optionen.AmeisenMaximum
          && my.energy >= Optionen.EnergieFürAmeise) {
      my.timeToNextAnt = Optionen.AmeiseWartezeit;
      my.energy -= Optionen.EnergieFürAmeise;
      var antPos = {x:pos.x,y:pos.y};
      var angle = Sim.rng()*Math.PI*2;
      var radius = Optionen.HügelRadius + (Sim.rng()*10 - 5);
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      var newAnt = new Ant(antPos, my.playerid)
      Sim.ants.push(newAnt);
      Sim.players[my.playerid].addAnt();
      API.setAnt(newAnt);
      API.callUserFunc("IstGeboren");
      API.close();
    }
    removeIf(markers, function(m){
      m.cycle++
      if (m.cycle >= Optionen.MarkerDauer) {
        Sim.bus.emit('remove-marker', m.key)
        return true
      }
      Sim.bus.emit('update-marker', m.key)
      return false
    })
  }
  
  
  // constructor
  setFlagColor()
  updateGO();
}
