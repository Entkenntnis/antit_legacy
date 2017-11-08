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
      lp : Sim.Opts.Kampf.Bau.Trefferpunkte,
    })
    
    var key = Hill.counter++
    var markers = []
    
    function updateGO() {
      Sim.Bus.emit('move-hill', key, my.pos)
    }
    
    function setFlagColor() {
      Sim.Bus.emit('change-hill-color', key, Sim.Opts.SpielerFarben[my.playerid])
    }
    
    this.addMarker = function() {
      var key = Hill.markerCounter++
      Sim.Bus.emit('add-marker', key,
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
    
    function getUnitSpawnPoint(pos, type) {
      var party0 = Sim.Util.inRange(pos, Sim.units[0], 300)
      var party1 = Sim.Util.inRange(pos, Sim.units[1], 300)
      var all = party0.concat(party1)
      var k = Sim.Opts.Kampf[type].Körper
      
      var antPos
        
      for (var i = 0; i < 100; i++) {
        antPos = {x:pos.x,y:pos.y};
        var angle = Sim.rng()*Math.PI*2;
        var radius = Sim.Opts.Kampf.Bau.Körper + k + i*2 + 1 + (Sim.rng()*10)
        antPos.x += Math.cos(angle)*radius;
        antPos.y += Math.sin(angle)*radius;
        var ok = true
        for (var j = 0; j < all.length; j++) {
          if (Sim.Util.dist(antPos, all[j].getPos()) < 
            k + 3 + Sim.Opts.Kampf[all[j].getType()].Körper) {
            ok = false
            break  
          }
        }
        if (ok) {
          break
        }
      }
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
    
    function spawnUnit(type) {
      if (Sim.Opts.Kampfmodus && my.energy >= Sim.Opts.Kampf[type].Kosten
        && Sim.players[my.playerid].getUnits() < Sim.Opts.EinheitenLimit) {
        my.energy -= Sim.Opts.Kampf[type].Kosten
        for (var i = 0; i < Sim.Opts.Kampf[type].Anzahl; i++) {
          var unit = new Sim.Unit(getUnitSpawnPoint(pos, type), my.playerid, type)
          Sim.units[my.playerid].push(unit)
          Sim.players[my.playerid].addUnit()
        }
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
        var nextEnemy = Sim.Util.closest(my.pos, Sim.units[(my.playerid+1)%2],
          Sim.Opts.Kampf.Bau.Sichtweite)
        if (nextEnemy && cooldown == 0) {
          Sim.fireMissile(my.pos, nextEnemy, Sim.Opts.Kampf.Bau.Schaden,
            Sim.Opts.Kampf.Bau.GGeschw)
          cooldown = Sim.Opts.Kampf.Bau.Trefferrate
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
