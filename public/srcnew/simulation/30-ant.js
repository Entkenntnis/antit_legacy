
(function(){

  var Opts = AntIT.AddOptions({
    
  })

  AntIT.Unit.addType('Ant')
  AntIT.Unit.addAttribute('Ant', 'heading')
  AntIT.Unit.addAttribute('Ant', 'lap', 0)
  
  AntIT.Unit.Bus.on('new-Ant', function(ant){
    ant.setAttr('heading', Math.floor(Math.random()*360))
  })

  AntIT.Unit.addFunction('Ant', 'move', function(newpos){
    this.setAttr('lap', this.getAttr('lap') + AntIT.Util2d.dist(this.getPos(), newpos))
    this.setPos({x: newpos.x, y:newpos.y})
    AntIT.Bus.emit('move-ant', this.getId(), newpos)
  })
  
  AntIT.Unit.addFunction('Ant', 'turn', function(degree){
    var heading = this.getAttr('heading')
    heading += Math.round(degree)
    heading %= 360
    while (heading < 0)
      heading += 360
    heading = Math.round(heading)
    this.setAttr('heading', heading)
    AntIT.Bus.emit('turn-ant', this.getId(), heading)
  })
  
  this.turn = function(degree) {
    
  }
  


})()
