
(function(){

  var Opts = AntIT.AddOptions({
    AmeisenGröße : 2.5,
  })

  var antCache
  
  AntIT.Bus.on('load', function(){
    AntIT.LoadObj("/models/ant.json", function ( obj ) {
      obj.children[0].children.forEach(function(o){
        o.material = new THREE.MeshLambertMaterial({color:0x000000});
      })
      var s = Opts.AmeisenGröße
      obj.scale.set(s, s, s)
      antCache = new AntIT.Cache3d(obj, AntIT.Scene)
    })
  })

  function setAntBodyColor(ant, c){
    [/*10,*/ 7, 6].forEach(function(id){
      ant.children[0].children[id].material = new THREE.MeshPhongMaterial({color:c});
    });
  }
  
  AntIT.Bus.on('add-ant', function(antid) {
    antCache.get(antid)
  })
  
  AntIT.Bus.on('set-ant-player', function(id, playerid) {
    setAntBodyColor(antCache.get(id), AntIT.ColorOf(playerid))
  })
  
  AntIT.Bus.on('move-ant', function(id, pos) {
    antCache.get(id).position.copy(AntIT.ToViewPos(pos))
  })
  
  AntIT.Bus.on('turn-ant', function(id, heading) {
    antCache.get(id).rotation.y = -heading / 180 * Math.PI + Math.PI
  })
  
  AntIT.Bus.on('remove-ant', function(id) {
    antCache.remove(id)
  })

})()
