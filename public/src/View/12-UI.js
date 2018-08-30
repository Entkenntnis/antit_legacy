
(function(View){

  var simStatus = undefined
  var levelStatus = undefined
  
  var hudid = ""
  
  View.Pulse.getBus().on('init', function(hud){
    simStatus = document.createElement("DIV")
    levelStatus = document.createElement("DIV")
    hudid = hud
    document.getElementById(hudid).appendChild(simStatus)
    document.getElementById(hudid).appendChild(levelStatus)
    document.getElementById("loading").style.display = "none"
    document.addEventListener("keypress", keypresshandler);
  })
  
  View.Pulse.getBus().on('update-status', function(txt){
    simStatus.innerHTML = txt
  })
  
  View.Sim.getBus().on('update-levelstatus', function(txt){
    levelStatus.innerHTML = txt
  })
  
  function keypresshandler(e){
    var newFps = undefined;
    if (e.charCode == 49)
      newFps = 4
    if (e.charCode == 50)
      newFps = 40;
    if (e.charCode == 51)
      newFps = 140;
    if (e.charCode == 52)
      newFps = 140;
    if (newFps) {
      View.Pulse.setFps(newFps)
    }
    if (e.charCode == 71 || e.charCode == 103) { // G
      View.Sim.placeGrid()
      View.Pulse.getBus().emit('redraw')
    }
    if (e.charCode == 84 || e.charCode == 116) { // T
      Sim.getBus().emit('toggle-dead-info')
    }
  }
 
  View.Pulse.getBus().on('submit', View.Opts.Levelmodus ? onSubmitLevel : onSubmit)
  
  function onSubmit(points) {
    var info = View.Pulse.getInfo()
    if (info.prefix == null)
      return
    var request = new XMLHttpRequest();
    request.open("GET", "/submit?hash=" + info.hash + "&points=" + points);
    request.addEventListener('load', function(event) {
       if (request.status >= 200 && request.status < 300) {
          if (request.responseText == "ok") {
            simStatus.innerHTML = "Simulation abgeschlossen";
          }
       }
    });
    request.send();
  }
  
  View.Sim.getBus().on('submit-level', onSubmitLevel)
  
  function onSubmitLevel() {
    if (View.Sim.getLevel().isDone()) {
      var info = View.Pulse.getInfo()
      var request = new XMLHttpRequest();
      request.open("GET", info.prefix.replace('level', 'submitlevel') + "&hash=" + info.hash);
      request.addEventListener('load', function(event) {
         if (request.status >= 200 && request.status < 300) {
            if (request.responseText == "ok") {
              simStatus.innerHTML = "Simulation abgeschlossen"
              alert("Glückwunsch, du hast die Aufgabe geschafft!")
              var ind = info.prefix.indexOf("?")
              window.location = info.prefix.substr(0, ind)
              return
            }
         }
         alert("Du hast die Aufgabe geschafft, aber beim Abschicken ist ein Fehler aufgetreten. Versuche es noch einmal.")
      });
      request.send();
    } else {
      alert("Du hast das Ziel der Aufgabe nicht erreicht. Probiere es noch einmal.")
    }
  }
  
  var Sim = View.Sim
  
  Sim.getBus().on('abort-simulation', function () {
    var error =  document.createElement("DIV");
    error.innerHTML = "Simulationsfehler";
    error.style.color = "red";
    error.style.marginTop = "20px";
    error.style.marginLeft = "50px";
    error.style.fontWeight = "bold";
    if (document.getElementById(hudid)) {
      document.getElementById(hudid).appendChild(error)
    }
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
    document.getElementById(hudid).appendChild(para)
    playerElements[id] = {points : pointsE, details : details}
  })
  
  Sim.getBus().on('update-player-points', function(id, points) {
    playerElements[id].points.innerHTML = points + " Punkte";
  })
  
  Sim.getBus().on('update-player-stats', function(id, str) {
    playerElements[id].details.innerHTML = str
  })


})(AntIT._view)
