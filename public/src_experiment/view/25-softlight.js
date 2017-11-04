
AntIT.Bus.on('load', function(){
  
  // light it up
  var ambient = new THREE.AmbientLight( 0x444444 )
  AntIT.Scene.add( ambient )
  var directionalLight = new THREE.DirectionalLight( 0xffeedd )
  directionalLight.position.set( 2, 2, 2 ).normalize()
  AntIT.Scene.add( directionalLight )

})
