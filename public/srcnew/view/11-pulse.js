
(function() {

  var Opts = AntIT.AddOptions({
    TicksProSekunde : 40,
  })
  
  var running = false
  var startTime = undefined
  var simulationFps = Opts.TicksProSekunde
  var cycle
  var maxSkippedFrames = 10
  var lastProgress = -1
  
  function getTargetCycle() {
    var elapsedTime = Date.now() - startTime
    return elapsedTime / 1000 * simulationFps
  }
  
  function adjustStartTime() {
    startTime = Date.now() - (cycle / simulationFps * 1000)
  }
  
  function tick() {
    var progress = Math.round(cycle / Opts.Runden * 100)
    if (progress != lastProgress) {
      lastProgress = progress
      AntIT.Bus.emit('progress', progress)
    }
    AntIT.Redraw()
  }
  
  AntIT.Bus.on('init', function(){
    running = true
    cycle = 0
    startTime = Date.now()
  })
  
  AntIT.Bus.on('animation-frame', function(){
    if (!running)
      return
    var targetCycle = getTargetCycle()
    var skippedFrames = 0
    while(cycle < targetCycle && skippedFrames < maxSkippedFrames){
      cycle = AntIT.Tick()
      if (cycle === false)
        end()
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
