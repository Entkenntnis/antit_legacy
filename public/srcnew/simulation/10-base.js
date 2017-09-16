
(function(){

  AntIT.AddProp("StarteSimulation", function(){
    AntIT.Bus.emit('start')
  })
  
  AntIT.AddProp("Init", function(){
    AntIT.Bus.emit('init')
  }
  
  AntIT.AddProp("Tick", function(){
    AntIT.Bus.emit('tick')
  }

})()
