

AntIT.Bus.on('tick', function(cycle) {
  if (AntIT.Units.Ant.length > 0 && (cycle % 40) == 0) {
    AntIT.Units.Ant[0].move(AntIT.Board.randomPos())
    AntIT.Units.Ant[0].turn(Math.random()*20-10)
  }
})
