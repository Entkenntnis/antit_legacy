
(function(){
  
  var pointsEs = {}
  var detailss = {}
  
  AntIT.Bus.on('add-player', function(id, name, color){
    var para = document.createElement("DIV")
    var nameE = document.createElement("DIV")
    nameE.innerHTML = name
    nameE.style.minWidth = "180px"
    para.appendChild(nameE)
    para.style.display = "flex"
    para.style.fontWeight = "bold"
    var hex = color
    var hexS = hex.toString(16)
    while (hexS.length < 6)
      hexS = "0" + hexS;
    para.style.color = "#" + hexS
    var pointsE = document.createElement("DIV")
    var details = document.createElement("DIV")
    pointsE.id = "player" + id
    pointsE.style.marginLeft = "10px"
    para.appendChild(pointsE)
    details.style.fontWeight = "normal"
    details.style.color = "black"
    details.style.marginLeft = "20px"
    para.appendChild(details)
    document.getElementById("hud").appendChild(para)
    pointsEs[id] = pointsE
    detailss[id] = details
  })
  
  AntIT.Bus.on('set-score', function(id, str){
    pointsEs[id].innerHTML = str
  })
  
  AntIT.Bus.on('set-details', function(id, str){
    detailss[id].innerHTML = str
  })

})()
