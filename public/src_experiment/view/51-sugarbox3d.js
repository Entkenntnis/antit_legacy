
(function(){

  var Opts = AntIT.AddOptions({
    ZuckerBoxGröße : 3.0,
    ZuckerStückchenHöhe : 7.3,
  })

  var sugarBoxCache
 
  AntIT.Bus.on('load', function(){
    var sugarBoxGeo = new THREE.BoxBufferGeometry( 1, 1, 1)
    var sugarBox = new THREE.Mesh(
      sugarBoxGeo,
      new THREE.MeshPhongMaterial({color:0xffffff}))
    var s = Opts.ZuckerBoxGröße
    sugarBox.scale.set(s, s, s)
    sugarBoxCache = new AntIT.Cache3d(sugarBox, AntIT.Scene)
  })
  
  AntIT.Bus.on('attach-sugarbox', function(antid, pos) {
    sugarBoxCache.get(antid).position.copy(AntIT.ToViewPos(pos, Opts.ZuckerStückchenHöhe))
  })
  
  AntIT.Bus.on('detach-sugarbox', function(antid) {
    sugarBoxCache.remove(antid)
  })

  AntIT.Bus.on('move-ant', function(antid, pos) {
    if (sugarBoxCache.has(antid)) {
      sugarBoxCache.get(antid).position.copy(AntIT.ToViewPos(pos, Opts.ZuckerStückchenHöhe))
    }
  })

})()
