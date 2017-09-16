

(function(){

  var Opts = AntIT.AddOptions({
    ZuckerGröße : 250,
    EnergieProZucker : 10,
  })

  AntIT.Unit.addType('Sugar')
  AntIT.Unit.addAttribute('Sugar', 'amount')
  
  AntIT.Bus.on('init', function(){
    AntIT.AddFoodType('Sugar', 2, Opts.EnergieProZucker * Opts.ZuckerGröße)
  })
  
  AntIT.Unit.Bus.on('new-Sugar', function(sugar){
    sugar.setAttr('amount', Opts.ZuckerGröße)
    AntIT.Bus.emit('add-sugar', sugar.getId(), sugar.getPos(), sugar.getAttr('amount'))
  })
  
  AntIT.Unit.addFunction('Sugar', 'Unload', function(){
    var amount = this.getAttr('amount')
    if (amount > 0) {
      amount--
      this.setAttr('amount', amount)
      AntIT.Bus.emit('unload-sugar', this.getId(), this.getAttr('amount'))
      return true;
    } else {
      AntIT.Bus.emit('remove-sugar', this.getId())
      this.die()
      return false;
    }
  })

})()
