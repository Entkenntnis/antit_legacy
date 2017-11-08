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
    
    this.subEnergy = function(amount) {
      my.energy = Math.max(0, my.energy - amount)
    }
    
    this.hit = function(impact){
      my.lp -= impact
      if (my.lp <= 0) {
        my.lp = 0
        Sim.players[my.playerid].addPoints(-Infinity)
        if (Sim.cycles != Infinity)
          alert("Spieler " + (my.playerid + 1) + " hat verloren!")
        Sim.cycles = Infinity
      }
      Sim.players[my.playerid].updateDetails()
    }
    
    var cooldown = 0
    
    function fightUpdate(){
      if (cooldown > 0) cooldown--
      var nextEnemy = Sim.Util.closest(my.pos, Sim.units[(my.playerid+1)%2],
        Sim.Opts.Kampf.Bau.Sichtweite)
      if (nextEnemy && cooldown == 0) {
        Sim.Missile.fire(my.pos, nextEnemy, Sim.Opts.Kampf.Bau.Schaden,
          Sim.Opts.Kampf.Bau.GGeschw)
        cooldown = Sim.Opts.Kampf.Bau.Trefferrate
      }
      if (Sim.cycles % 40 == 39) {
        my.energy += Sim.Opts.GrundEnergie
        Sim.players[my.playerid].updateDetails()
      }
    }
    
    this.update = function() {
      if (Sim.Opts.Kampfmodus) fightUpdate()
      if (my.timeToNextAnt-- <= 0
        && Sim.players[my.playerid].getAnts() < Sim.Opts.AmeisenMaximum
        && my.energy >= Sim.Opts.EnergieFürAmeise) {
        my.timeToNextAnt = Sim.Opts.AmeiseWartezeit;
        if(!Sim.Opts.Kampfmodus) spawnAnt()
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
