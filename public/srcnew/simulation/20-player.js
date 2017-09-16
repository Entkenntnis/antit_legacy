
(function(){

  var Opts = AntIT.AddOptions({
    SpielerFarben : [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff,
                     0xffff00, 0xff00ff, 0xffffff, 0x000000],
  })
  
  var statistics = []
  var statisticStartValues = {}
  
  AntIT.AddProp("AddStatistic", function(name, startValue) {
    if (name in statisticStartValues) {
      console.log("Warning: statistic already defined " + name)
    } else {
      statistics.push(name)
      statisticStartValues[name] = startValue
    }
  })
  
  var rawAnts = []
  
  AntIT.AddProp("NeueAmeise", function(name){
    var ant = {Name: name, Type:"ant"}
    if (rawAnts.length < Opts.SpielerFarben.length) {
      rawAnts.push(ant)
    } else {
      console.log("Warning: Dropping ant " + name)
    }
    return ant
  })
  
  var playerArray = []
  
  AntIT.Bus.on('init', function(){
    AntIT.AddProp('Players', playerArray)
    for (var i = 0; i < rawAnts.length; i++) {
      playerArray.push(new Player(i, rawAnts[i]))
    }
  })
  
  // class
  function Player(id, ki){
  
    this.getId = function(){
      return id
    }
    
    this.getKi = function(){
      return ki
    }
    
    AntIT.Bus.emit('add-player', id, ki.Name, Opts.SpielerFarben[id])
    
    var score = 0
    
    this.addPoints = function(amount) {
      score = Math.max(0, score + amount);
      AntIT.Bus.emit('set-score', id, score + " Punkte")
    }
    
    var stats = {}
    
    statistics.forEach(function(s){
      stats[s] = statisticStartValues[s]
    })
    
    this.setDetail = function(name, val){
      if (name in stats) {
        stats[name] = val
        update()
      }
    }
    
    this.getDetail = function(name){
      return stats[name]
    }
    
    this.addToDetail = function(name, amout){
      if (name in stats) {
        stats[name] += amout
        update()
      }
    }
    
    function update(){
      var values = statistics.map(function(key){
        return key + ": " + stats[key]
      }).join(" / ")
      AntIT.Bus.emit('set-details', id, "(" + values + ")")
    }
    
    this.addPoints(0)
    update()
  }

  

})()













