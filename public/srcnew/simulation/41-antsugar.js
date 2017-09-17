

(function(){

  var Opts = AntIT.Options

  AntIT.Unit.addFunction('Ant', 'addTakeJob', function() {
    this.addSimpleJob(function(){
      var sugar = AntIT.Util2d.closest(this.getPos(), AntIT.Units.Sugar, Opts.ZuckerRadius)
      if (!sugar)
        return true
      while(this.getAttr('load') < Opts.AmeiseTragkraft) {
        var t = sugar.Unload1();
        if (t) {
          this.load1Sugar()
        } else {
          break
        }
      }
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addDropJob', function() {
    this.addSimpleJob(function(){
      var hill = AntIT.Units.Hill[this.getAttr('playerid')]
      var d = AntIT.Util2d.dist(this.getPos(), hill)
      if (d <= Opts.HügelRadius) {
        hill.setAttr('energy',
          hill.setAttr('energy') + this.getAttr('load')*Opts.EnergieProZucker)
        AntIT.Bus.emit('sugar-collected', this.getAttr('playerid'), this.getAttr('load'))
        //myPlayer().addPoints(load*PunkteProZucker);
        //myPlayer().addSugar(load);
      }
      this.unloadSugar()
    }, "DROPSUGAR")
  })
  
  AntIT.Bus.on('tick', function(){
    AntIT.Units.Sugar.forEach(function(s){
      var ants = AntIT.AntGrid.inRange(s.getPos(), Opts.AmeiseSichtweite)
      ants.forEach(function(a){
        if (a.isSensing())
          AntIT.Unit.Bus.emit('ant-sensed-sugar', a, s)
      })
    })
  })

})()
