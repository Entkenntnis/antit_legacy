// SimObject
function SimObject(_obj) {
  var roundId = API.callId;
  var obj = _obj;
  
  this.get = function(key) {
    if (key === Sim && API.callId == roundId) {
      return obj;
    }
    API.message("Objekt ist abgelaufen und kann nicht mehr verwendet werden.")
    return;
  }
}
