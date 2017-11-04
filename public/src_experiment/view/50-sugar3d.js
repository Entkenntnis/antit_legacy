
(function(){

  var Opts = AntIT.AddOptions({
    ZuckerVergrößerung : 0.1,
  })

  var sugarCache
  
  AntIT.Bus.on('load', function(){
    AntIT.LoadObj("/models/sugar.json", function ( obj ) {
      obj.children[0].children[0].material.color.setHex(0xffffff);
      sugarCache = new AntIT.Cache3d(obj, AntIT.Scene)
    })
  })

  AntIT.Bus.on('add-sugar', function(id) {
    sugarCache.get(id)
  })
  
  AntIT.Bus.on('move-sugar', function(id, pos) {
    sugarCache.get(id).position.copy(AntIT.ToViewPos(pos))
  })
  
  AntIT.Bus.on('set-sugar-amount', function(id, amount) {
    var linScale = amount / Opts.ZuckerGröße * Opts.ZuckerVergrößerung
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001)
    sugarCache.get(id).scale.set(scale, scale, scale)
  })
  
  AntIT.Bus.on('remove-sugar', function(id) {
    sugarCache.remove(id)
  })

})()
