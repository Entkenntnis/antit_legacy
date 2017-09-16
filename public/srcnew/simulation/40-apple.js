

(function(){

  var Opts = AntIT.AddOptions({
    EnergieProApfel : 2000,
  })

  AntIT.Unit.addType('Apple')
  AntIT.Unit.addAttribute('Apple', 'packed', false)
  
  AntIT.Bus.on('init', function(){
    AntIT.AddFoodType('Apple', 1, Opts.EnergieProApfel)
  })
  
  AntIT.Unit.Bus.on('new-Apple', function(apple){
    AntIT.Bus.emit('add-apple', apple.getId(), apple.getPos(), apple.getAttr('packed'))
  })
  
  AntIT.Unit.addFunction('Apple', 'move', function(newpos) {
    if (this.isDead()) return
    this.setPos(newpos)
    AntIT.Bus.emit('move-apple', this.getId(), newpos)
  })
  
  AntIT.Unit.addFunction('Apple', 'setPacked', function(val) {
    if (this.isDead()) return
    this.setAttr('packed', val)
    AntIT.Bus.emit('set-apple-packed', this.getId(), val)
  })
  
  AntIT.Unit.addFunction('Apple', 'consumed', function(){
    this.die()
    AntIT.Bus.emit('remove-apple', this.getId())
  })

})()
