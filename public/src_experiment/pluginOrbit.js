
AntIT.Bus.on('load', function(scene){
  
  var controls = new THREE.OrbitControls(AntIT.Camera)
  controls.maxPolarAngle = Math.PI/2 - 0.1
  controls.maxDistance = 3000
  controls.minDistance = 100
  controls.addEventListener('change', function(){
    AntIT.Update()
  })

})
