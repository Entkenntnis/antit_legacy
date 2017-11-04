

// START OF simulation pulsing: start, stop, interval, end

(function () {
  "use strict";
  
  var am = AntIT;
  var vw = AntIT._vw;
  var Sim = AntIT._sim;
  var Optionen = AntIT._optionen;
  
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
      Sim.Init();
      SimPulse.startTime = Date.now();
      vw.onExtTick = SimPulse.tick;
    }
    
    , tick:function(){
      if (Sim.getCycles() >= Optionen.Runden) {
        if (SimPulse.running)
          SimPulse.end();
        return;
      }
      var elapsedTime = Date.now() - SimPulse.startTime;
      var targetCycle = elapsedTime / 1000 * SimPulse.simulationFps;
      var skippedFrames = 0;
      while(Sim.getCycles() < targetCycle && skippedFrames < Optionen.MaximalÜbersprungeneFrames){
        AntIT._stats.begin()
        Sim.Update();
        AntIT._stats.end()
        if (window.myTick)
          window.myTick()
        var runState = Math.round((Sim.getCycles()-1) / Optionen.Runden * 100);
        SimPulse.simStatus.innerHTML = "Fortschritt: " + runState + "%";
        skippedFrames++;
        vw.needRedraw = true;
      }
      if (skippedFrames >= Optionen.MaximalÜbersprungeneFrames) {
        SimPulse.startTime = Date.now() - (Sim.getCycles() / SimPulse.simulationFps * 1000);
      }
    }
    
    , end:function(){
      SimPulse.running = false;
      SimPulse.simStatus.innerHTML = "beendet";
      if (AntIT._onSubmit) {
        AntIT._onSubmit(Sim.getPoints())
      }
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
      SimPulse.startTime = Date.now() - (Sim.getCycles() / SimPulse.simulationFps * 1000);
    }
  }
  
  AntIT._submitFinished = function() {
    SimPulse.simStatus.innerHTML = "Simulation abgeschlossen";
  }
  
  AntIT._abortSimulation = function () {
    var error =  document.createElement("DIV");
    error.innerHTML = "Simulationsfehler";
    error.style.color = "red";
    error.style.marginTop = "20px";
    error.style.marginLeft = "50px";
    error.style.fontWeight = "bold";
    document.getElementById("hud").appendChild(error);
    throw "Simulationsfehler";
  }
  
  var playerElements = {}
  
  Sim.getBus().on('add-player-status', function(id, name, color) {
    var pointsE = document.createElement("DIV")
    var details = document.createElement("DIV")
    var para = document.createElement("DIV")
    var nameE =document.createElement("DIV")
    nameE.innerHTML = name
    nameE.style.minWidth = "180px"
    para.appendChild(nameE)
    para.style.display = "flex"
    para.style.fontWeight = "bold"
    var hexS = color.toString(16)
    while (hexS.length < 6)
      hexS = "0" + hexS
    para.style.color = "#" + hexS
    pointsE.id = "player" + id
    pointsE.style.marginLeft = "10px"
    para.appendChild(pointsE)
    details.style.fontWeight = "normal"
    details.style.color = "black"
    details.style.marginLeft = "20px"
    para.appendChild(details)
    document.getElementById("hud").appendChild(para)
    playerElements[id] = {points : pointsE, details : details}
  })
  
  Sim.getBus().on('update-player-points', function(id, points) {
    playerElements[id].points.innerHTML = points + " Punkte";
  })
  
  Sim.getBus().on('update-player-stats', function(id, str) {
    playerElements[id].details.innerHTML = str
  })
  
  vw.onExtLoad = SimPulse.init;
  
  delete am._vw;
  delete am._sim;
  delete am._optionen;

})();
