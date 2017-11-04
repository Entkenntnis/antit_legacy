
AntIT.Bus.on('load', function(scene){
  
  // ground
  var groundTexture = AntIT.LoadTexture( "/assets/grass.jpg" )
  groundTexture.wrapS = THREE.RepeatWrapping
  groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set(15, 15)
  var grass = new THREE.Mesh(
    new THREE.PlaneGeometry(50000, 50000, 1, 1),
    new THREE.MeshBasicMaterial({side:THREE.DoubleSide, map:groundTexture}))
  grass.rotation.x = Math.PI / 2
  grass.position.y = -15
  scene.add(grass)
  
  // sky dome
  var skyGeo = new THREE.SphereBufferGeometry(24000, 25, 25)
  var skyTexture = AntIT.LoadTexture( "/assets/sky.jpg" )
  var skyMaterial = new THREE.MeshBasicMaterial({ 
    map: skyTexture
  })
  var sky = new THREE.Mesh(skyGeo, skyMaterial)
  sky.material.side = THREE.BackSide
  scene.add(sky)

})
