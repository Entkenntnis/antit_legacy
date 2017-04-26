// PLAYGROUND

function Playground(_width, _height) {

  var width = _width;
  var height = _height;
  var timeToNextFeed = 30;
  var timeToNextBug = Optionen.WanzenWartezeit;
  
  function getFoodInRange(h, range) {
    var appleCount = 0;
    var sugarCount = 0;
    Sim.apples.forEach(function(a){
      if (dist(a.getPos(), h.getPos()) < range) {
        appleCount++;
      }
    })
    Sim.sugars.forEach(function(s){
      if (dist(s.getPos(), h.getPos()) < range) {
        sugarCount++;
      }
    })
    return {apples:appleCount, sugars:sugarCount};
  }
  
  this.getWidth = function() {
    return width;
  }
  
  this.getHeight = function() {
    return height;
  }
  
  this.randomPos = function() {
    return {
      x:Math.random()*width,
      y:Math.random()*height};
  }
  
  this.isInBound = function(pos, margin) {
    if (margin == undefined)
      margin = 0;
    if (pos.x < margin || pos.y < margin)
        return false;
    if (width - pos.x < margin || height - pos.y < margin)
      return false;
    return true;
  }
  
  this.toViewPos = function(pos, h){
    if (h === undefined) {
      h = 0;
    }
    return new THREE.Vector3(
      pos.x - width / 2.0,
      h,
      pos.y - height / 2.0);
  }
  
  this.getHillPos = function() {
    var topW = width - Optionen.EckenAbstand*2;
    var leftH = height - Optionen.EckenAbstand * 2;     
    var pos = {};
    var limit = 100;
    while(limit-- > 0) {
      pos.x = Math.random()*(topW+leftH);
      pos.y = Math.random()*Optionen.HügelStreifenBreite * 2;
      if (pos.x < topW) {
        if (pos.y >= Optionen.HügelStreifenBreite) {
          pos.y += (height - Optionen.HügelStreifenBreite*2 - Optionen.HügelRandAbstand*2);
        } 
        pos.x += Optionen.EckenAbstand;
        pos.y += Optionen.HügelRandAbstand;
      } else {
        var t = pos.y;
        pos.y = pos.x - topW;
        pos.x = t;
        if (pos.x >= Optionen.HügelStreifenBreite) {
          pos.x += (width - Optionen.HügelStreifenBreite * 2 - Optionen.HügelRandAbstand * 2);
        }
        pos.x += Optionen.HügelRandAbstand;
        pos.y += Optionen.EckenAbstand;
      }
      var isGood = true;
      for(var i = 0; i < Sim.hills.length; i++) {
        if (dist(Sim.hills[i].getPos(), pos) < Optionen.HügelAbstand) {
          isGood = false;
        }
      }
      if (!isGood) continue;
      return pos;
    }
    return pos;
  }
  
  this.update = function() {
    if (timeToNextFeed-- <= 0) {
      timeToNextFeed = Optionen.NahrungsWartezeit;
      var feedHills = [];
      Sim.hills.forEach(function(h){
        var counts = getFoodInRange(h, Optionen.NahrungMaximalEntfernung);
        if (counts.apples < 1 || counts.sugars < 2 || (counts.apples <= 2 && counts.sugars <= 3))
          feedHills.push(h);
      });
      for (var i = 0; i < feedHills.length; i++) {
        feedHills.sort(function(a,b){
          if (a.getFeedIndex() == b.getFeedIndex())
            return Math.random() >= 0.5 ? 1 : -1;
          return a.getFeedIndex() > b.getFeedIndex() ? 1 : -1;
        })
        var curHill = feedHills[0];
        
        var counts = getFoodInRange(curHill, Optionen.NahrungMaximalEntfernung);
        var type = "sugar";
        if (counts.sugars == counts.apples) {
          if (Math.random() > 0.7)
            type = "apple";
        } else {
          if (counts.sugars > counts.apples * 2)
            type = "apple";
        }     
        
        var counter = 100;
        while(counter-- > 0) {
          var randAngle = Math.random()*360;
          var minD = Optionen.NahrungMindestEntfernung;
          var randDist = Math.random()*(Optionen.NahrungMaximalEntfernung - minD) + minD;
          var pos = moveDir(curHill.getPos(), randAngle, randDist);
          if (!Sim.playground.isInBound(pos, 30))
            continue;
            
          // check collision
          var closestHill = closest(pos, Sim.hills, minD)
          if (closestHill !== undefined)
            continue;
          var closestApple = closest(pos, Sim.apples, Optionen.NahrungAbstand)
          if (closestApple !== undefined)
            continue;
          var closestSugar = closest(pos, Sim.sugars, Optionen.NahrungAbstand)
          if (closestSugar !== undefined)
            continue;
          
          if (type == "apple") {
            Sim.apples.push(new Apple(pos));
          } else {
            Sim.sugars.push(new Sugar(pos));
          }
          
          var affectedHills = [];
          Sim.hills.forEach(function(h){
            if (dist(pos, h.getPos()) < Optionen.NahrungMaximalEntfernung) {
              affectedHills.push(h);
            }
          })
          affectedHills.forEach(function(h){
            var f = 1 / affectedHills.length;
            f *= (2000 - dist(h.getPos(), pos)) / 2000;
            if (type == "apple") {
              h.addFeed(f * Optionen.EnergieProApfel);
            } else {
              h.addFeed(f * Optionen.EnergieProZucker * Optionen.ZuckerGröße);
            }              
          })
          break;
        }
      }
    }
        
    var maximalBugs = (Sim.playerCount() + 1) * Optionen.WanzenProSpieler;
    if (timeToNextBug-- <= 0 && Sim.bugs.length < maximalBugs) {
      timeToNextBug = Optionen.WanzenWartezeit;
      Sim.bugs.push(new Bug(this.randomPos()));
    }
    
    removeIf(Sim.sugars, function(sugar){
      if (sugar.getAmount() <= 0) {
        return true;
      }
      return false;
    })
    
    removeIf(Sim.apples, function(apple){
      var id = apple.getPid();
      if (id !== undefined) {
        var d = dist(apple.getPos(), Sim.hills[id].getPos());
        if (d < 10) {
          apple.reachHome(id);
          return true;
        }
      }
      return false;
    });
    
    removeIf(Sim.ants, function(ant) {
      var reason = undefined
      if (ant.getLap() > Optionen.AmeisenReichweite) {
        reason = "Müdigkeit"
      } else if (ant.getEnergy() <= 0) {
        reason = "Wanze"
      }
      if (reason) {
        API.setAnt(ant)
        API.callUserFunc("IstGestorben", [reason])
        API.close()
        ant.die()
        return true
      }
      return false;
    })
  }
  
  // constructor
  Vw.gamefloor.geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  Vw.gamefloor.geometry.verticesNeedUpdate = true;
  Vw.setControlsBounds(width/2, height/2);
}
