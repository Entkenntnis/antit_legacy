

(function(){

  var Opts = AntIT.AddOptions({
    ZuckerPunkte : 5,
  })

  var scores = {}
  var stats = ['ants', 'deads', 'sugars', 'apples']
  var labels = ['Ameisen', 'Tote', 'Zucker', 'Äpfel']
  
  AntIT.Bus.on('init', function(){
    AntIT.Players.forEach(function(p){
      scores[p.getId()] = {
        points:0,
        ants:0,
        deads:0,
        sugars:0,
        apples:0,
      }
      updatePoints(p.getId())
      updateStats(p.getId())
    })
  })

  AntIT.Bus.on('set-ant-player', function(x, id){
    scores[id].ants++
    updateStats(id)
  })

  AntIT.Unit.Bus.on('discard-ant', function(ant){
    scores[ant.getAttr('playerid')].ants--
    scores[ant.getAttr('playerid')].deads++
    updateStats(ant.getAttr('playerid'))
  })
  
  AntIT.Bus.on('sugar-collected', function(playerid, load) {
    scores[playerid].sugars += load
    scores[playerid].points += load * Opts.ZuckerPunkte
    updateStats(playerid)
    updatePoints(playerid)
  })
  
  function updatePoints(playerid) {
    AntIT.Bus.emit('set-score', playerid, scores[playerid].points + " Punkte")
  }
  
  function updateStats(playerid){
    var values = stats.map(function(key, index){
      return labels[index] + ": " + scores[playerid][key]
    }).join(" / ")
    AntIT.Bus.emit('set-details', playerid, "(" + values + ")")
  }



})()
