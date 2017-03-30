// PLAYER 
  
function Player(_id, _KI) {

  var id = _id;
  var KI = _KI;
  var points = 0;
  var collectedSugar = 0;
  var ants = 0;
  var collectedApples = 0;
  var deadants = 0;
  var pointsE = document.createElement("DIV");
  var details = document.createElement("DIV");
  
  function initHTML() {
    var para = document.createElement("DIV");
    var nameE =document.createElement("DIV");
    nameE.innerHTML = KI.Name;
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
  
  function updateDetails(){
    details.innerHTML = "(Ameisen: " + ants + " / Tote: " + deadants + 
      " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")";
  }
  
  this.addSugar = function(amount) {
    collectedSugar += amount;
    updateDetails();
  }
  
  this.addApple = function() {
    collectedApples++;
    updateDetails();
  }
  
  this.addAnt = function(){
    ants++;
    updateDetails();
  }
  
  this.subAnt = function(){
    ants--;
    deadants++;
    updateDetails();
  }
  
  this.getId = function() {
    return id;
  }
  
  this.getKI = function() {
    return KI;
  }
  
  this.getPoints = function() {
    return points;
  }
  
  this.addPoints = function(amount) {
    points = Math.max(0, points + amount);
    pointsE.innerHTML = points + " Punkte";
  }
  
  // constructor
  initHTML();
  updateDetails();
  this.addPoints(0);
}
