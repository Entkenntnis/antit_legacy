

(function(){
  
  var Opts = AntIT.Optionen

  AntIT.Unit.addFunction('Ant', 'addSendMemoryJob', function(topic) {
    this.addJob("SEND", undefined, function() {
      var hillpos = AntIT.Units.Hill[this.getAttr('playerid')].getPos()
      if (AntIt.Util2d.dist(this.getPos(), hillpos) < Opts.HügelRadius) {
        AntIT.Bus.emit('add-marker', hillpos, playerid)
        var ants = AntIT.AntGrid.inRange(hillpos, Opts.AmeiseSichtweite)
        ants.forEach(function(ant){
          if (ant.getAttr('playerid') != this.getAttr('playerid'))
            return
          if (ant == this || !ant.isSensing())
            return
          AntIT.Unit.Bus.emit('ant-send-message', ant, this.getAttr('memory'), topic)
        })
      }
      return true;
    })
  })


})()
