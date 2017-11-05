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
    
    function initHTML() {
      Sim.bus.emit('add-player-status', id, my.KI.Name, Sim.Opts.SpielerFarben[my.id])
    }
    
    function updateDetails(){
      Sim.bus.emit('update-player-stats', id, "(Ameisen: " + ants + " / Tote: " + deadants + 
        " / Zucker: " + collectedSugar + " / Äpfel: " + collectedApples + ")")
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
    
    this.addPoints = function(amount) {
      my.points = Math.max(0, my.points + amount)
      Sim.bus.emit('update-player-points', id, my.points)
    }
    
    // constructor
    initHTML();
    updateDetails();
    this.addPoints(0);
  }
  
  Sim.Player = Player

})(AntIT._rawsim)
