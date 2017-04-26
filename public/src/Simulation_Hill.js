// HILL

function Hill(pos, playerid) {

  Hill.counter = Hill.counter || 1;
  
  var my = makeAttributes(this, {
    pos: pos,
    playerid: playerid,
    energy: Optionen.AnfangsEnergie,
    feedIndex: 0,
    timeToNextAnt: Optionen.AmeiseWartezeit
  })
  
  var key = Hill.counter++
  
  function updateGO() {
    Vw.hillStore.get(key).position.copy(Sim.playground.toViewPos(my.pos));
  }
  
  function setFlagColor() {
    Vw.setHillFlagColor(Vw.hillStore.get(key), Optionen.SpielerFarben[my.playerid]);
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
  }
  
  // constructor
  setFlagColor()
  updateGO();
}
