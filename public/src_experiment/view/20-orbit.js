
(function(){

  var Opts = AntIT.AddOptions({
    FreieBewegung : false,
    MaxPolarWinkel : Math.PI/2 - 0.1,
    MaxDistanz : 3000,
    MinDistanz : 100,
  })
  
  var controls
  
  AntIT.Bus.on('load', function(){
  
    controls = new THREE.OrbitControls(AntIT.Camera)
    if (!Opts.FreieBewegung) {
      controls.maxPolarAngle = Opts.MaxPolarWinkel
      controls.maxDistance = Opts.MaxDistanz
      controls.minDistance = Opts.MinDistanz
      controls.maxY = 0
    }
    controls.addEventListener('change', function(){
      AntIT.Redraw()
    })

  })
  
  AntIT.AddProp("SetControlBounds", function(maxX, maxZ){
    if (!Opts.FreieBewegung) {
      controls.maxX = maxX
      controls.maxZ = maxZ
    }
  })

})()











