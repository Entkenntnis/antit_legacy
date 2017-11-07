
(function(Sim){

  var missiles = []
  var counter = 1
  
  Sim.fireMissile = function(pos, dest, impact, speed, type) {
    var id = counter++
    missiles.push({id:id, pos:pos, dest:dest, impact:impact, speed:speed, type:type})
    Sim.bus.emit('move-missile', id, pos)
  }
  
  Sim.updateMissiles = function(){
    missiles.forEach(function(m){
      if (m.dest.getLp() == 0) {
        // try to relocate demage
        var nextEnemy = Sim.Util.closest(m.pos, Sim.units[(m.dest.getPlayerid()+1)%2], 20)
        if (nextEnemy) {
          m.dest = nextEnemy
        }
      }
      if (Sim.Util.dist(m.pos, m.dest.getPos()) < m.speed) {
        Sim.bus.emit('remove-missile', m.id)
        m.dest.hit(m.impact)
        m.id = undefined
      } else {
        var dir = Sim.Util.getDir(m.pos, m.dest.getPos())
        m.pos = Sim.Util.moveDir(m.pos, dir, m.speed)
        Sim.bus.emit('move-missile', m.id, m.pos)
      }
    })
    Sim.Util.removeIf(missiles, function(m){
      return m.id == undefined
    })
  }

})(AntIT._rawsim)
