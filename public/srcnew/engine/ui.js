
(function(){

  var simStatus

  AntIT.Bus.on('init', function(){
    simStatus = document.createElement("DIV")
    document.getElementById("hud").appendChild(simStatus)
    document.getElementById("loading").style.display = "none"
  })
  
  AntIT.Bus.on('progress', function(p){
    if (p == -1)
      simStatus.innerHTML = "beendet"
    else
      simStatus.innerHTML = "Fortschritt: " + p + "%"
  })
  
  document.onkeypress = function(e){
    var newFps = undefined
    if (e.charCode == 49) // 1
      newFps = 4
    if (e.charCode == 50) // 2
      newFps = 40
    if (e.charCode == 51) // 3
      newFps = 140
    if (newFps && AntIT.SetFps) {
      AntIT.SetFps(newFps)
    }
  }

})()
