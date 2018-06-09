(function(Sim){

  // HILL

  function Hill(pos, playerid) {

    Hill.counter = Hill.counter || 1;
    Hill.markerCounter = Hill.markerCounter || 1
    
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      playerid: playerid,
      energy: Sim.Opts.AnfangsEnergie,
      feedIndex: 0,
      timeToNextAnt: Sim.Opts.AmeiseWartezeit,
    })
    
    var key = Hill.counter++
    var markers = []
    
    function updateGO() {
      Sim.Bus.emit('move-hill', key, my.pos)
    }
    
    function setFlagColor() {
      Sim.Bus.emit('change-hill-color', key, Sim.Opts.SpielerFarben[Sim.colors[my.playerid]])
    }
    
    this.addMarker = function(pos) {
      var key = Hill.markerCounter++
      Sim.Bus.emit('add-marker', key,
        pos,
        Sim.Opts.SpielerFarben[Sim.colors[my.playerid]])
      markers.push({
        key: key,
        cycle: 0,
        pos:pos
      })
    }
    
    this.addEnergy = function(val) {
      my.energy += val;
    }
    
    this.addFeed = function(val) {
      my.feedIndex += val;
    }
    
    function getSpawnPoint(pos) {
      var antPos = {x:pos.x,y:pos.y};
      var angle = Sim.rng()*Math.PI*2;
      var radius = Sim.Opts.HügelRadius + (Sim.rng()*10 - 5);
      if (Sim.Opts.Levelmodus) {
        if (Sim.Opts.SpawnWinkel !== undefined)
          angle = Sim.Opts.SpawnWinkel
        if (Sim.Opts.SpawnRadius !== undefined)
          radius = Sim.Opts.SpawnRadius
      }
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      return antPos
    }
    
    function spawnAnt() {
      if (my.energy >= Sim.Opts.EnergieFürAmeise &&
        Sim.players[my.playerid].getAnts() < Sim.Opts.AmeisenMaximum) {
        my.energy -= Sim.Opts.EnergieFürAmeise;
        var newAnt = new Sim.Ant(getSpawnPoint(pos), my.playerid)
        Sim.ants.push(newAnt);
        if (Sim.Opts.Levelmodus) {
          Sim.Level.onAntSpawn(newAnt)
        }
        Sim.players[my.playerid].addAnt();
        Sim.API.setAnt(newAnt);
        Sim.API.callUserFunc("IstGeboren");
        Sim.API.close();
      }
    }
    
    this.subEnergy = function(amount) {
      my.energy = Math.max(0, my.energy - amount)
    }
    
    this.update = function() {
      if (my.timeToNextAnt-- <= 0
        && Sim.players[my.playerid].getAnts() < Sim.Opts.AmeisenMaximum
        && my.energy >= Sim.Opts.EnergieFürAmeise) {
        my.timeToNextAnt = Sim.Opts.AmeiseWartezeit;
        spawnAnt()
      }
      Sim.Util.removeIf(markers, function(m){
        m.cycle++
        if (m.cycle >= Sim.Opts.MarkerDauer) {
          Sim.Bus.emit('remove-marker', m.key)
          return true
        }
        Sim.Bus.emit('update-marker', m.key)
        return false
      })
    }
    
    // constructor
    setFlagColor()
    updateGO();
  }
  
  Sim.Hill = Hill

})(AntIT._rawsim)
