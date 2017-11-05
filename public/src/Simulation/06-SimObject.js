(function(Sim){

  // SimObject
  function SimObject(obj, timeless) {
    
    var roundId = Sim.API.callId;
    
    this.get = function(key) {
      if (key === Sim && (Sim.API.callId == roundId || timeless === true)) {
        return obj;
      }
      Sim.API.message("Objekt ist abgelaufen und kann nicht mehr verwendet werden.")
      return;
    }
  }
  
  Sim.SimObject = SimObject

})(AntIT._rawsim)
