
AntIT.Bus.on('load', function(scene){
  
  // light it up
  var ambient = new THREE.AmbientLight( 0x444444 )
  scene.add( ambient )
  var directionalLight = new THREE.DirectionalLight( 0xffeedd )
  directionalLight.position.set( 2, 2, 2 ).normalize()
  scene.add( directionalLight )

})
