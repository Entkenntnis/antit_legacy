(function(Sim){

  // PLAYER 
    
  function Player(id, KI) {

    var my = Sim.Util.makeAttributes(this, {
      id: id,
      KI: KI,
      points: 0
    })
    
    var collectedSugar = 0;
    var ants = 0;
    var collectedApples = 0;
    var deadants = 0;
    var units = 0
    
    function initHTML() {
      Sim.Bus.emit('add-player-status', id, my.KI.Name, Sim.Opts.SpielerFarben[my.id])
    }
    
    function updateDetails(){
      var line1 = "(Ameisen: " + ants + " / Tote: "
         + deadants + " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")"
      if (Sim.Opts.Kampfmodus) {
        var energy = Sim.hills[id].getEnergy()
        var lp = Sim.hills[id].getLp()
        Sim.Bus.emit('update-player-stats', id, "Bau: " + lp + ", Energie: " + energy +
          ", Einheiten: " + units + ", Arbeiter: " + ants +  "/10, Tote: " + deadants)
      } else {
        Sim.Bus.emit('update-player-stats', id, "(Ameisen: " + ants + " / Tote: "
         + deadants + " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")")
      }
      
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
    
    this.addUnit = function(){
      units++
      updateDetails()
    }
    
    this.subUnit = function(){
      units--
      deadants++
      updateDetails()
    }
    
    this.getUnits = function(){
      return units
    }
    
    this.getAnts = function() {
      return ants
    }
    
    this.updateDetails = updateDetails
    
    this.subAnt = function(){
      ants--;
      deadants++;
      updateDetails();
    }
    
    this.getAnts = function(){
      return ants
    }
    
    this.addPoints = function(amount) {
      my.points = Math.max(0, my.points + amount)
      Sim.Bus.emit('update-player-points', id, my.points)
    }
    
    // constructor
    initHTML();
    updateDetails();
    this.addPoints(0);
    if (KI.Init) KI.Init()
  }
  
  Sim.Player = Player

})(AntIT._rawsim)
