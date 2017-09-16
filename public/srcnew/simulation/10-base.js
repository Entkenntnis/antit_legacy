
(function(){

  AntIT.AddProp("StarteSimulation", function(){
    AntIT.Bus.emit('start')
  })
  
  var cycle = 0
  
  AntIT.AddProp("Init", function(){
    AntIT.Bus.emit('init')
  })
  
  AntIT.AddProp("Tick", function(){
    AntIT.Bus.emit('tick', ++cycle)
    return cycle
  })

})()
