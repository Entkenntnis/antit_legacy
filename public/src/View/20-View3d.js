// File 2: exports _vw into AntJS, which is the interface to all graphic objects
//         and the init function to start everything

(function(View) {  
  "use strict";
  var Optionen = View.Opts
  var Bus = View.Sim.getBus()
  
  // project-wide variables
  var scene = new THREE.Scene(), camera, renderer, stats, controls, manager;
  
  View.Pulse.getBus().on('redraw', function(){
    vw.needRedraw = true
  })
  
  View.Pulse.getBus().on('pre-tick', function(){
    stats.begin()
  })
  
  View.Pulse.getBus().on('post-tick', function(){
    stats.end()
  })
  
  View.Pulse.getBus().on('start', init)

  function init(){
    
    // the floor lies in the xz-plane, don't worry about aspect here, will be done on resize 
    camera = new THREE.PerspectiveCamera(60, 1 /*aspect*/, 0.1, 200000);
    camera.position.set(0, 600, 1400)
    
    // the worker in the shadow
    renderer = new THREE.WebGLRenderer();
    renderer.context.getShaderInfoLog = function () { return '' }; // suppress warning
    document.body.appendChild(renderer.domElement);
    
    // showing nice fps
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    
    // make it movable
    makeControls()
    
    // handle loading
    manager = new THREE.LoadingManager();
    
    // making it awesome fullwindow
    window.addEventListener('resize', resize, false);
    resize();
    
    vw.load();
    
    manager.onLoad = function(){
      vw.onLoad();
      View.Pulse.Init()
      animate();
    };
  }
  
  function makeControls() {
    controls = new THREE.OrbitControls(camera);
    controls.maxPolarAngle = Math.PI/2 - 0.06;
    controls.maxDistance = 3000;
    controls.minDistance = 100;
    controls.maxY = 0
    
    controls.addEventListener('change', function(){
      vw.needRedraw = true;
    })
  }

  function resize() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    vw.needRedraw = true;
  }

  function animate(e){
    View.Pulse.Tick()
    if (vw.needRedraw){
      //stats.begin();
      renderer.render(scene, camera);
      vw.needRedraw = false;
      //stats.end();
    }
    requestAnimationFrame(animate);
  }


  // THIS IS a 3d object manager
  function UnitStore(proto){
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
          var next = ready[0];
          next.visible = true;
          ready.splice(0, 1);
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
      } else {
        console.log(id);
      }
    }
  }

  // START OF 3d view related stuff

  var ViewController = function(){
    var ant0 = undefined
    var bug0 = undefined
    var hill0 = undefined
    var sugar0 = undefined
    var apple0 = undefined
    var sugarBox0 = undefined
    var marker0 = undefined
    var poison0 = undefined
    var poison20 = undefined
    var gamefloor = undefined
    var width = 0
    var height = 0
    var skybox = undefined
    var antStore = undefined
    var hillStore = undefined
    var sugarStore = undefined
    var appleStore = undefined
    var bugStore = undefined
    var sugarBoxStore = undefined
    var markerStore = undefined
    var poisonStore =undefined
    var poisonStore2 = undefined
    var poisonCloud = undefined
    var font = undefined
    this.needRedraw = true
    
    this.load = function(){
      
      var objectLoader = new THREE.ObjectLoader(manager);
      var textureLoader = new THREE.TextureLoader(manager);
      var fontLoader = new THREE.FontLoader(manager)
      
      // floor
      var floorTexture = textureLoader.load( "assets/sand.jpg" );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(4, 4);
      var floorMat = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.DoubleSide, map:floorTexture});
      gamefloor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1, 1),floorMat);
      gamefloor.rotation.x = Math.PI / 2;
      scene.add(gamefloor);
      
      // ground
      var groundTexture = textureLoader.load( "assets/grass.jpg" );
      groundTexture.wrapS = THREE.RepeatWrapping;
      groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(15, 15);
      var grass = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000, 1, 1), new THREE.MeshBasicMaterial({side:THREE.DoubleSide, map:groundTexture}));
      grass.rotation.x = Math.PI / 2;
      grass.position.y = -15;
      scene.add(grass);
      
      var skyGeo = new THREE.SphereBufferGeometry(24000, 25, 25);
      var skyTexture = textureLoader.load( "assets/sky.jpg" );
      var skyMaterial = new THREE.MeshBasicMaterial({ 
        map: skyTexture
      });
      var sky = new THREE.Mesh(skyGeo, skyMaterial);
      sky.material.side = THREE.BackSide;
      scene.add(sky);
      
      // light it up
      var ambient = new THREE.AmbientLight( 0x444444 );
      scene.add( ambient );
      var directionalLight = new THREE.DirectionalLight( 0xffeedd );
      directionalLight.position.set( 2, 2, 2 ).normalize();
      scene.add( directionalLight );
    
      // get models
      objectLoader.load("models/ant.json", function ( obj ) {
        obj.children[0].children.forEach(function(o){
          o.material = new THREE.MeshLambertMaterial({color:0x000000});
        });
        var s = Optionen.AmeisenGröße
        obj.scale.set(s, s, s);
        ant0 = obj
        
      }.bind(this));
      objectLoader.load("models/anthill.json", function ( obj ) {
        var earthTexture = textureLoader.load( "assets/earth.jpg" );
        var mat = new THREE.MeshPhongMaterial({color:0x999966});
        mat.map = earthTexture;
        obj.children[0].children[1].material = mat;
        obj.children[0].children[0].material.color.setHex(0x000000);
        obj.children[0].children[2].material.color.setHex(0xffffff);
        var s = Optionen.HügelGröße
        obj.rotation.y = -Math.PI/2
        obj.scale.set(s, s, s)
        hill0 = obj;
      }.bind(this));
      objectLoader.load("models/apple.json", function ( obj ) {
        obj.children[0].children[0].material.color.setHex(0x00cc00);
        obj.children[0].children[1].material.color.setHex(0x66aa00);
        var s = Optionen.ApfelGröße
        obj.scale.set(s, s, s);
        apple0 = obj;
      }.bind(this));
      objectLoader.load("models/bug.json", function ( obj ) {
        obj.children[0].children.forEach(function(o){
          o.material.color.setHex(0x000000);
          o.material.specular.setHex(0x00dddd);
        });
        var s = Optionen.WanzenGröße
        obj.scale.set(s, s, s);
        bug0 = obj;
      }.bind(this));
      objectLoader.load("models/sugar.json", function ( obj ) {
        obj.children[0].children[0].material.color.setHex(0xffffff);
        sugar0 = obj;
      }.bind(this));
      
      // sugar box
      var sugarBoxGeo = new THREE.BoxBufferGeometry( 1, 1, 1);
      sugarBox0 = new THREE.Mesh( sugarBoxGeo, new THREE.MeshPhongMaterial({color:0xffffff}) );
      var s = Optionen.ZuckerBoxGröße
      sugarBox0.scale.set(s, s, s);
      
      // marker-sphere
      var geometry1 = new THREE.SphereBufferGeometry(40,32,24);
      var material1 = new THREE.MeshLambertMaterial();
      var sphere1 = new THREE.Mesh(geometry1, material1);
      marker0 = sphere1;
      
      // (poison) ring
      var ring = new THREE.RingBufferGeometry( 10, 20, 8 );
      var ringMat = new THREE.MeshPhongMaterial( { color: 0xffff00, side: THREE.DoubleSide, transparent:true, opacity:0.4 } );
      var poisonRing = new THREE.Mesh( ring, ringMat );
      poisonRing.rotation.x = Math.PI / 2;
      poisonRing.position.y = 2
      poison0 = poisonRing
      
      // red ring
      var ring2 = new THREE.RingBufferGeometry( 50, 55, 24 );
      var ringMat2 = new THREE.MeshPhongMaterial( { color: 0xff0000, side: THREE.DoubleSide, transparent:true, opacity:0.4 } );
      var poisonRing2 = new THREE.Mesh( ring2, ringMat2 );
      poisonRing2.rotation.x = Math.PI / 2;
      poisonRing2.position.y = 2
      poison20 = poisonRing2
      
      // poisonCloud
      poisonCloud = textureLoader.load('assets/particle.jpg')
      
      // font
      // Character set:
      // ! "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ
      // [\]^_`abcdefghijklmnopqrstuvwxyz{|}~äöüÄÖÜß
      fontLoader.load('assets/font.json', function(f) {
        font = f
      })
      
      /*// magic activation
      var pyramid = new THREE.TetrahedronGeometry(2)
      var pyramidMat = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      var magic = new THREE.Mesh(pyramid, pyramidMat)
      magic.position.x = 500
      magic.position.y = 3
      scene.add(magic)*/

      /*// debugging circle
      var radius   = 100,
      segments = 64,
      material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
      geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
      geometry.vertices.shift();

      var line = new THREE.Line(geometry, material);
      line.rotation.x = Math.PI/2;
      line.position.y = 0.5;
      //scene.add( line );*/
    }
    
    this.onLoad = function(){
      // open stores
      antStore = new UnitStore(ant0);
      hillStore = new UnitStore(hill0);
      appleStore = new UnitStore(apple0);
      bugStore = new UnitStore(bug0);
      sugarStore = new UnitStore(sugar0);
      sugarBoxStore = new UnitStore(sugarBox0);
      markerStore = new UnitStore(marker0);
      poisonStore = new UnitStore(poison0);
      poisonStore2 = new UnitStore(poison20)
    }
    
    function setAntBodyColor(ant, c){
      [/*10,*/ 7, 6].forEach(function(id){
        ant.children[0].children[id].material = new THREE.MeshPhongMaterial({color:c});
      });
    }
    
    function setHillFlagColor(hill, c){
      hill.children[0].children[2].material = new THREE.MeshPhongMaterial({color:c});
    }
    
    function setBugEyeColor(bug, color) {
      [6, 7].forEach(function(id){
        bug.children[0].children[id].material.color.setHex(color);
      });
    }
    
    function setMarkerColor(marker, color) {
      marker.material = new THREE.MeshLambertMaterial({color: color, transparent: true});
    }
    
    function setControlsBounds(x, y){
      controls.maxX = x,
      controls.maxZ = y;
    }
    
    
  
    function toViewPos(pos, h){
      if (h === undefined) {
        h = 0;
      }
      return new THREE.Vector3(
        pos.x - width / 2.0,
        h,
        pos.y - height / 2.0);
    }
    
    
    // new event listeners
    Bus.on('change-ant-color', function(key, color) {
      setAntBodyColor(antStore.get(key), color)
    })
    
    Bus.on('change-ant-level-color', function(key, color1, color2) {
      var ant = antStore.get(key)
      ant.children[0].children[2].material = new THREE.MeshPhongMaterial({color:color1})
      ant.children[0].children[9].material = new THREE.MeshPhongMaterial({color:color1})
      ant.children[0].children[1].material = new THREE.MeshPhongMaterial({color:color2})
      ant.children[0].children[11].material = new THREE.MeshPhongMaterial({color:color2})
    })
    
    Bus.on('move-ant', function(key, pos, roty) {
      var antBody = antStore.get(key)
      antBody.position.copy(toViewPos(pos))
      antBody.rotation.y = roty + (Math.random()*0.3-0.15)
    })
    
    Bus.on('move-sugarbox', function(key, pos) {
      var sugarBox = sugarBoxStore.get(key)
      sugarBox.position.copy(toViewPos(pos, Optionen.ZuckerStückchenHöhe))
    })
    
    Bus.on('remove-sugarbox', function(key) {
      if (sugarBoxStore.has(key)) {
        sugarBoxStore.remove(key)
      }
    })
    
    Bus.on('remove-ant', function(key) {
      antStore.remove(key);
    })
    
    Bus.on('move-apple', function(key, pos, height) {
      appleStore.get(key).position.copy(toViewPos(pos, height))
    })
    
    Bus.on('remove-apple', function(key) {
      appleStore.remove(key)
    })
    
    Bus.on('move-bug', function(key, pos, roty) {
      bugStore.get(key).position.copy(toViewPos(pos))
      bugStore.get(key).rotation.y = roty
    })
    
    Bus.on('remove-bug', function(key) {
      bugStore.remove(key)
    })
    
    Bus.on('add-marker', function(key, pos, color) {
      var marker = markerStore.get(key)
      setMarkerColor(marker, color)
      marker.position.copy(toViewPos(pos))
      var s = Optionen.MarkerGröße
      marker.scale.set(s, s, s)
      marker.material.opacity = Optionen.MarkerDurchsichtigkeit
      marker.material.needsUpdate = true
    })
    
    Bus.on('remove-marker', function(key) {
      markerStore.remove(key)
    })
    
    Bus.on('update-marker', function(key) {
      var marker = markerStore.get(key)
      var s = marker.scale.x * Optionen.MarkerVergrößerung
      marker.scale.set(s, s, s)
      marker.material.opacity *= Optionen.MarkerFading
      marker.material.needsUpdate = true
    })
    
    Bus.on('move-hill', function(key, pos) {
      hillStore.get(key).position.copy(toViewPos(pos))
    })
    
    Bus.on('change-hill-color', function(key, color) {
      setHillFlagColor(hillStore.get(key), color)
    })
    
    Bus.on('set-xy', function(w, h) {
      width = w
      height = h
      gamefloor.geometry = new THREE.PlaneGeometry(w, h, 1, 1)
      gamefloor.geometry.verticesNeedUpdate = true
      setControlsBounds(w/2, h/2)
    })
    
    Bus.on('set-camera', function(x, y, z) {
      camera = new THREE.PerspectiveCamera(60, 1 /*aspect*/, 0.1, 200000)
      camera.position.set(x, y, z)
      makeControls()
      resize()
    })
    
    Bus.on('move-sugar', function(key, pos, scale) {
      var GO = sugarStore.get(key);
      GO.position.copy(toViewPos(pos));
      GO.scale.set(scale, scale, scale);
    })
    
    Bus.on('remove-sugar', function(key) {
      if (sugarStore.has(key))
        sugarStore.remove(key);
    })
    
    Bus.on('move-spawn-point', function(key, pos) {
      poisonStore.get(key).position.copy(toViewPos(pos, 2))
    })
    
    Bus.on('move-spawn-point2', function(key, pos) {
      poisonStore2.get(key).position.copy(toViewPos(pos, 2))
    })
    
    Bus.on('set-ring', function(pos, color, size) {
      var ring = new THREE.RingBufferGeometry( size.inner, size.outer, 24 );
      var ringMat = new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide, transparent:true, opacity:0.4 } );
      var poisonRing = new THREE.Mesh( ring, ringMat );
      poisonRing.rotation.x = Math.PI / 2;
      scene.add(poisonRing)
      poisonRing.position.copy(toViewPos(pos, 2))
    })
        
    var poisons = {}
    
    Bus.on('spawn-poison', function(key, pos, color) {
      var position = toViewPos(pos, 4)
      var geometry = new THREE.Geometry()
      var d = 80
      for (var i = 0; i < 300; i++) {
        var p = new THREE.Vector3()
        p.copy(position)
        var x = Math.random()*d*2-d
        var z = Math.random()*d*2-d
        if (Math.sqrt(x*x+z*z) <= d) {
          p.x += x; p.z += z
          p.y = Math.random()*5+2
          geometry.vertices.push(p)
        }
      }
      if (color == 0)
        color = 0x111111
      var material = new THREE.PointsMaterial({color:color, size:30, map:poisonCloud, blending: THREE.AdditiveBlending, transparent:true})
      material.depthWrite=false
      var obj = new THREE.Points(geometry, material)
      scene.add(obj)
      poisons[key] = obj
    })
    
    Bus.on('remove-poison', function(key) {
      scene.remove(poisons[key])
    })
    
    var grid = undefined
    
    Bus.on('show-grid', function(pos){
      if (grid == undefined) {
        var size = 1400;
        grid = new THREE.GridHelper( size, size/50 );
        grid.position.copy(toViewPos(pos, 2))
        scene.add( grid );
      } else {
        grid.visible = !grid.visible
      }
    })
    
    Bus.on('draw-plane', function(topleft, width, height, color) {
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({color:color,side: THREE.DoubleSide}))
      plane.rotation.x = Math.PI / 2
      plane.position.copy(toViewPos(topleft, 2))
      scene.add(plane)
    })
    
    var texts = {}
    
    Bus.on('draw-text', function(params) {
      // Wir nehmen folgende Parameter:
      // text, pos, size, height, key, color
      
      if (params.color === undefined)
        params.color = 0x006900
      if (!params.text)
        return
      if (!params.size)
        params.size = 16
      if (!params.height)
        params.height = 2
      if (!params.pos)
        params.pos = {x:0,y:0}
      if (!params.opacity)
        params.opacity = 0.8
      
      var fontMat = new THREE.MeshBasicMaterial({
        color: params.color,
        transparent: true,
        opacity: params.opacity,
        side: THREE.DoubleSide,
      })
      var shapes = font.generateShapes(params.text, params.size)
      var geometry = new THREE.ShapeBufferGeometry(shapes)
      geometry.computeBoundingBox()
        
      if (!params.nocenter) {
        var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x )
        var yMid = - 0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y)
        geometry.translate( xMid, yMid, 0 )
      }
        
      var text = new THREE.Mesh( geometry, fontMat )
      text.rotation.x = -Math.PI / 2
      text.position.copy(toViewPos(params.pos, params.height))
      scene.add( text )
      
      if (params.key) {
        texts[params.key] = text
      }
    })
    
    Bus.on('remove-text', function(key) {
      if (texts[key]) {
        scene.remove(texts[key])
      }
    })
    
    var deadinfos = []
    var deadinfovisible = false
    
    Bus.on('add-dead-info', function(info) {
      deadinfos.push(info)
      if (deadinfovisible) {
        Bus.emit('draw-text', info)
      }
    })
    
    Bus.on('toggle-dead-info', function(){
      if (deadinfovisible) {
        deadinfos.forEach(function(i){
          Bus.emit('remove-text', i.key)
        })
      } else {
        deadinfos.forEach(function(i){
          Bus.emit('draw-text', i)
        })
      }
      deadinfovisible = !deadinfovisible
      View.Pulse.getBus().emit('redraw')
    })
    
  };
  
  var vw = new ViewController();
  
  // export
  if (Optionen.EntwicklerModus) {
    AntIT.Vw = vw
  }
})(AntIT._view);
