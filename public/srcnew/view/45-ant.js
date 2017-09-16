
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
  
  var ants = {}
  
  AntIT.Bus.on('add-ant', function(antid, playerid, pos, heading) {
    var antObj = {}
    antObj.id = antid
    antObj.pos = {x: pos.x, y: pos.y}
    antObj.heading = heading
    ants[antid] = antObj
    updateGO(antid)
    setAntBodyColor(antCache.get(antid), AntIT.ColorOf(playerid))
  })
  
  AntIT.Bus.on('move-ant', function(id, pos) {
    ants[id].pos.x = pos.x
    ants[id].pos.y = pos.y
    updateGO(id)
  })
  
  AntIT.Bus.on('turn-ant', function(id, heading) {
    ants[id].heading = heading
    updateGO(id)
  })
  
  function updateGO(id) {
    var ant3d = antCache.get(id)
    ant3d.position.copy(AntIT.ToViewPos(ants[id].pos))
    ant3d.rotation.y = -ants[id].heading / 180 * Math.PI + Math.PI
  }





})()
