
(function(){

  var Opts = AntIT.AddOptions({
    ApfelGröße : 2.0,
  })

  var appleCache
  
  AntIT.Bus.on('load', function(){
    AntIT.LoadObj("/models/apple.json", function ( obj ) {
      obj.children[0].children[0].material.color.setHex(0x00cc00)
      obj.children[0].children[1].material.color.setHex(0x66aa00)
      var s = Opts.ApfelGröße
      obj.scale.set(s, s, s)
      appleCache = new AntIT.Cache3d(obj, AntIT.Scene)
    })
  })

  AntIT.Bus.on('add-apple', function(id) {
    appleCache.get(id)
  })
  
  AntIT.Bus.on('move-apple', function(id, pos) {
    var new3dpos = AntIT.ToViewPos(pos)
    appleCache.get(id).position.setX(new3dpos.x)
    appleCache.get(id).position.setZ(new3dpos.z)
  })
  
  AntIT.Bus.on('set-apple-packed', function(id, val) {
    appleCache.get(id).position.setY(val ? 5 : 0)
  })
  
  AntIT.Bus.on('remove-apple', function(id) {
    appleCache.remove(id)
  })

})()
