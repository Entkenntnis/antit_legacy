
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
  
  var sugars = {}

  AntIT.Bus.on('add-sugar', function(id, pos, amount) {
    sugars[id] = {amount: amount}
    sugarCache.get(id).position.copy(AntIT.ToViewPos(pos))
    updateGO(id)
  })
  
  AntIT.Bus.on('unload-sugar', function(id, amount) {
    sugars[id].amount = amount
    updateGO(id)
  })
  
  AntIT.Bus.on('remove-sugar', function(id) {
    sugarCache.remove(id)
  })
  
  function updateGO(id) {
    var linScale = sugars[id].amount / Opts.ZuckerGröße * Opts.ZuckerVergrößerung;
    var scale = Math.max(Math.pow(linScale, 1/2), 0.000001);
    sugarCache.get(id).scale.set(scale, scale, scale);
  }

})()
