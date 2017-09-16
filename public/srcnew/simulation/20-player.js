
(function(){
  
  var rawPlayers = []
  
  AntIT.AddProp("NeueAmeise", function(name){
    var ant = {Name: name, Type:"ant"}
    rawPlayers.push(ant)
    return ant
  })
  
  var playerArray = []
  
  AntIT.Bus.on('init', function(){
    AntIT.AddProp('Players', playerArray)
    for (var i = 0; i < rawPlayers.length; i++) {
      playerArray.push(new Player(i, rawPlayers[i]))
    }
  })
  
  function Player(id, ki){
  
    this.getId = function(){
      return id
    }
    
    this.getKi = function(){
      return ki
    }
    
    AntIT.Bus.emit('add-player', id, ki.Name, ki.Type)
    
  }

})()













