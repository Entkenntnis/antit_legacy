
(function(){

  var Opts = AntIT.AddOptions({
    ZufallRichtungsVerschiebung : 11
  })
  
  var customSnaps = {}
  
  AntIT.AddProp('AntAimingCustomSnap', function(type, snap) {
    customSnaps[type] = snap
  })
  
  var customGoOn = {}
  
  AntIT.AddProp('AntAimingCustomGoOn', function(type, f) {
    customGoOn[type] = f
  })

  AntIT.Unit.addFunction('Ant', 'addGotoJob', function(destination, type, senses) {
    this.removeOldJobs()
    this.addJob("DEST", [destination, senses], function(){
      if (destination.constructor.name == "Unit" && destination.isDead())
        return true
      var snap = Opts.Toleranz
      if (type in customSnaps)
        snap = customSnaps[type]
      if (type in customGoOn)
        if (!customGoOn[type](destination, this))
          return true
      var des = destination.getPos()
      var d = AntIT.Util2d.dist(this.getPos(), des)
      if (d <= snap){
        AntIT.Unit.Bus.emit('ant-reached-' + type.toLowerCase(), this, destination)
        return true
      } else {
        var angle = AntIT.Util2d.getDir(this.getPos(), des)
        var rotation = AntIT.Util2d.getRotation(this.getAttr('heading'), angle)
        var v = Opts.ZufallRichtungsVerschiebung
        rotation += Math.floor(Math.random()*v*2-v)
        if (rotation != 0)
          this.addTurnJob(rotation, true)
        this.addGoJob(Math.min(50, d), true)
        return false
      }
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'gotoHome', function(sense){
    var myhill = AntIT.Units.Hill[this.getAttr('playerid')]
    this.addGotoJob(myhill, "Hill", sense)
  })
  
  AntIT.Unit.Bus.on('ant-reached-hill', function(ant, dest) {
    ant.setAttr('lap', 0)
  })

  AntIT.Unit.addFunction('Ant', 'isSensing', function() {
    var sensing = true
    var jobs = this.getAttr('jobs')
    for (var i = jobs.length - 1; i >= 0; i--) {
      var curCmd = jobs[i]
      if (curCmd.type == "DEST") {
        if (curCmd.value[1] !== true)
          sensing = false
        break
      }
      if (curCmd.type == "APPLE" || curCmd.value == "APPLESETUP") {
        sensing = false
        break
      }
    }
    if (jobs.length > 0 && jobs[jobs.length-1].value == "DROPSUGAR")
      sensing = false
    return sensing
  }) // a lot of cross dependencies, leave it for now!!

})()
