
(function(Sim){

  // Stellt Funktionen zur Verfügung, um Kampf zu aktivieren
  
  var Fight = {}
  
  Fight.init = function(){
    AntIT.NeueAmeise("Spieler 1")
    AntIT.NeueAmeise("Spieler 2")
    Sim.Opts.AnfangsEnergie = 500
    Sim.Opts.WanzenProSpieler = 0
    Sim.Opts.NahrungMindestEntfernung = 150
    Sim.Opts.NahrungMaximalEntfernung = 400
    Sim.Opts.NahrungAbstand = 75
    Sim.Opts.SpielerFarben[0] = 0xa60202
    Sim.Opts.TicksProSekunde = 30
    Sim.Opts.Runden = 70000
    Sim.units = [[], []]
  }
  
  Fight.createPlayers = function(){
    var width = Sim.playground.getWidth()
    var height = Sim.playground.getHeight()
    Sim.hills.push(new Sim.Hill({x:450,y:height/2}, 0))
    Sim.hills.push(new Sim.Hill({x:width-450,y:height/2}, 1))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
    Sim.players.push(new Sim.Player(1, Sim.API.ants[1]))
    updateSpawnGO()
  }
  
  Fight.update = function(){
    Sim.units[0].forEach(function(unit) {
      unit.update()
    })
    Sim.units[1].forEach(function(unit) {
      unit.update()
    })
    Sim.Unit.update()
    Sim.Missile.update()
    Sim.Util.removeIf(Sim.sugars, function(sugar){
      if (sugar.getAmount() <= 0) {
        return true;
      }
      return false;
    })
    spawnSugar()
    
    if (cooldown0 > 0) cooldown0--
    if (cooldown1 > 0) cooldown1--
    if (cooldown0 == 0) Sim.players[0].resetCooldown()
    if (cooldown1 == 0) Sim.players[1].resetCooldown()
  }
  
  var cooldown0 = 0
  var cooldown1 = 0
    
  Fight.spawnUnit = function(type, playerid) {
    if (type == "Arbeitermeise" && Sim.players[playerid].getAnts() >= 10)
      return
    if ((playerid==0?cooldown0:cooldown1) > 0)
      return
    var hill = Sim.hills[playerid]
    var info = Sim.Opts.Kampf[type]
    if (hill.getEnergy() >= info.Kosten
      && Sim.players[playerid].getUnits() + info.Anzahl <= Sim.Opts.EinheitenLimit) {
      hill.subEnergy(info.Kosten)
      if (playerid == 0) {
        cooldown0 = 30
        Sim.players[0].setCooldown()
      } else {
        cooldown1 = 30
        Sim.players[1].setCooldown()
      }
      for (var i = 0; i < info.Anzahl; i++) {
        var spawnCenter = playerid == 0 ? getSpawn0() : getSpawn1()
        var unit = new Sim.Unit(getUnitSpawnPoint(spawnCenter, type), playerid, type)
        Sim.units[playerid].push(unit)
        if (unit.getType() == "Arbeitermeise") {
          Sim.players[unit.getPlayerid()].addAnt()
        } else
          Sim.players[playerid].addUnit()
      }
    }
  }
  
  var spawnTimeout = 0
  
  function freeSpace(pos) {
    var ok = true
    var all = Sim.units[0].concat(Sim.units[1])
    for (var i = 0; i < all.length; i++) {
      if (Sim.Util.dist(pos, all[i].getPos()) <  20) {
        ok = false
      }
    }
    Sim.sugars.forEach(function(sug){
      if (Sim.Util.dist(pos, sug.getPos()) < 50)
        ok = false
    })
    return ok
  }
  
  function spawnSugar(){
    if (spawnTimeout > 0) spawnTimeout--
    if (spawnTimeout == 0) {
      spawnTimeout = 300
      var p0sugar = Sim.Util.inRange(Sim.hills[0].getPos(), Sim.sugars, 500)
      var p1sugar = Sim.Util.inRange(Sim.hills[1].getPos(), Sim.sugars, 500)
      var t0 = 10
      while (p0sugar.length < 5 && t0 > 0) {
        var angle = Sim.rng()*160 + 100
        var distance = 200 + Sim.rng()*200
        var pos = Sim.Util.moveDir(Sim.hills[0].getPos(), angle, distance)
        if (freeSpace(pos)) {
          Sim.sugars.push(new Sim.Sugar(pos))
          break
        } else {
          t0--
        }
      }
      var t1 = 10
      while (p1sugar.length < 5 && t0 > 0) {
        var angle = Sim.rng()*160 - 80
        var distance = 200 + Sim.rng()*200
        var pos = Sim.Util.moveDir(Sim.hills[1].getPos(), angle, distance)
        if (freeSpace(pos)) {
          Sim.sugars.push(new Sim.Sugar(pos))
          break
        } else {
          t1--
        }
      }
    }
  }
  
  var spawnPoint0 = 0
  var spawnPoint1 = 1
  
  Fight.flipSpawnPoint = function(player) {
    if (player == 0) {
      spawnPoint0 = (spawnPoint0 + 1) % 2
      updateSpawnGO()
    } else {
      spawnPoint1 = (spawnPoint1 + 1) % 2
      updateSpawnGO()
    }
  }
  
  function getSpawn0() {
    return Sim.Util.moveDir(Sim.hills[0].getPos(), spawnPoint0 == 0 ? -40 : 40, 100)
  }
  
  function getSpawn1() {
    return Sim.Util.moveDir(Sim.hills[1].getPos(), spawnPoint1 == 0 ? 220 : 140, 100)
  }
  
  function updateSpawnGO(){
    Sim.Bus.emit('move-spawn-point', 0, getSpawn1())
    Sim.Bus.emit('move-spawn-point', 1, getSpawn0())
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
      var radius =  i*3 + (Sim.rng()*10)
      antPos.x += Math.cos(angle)*radius;
      antPos.y += Math.sin(angle)*radius;
      var ok = true
      if (Sim.Util.dist(antPos, Sim.hills[0].getPos()) < k + Sim.Opts.Kampf.Bau.Körper)
        ok = false
      if (Sim.Util.dist(antPos, Sim.hills[1].getPos()) < k + Sim.Opts.Kampf.Bau.Körper)
        ok = false
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
