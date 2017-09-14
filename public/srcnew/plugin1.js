
(function(){

var antStore

AntIT.Bus.on('load', function(scene){
  AntIT.LoadObj('/models/ant.json', function (obj) {
    obj.children[0].children.forEach(function(o){
      o.material = new THREE.MeshLambertMaterial({color:0x00ff00});
    });
    antStore = new AntIT.UnitStore(obj, scene)
  })
})

AntIT.Bus.on('tick', function(cycle){
  if (cycle % 40 == 0) {
    antStore.get(cycle).position.setX(cycle % 400)
    antStore.remove(cycle-160)
  }
})


})()

//if (AntIT._onSubmit) {
//  AntIT._onSubmit(Sim.players.map(function(p){return p.getPoints()}).join(","))
//}
