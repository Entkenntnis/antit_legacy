

(function(){

  var Opts = AntIT.AddOptions({
    EnergieProApfel : 2000,
    ApfelRadius : 20,
    MaximumAmeisenFürApfel : 20,
    ApfelMinGeschwindigkeit : 0.2,
    ApfelMaxGeschwindigkeit : 2.0,
  })

  AntIT.Unit.addType('Apple')
  AntIT.Unit.addAttribute('Apple', 'packed')
  AntIT.Unit.addAttribute('Apple', 'state')
  
  AntIT.Bus.on('init', function(){
    AntIT.AddFoodType('Apple', 1, Opts.EnergieProApfel)
  })
  
  AntIT.AntAimingCustomSnap("Apple", Opts.ApfelRadius)
  
  AntIT.AntAimingCustomGoOn("Apple", function(destination, ant){
    return destination.needHelp(ant)
  })
  
  AntIT.Unit.Bus.on('create-apple', function(apple){
    apple.setAttr('state', {
      ants : [],
      pid : undefined,
      dx : 0,
      dy : 0,
      heading : undefined,
    })
    apple.setPacked(false)
  })
  
  AntIT.Bus.on('tick', function(){
    AntIT.Units.Apple.forEach(function(apple){
      removeInactiveAnts.bind(apple)()
      decideWinningTeam.bind(apple)()
      moveApple.bind(apple)()
    })
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
  
  AntIT.Unit.addFunction('Apple', 'needHelp', function(ant) {
    var state = this.getAttr('state')
    if (state.pid === undefined) {
      return true
    } else if (ant.getAttr('playerid') === state.pid && 
      state.ants.length < Opts.MaximumAmeisenFürApfel) {
      return true
    }
    return false
  })
  
  AntIT.Unit.addFunction('Apple', 'addAnt', function(ant) {
    if (this.needHelp(ant)) {
      this.getAttr('state').ants.push(ant);
    }
  })
  
  AntIT.Unit.addFunction('Apple', 'letDown', function(){
    var state = this.getAttr('state')
    state.pid = undefined
    state.heading = undefined
    state.dx = 0
    state.dy = 0
    AntIT.Bus.emit('set-apple-packed', this.getId(), false)
  })
  
  function removeInactiveAnts() {
    var state = this.getAttr('state')
    state.ants = state.ants.filter(function(ant){
      if (ant.isDead())
        return false
      if (AntIT.Util2d.dist(this.getPos(), ant.getPos()) > Opts.ApfelRadisu)
        return false
      var jobs = ant.getAttr('jobs')
      if (jobs !== undefined) {
        var curJob = jobs[jobs.length - 1];
        if (curJob.type == "APPLE")
          return true
      }
      return false
    })
  }
  
  function decideWinningTeam() {
    var state = this.getAttr('state')
    if (state.ants.length == 0) {
      this.letDown()
      return
    }
    var antsPerTeam = {}
    var teams = []
    state.ants.forEach(function(ant){
      var id = ant.getAttr('playerid')
      if (id in antsPerTeam) {
        antsPerTeam[id]++
      } else {
        antsPerTeam[id] = 1
        teams.push(id)
      }
    })
    teams = teams.sort(function(a, b){
      return antsPerTeam[b]-antsPerTeam[a]
    })
    var winnerID = teams[0]
    var winnerCount = antsPerTeam[winnerID]
    if (winnerCount >= Opts.AmeisenFürApfel) {
      this.ants = this.ants.filter(function(a){
        return a.getAttr('playerid') == winnerID
      })
      state.pid = winnerID
      AntIT.Bus.emit('set-apple-packed', this.getId(), true)
    } else {
      this.letDown()
    }
  }
  
  function moveApple() {
    var state = this.getAttr('state')
    if (state.pid !== undefined) {
      var myHill = AntIT.Units.Hill[state.pid]
      state.heading = AntIT.Util2d.getDir(this.getPos(), myHill.getPos())
      // Geschwindigkeit zwischen 0.2 und 1
      var speed = Opts.ApfelMinGeschwindigkeit +
        (Opts.ApfelMaxGeschwindigkeit - Opts.ApfelMinGeschwindigkeit) *
        (state.ants.length / Optionen.MaximumAmeisenFürApfel)
      state.dx =  speed*Math.cos(state.heading/180*Math.PI)
      state.dy = speed*Math.sin(state.heading/180*Math.PI)
      setPos({x: p.x + state.dx, y: p.y + state.dy})
      return;
    }
  }
  
  AntIT.Unit.addFunction('Ant', 'addAppleSetupJob', function() {
    this.addSimpleJob(function(){
      var apple = AntIT.Util2d.closest(this.getPos(), AntIT.Units.Apple, Opts.ApfelRadius)
      if (apple && apple.needHelp(this)) {
        apple.addAnt(API.curAnt)
        this.addAppleJob(apple)
      }
    }, "APPLESETUP")
  })
  
  AntIT.Unit.addFunction('Ant', 'addAppleJob', function(apple) {
    this.addJob("APPLE", apple, function(){
      var state = apple.getAttr('state')
      if (apple.isDead())
        return true
      if (state.ants.indexOf(this) < 0)
        return true
      if (state.heading !== undefined) {
        this.setAttr('heading', state.heading)
        this.turn(0)
      }
      var p = this.getPos()
      this.move({x:p.x + state.dx, y:p.y + state.dy})
      return false
    })
  })
  
  AntIT.Bus.on('tick', function(){
    AntIT.Units.Apple.forEach(function(apple){
      var ants = AntIT.AntGrid.inRange(apple.getPos(), Opts.AmeiseSichtweite)
      ants.forEach(function(a){
        //if (a.isSensing())
          AntIT.Unit.Bus.emit('ant-sensed-apple', a, apple)
      })
    })
  })

})()
