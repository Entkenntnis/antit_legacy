

(function(){

  var Opts = AntIT.AddOptions({
    EnergieProApfel : 2000,
  })

  AntIT.Unit.addType('Apple')
  AntIT.Unit.addAttribute('Apple', 'packed')
  
  AntIT.Bus.on('init', function(){
    AntIT.AddFoodType('Apple', 1, Opts.EnergieProApfel)
  })
  
  AntIT.Unit.Bus.on('create-apple', function(apple){
    apple.setPacked(false)
  })
  
  AntIT.Unit.addFunction('Apple', 'move', function(newpos) {
    this.setPos(newpos)
  })
  
  AntIT.Unit.addFunction('Apple', 'setPacked', function(val) {
    this.setAttr('packed', val)
    AntIT.Bus.emit('set-apple-packed', this.getId(), val)
  })
  
  AntIT.Unit.addFunction('Apple', 'consumed', function(){
    this.die()
  })

})()
