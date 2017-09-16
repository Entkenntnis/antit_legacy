
(function(){

  console.log("AntIT! Simulation Logger")
  
  function printPos(pos) {
    return Math.round(pos.x) + "|" + Math.round(pos.y)
  }
  
  AntIT.Bus.on('add-player', function(id, name, type) {
    console.log("Neuer Spieler (" + id + ") " + name + " als '" + type + "'")
  })
  
  AntIT.Bus.on('add-board', function(width, height) {
    console.log("Spielfeldgröße " + width + "x" + height)
  })
  
  AntIT.Bus.on('add-hill', function(id, pos) {
    console.log("Neuer Hügel für (" + id + ") bei " + printPos(pos))
  })
  
  AntIT.Bus.on('add-ant', function(antid, playerid, pos, heading) {
    console.log("Neue Ameise (" + playerid + ") mit Nr. " + antid + " bei " + printPos(pos) + " in Richtung " + heading)
  })
  
  AntIT.Bus.on('move-ant', function(antid, pos) {
    console.log("Bewegung Ameise Nr. " + antid + " nach " + printPos(pos))
  })
  
  AntIT.Bus.on('turn-ant', function(antid, heading) {
    console.log("Drehe Ameise Nr. " + antid + " nach " + heading)
  })
  
  AntIT.Bus.on('remove-ant', function(antid) {
    console.log("Entferne Ameise Nr. " + antid)
  })
  
  AntIT.Bus.on('add-sugar', function(id, pos, amount) {
    console.log("Neuer Zuckerhaufen Nr. " + id +
      " mit " + amount + " Zucker bei " + printPos(pos))
  })
  
  AntIT.Bus.on('unload-sugar', function(id, amount) {
    console.log("Entlade Zuckerhaufen Nr. " + id + " zu " + amount)
  })
  
  AntIT.Bus.on('remove-sugar', function(id) {
    console.log("Entferne Zuckerhaufen Nr. " + id)
  })
  
  AntIT.Bus.on('tick', function(cycle) {
    if (AntIT.Units.Ant.length > 0 && (cycle % 40) == 0) {
      AntIT.Units.Ant[0].move(AntIT.Board.randomPos())
      AntIT.Units.Ant[0].turn(Math.random()*20-10)
    }
  })
  

})()
