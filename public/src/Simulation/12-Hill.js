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
      lp : Sim.Opts.BauTrefferpunkte,
    })
    
    var key = Hill.counter++
    var markers = []
    
    function updateGO() {
      Sim.bus.emit('move-hill', key, my.pos)
    }
    
    function setFlagColor() {
      Sim.bus.emit('change-hill-color', key, Sim.Opts.SpielerFarben[my.playerid])
    }
    
    this.addMarker = function() {
      var key = Hill.markerCounter++
      Sim.bus.emit('add-marker', key,
        my.pos,
        Sim.Opts.SpielerFarben[my.playerid])
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
    
    function getSpawnPoint(pos) {
      var antPos = {x:pos.x,y:pos.y};
      var angle = Sim.rng()*Math.PI*2;
      var radius = Sim.Opts.HügelRadius + (Sim.rng()*10 - 5);
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
        Sim.players[my.playerid].addAnt();
        Sim.API.setAnt(newAnt);
        Sim.API.callUserFunc("IstGeboren");
        Sim.API.close();
      }
    }
    
    function spawnUnit() {
      if (Sim.Opts.Kampfmodus && my.energy >= 200
        && Sim.players[my.playerid].getUnits() < 10) {
        my.energy -= 200
        var unit = new Sim.Unit(getSpawnPoint(pos), my.playerid)
        Sim.units[my.playerid].push(unit)
        Sim.players[my.playerid].addUnit()
      }
    }
    
    this.spawnAnt = spawnAnt
    this.spawnUnit = spawnUnit
    
    var override = false
    
    this.overrideUserControl = function(){
      override = true
    }
    
    this.update = function() {
      if (my.timeToNextAnt-- <= 0
        && Sim.players[my.playerid].getAnts() < Sim.Opts.AmeisenMaximum
        && my.energy >= Sim.Opts.EnergieFürAmeise) {
        my.timeToNextAnt = Sim.Opts.AmeiseWartezeit;
        if(!Sim.Opts.Kampfmodus || override) spawnAnt()
      }
      Sim.Util.removeIf(markers, function(m){
        m.cycle++
        if (m.cycle >= Sim.Opts.MarkerDauer) {
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
  
  Sim.Hill = Hill

})(AntIT._rawsim)
