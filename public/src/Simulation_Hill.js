// HILL

function Hill(_pos, _playerid) {

  Hill.counter = Hill.counter || 1;
  var pos = _pos;
  var playerid = _playerid;
  var key = Hill.counter++;
  var energy = Optionen.AnfangsEnergie;
  var cfi = 0;
  var timeToNextAnt = Optionen.AmeiseWartezeit;
  
  function updateGO() {
    Vw.hillStore.get(key).position.copy(Sim.playground.toViewPos(pos));
  }
  
  this.getPos = function() {
    return pos;
  }
  
  this.getPlayerid = function() {
    return playerid;
  }
  
  this.getEnergy = function() {
    return energy;
  }
  
  this.addEnergy = function(val) {
    energy += val;
  }
  
  this.getFeedIndex = function() {
    return cfi;
  }
  
  this.addFeed = function(val) {
    cfi += val;
  }
  
  this.update = function() {
    var ownAnts = 0;
    Sim.ants.forEach(function(ant) {
      if (ant.getPlayerid() == playerid)
        ownAnts++;
    });
    if (timeToNextAnt-- <= 0 && ownAnts < Optionen.AmeisenMaximum
          && energy >= Optionen.EnergieFürAmeise) {
      timeToNextAnt = Optionen.AmeiseWartezeit;
      energy -= Optionen.EnergieFürAmeise;
      var antPos = {x:pos.x,y:pos.y};
      var angle = Math.random()*Math.PI*2;
      var radius = Optionen.HügelRadius + (Math.random()*10 - 5);
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      var newAnt = new Ant(antPos, playerid)
      Sim.ants.push(newAnt);
      Sim.players[playerid].addAnt();
      API.setAnt(newAnt);
      API.callUserFunc("IstGeboren");
      API.close();
    }
  }
  
  // constructor
  Vw.setHillFlagColor(Vw.hillStore.get(key), Optionen.SpielerFarben[playerid]);
  updateGO();
}
