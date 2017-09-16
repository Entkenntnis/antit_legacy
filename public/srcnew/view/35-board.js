
(function(){

  var floorTexture
  
  AntIT.Bus.on('load', function(){
    floorTexture = AntIT.LoadTexture("/assets/sand.jpg")
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
  })
  
  AntIT.Bus.on('add-board', function(width, height) {
    var floorMat = new THREE.MeshBasicMaterial(
      {color: 0x888888, side: THREE.DoubleSide, map:floorTexture})
    var gamefloor = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), floorMat)
    gamefloor.rotation.x = Math.PI / 2
    AntIT.Scene.add(gamefloor)
    if (AntIT.SetControlBounds)
      AntIT.SetControlBounds(width/2, height/2)
    
    AntIT.AddProp("ToViewPos", function(pos, h){
      if (h === undefined) h = 0
      return new THREE.Vector3(
        pos.x - width / 2.0,
        h,
        pos.y - height / 2.0)
    })
  })

})()
