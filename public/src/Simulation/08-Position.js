(function(Sim){

  // Position
  function Position(pos) {
    
    Sim.Util.makeAttributes(this, {
      pos: {x:pos.x,y:pos.y}
    })
  }
  
  Sim.Position = Position

})(AntIT._rawsim)
