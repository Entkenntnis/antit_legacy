
(function(){

  var Opts = AntIT.AddOptions({
    AmeiseReichweite : 3000,
    AmeiseGeschwindigkeit : 5,
    AmeiseDrehgeschwindigkeit : 8,
    AmeiseSichtweite : 70,
  })

  AntIT.Unit.addType('Ant')
  AntIT.Unit.addAttribute('Ant', 'heading')
  AntIT.Unit.addAttribute('Ant', 'lap', 0)
  
  var grid = new AntIT.Grid()
  
  AntIT.AddProp('AntGrid', grid)
  
  AntIT.Unit.Bus.on('create-ant', function(ant){
    ant.setAttr('heading', Math.floor(Math.random()*360))
    grid.add(ant.getId(), ant.getPos(), ant)
  })

  AntIT.Unit.addFunction('Ant', 'move', function(newpos){
    var newlap = this.getAttr('lap') + AntIT.Util2d.dist(this.getPos(), newpos)
    this.setAttr('lap', newlap)
    this.setPos({x: newpos.x, y:newpos.y})
    grid.move(this.getId(), this.getPos())
    if (newlap > Opts.AmeiseReichweite) {
      this.die()
    }
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
  
  AntIT.Bus.on('remove-ant', function(id) {
    grid.remove(id)
  })

})()
