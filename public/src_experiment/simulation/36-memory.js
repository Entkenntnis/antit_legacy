
(function(){

  AntIT.Unit.addAttribute('Ant', 'memory')
  
  AntIT.Unit.Bus.on('create-ant', function(ant){
    ant.setAttr('memory', {})
  })

})()
