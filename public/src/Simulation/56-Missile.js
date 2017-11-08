
(function(Sim){

  var missiles = []
  var counter = 1
  
  function fireMissile(pos, dest, impact, speed, type) {
    var id = counter++
    missiles.push({id:id, pos:pos, dest:dest, impact:impact, speed:speed, type:type})
    Sim.Bus.emit('move-missile', id, pos)
    if (type == "Gift")
      Sim.Bus.emit('set-missile-color', id, 0x8c00ff)
    else
      Sim.Bus.emit('set-missile-color', id, 0x000000)
  }
  
  function updateMissiles(){
    missiles.forEach(function(m){
      if (m.dest.getLp() == 0) {
        // try to relocate demage
        var nextEnemy = Sim.Util.closest(m.pos, Sim.units[(m.dest.getPlayerid()+1)%2], 20)
        if (nextEnemy) {
          //m.dest = nextEnemy
        }
      }
      if (Sim.Util.dist(m.pos, m.dest.getPos()) < m.speed) {
        Sim.Bus.emit('remove-missile', m.id)
        m.dest.hit(m.impact, m.type)
        m.id = undefined
      } else {
        var dir = Sim.Util.getDir(m.pos, m.dest.getPos())
        m.pos = Sim.Util.moveDir(m.pos, dir, m.speed)
        Sim.Bus.emit('move-missile', m.id, m.pos, m.color)
      }
    })
    Sim.Util.removeIf(missiles, function(m){
      return m.id == undefined
    })
  }
  
  Sim.Missile = {
    fire : fireMissile,
    update : updateMissiles,
  }

})(AntIT._rawsim)
