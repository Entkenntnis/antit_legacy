
(function() {

  var Opts = AntIT.AddOptions({
    Runden : 750,
    TicksProSekunde : 40,
  })
  
  var running = false
  var startTime = undefined
  var simulationFps = Opts.TicksProSekunde
  var cycles = 0
  var maxSkippedFrames = 10
  var lastProgress = -1
  
  function getTargetCycle() {
    var elapsedTime = Date.now() - startTime
    return elapsedTime / 1000 * simulationFps
  }
  
  function adjustStartTime() {
    startTime = Date.now() - (cycles / simulationFps * 1000)
  }
  
  function tick() {
    cycles++
    AntIT.Bus.emit('tick', cycles)
    var progress = Math.round(cycles / Opts.Runden * 100)
    if (progress != lastProgress) {
      lastProgress = progress
      AntIT.Bus.emit('progress', progress)
    }
    AntIT.Bus.emit('need-redraw')
  }
  
  AntIT.Bus.on('init', function(){
    running = true
    cycles = 0
    startTime = Date.now()
  })
  
  AntIT.Bus.on('animation-frame', function(){
    if (cycles >= Opts.Runden) {
      if (running)
        end()
      return
    }
    var targetCycle = getTargetCycle()
    var skippedFrames = 0
    while(cycles < targetCycle && skippedFrames < maxSkippedFrames){
      tick()
      skippedFrames++
    }
    if (skippedFrames >= maxSkippedFrames) {
      adjustStartTime()
    }
  })
  
  function end() {
    running = false
    AntIT.Bus.emit('end')
    AntIT.Bus.emit('progress', -1)
  }
  
  AntIT.AddProp("SetFps", function(fps) {
    simulationFps = fps
    adjustStartTime()
  })  

})()
