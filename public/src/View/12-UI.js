
(function(View){

  var simStatus = document.createElement("DIV")
  
  View.Pulse.getBus().on('init', function(){
    document.getElementById("hud").appendChild(simStatus)
  })
  
  View.Pulse.getBus().on('update-status', function(txt){
    simStatus.innerHTML = txt
  })

  document.onkeypress = function(e){
    var newFps = undefined;
    if (e.charCode == 49)
      newFps = 4
    if (e.charCode == 50)
      newFps = 40;
    if (e.charCode == 51)
      newFps = 140;
    if (e.charCode == 52)
      newFps = 7500;
    if (newFps) {
      View.Pulse.setFps(newFps)
    }
  }
 
  View.Pulse.getBus().on('submit', onSubmit)
  
  function onSubmit(points) {
    var info = View.Pulse.getInfo()
    var request = new XMLHttpRequest();
    request.open("GET", info.prefix + "/submit?hash=" + info.hash + "&points=" + points);
    request.addEventListener('load', function(event) {
       if (request.status >= 200 && request.status < 300) {
          if (request.responseText == "ok") {
            simStatus.innerHTML = "Simulation abgeschlossen";
          }
       }
    });
    request.send();
  }
  
  var Sim = View.Sim
  
  Sim.getBus().on('abort-simulation', function () {
    var error =  document.createElement("DIV");
    error.innerHTML = "Simulationsfehler";
    error.style.color = "red";
    error.style.marginTop = "20px";
    error.style.marginLeft = "50px";
    error.style.fontWeight = "bold";
    if (document.getElementById("hud")) {
      document.getElementById("hud").appendChild(error)
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
    document.getElementById("hud").appendChild(para)
    playerElements[id] = {points : pointsE, details : details}
  })
  
  Sim.getBus().on('update-player-points', function(id, points) {
    playerElements[id].points.innerHTML = points + " Punkte";
  })
  
  Sim.getBus().on('update-player-stats', function(id, str) {
    playerElements[id].details.innerHTML = str
  })


})(AntIT._view)
