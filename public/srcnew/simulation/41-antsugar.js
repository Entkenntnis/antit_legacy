

(function(){

  var Opts = AntIT.Optionen

  AntIT.Unit.addFunction('Ant', 'addTakeJob', function() {
    this.addSimpleJob(function(){
      var sugar = AntIT.Util2d.closest(this.getPos(), AntIT.Units.Sugar, Opts.ZuckerRadius)
      if (!sugar)
        return true
      while(this.getAttr('load') < Opts.AmeiseTragkraft) {
        var t = sugar.Unload1();
        if (t) {
          this.setAttr('load', this.getAttr('load'))
          // attach GO
        } else {
          break
        }
      }
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addDropJob', function() {
    this.addSimpleJob(function(){
      var d = AntIT.Util2d.dist(this.getPos(), AntIT.Units.Hill[this.getAttr('playerid')])
      if (d <= Opts.HügelRadius) {
        //myPlayer().addPoints(load*Optionen.PunkteProZucker);
        //myHill().addEnergy(load*Optionen.EnergieProZucker);
        //myPlayer().addSugar(load);
      }
      this.setAttr('load', 0)
      // detach GO
    }, "DROPSUGAR")
  })

})()
