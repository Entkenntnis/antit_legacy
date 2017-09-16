
(function(){

  var Opts = AntIT.AddOptions({
    HügelRadius : 40,
  })
  
  AntIT.Unit.addType("Hill")
  AntIT.Unit.addAttribute("Hill", "playerid", -1)
  
  AntIT.Bus.on('init', function(){
    AntIT.Players.forEach(function(p){
      var newpos = AntIT.HillSpawner.getHillPos(AntIT.Units.Hill)
      var unit = AntIT.Unit.create("Hill", newpos)
      unit.setAttr("playerid", p.getId())
      AntIT.Bus.emit('set-hill-player', unit.getId(), p.getId())
    })
  })

})()
