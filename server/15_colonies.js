 
// Managing colonies and stuff
const co = require('co')

module.exports = function(App) {
  
  var colonyInfo = {}
  
  function readinColonies() {
    return co(function*(){
      var val = yield App.db.get('info').find({})
      val.forEach(function(colony){
        colonyInfo[colony.colonyName] = colony
      })
    })
  }
  
  function stringToCollection(path) {
    if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
      return App.db.get('colony_' + path)
    else
      return null
  }
  
  function stringToObj(path) {
    if (path && colonyInfo[path] && colonyInfo[path].colonyName == path)
      return colonyInfo[path]
    else
      return null
  }
  
  App.start = App.start.then(() => {
    return readinColonies()
  })
  
  App.colo = {
    getCol : stringToCollection,
    get : stringToObj,
    all : function() { return colonyInfo },
    refresh : readinColonies,
  }
}
