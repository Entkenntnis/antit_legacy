

// START OF simulation pulsing: start, stop, interval, end

(function (View) {
  "use strict";
  
  var Sim = View.Sim
  var Optionen = View.Opts
  
  var running = false
  var startTime = undefined
  var simulationFps = Optionen.TicksProSekunde
  var bus = Minibus.create()
  
  var Pulse = {}
  
  Pulse.getBus = function(){
    return bus
  }
  
  Pulse.Init = function() {
    bus.emit('init', hudid)
    bus.emit('redraw')
    running = true
    Sim.Init(seed)
    startTime = Date.now()
    Pulse.setFps(Optionen.TicksProSekunde)
  }
  
  function simTick() {
    bus.emit('pre-tick')
    Sim.Update()
    bus.emit('post-tick')
    updateStatus()
  }
  
  var lastStatusUpdate = 0
  
  function updateStatus() {
    if (Date.now() - lastStatusUpdate > 50) {
      var runState = Math.round((Sim.getCycles()-1) / Optionen.Runden * 100);
      bus.emit('update-status', "Tick " + Sim.getCycles() + "/" + Optionen.Runden + " (" + runState + "%)")
      lastStatusUpdate = Date.now()
    }
  }
  
  Pulse.Tick = function() {
    if (!running)
      return false
    if (Sim.getCycles() >= Optionen.Runden) {
      if (running)
        end()
      return false
    }
    if (simulationFps) {
      var elapsedTime = Date.now() - startTime;
      var targetCycle = elapsedTime / 1000 * simulationFps;
      var skippedFrames = 0;
      while(Sim.getCycles() < targetCycle && 
        skippedFrames < Optionen.MaximalÜbersprungeneFrames){
        simTick()
        skippedFrames++;
        bus.emit('redraw')
      }
      if (skippedFrames >= Optionen.MaximalÜbersprungeneFrames) {
        startTime = Date.now() - (Sim.getCycles() / simulationFps * 1000);
      }
    } else {
      simTick()
      return true
    }
  }
  
  Pulse.setFps = function(newFps){
    simulationFps = newFps
    if (newFps)
      startTime = Date.now() - (Sim.getCycles() / simulationFps * 1000)
  }
  
  function end(){
    running = false
    bus.emit('update-status', "beendet")
    bus.emit('submit', Sim.getPoints())
  }
  var hash = ''
  var prefix = ''
  var seed = undefined
  var hudid = "hud"
  
  Pulse.getInfo = function() {
    return {hash:hash, prefix:prefix}
  }
  
  View.Pulse = Pulse
  
  
  AntIT.StarteSimulation = function(h, p, hud, levels, colors){
    hash = h
    prefix = p
    if (hud)
      hudid = hud
    Sim.setLevels(levels)
    Sim.setColors(colors)
    bus.emit('start')
  }
  
  AntIT.SetzeSeed = function(seed) {
    if (seed)
      Sim.seed(seed)
  }

})(AntIT._view);
