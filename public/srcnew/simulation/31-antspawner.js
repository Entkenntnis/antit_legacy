
(function(){

  var Opts = AntIT.AddOptions({
    AmeisenMaximum : 100,
    AmeiseWartezeit : 30,
    AmeiseKosten : 200,
    AnfangsEnergie : 4000,
  })
  
  AntIT.Unit.addAttribute('Hill', 'energy', Opts.AnfangsEnergie)
  AntIT.Unit.addAttribute('Ant', 'playerid')
  
  var spawners = []
  
  AntIT.Bus.on('init', function(){
    AntIT.Players.forEach(function(p){
      spawners.push(new AntSpawner(p.getId()))
    })
  })
  
  AntIT.Unit.Bus.on('remove-ant', function(ant){
    spawners[ant.getAttr('playerid')].removeAnt()
  })
  
  function AntSpawner(id) {
  
    var timetoNextAnt = Opts.AmeiseWartezeit
    var hill = AntIT.Units.Hill[id]
    var antcount = 0
    
    function update(){
      if (timetoNextAnt-- <= 0 && antcount < Opts.AmeisenMaximum
            && hill.getAttr('energy') >= Opts.AmeiseKosten) {
        timetoNextAnt = Opts.AmeiseWartezeit
        hill.setAttr('energy', hill.getAttr('energy') - Opts.AmeiseKosten)
        var antPos = {x:hill.getPos().x,y:hill.getPos().y}
        var angle = Math.random()*Math.PI*2
        var radius = Opts.HügelRadius + (Math.random()*10 - 5);
        antPos.x += Math.cos(angle)*radius
        antPos.y += Math.sin(angle)*radius
        var ant = AntIT.Unit.create('Ant', antPos)
        ant.setAttr('playerid', id)
        AntIT.Bus.emit('set-ant-player', ant.getId(), id)
      }
    }
    
    AntIT.Bus.on('tick', update)
    
    this.removeAnt = function() { antcount-- }
  }

  


})()
