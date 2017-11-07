
(function(Sim){

  // Fighting Unit
  
  function Unit(pos, playerid, type) {
    
    Unit.counter = Unit.counter || 1
    
    var my = Sim.Util.makeAttributes(this, {
      pos: pos,
      playerid : playerid,
      type : type,
      key : "unit" + Unit.counter++,
      heading : Math.floor(Sim.rng()*360),
      lp : Sim.Opts.Kampf[type].Trefferpunkte,
    })
    
    var cooldown = 0
    
    function updateGO() {
      Sim.bus.emit('move-unit', my.key, my.type,
        my.pos,
        -my.heading / 180 * Math.PI + Math.PI)
      if (my.lp < Sim.Opts.Kampf[type].Trefferpunkte) {
        Sim.bus.emit('move-hb', my.key, my.pos, my.lp / Sim.Opts.Kampf[type].Trefferpunkte)
      }
    }
    
    function goto(pos){
      var angle = Sim.Util.getDir(my.pos, pos)
      var rotation = Sim.Util.getRotation(my.heading, angle)
      if (Math.abs(rotation) > 3) {
        if (Math.abs(rotation) <= 8) {
          my.heading = angle
        } else {
          my.heading += 8 * Math.sign(rotation)
        }
      } else {
        my.heading = angle + Sim.rng()*10-5
        var oldx = my.pos.x;
        var oldy = my.pos.y;
        var newpos = Sim.Util.moveDir(my.pos, my.heading,
          5 * Sim.Opts.Kampf[type].Geschwindigkeit)
        if (Sim.playground.isInBound(newpos, Sim.Opts.Toleranz)) {
          my.pos = newpos
        }
      }
      updateGO()
    
    }
    
    this.hit = function(impact){
      my.lp = Math.max(0, my.lp - impact)
      if (my.lp > 0)
        updateGO()
    }
    
    this.update = function(){
      // ok, lasst uns bewegen und schießen
      if (cooldown > 0) cooldown--
      var enemyId = (my.playerid + 1) % 2
      var nextEnemy = Sim.Util.closest(my.pos, Sim.units[enemyId],
        Sim.Opts.Kampf[type].Sichtweite)
      if (nextEnemy) {
        var d = Sim.Util.dist(nextEnemy.getPos(), my.pos)
        if (d <= Sim.Opts.Kampf[type].Kampfzone) {
          if (cooldown == 0) {
            cooldown = Sim.Opts.Kampf[type].Trefferrate
            if (type == "Giftmeise") {
              var inrange = []
              Sim.units[enemyId].forEach(function(unit){
                if (Sim.Util.dist(unit.getPos(), my.pos) <= Sim.Opts.Kampf[type].Kampfzone) {
                  inrange.push(unit)
                }
              })
              inrange.forEach(function(enemy){
                Sim.fireMissile(my.pos, enemy,
                  Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw, "Gift")
              })
              return
            } else {
              Sim.fireMissile(my.pos, nextEnemy,
                Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw)
              return
            }
          }
        }
        if (d < 30) {
          return // nichts zu tun
        }
        if (Sim.Util.dist(my.pos, Sim.hills[enemyId].getPos()) >
          Sim.Opts.Kampf.Bau.Nahzone)
          goto(nextEnemy.getPos())
        return
      }
      var d = Sim.Util.dist(my.pos, Sim.hills[enemyId].getPos())
      if (d <= Sim.Opts.Kampf.Bau.Nahzone) {
        if (cooldown == 0) {
          cooldown = Sim.Opts.Kampf[type].Trefferrate
          Sim.fireMissile(my.pos, Sim.hills[enemyId],
            Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw)
        }
        return
      }
      goto(Sim.hills[enemyId].getPos())
    }
    
    // constructor
    Sim.bus.emit('change-unit-color', my.key, my.type, Sim.Opts.SpielerFarben[my.playerid])
    updateGO()
  }
  
  Sim.Unit = Unit
  
  Sim.removeDeadUnits = function(units){
    Sim.Util.removeIf(units, function(unit){
      if (unit.getLp() == 0) {
        Sim.players[unit.getPlayerid()].subUnit()
        Sim.bus.emit('remove-unit', unit.getKey(), unit.getType())
        return true
      }
      return false
    })
  }


})(AntIT._rawsim)
