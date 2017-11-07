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
        && Sim.players[my.playerid].getUnits() < 50) {
        my.energy -= 200
        var unit = new Sim.Unit(getSpawnPoint(pos), my.playerid)
        Sim.units[my.playerid].push(unit)
        Sim.players[my.playerid].addUnit()
      }
    }
    
    this.spawnAnt = spawnAnt
    this.spawnUnit = spawnUnit
    
    this.hit = function(impact){
      my.lp -= impact
      if (my.lp <= 0) {
        my.lp = 0
        Sim.players[my.playerid].addPoints(-Infinity)
        alert("Spieler " + (my.playerid + 1) + " hat verloren!")
        Sim.cycles = 10000000
      }
      Sim.players[my.playerid].updateDetails()
    }
    
    var override = false
    
    this.overrideUserControl = function(){
      override = true
    }
    
    var cooldown = 0
    
    this.update = function() {
      if (Sim.Opts.Kampfmodus) {
        if (cooldown > 0) cooldown--
        var nextEnemy = Sim.Util.closest(my.pos, Sim.units[(my.playerid+1)%2], 250)
        if (nextEnemy && cooldown == 0) {
          Sim.fireMissile(my.pos, nextEnemy, 170, 10)
          cooldown = 20
        }
        if (Sim.cycles % 40 == 39) {
          my.energy += Sim.Opts.GrundEnergie
          Sim.players[my.playerid].updateDetails()
        }
      }
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
