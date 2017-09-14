
AntIT.Bus.on('load', function(scene){
  
  var materialArray = []
  var posfixs = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg']
  posfixs.forEach(function(val){
    materialArray.push(new THREE.MeshBasicMaterial({
      map:AntIT.LoadTexture('/images/dawnmountain-' + val + '.png'),
      side:THREE.BackSide}))
  })
  var skyboxGeom = new THREE.CubeGeometry( 8000, 8000, 8000, 1, 1, 1 )
  var skybox = new THREE.Mesh( skyboxGeom, materialArray )
  scene.add( skybox )

})
