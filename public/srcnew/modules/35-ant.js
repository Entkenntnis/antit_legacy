
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
  
  AntIT.Bus.on('init', function(){
    antCache.get('2')
  })





})()
