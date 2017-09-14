
(function(){

  var Optionen = AntIT.Optionen
  Optionen.MaximaleSpieler = 8
  Optionen.SpielerFarben = [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff,
                       0xffff00, 0xff00ff, 0xffffff, 0x000000]
  
  var pointsE = document.createElement("DIV");
  var details = document.createElement("DIV");

  AntIT.Bus.on('init', function(){
    
    AntIT.Players = []
    
    for (var i = 0; i < rawPlayers.length; i++) {
      AntIT.Players.push({
        id: i,
        KI:rawPlayers[i]
      })
    }
    
    console.log(AntIT.Players)
    
    AntIT.Players.forEach(function(player){
      initHTML(player.id, player.KI.Name)
    })
  })

  var rawPlayers = []
    
  AntIT.NeueAmeise = function (name) {
    var newAnt = {Name:name}
    if (rawPlayers.length < Optionen.MaximaleSpieler) {
      rawPlayers.push(newAnt)
    }
    return newAnt
  }
  
  function initHTML(id, name) {
    var para = document.createElement("DIV");
    var nameE =document.createElement("DIV");
    nameE.innerHTML = name;
    nameE.style.minWidth = "180px";
    para.appendChild(nameE);
    para.style.display = "flex";
    para.style.fontWeight = "bold";
    var hex = Optionen.SpielerFarben[id];
    var hexS = hex.toString(16);
    while (hexS.length < 6)
      hexS = "0" + hexS;
    para.style.color = "#" + hexS;
    pointsE.id = "player" + id;
    pointsE.style.marginLeft = "10px";
    para.appendChild(pointsE);
    details.style.fontWeight = "normal";
    details.style.color = "black";
    details.style.marginLeft = "20px";
    para.appendChild(details);
    document.getElementById("hud").appendChild(para);
  }

})()
