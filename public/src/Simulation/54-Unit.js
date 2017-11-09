
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
      Sim.Bus.emit('move-unit', my.key, my.type,
        my.pos,
        -my.heading / 180 * Math.PI + Math.PI)
      if (my.lp < Sim.Opts.Kampf[type].Trefferpunkte) {
        Sim.Bus.emit('move-hb', my.key, my.pos, my.lp / Sim.Opts.Kampf[type].Trefferpunkte)
      }
      if (my.type == "Arbeitermeise") {
        if (load > 0) {
          Sim.Bus.emit('move-sugarbox', my.key, my.pos)
        } else {
          Sim.Bus.emit('remove-sugarbox', my.key)
        }
      }
    }
    
    function goto(pos, nocollide) {
      var party0 = Sim.Util.inRange(my.pos, Sim.units[0], 80)
      var party1 = Sim.Util.inRange(my.pos, Sim.units[1], 80)
      var all = party0.concat(party1)
      var k = Sim.Opts.Kampf[my.type].Körper
      
      function check(pos) {
        var good = true
        all.forEach(function(obj){
          if (obj.getKey() == my.key) return
          if (obj.getType() == "Arbeitermeise") return
          var otherk = Sim.Opts.Kampf[obj.getType()].Körper
          if (k + otherk > Sim.Util.dist(obj.getPos(), pos)) {
            good = false
          }
        })
        if (Sim.Util.dist(pos, Sim.hills[0].getPos()) < k + Sim.Opts.Kampf.Bau.Körper)
          good = false
        if (Sim.Util.dist(pos, Sim.hills[1].getPos()) < k + Sim.Opts.Kampf.Bau.Körper)
          good = false
        Sim.sugars.forEach(function(sug){
          if (Sim.Util.dist(pos, sug.getPos()) < k + 15)
            good = false
        })
        return good
      }
      
      function submit(pos) {
        var angle = Sim.Util.getDir(my.pos, pos)
        var rotation = Sim.Util.getRotation(my.heading, angle)
        if (Math.abs(rotation) > 4) {
          // nur drehen
          if (Math.abs(rotation) <= 8) {
            my.heading = angle
          } else {
            my.heading += 8 * Math.sign(rotation)
          }
        } else {
          my.pos = pos
        }
        updateGO()
      }
      
      // first of all - berechne den besten Weg
      
      var angle = Sim.Util.getDir(my.pos, pos)
      
      for (var i = 0; i < 30; i++) {
        var diff = Math.floor((i+1)/2) * 15* Math.pow(-1, i)
        var newpos = Sim.Util.moveDir(my.pos, angle + diff,
          3 * Sim.Opts.Kampf[my.type].Geschwindigkeit)
        if (nocollide || check(newpos)) {
          submit(newpos)
          return
        }
      }
    }
    
    this.hit = function(impact, type){
      if (type == "Gift" && my.type == "Albinomeise")
        impact *= 0.1
      my.lp = Math.max(0, my.lp - impact)
      if (my.lp > 0)
        updateGO()
    }
    
    var load = 0
    var dest = undefined
    
    function workerTick() {
      // diese fleißigen ...
      var k = Sim.Opts.Kampf.Arbeitermeise.Körper
      var r = Sim.Opts.Kampf.Arbeitermeise.Reichweite
      var bk = Sim.Opts.Kampf.Bau.Körper
      if (Sim.Util.dist(my.pos, Sim.hills[my.playerid].getPos()) < k + bk + r) {
        if (load > 0) {
          Sim.hills[my.playerid].addEnergy(load*Sim.Opts.Kampf.Zucker.Energie)
          load = 0
          return
        }
      }
      if (dest) {
        if (Sim.Util.dist(my.pos, dest) > 5) {
          goto(dest)
          return
        } else {
          dest = undefined
        }
      }
      if (load > 0) {
        goto(Sim.hills[my.playerid].getPos(), true)
        return
      }
      var sugar = Sim.Util.closest(my.pos, Sim.sugars,
        Sim.Opts.Kampf.Arbeitermeise.Sichtweite)
      if (sugar && Sim.Util.dist(sugar, Sim.hills[my.playerid].getPos()) > 500)
        sugar = undefined
      if (sugar) {
        var zk = Sim.Opts.Kampf.Zucker.Körper
        if (Sim.Util.dist(my.pos, sugar.getPos()) < k + r + zk) {
          while (load < 5) {
            if (sugar.unload1Sugar())
              load++
            else
              break
          }
        } else {
          goto(sugar.getPos(), true)
        }
      } else {
      }
    }
    
    this.update = function(){
    
      if (my.type == "Arbeitermeise") {
        workerTick()
        return
      }
      // neuer Bewegungscode
      
      if (cooldown > 0) cooldown--
      var enemyId = (my.playerid + 1) % 2
      var nextEnemy = undefined
      if (my.type == "Räubermeise") {
        nextEnemy = Sim.Util.closest(my.pos, Sim.units[enemyId],
        Sim.Opts.Kampf[type].Sichtweite, function(obj){
          return obj.getType() != "Arbeitermeise"
        })
      } else  if (my.type != "Giftmeise") {
        nextEnemy = Sim.Util.closest(my.pos, Sim.units[enemyId],
        Sim.Opts.Kampf[type].Sichtweite, function(obj){
          return obj.getType() == "Arbeitermeise"
        })
      } else {
        nextEnemy = Sim.Util.closest(my.pos, Sim.units[enemyId],
        Sim.Opts.Kampf[type].Sichtweite, function(obj){
          return obj.getType() == "Arbeitermeise"
        })
      }
      
      if (nextEnemy) {
        // Fixierung auf Gegner
        var distance = Sim.Util.dist(nextEnemy.getPos(), my.pos)
        var kgegner = Sim.Opts.Kampf[nextEnemy.getType()].Körper
        var rw = Sim.Opts.Kampf[my.type].Reichweite
        if (distance < kgegner + rw) {
          // Nahkampfzone
          if (cooldown == 0) {
            // schießen
            cooldown = Sim.Opts.Kampf[type].Trefferrate
            if (my.type == "Giftmeise") {
              var enemies = Sim.Util.inRange(my.pos, Sim.units[enemyId], rw + kgegner,
                function(obj){
                  return obj.getType() == "Arbeitermeise"
                })
              enemies.forEach(function(enemy){
                Sim.Missile.fire(my.pos, enemy,
                  Sim.Opts.Kampf[type].Schaden,
                  Sim.Opts.Kampf[type].GGeschw, "Gift")
              })
            } else {
              Sim.Missile.fire(my.pos, nextEnemy,
                Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw)
            }
          }
        } else {
            // zum Gegner bewegen
            goto(nextEnemy.getPos())
          }
      } else {
        var d = Sim.Util.dist(my.pos, Sim.hills[enemyId].getPos())
        if (d <= 90) {
          if (cooldown == 0 && my.type != "Räubermeise") {
            cooldown = Sim.Opts.Kampf[type].Trefferrate
            if (my.type != "Giftmeise")
              Sim.Missile.fire(my.pos, Sim.hills[enemyId],
                Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw)
            else
              Sim.Missile.fire(my.pos, Sim.hills[enemyId],
                Sim.Opts.Kampf[type].Schaden, Sim.Opts.Kampf[type].GGeschw, "Gift")
          }
        } else {
          goto(Sim.hills[enemyId].getPos())
        }
        
      }
    
    }
    
    // constructor
    Sim.Bus.emit('change-unit-color', my.key, my.type, Sim.Opts.SpielerFarben[my.playerid])
    updateGO()
  }
  
  Sim.Unit = Unit
  
  Sim.Unit.update = function(){
    [0, 1].forEach(function(i){
      Sim.Util.removeIf(Sim.units[i], function(unit){
        if (unit.getLp() == 0) {
          if (unit.getType() == "Arbeitermeise") {
            Sim.players[unit.getPlayerid()].subAnt()
          } else
            Sim.players[unit.getPlayerid()].subUnit()
          Sim.Bus.emit('remove-unit', unit.getKey(), unit.getType())
          Sim.Bus.emit('remove-sugarbox', unit.getKey())
          return true
        }
        return false
      })
    })
  }


})(AntIT._rawsim)
