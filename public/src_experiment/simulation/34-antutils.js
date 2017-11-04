
(function(){

  AntIT.Unit.addFunction('Ant', 'addTurnToJob', function(angle) {
    this.addSimpleJob(function(){
      var rotation = AntIT.Util2d.getRotation(this.getAttr('heading'), angle)
      if (rotation != 0)
        this.addTurnJob(rotation)
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addTurnToObj', function(obj) {
    this.addSimpleJob(function(){
      var angle = AntIT.Util2d.getDir(this.getPos(), obj.getPos())
      this.addTurnToJob(angle)
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addTurnAway', function(obj) {
    this.addSimpleJob(function(){
      var angle = (AntIT.Util2d.getDir(this.getPos(), obj.getPos()) + 180) % 360
      this.addTurnToJob(angle)
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addWaitJob', function(rounds) {
    this.addJob("WAIT", undefined, function(){
      return rounds-- <= 0
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addStopJob', function() {
    this.addSimpleJob(function(){
      this.setAttr('jobs', [])
      this.setAttr('insertionPoint', 0)
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addCustomJob', function(f) {
    this.addJob("CUSTOM", undefined, function(){
      this.refreshInsertionPoint()
      var ret
      AntIT.Unit.Bus.on('ant-custom-function', f, this, function(val){
        ret = val
      })
      if (ret !== undefined)
        return ret
      return true
    })
  })

})()
