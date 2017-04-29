

// START OF simulation pulsing: start, stop, interval, end

(function () {
  "use strict";
  
  var am = AntJS;
  var vw = AntJS._vw;
  var Sim = AntJS._sim;
  var Optionen = AntJS._optionen;
  
  var SimPulse = {
      running : false
    , startTime : undefined
    , simulationFps : Optionen.TicksProSekunde
    , simStatus : undefined
    
    , init:function(){
      // call this to start simulation
      SimPulse.simStatus = document.createElement("DIV");
      document.getElementById("hud").appendChild(SimPulse.simStatus);
      
      SimPulse.needsRedraw = true;
      SimPulse.running = true;
      Sim.cycles = 0;
      Sim.init();
      SimPulse.startTime = Date.now();
      vw.onExtTick = SimPulse.tick;
    }
    
    , tick:function(){
      if (Sim.cycles >= Optionen.Runden) {
        SimPulse.end();
        return;
      }
      var elapsedTime = Date.now() - SimPulse.startTime;
      var targetCycle = elapsedTime / 1000 * SimPulse.simulationFps;
      var skippedFrames = 0;
      while(Sim.cycles < targetCycle && skippedFrames < Optionen.MaximalÜbersprungeneFrames){
        Sim.update();
        var runState = Math.round(Sim.cycles / Optionen.Runden * 100);
        SimPulse.simStatus.innerHTML = "Fortschritt: " + runState + "%";
        Sim.cycles++;
        skippedFrames++;
        vw.needRedraw = true;
      }
      if (skippedFrames >= Optionen.MaximalÜbersprungeneFrames) {
        SimPulse.startTime = Date.now() - (Sim.cycles / SimPulse.simulationFps * 1000);
      }
    }
    
    , end:function(){
      SimPulse.running = false;
      SimPulse.simStatus.innerHTML = "beendet";
    }
  }
  
  document.onkeypress = function(e){
    var newFps = undefined;
    if (e.charCode == 49)
      newFps = 4
    if (e.charCode == 50)
      newFps = 40;
    if (e.charCode == 51)
      newFps = 140;
    if (newFps) {
      SimPulse.simulationFps = newFps;
      SimPulse.startTime = Date.now() - (Sim.cycles / SimPulse.simulationFps * 1000);
    }
  }
  
  vw.onExtLoad = SimPulse.init;
  
  delete am._vw;
  delete am._sim;
  delete am._optionen;

})();
