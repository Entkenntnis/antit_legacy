
(function() {

  var Opts = AntIT.AddOptions({
    KameraStartPosition : [0, 600, 1700],
    KameraFOV : 60,
  })
  
  var scene, camera, renderer
  var needRedraw = true
  var objloader, textureloader
  
  function load(){
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(Opts.KameraFOV, 1, 0.1, 200000)
    camera.position.set.apply(camera.position, Opts.KameraStartPosition)
    renderer = new THREE.WebGLRenderer()
    renderer.context.getShaderInfoLog = function () { return '' }; // suppress warning
    document.body.appendChild(renderer.domElement)
    
    AntIT.AddProp("Scene", scene)
    AntIT.AddProp("Camera", camera)
    
    function resize() {
      var w = document.documentElement.clientWidth
      var h = document.documentElement.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w/h
      camera.updateProjectionMatrix()
      AntIT.Redraw()
    }
    window.addEventListener('resize', resize, false)
    resize()
    
    objloader = new THREE.ObjectLoader()
    textureloader = new THREE.TextureLoader()
    THREE.DefaultLoadingManager.onLoad = ready
    THREE.DefaultLoadingManager.itemStart()
    AntIT.Bus.emit('load')
    THREE.DefaultLoadingManager.itemEnd()
  }
    
  function ready() {
    THREE.DefaultLoadingManager.onLoad = undefined
    AntIT.Init()
    animate()
  }
  
  function animate(){
    if (needRedraw){
      renderer.render(scene, camera)
      needRedraw = false
    }
    AntIT.Bus.emit('animation-frame')
    requestAnimationFrame(animate)
  }
  
  AntIT.Bus.on('start', load)
  
  AntIT.AddProp('Redraw', function(){
    needRedraw = true
  })
  
  AntIT.AddProp("LoadObj", function (path, cb) {
    objloader.load(path, cb)
  })
  
  AntIT.AddProp("LoadTexture", function (path) {
    return textureloader.load(path)
  })

})()
