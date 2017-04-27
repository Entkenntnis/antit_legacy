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
    Vw.hillStore.get(key).position.copy(Sim.playground.toViewPos(my.pos));
  }
  
  function setFlagColor() {
    Vw.setHillFlagColor(Vw.hillStore.get(key), Optionen.SpielerFarben[my.playerid]);
  }
  
  this.addMarker = function() {
    var key = Hill.markerCounter++
    var marker = Vw.markerStore.get(key)
    Vw.setMarkerColor(marker, Optionen.SpielerFarben[my.playerid])
    marker.position.copy(Sim.playground.toViewPos(my.pos))
    var s = Optionen.MarkerGröße
    marker.scale.set(s, s, s)
    marker.material.opacity = Optionen.MarkerDurchsichtigkeit
    marker.material.needsUpdate = true
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
      var angle = Math.random()*Math.PI*2;
      var radius = Optionen.HügelRadius + (Math.random()*10 - 5);
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
      var marker = Vw.markerStore.get(m.key)
      m.cycle++
      if (m.cycle >= Optionen.MarkerDauer) {
        Vw.markerStore.remove(m.key)
        console.log("end")
        return true
      }
      var s = marker.scale.x * Optionen.MarkerVergrößerung
      marker.scale.set(s, s, s)
      marker.material.opacity *= Optionen.MarkerFading
      marker.material.needsUpdate = true
      return false
    })
  }
  
  
  // constructor
  setFlagColor()
  updateGO();
}
