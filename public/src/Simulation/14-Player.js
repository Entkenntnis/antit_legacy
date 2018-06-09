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
    var cooldown = false
    var poison = 0
    
    function initHTML() {
      Sim.Bus.emit('add-player-status', id, my.KI.Name, 
                   Sim.Opts.SpielerFarben[Sim.colors[my.id]])
    }
    
    function updateDetails(){
      var line1 = "(Ameisen: " + ants + " / Tote: "
         + deadants + " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")"
      if (Sim.Opts.Kampfmodus) {
        var energy = Sim.hills[id].getEnergy()
        var lp = Sim.hills[id].getLp()
        Sim.Bus.emit('update-player-stats', id, "Bau: " + lp + ", Energie: " + energy +
          ", Einheiten: " + units + ", Arbeiter: " + ants +  "/10, Tote: " + deadants +
          ", Status: " + (cooldown?"laden":"bereit")) 
      } else {
        Sim.Bus.emit('update-player-stats', id, "(Ameisen: " + ants + " / Tote: "
         + deadants + " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + 
         " / Gift: " + poison + ")")
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
    
    this.addPoison = function(){
      poison++
      updateDetails();
    }
    
    this.getPoison = function(){
      return poison
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
    
    this.getSugar = function(){
      return collectedSugar
    }
    
    this.getApple = function(){
      return collectedApples
    }
    
    this.setCooldown = function(){
      cooldown = true
      updateDetails();
    }
    
    this.resetCooldown = function(){
      cooldown = false
      updateDetails();
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
