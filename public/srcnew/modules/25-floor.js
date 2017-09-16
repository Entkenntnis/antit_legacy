
(function(){

  var Opts = AntIT.AddOptions({
    SpielfeldVerhältnis : 4.0/3.0,
    SpielfeldGrundGröße : 600000,
  })

  var floorTexture
  
  AntIT.Bus.on('load', function(){
    floorTexture = AntIT.LoadTexture("/assets/sand.jpg")
  })
  
  AntIT.Bus.on('init', function(){
    
    var area = (1 + (AntIT.Players.length * Opts.SpielfeldVerhältnis)) *
                Opts.SpielfeldGrundGröße
    var width = Math.round(Math.sqrt(area * Opts.SpielfeldVerhältnis))
    var height = Math.round(Math.sqrt(area / Opts.SpielfeldVerhältnis)) 
  
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
    var floorMat = new THREE.MeshBasicMaterial(
      {color: 0x888888, side: THREE.DoubleSide, map:floorTexture})
    var gamefloor = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), floorMat)
    gamefloor.rotation.x = Math.PI / 2
    AntIT.Scene.add(gamefloor)
    
    if (AntIT.SetControlBounds)
      AntIT.SetControlBounds(width/2, height/2);
    
    AntIT.AddProp("Floor", {
      getWidth : function(){
        return width
      },
      getHeight : function(){
        return height
      },
      toViewPos : function(pos, h){
        if (h === undefined)
          h = 0
        return new THREE.Vector3(
          pos.x - width / 2.0,
          h,
          pos.y - height / 2.0)
      },
      isInBound : function(pos, margin) {
        if (margin == undefined)
          margin = 0;
        if (pos.x < margin || pos.y < margin)
            return false;
        if (width - pos.x < margin || height - pos.y < margin)
          return false;
        return true;
      },
      randomPos : function() {
        return {
          x:Math.random()*width,
          y:Math.random()*height};
      }
    })
  })



})()
