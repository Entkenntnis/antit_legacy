
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
  
  var apples = {}

  AntIT.Bus.on('add-apple', function(id, pos, packed) {
    apples[id] = {packed: packed, pos: {x: pos.x, y: pos.y}}
    appleCache.get(id).position.copy(AntIT.ToViewPos(pos))
    updateGO(id)
  })
  
  AntIT.Bus.on('move-apple', function(id, pos) {
    apples[id].pos.x = pos.x
    apples[id].pos.y = pos.y
    updateGO(id)
  })
  
  AntIT.Bus.on('set-apple-packed', function(id, val) {
    apples[id].packed = val
    updateGO(id)
  })
  
  AntIT.Bus.on('remove-apple', function(id) {
    appleCache.remove(id)
  })
  
  function updateGO(id) {
    var newpos = AntIT.ToViewPos(apples[id].pos, apples[id].packed ? 5 : 0)
    appleCache.get(id).position.copy(newpos)
  }

})()
