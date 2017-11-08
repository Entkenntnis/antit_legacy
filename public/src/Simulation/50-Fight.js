
(function(Sim){

  // Stellt Funktionen zur Verfügung, um Kampf zu aktivieren
  
  var Fight = {}
  
  Fight.init = function(){
    AntIT.NeueAmeise("Spieler 1")
    AntIT.NeueAmeise("Spieler 2")
    Sim.Opts.AnfangsEnergie = 40000
    Sim.Opts.WanzenProSpieler = 0
    Sim.Opts.NahrungMindestEntfernung = 150
    Sim.Opts.NahrungMaximalEntfernung = 400
    Sim.Opts.NahrungAbstand = 75
    Sim.Opts.SpielerFarben[0] = 0xa60202
    Sim.units = [[], []]
  }
  
  Fight.createPlayers = function(){
    var width = Sim.playground.getWidth()
    var height = Sim.playground.getHeight()
    Sim.hills.push(new Sim.Hill({x:450,y:height/2}, 0))
    Sim.hills.push(new Sim.Hill({x:width-450,y:height/2}, 1))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
    Sim.players.push(new Sim.Player(1, Sim.API.ants[1]))
  }
  
  Fight.update = function(){
    if (Sim.units) {
      Sim.units[0].forEach(function(unit) {
        unit.update()
      })
      Sim.units[1].forEach(function(unit) {
        unit.update()
      })
      Sim.Unit.update()
      Sim.Missile.update()
    }
  }
    
  Fight.spawnUnit = function(type, playerid) {
    if (type == "Arbeitermeise" && Sim.players[playerid].getAnts() >= 10)
      return
    var hill = Sim.hills[playerid]
    var info = Sim.Opts.Kampf[type]
    if (hill.getEnergy() >= info.Kosten
      && Sim.players[playerid].getUnits() + info.Anzahl <= Sim.Opts.EinheitenLimit) {
      hill.subEnergy(info.Kosten)
      for (var i = 0; i < info.Anzahl; i++) {
        var unit = new Sim.Unit(getUnitSpawnPoint(hill.getPos(), type), playerid, type)
        Sim.units[playerid].push(unit)
        if (unit.getType() == "Arbeitermeise") {
          Sim.players[unit.getPlayerid()].addAnt()
        } else
          Sim.players[playerid].addUnit()
      }
    }
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
      var radius = Sim.Opts.Kampf.Bau.Körper + k + i*3 + 1 + (Sim.rng()*10)
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
      Sim.sugars.forEach(function(sug){
        if (Sim.Util.dist(antPos, sug.getPos()) < k + 15)
          ok = false
      })
      if (ok) {
        break
      }
    }
    return antPos
  }
  
  
  
  Sim.Fight = Fight

})(AntIT._rawsim)
