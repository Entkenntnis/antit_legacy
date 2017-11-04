
var AntIT = {}
var AntJS = AntIT

AntIT.Optionen = {
  Runden : 7500,
  TicksProSekunde : 40,
  
  
} // Wie soll ich mit Optionen umgehen? z.b. Kamera, etc ...


;(function() {
  
  var Optionen = AntIT.Optionen

  AntIT.Bus = Minibus.create()
  
  // class View3d to handle rendering
  
  var view3d = new View3d()
  AntIT.StarteSimulation = view3d.load
  
  function View3d(){
    var me = this
    
    var scene, camera, renderer, needRedraw = true
    var objloader, textureloader
    
    this.load = function(){
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, 1 /*aspect*/, 0.1, 200000)
      camera.position.set(0, 600, 1700)
      AntIT.Camera = camera
      renderer = new THREE.WebGLRenderer()
      renderer.context.getShaderInfoLog = function () { return '' }; // suppress warning
      document.body.appendChild(renderer.domElement)
      
      function resize() {
        var w = document.documentElement.clientWidth
        var h = document.documentElement.clientHeight
        renderer.setSize(w, h)
        camera.aspect = w/h
        camera.updateProjectionMatrix()
        me.update()
      }
      window.addEventListener('resize', resize, false)
      resize()
      
      objloader = new THREE.ObjectLoader()
      textureloader = new THREE.TextureLoader()
      THREE.DefaultLoadingManager.itemStart()
      
      AntIT.Bus.emit('load', scene)
      
      THREE.DefaultLoadingManager.onLoad = ready
      THREE.DefaultLoadingManager.itemEnd()
    }
  
    AntIT.LoadObj = function (path, cb) {
      objloader.load(path, cb)
    }
    
    AntIT.LoadTexture = function (path) {
      return textureloader.load(path)
    }
      
    function ready() {
      ui.hideLoader()
      pulse.init()
      animate()
    }
    
    function animate(e){
      if (needRedraw){
        AntIT.Bus.emit('pre-render')
        renderer.render(scene, camera)
        needRedraw = false
        AntIT.Bus.emit('post-render')
      }
      pulse.tick()
      requestAnimationFrame(animate)
    }
    
    this.update = function(){
      needRedraw = true
    }
    
    AntIT.Update = me.update
  }
  
  
  // class Pulse to manage ticks and ensure stable fps
  
  var pulse = new Pulse()

  function Pulse() {
    var me = this
    
    var running = false
    var startTime = undefined
    var simulationFps = Optionen.TicksProSekunde
    var simStatus = undefined
    var cycles = 0
    var maxSkippedFrames = 10
    
    this.init = function() {
      ui.init()
      
      view3d.needsRedraw = true
      running = true
      cycles = 0
      AntIT.Bus.emit('init')
      startTime = Date.now()
    }
    
    this.tick = function() {
      if (cycles >= Optionen.Runden) {
        if (running)
          me.end()
        return
      }
      var elapsedTime = Date.now() - startTime
      var targetCycle = elapsedTime / 1000 * simulationFps
      var skippedFrames = 0
      while(cycles < targetCycle && skippedFrames < maxSkippedFrames){
        cycles++
        AntIT.Bus.emit('tick', cycles)
        var runState = Math.round(cycles / Optionen.Runden * 100)
        ui.setStatus("Fortschritt: " + runState + "%")
        skippedFrames++
        view3d.update()
      }
      if (skippedFrames >= maxSkippedFrames) {
        startTime = Date.now() - (cycles / simulationFps * 1000)
      }
    }
    
    this.end = function() {
      running = false;
      AntIT.Bus.emit('end')
      ui.setStatus("beendet")
    }
    
    this.setFps = function(newFps) {
      simulationFps = newFps
      startTime = Date.now() - (cycles / simulationFps * 1000)
    }
    
    
  }
  

  // class Ui to interact with user
  
  var ui = new Ui()
  
  function Ui() {
    var simStatus, curText
    
    this.init = function(){
      simStatus = document.createElement("DIV")
      document.getElementById("hud").appendChild(simStatus)
    }
    
    this.setStatus = function(text) {
      if (text != curText) {
        curText = text
        simStatus.innerHTML = text
      }
    }
    
    this.hideLoader = function() {
      document.getElementById("loading").style.display = "none";
    }
    
    document.onkeypress = function(e){
      var newFps = undefined
      if (e.charCode == 49) // 1
        newFps = 4
      if (e.charCode == 50) // 2
        newFps = 40
      if (e.charCode == 51) // 3
        newFps = 140
      if (newFps) {
        pulse.setFps(newFps)
      }
    }
  }
  
  
  // class UnitStore to manage 3d objects
  
  function UnitStore(proto, scene){
    var store = {};
    var ready = [];
    var prefix = 'unitstorekey:';
    
    this.has = function(id){
      return (prefix + id) in store;
    }
    
    this.get = function(id){
      if (this.has(id))
        return store[prefix + id];
      else {
        if (ready.length > 0) {
          var next = ready.pop()
          next.visible = true;
          store[prefix + id] = next;
          return next;
        } else {
          var newUnit = proto.clone();
          scene.add(newUnit);
          store[prefix+id] = newUnit;
          return newUnit;
        }
      }
    }
    
    this.remove = function(id){
      var obj = store[prefix + id];
      if (obj !== undefined) {
        obj.visible = false;
        delete store[prefix + id];
        ready.push(obj);
      }
    }
  }
  
  AntIT.UnitStore = UnitStore


})()
