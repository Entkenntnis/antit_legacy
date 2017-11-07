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
    
    function spawnAnt() {
      console.log("hi")
      if (my.energy >= Sim.Opts.EnergieFürAmeise &&
        ownAnts < Sim.Opts.AmeisenMaximum) {
        my.energy -= Sim.Opts.EnergieFürAmeise;
        var antPos = {x:pos.x,y:pos.y};
        var angle = Sim.rng()*Math.PI*2;
        var radius = Sim.Opts.HügelRadius + (Sim.rng()*10 - 5);
        antPos.x += Math.cos(angle)*radius;
        antPos.y += Math.sin(angle)*radius;
        var newAnt = new Sim.Ant(antPos, my.playerid)
        Sim.ants.push(newAnt);
        Sim.players[my.playerid].addAnt();
        Sim.API.setAnt(newAnt);
        Sim.API.callUserFunc("IstGeboren");
        Sim.API.close();
      }
    }
    
    this.spawnAnt = spawnAnt
    var ownAnts = 0
    
    this.update = function() {
      ownAnts = 0;
      Sim.ants.forEach(function(ant) {
        if (ant.getPlayerid() == my.playerid)
          ownAnts++;
      });
      if (my.timeToNextAnt-- <= 0 && ownAnts < Sim.Opts.AmeisenMaximum
            && my.energy >= Sim.Opts.EnergieFürAmeise) {
        my.timeToNextAnt = Sim.Opts.AmeiseWartezeit;
        if (!Sim.Opts.Kampfmodus) spawnAnt()
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
