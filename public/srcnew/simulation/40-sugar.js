

(function(){

  var Opts = AntIT.AddOptions({
    ZuckerGröße : 250,
    EnergieProZucker : 10,
    ZuckerRadius : 10,
    AmeiseTragkraft : 5,
  })

  AntIT.Unit.addType('Sugar')
  AntIT.Unit.addAttribute('Sugar', 'amount')
  AntIT.Unit.addAttribute('Ant', 'load', 0)
  
  AntIT.Bus.on('init', function(){
    AntIT.AddFoodType('Sugar', 2, Opts.EnergieProZucker * Opts.ZuckerGröße)
  })
  
  AntIT.Unit.Bus.on('create-sugar', function(sugar){
    sugar.setAttr('amount', Opts.ZuckerGröße)
    AntIT.Bus.emit('set-sugar-amount', sugar.getId(), sugar.getAttr('amount'))
  })
  
  AntIT.Unit.addFunction('Sugar', 'Unload1', function(){
    var amount = this.getAttr('amount')
    if (amount > 0) {
      amount--
      this.setAttr('amount', amount)
      AntIT.Bus.emit('set-sugar-amout', this.getId(), this.getAttr('amount'))
      return true;
    } else {
      this.die()
      return false;
    }
  })

})()
