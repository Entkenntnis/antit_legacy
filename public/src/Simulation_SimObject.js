// SimObject
function SimObject(obj) {
  
  var roundId = API.callId;
  
  this.get = function(key) {
    if (key === Sim && API.callId == roundId) {
      return obj;
    }
    API.message("Objekt ist abgelaufen und kann nicht mehr verwendet werden.")
    return;
  }
}
