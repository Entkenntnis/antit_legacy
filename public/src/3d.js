// File 2: exports _vw into AntJS, which is the interface to all graphic objects
//         and the init function to start everything

(function() {  
  "use strict";
  var Optionen = AntIT._optionen
  var Sim = AntIT._sim
  
  // project-wide variables
  var scene = new THREE.Scene(), camera, renderer, stats, controls, manager;

  function init(){
    
    // the floor lies in the xz-plane, don't worry about aspect here, will be done on resize 
    camera = new THREE.PerspectiveCamera(60, 1 /*aspect*/, 0.1, 200000);
    camera.position.set(0, 600, 1700);
    
    // the worker in the shadow
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    
    // showing nice fps
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    AntIT._stats = stats
    
    // make it movable
    controls = new THREE.OrbitControls(camera);
    controls.maxPolarAngle = Math.PI/2 - 0.1;
    controls.maxDistance = 3000;
    controls.minDistance = 100;
    
    controls.addEventListener('change', function(){
      vw.needRedraw = true;
    });
    
    // handle loading
    manager = new THREE.LoadingManager();
    
    // making it awesome fullwindow
    window.addEventListener('resize', resize, false);
    resize();
    
    vw.load();
    
    manager.onLoad = function(){
      document.getElementById("loading").style.display = "none";
      vw.onLoad();
      vw.onExtLoad();
      animate();
    };
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
    vw.onExtTick();
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
    var gamefloor = undefined
    var skybox = undefined
    var antStore = undefined
    var hillStore = undefined
    var sugarStore = undefined
    var appleStore = undefined
    var bugStore = undefined
    var sugarBoxStore = undefined
    var markerStore = undefined
    var poisonStore =undefined
    this.needRedraw = true
    this.onExtLoad = function(){}
    this.onExtTick = function(){};
    
    this.load = function(){
      
      var objectLoader = new THREE.ObjectLoader(manager);
      var textureLoader = new THREE.TextureLoader(manager);
      
      // floor
      var floorTexture = textureLoader.load( "/assets/sand.jpg" );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(4, 4);
      var floorMat = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.DoubleSide, map:floorTexture});
      gamefloor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1, 1),floorMat);
      gamefloor.rotation.x = Math.PI / 2;
      scene.add(gamefloor);
      
      // ground
      var groundTexture = textureLoader.load( "/assets/grass.jpg" );
      groundTexture.wrapS = THREE.RepeatWrapping;
      groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(15, 15);
      var grass = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000, 1, 1), new THREE.MeshBasicMaterial({side:THREE.DoubleSide, map:groundTexture}));
      grass.rotation.x = Math.PI / 2;
      grass.position.y = -15;
      scene.add(grass);
      
      var skyGeo = new THREE.SphereBufferGeometry(24000, 25, 25);
      var skyTexture = textureLoader.load( "/assets/sky.jpg" );
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
      objectLoader.load("/models/ant.json", function ( obj ) {
        obj.children[0].children.forEach(function(o){
          o.material = new THREE.MeshLambertMaterial({color:0x000000});
        });
        var s = Optionen.AmeisenGröße
        obj.scale.set(s, s, s);
        ant0 = obj;
      }.bind(this));
      objectLoader.load("/models/anthill.json", function ( obj ) {
        var earthTexture = textureLoader.load( "/assets/earth.jpg" );
        var mat = new THREE.MeshPhongMaterial({color:0x999966});
        mat.map = earthTexture;
        obj.children[0].children[1].material = mat;
        obj.children[0].children[0].material.color.setHex(0x000000);
        obj.children[0].children[2].material.color.setHex(0xffffff);
        var s = Optionen.HügelGröße
        obj.scale.set(s, s, s)
        hill0 = obj;
      }.bind(this));
      objectLoader.load("/models/apple.json", function ( obj ) {
        obj.children[0].children[0].material.color.setHex(0x00cc00);
        obj.children[0].children[1].material.color.setHex(0x66aa00);
        var s = Optionen.ApfelGröße
        obj.scale.set(s, s, s);
        apple0 = obj;
      }.bind(this));
      objectLoader.load("/models/bug.json", function ( obj ) {
        obj.children[0].children.forEach(function(o){
          o.material.color.setHex(0x000000);
          o.material.specular.setHex(0x00dddd);
        });
        var s = Optionen.WanzenGröße
        obj.scale.set(s, s, s);
        bug0 = obj;
      }.bind(this));
      objectLoader.load("/models/sugar.json", function ( obj ) {
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
      
      // poison ring
      var ring = new THREE.RingBufferGeometry( 20, 50, 8 );
      var ringMat = new THREE.MeshPhongMaterial( { color: 0xffff00, side: THREE.DoubleSide, transparent:true, opacity:0.4 } );
      var poisonRing = new THREE.Mesh( ring, ringMat );
      poisonRing.rotation.x = Math.PI / 2;
      poisonRing.position.y = 2
      poison0 = poisonRing
      
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
    }
    
    var setAntBodyColor = function(ant, c){
      [/*10,*/ 7, 6].forEach(function(id){
        ant.children[0].children[id].material = new THREE.MeshPhongMaterial({color:c});
      });
    }
    
    var setHillFlagColor = function(hill, c){
      hill.children[0].children[2].material = new THREE.MeshPhongMaterial({color:c});
    }
    
    var setBugEyeColor = function(bug, color) {
      [6, 7].forEach(function(id){
        bug.children[0].children[id].material.color.setHex(color);
      });
    }
    
    var setMarkerColor = function(marker, color) {
      marker.material = new THREE.MeshLambertMaterial({color: color, transparent: true});
    }
    
    var setControlsBounds = function(x, y){
      controls.maxX = x,
      controls.maxZ = y;
    }
    
    
    // new event listeners
    Sim.bus.on('change-ant-color', function(key, color) {
      setAntBodyColor(antStore.get(key), color)
    })
    
    Sim.bus.on('move-ant', function(key, pos, roty) {
      var antBody = antStore.get(key)
      antBody.position.copy(pos)
      antBody.rotation.y = roty
    })
    
    Sim.bus.on('move-sugarbox', function(key, pos) {
      var sugarBox = sugarBoxStore.get(key)
      sugarBox.position.copy(pos)
    })
    
    Sim.bus.on('remove-sugarbox', function(key) {
      if (sugarBoxStore.has(key)) {
        sugarBoxStore.remove(key)
      }
    })
    
    Sim.bus.on('remove-ant', function(key) {
      antStore.remove(key);
    })
    
    Sim.bus.on('move-apple', function(key, pos) {
      appleStore.get(key).position.copy(pos)
    })
    
    Sim.bus.on('remove-apple', function(key) {
      appleStore.remove(key)
    })
    
    Sim.bus.on('move-bug', function(key, pos, roty) {
      bugStore.get(key).position.copy(pos)
      bugStore.get(key).rotation.y = roty
    })
    
    Sim.bus.on('add-marker', function(key, pos, color) {
      var marker = markerStore.get(key)
      setMarkerColor(marker, color)
      marker.position.copy(pos)
      var s = Optionen.MarkerGröße
      marker.scale.set(s, s, s)
      marker.material.opacity = Optionen.MarkerDurchsichtigkeit
      marker.material.needsUpdate = true
    })
    
    Sim.bus.on('remove-marker', function(key) {
      markerStore.remove(key)
    })
    
    Sim.bus.on('update-marker', function(key) {
      var marker = markerStore.get(key)
      var s = marker.scale.x * Optionen.MarkerVergrößerung
      marker.scale.set(s, s, s)
      marker.material.opacity *= Optionen.MarkerFading
      marker.material.needsUpdate = true
    })
    
    Sim.bus.on('move-hill', function(key, pos) {
      hillStore.get(key).position.copy(pos)
    })
    
    Sim.bus.on('change-hill-color', function(key, color) {
      setHillFlagColor(hillStore.get(key), color)
    })
    
    Sim.bus.on('set-xy', function(w, h) {
      gamefloor.geometry = new THREE.PlaneGeometry(w, h, 1, 1)
      gamefloor.geometry.verticesNeedUpdate = true
      setControlsBounds(w/2, h/2)
    })
    
    Sim.bus.on('move-sugar', function(key, pos, scale) {
      var GO = sugarStore.get(key);
      GO.position.copy(pos);
      GO.scale.set(scale, scale, scale);
    })
    
    Sim.bus.on('remove-sugar', function(key) {
      if (sugarStore.has(key))
        sugarStore.remove(key);
    })
    
  };
  
  var vw = new ViewController();
  
  // export
  if (Optionen.EntwicklerModus) {
    AntIT.Vw = vw
  }
  AntIT._vw = vw;
  AntIT.StarteSimulation = init;
})();
