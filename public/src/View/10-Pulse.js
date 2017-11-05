

// START OF simulation pulsing: start, stop, interval, end

(function () {
  "use strict";
  
  var Sim = AntIT._sim;
  var Optionen = AntIT._optionen;
  var hash = ''
  var prefix = ''
  
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
        if (AntIT._stats) AntIT._stats.begin()
        Sim.Update();
        if (AntIT._stats) AntIT._stats.end()
        if (window.myTick)
          window.myTick()
        var runState = Math.round((Sim.getCycles()-1) / Optionen.Runden * 100);
        SimPulse.simStatus.innerHTML = "Fortschritt: " + runState + "%";
        skippedFrames++;
        x.val2()
      }
      if (skippedFrames >= Optionen.MaximalÜbersprungeneFrames) {
        SimPulse.startTime = Date.now() - (Sim.getCycles() / SimPulse.simulationFps * 1000);
      }
    }
    
    , end:function(){
      SimPulse.running = false;
      SimPulse.simStatus.innerHTML = "beendet";
      if (onSubmit) {
        onSubmit(Sim.getPoints())
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
  
  var x = {val:function(){},val2:function(){},val3:function(){return SimPulse.running}}
  AntIT._extStart = x
  
  AntIT.StarteSimulation = function(h, p){
    hash = h
    prefix = p
    x.val(SimPulse.init, SimPulse.tick)
  }
  
  function onSubmit(points) {
    var request = new XMLHttpRequest();
    request.open("GET", prefix + "/submit?hash=" + hash + "&points=" + points);
    request.addEventListener('load', function(event) {
       if (request.status >= 200 && request.status < 300) {
          if (request.responseText == "ok") {
            SimPulse.simStatus.innerHTML = "Simulation abgeschlossen";
          }
       }
    });
    request.send();
  }
  
  Sim.getBus().on('abort-simulation', function () {
    var error =  document.createElement("DIV");
    error.innerHTML = "Simulationsfehler";
    error.style.color = "red";
    error.style.marginTop = "20px";
    error.style.marginLeft = "50px";
    error.style.fontWeight = "bold";
    document.getElementById("hud").appendChild(error);
    throw "Simulationsfehler";
  })
  
  
  window.onerror=fehler;
  function fehler(msg){
   alert("MELDUNG\n" + msg);
   Sim.getBus().emit('abort-simulation')
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

})();
