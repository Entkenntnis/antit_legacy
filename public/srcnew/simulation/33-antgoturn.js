
(function(){

  var Opts = AntIT.AddOptions({
    AmeiseGeschwindigkeit : 5,
    AmeiseDrehgeschwindigkeit : 8,
    Toleranz : 3,
  })
  
  var speedOps = []
  
  AntIT.AddProp('SetAntSpeedOp', function(f) {
    speedOps.push(f)
  })
  
  AntIT.Unit.addFunction('Ant', 'addGoJob', function (steps, auto) {
    this.addJob("GO", auto, function(){
      var toMove = 0
      var finished = false
      var curSpeed = Opts.AmeiseGeschwindigkeit
      var me = this
      speedOps.forEach(function(f){
        curSpeed = f.bind(me)(curSpeed)
      })
      if (steps < curSpeed) {
        finished = true
        toMove = steps
      } else {
        toMove = curSpeed
        steps -= curSpeed
      }
      var oldx = this.getPos().x
      var oldy = this.getPos().y
      var newpos = AntIT.Util2d.moveDir(this.getPos(), this.getAttr('heading'), toMove)
      if (AntIT.Board.isInBound(newpos, Opts.Toleranz)) {
        this.move(newpos)
      } else {
        finished = true
        AntIT.Unit.Bus.emit('ant-reached-boarder', this)
      }
      return finished
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addTurnJob', function (degree, auto) {
    this.addJob("TURN", auto, function(){
      var toTurn = 0
      var finished = false
      if (Math.abs(degree) < Opts.AmeiseDrehgeschwindigkeit) {
        finished = true
        toTurn = degree
      } else {
        toTurn = Opts.AmeiseDrehgeschwindigkeit * Math.sign(degree)
        degree -= Opts.AmeiseDrehgeschwindigkeit * Math.sign(degree)
      }
      this.turn(toTurn)
      return finished
    })
  })
  

})()
