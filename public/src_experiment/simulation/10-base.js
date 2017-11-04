
(function(){

  var Opts = AntIT.AddOptions({
    Runden : 7500,
  })

  AntIT.AddProp("StarteSimulation", function(){
    AntIT.Bus.emit('start')
  })
  
  var cycle
  
  AntIT.AddProp("Init", function(){
    cycle = 0
    AntIT.Bus.emit('init')
  })
  
  AntIT.AddProp("Tick", function(){
    if (cycle >= Opts.Runden)
      return false
    AntIT.Bus.emit('tick', ++cycle)
    return cycle
  })

})()
