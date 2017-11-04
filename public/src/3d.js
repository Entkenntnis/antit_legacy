// File 2: exports _vw into AntJS, which is the interface to all graphic objects
//         and the init function to start everything

(function() {  
  "use strict";
  var Optionen = AntIT._optionen
  
  // project-wide variables
  var scene = new THREE.Scene(), camera, renderer, stats, controls, manager;
  var rng;

  function init(){
    
    rng = new Math.seedrandom("hello.")
    
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
    this.ant0 = undefined
    this.bug0 = undefined
    this.hill0 = undefined
    this.sugar0 = undefined
    this.apple0 = undefined
    this.sugarBox0 = undefined
    this.marker0 = undefined
    this.poison0 = undefined
    this.gamefloor = undefined
    this.skybox = undefined
    this.antStore = undefined
    this.hillStore = undefined
    this.sugarStore = undefined
    this.appleStore = undefined
    this.bugStore = undefined
    this.sugarBoxStore = undefined
    this.markerStore = undefined
    this.poisonStore =undefined
    this.needRedraw = true
    this.onExtLoad = function(){}
    this.onExtTick = function(){};
    
    this.load = function(){
    
      this.rng = rng
      
      var objectLoader = new THREE.ObjectLoader(manager);
      var textureLoader = new THREE.TextureLoader(manager);
      
      // floor
      var floorTexture = textureLoader.load( "/assets/sand.jpg" );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(4, 4);
      var floorMat = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.DoubleSide, map:floorTexture});
      this.gamefloor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1, 1),floorMat);
      this.gamefloor.rotation.x = Math.PI / 2;
      scene.add(this.gamefloor);
      
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
        this.ant0 = obj;
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
        this.hill0 = obj;
      }.bind(this));
      objectLoader.load("/models/apple.json", function ( obj ) {
        obj.children[0].children[0].material.color.setHex(0x00cc00);
        obj.children[0].children[1].material.color.setHex(0x66aa00);
        var s = Optionen.ApfelGröße
        obj.scale.set(s, s, s);
        this.apple0 = obj;
      }.bind(this));
      objectLoader.load("/models/bug.json", function ( obj ) {
        obj.children[0].children.forEach(function(o){
          o.material.color.setHex(0x000000);
          o.material.specular.setHex(0x00dddd);
        });
        var s = Optionen.WanzenGröße
        obj.scale.set(s, s, s);
        this.bug0 = obj;
      }.bind(this));
      objectLoader.load("/models/sugar.json", function ( obj ) {
        obj.children[0].children[0].material.color.setHex(0xffffff);
        this.sugar0 = obj;
      }.bind(this));
      
      // sugar box
      var sugarBoxGeo = new THREE.BoxBufferGeometry( 1, 1, 1);
      this.sugarBox0 = new THREE.Mesh( sugarBoxGeo, new THREE.MeshPhongMaterial({color:0xffffff}) );
      var s = Optionen.ZuckerBoxGröße
      this.sugarBox0.scale.set(s, s, s);
      
      // marker-sphere
      var geometry1 = new THREE.SphereBufferGeometry(40,32,24);
      var material1 = new THREE.MeshLambertMaterial();
      var sphere1 = new THREE.Mesh(geometry1, material1);
      this.marker0 = sphere1;
      
      // poison ring
      var ring = new THREE.RingBufferGeometry( 20, 50, 8 );
      var ringMat = new THREE.MeshPhongMaterial( { color: 0xffff00, side: THREE.DoubleSide, transparent:true, opacity:0.4 } );
      var poisonRing = new THREE.Mesh( ring, ringMat );
      poisonRing.rotation.x = Math.PI / 2;
      poisonRing.position.y = 2
      this.poison0 = poisonRing
      
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
      this.antStore = new UnitStore(this.ant0);
      this.hillStore = new UnitStore(this.hill0);
      this.appleStore = new UnitStore(this.apple0);
      this.bugStore = new UnitStore(this.bug0);
      this.sugarStore = new UnitStore(this.sugar0);
      this.sugarBoxStore = new UnitStore(this.sugarBox0);
      this.markerStore = new UnitStore(this.marker0);
      this.poisonStore = new UnitStore(this.poison0);
    }
    
    this.setAntBodyColor = function(ant, c){
      [/*10,*/ 7, 6].forEach(function(id){
        ant.children[0].children[id].material = new THREE.MeshPhongMaterial({color:c});
      });
    }
    
    this.setHillFlagColor = function(hill, c){
      hill.children[0].children[2].material = new THREE.MeshPhongMaterial({color:c});
    }
    
    this.setBugEyeColor = function(bug, color) {
      [6, 7].forEach(function(id){
        bug.children[0].children[id].material.color.setHex(color);
      });
    }
    
    this.setMarkerColor = function(marker, color) {
      marker.material = new THREE.MeshLambertMaterial({color: color, transparent: true});
    }
    
    this.setControlsBounds = function(x, y){
      controls.maxX = x,
      controls.maxZ = y;
    }
    
    this.getScene = function(){
      return scene
    }
  };
  
  var vw = new ViewController();
  
  // export
  AntIT._vw = vw;
  AntIT.StarteSimulation = init;
})();
