
(function(){
  
  var Opts = AntIT.AddOptions({
    HügelGröße : 1.0,
  })

  var hillCache
  
  AntIT.Bus.on('load', function(){
    var earthTexture = AntIT.LoadTexture("/assets/earth.jpg")
    AntIT.LoadObj("/models/anthill.json", function ( obj ) {
      var mat = new THREE.MeshPhongMaterial({color:0x999966})
      mat.map = earthTexture
      obj.children[0].children[1].material = mat
      obj.children[0].children[0].material.color.setHex(0x000000)
      obj.children[0].children[2].material.color.setHex(0xffffff)
      var s = Opts.HügelGröße
      obj.scale.set(s, s, s)
      hillCache = new AntIT.Cache3d(obj, AntIT.Scene)
    })
  })
  
  function setHillFlagColor(hill, c){
    hill.children[0].children[2].material = new THREE.MeshPhongMaterial({color:c});
  }
  
  AntIT.Bus.on('add-hill', function(id, pos) {
    var hill = hillCache.get(id)
    hill.position.copy(AntIT.ToViewPos(pos))
    setHillFlagColor(hill, AntIT.ColorOf(id))
  })
  

})()
