(function(Sim){

  // PLAYGROUND

  function Playground(width, height) {

    var my = Sim.Util.makeAttributes(this, {width:width, height:height})
    
    var timeToNextFeed = 30;
    var timeToNextBug = Sim.Opts.WanzenWartezeit;
    
    function getFoodInRange(h, range) {
      var appleCount = 0;
      var sugarCount = 0;
      Sim.apples.forEach(function(a){
        if (Sim.Util.dist(a.getPos(), h.getPos()) < range) {
          appleCount++;
        }
      })
      Sim.sugars.forEach(function(s){
        if (Sim.Util.dist(s.getPos(), h.getPos()) < range) {
          sugarCount++;
        }
      })
      return {apples:appleCount, sugars:sugarCount};
    }
    
    this.randomPos = function() {
      return {
        x:Sim.rng()*my.width,
        y:Sim.rng()*my.height};
    }
    
    this.isInBound = function(pos, margin) {
      if (margin == undefined)
        margin = 0;
      if (pos.x < margin || pos.y < margin)
          return false;
      if (my.width - pos.x < margin || my.height - pos.y < margin)
        return false;
      return true;
    }
    
    this.getHillPos = function() {
      var topW = my.width - Sim.Opts.EckenAbstand*2;
      var leftH = my.height - Sim.Opts.EckenAbstand * 2;     
      var pos = {};
      var limit = 100;
      while(limit-- > 0) {
        pos.x = Sim.rng()*(topW+leftH);
        pos.y = Sim.rng()*Sim.Opts.HügelStreifenBreite * 2;
        if (pos.x < topW) {
          if (pos.y >= Sim.Opts.HügelStreifenBreite) {
            pos.y += (my.height - Sim.Opts.HügelStreifenBreite*2
               - Sim.Opts.HügelRandAbstand*2);
          } 
          pos.x += Sim.Opts.EckenAbstand;
          pos.y += Sim.Opts.HügelRandAbstand;
        } else {
          var t = pos.y;
          pos.y = pos.x - topW;
          pos.x = t;
          if (pos.x >= Sim.Opts.HügelStreifenBreite) {
            pos.x += (my.width - Sim.Opts.HügelStreifenBreite * 2
               - Sim.Opts.HügelRandAbstand * 2);
          }
          pos.x += Sim.Opts.HügelRandAbstand;
          pos.y += Sim.Opts.EckenAbstand;
        }
        var isGood = true;
        for(var i = 0; i < Sim.hills.length; i++) {
          if (Sim.Util.dist(Sim.hills[i].getPos(), pos) < Sim.Opts.HügelAbstand) {
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
        timeToNextFeed = Sim.Opts.NahrungsWartezeit;
        var feedHills = [];
        Sim.hills.forEach(function(h){
          var counts = getFoodInRange(h, Sim.Opts.NahrungMaximalEntfernung);
          if (counts.apples < 1 || counts.sugars < 2 || (counts.apples <= 2 && counts.sugars <= 3)) {
            feedHills.push(h);
          }
            
        });
        for (var i = 0; i < feedHills.length; i++) {
          feedHills.sort(function(a,b){
            if (a.getFeedIndex() == b.getFeedIndex())
              return Sim.rng() >= 0.5 ? 1 : -1;
            return a.getFeedIndex() > b.getFeedIndex() ? 1 : -1;
          })
          var curHill = feedHills[0];
          
          var counts = getFoodInRange(curHill, Sim.Opts.NahrungMaximalEntfernung);
          var type = "sugar";
          if (counts.sugars == counts.apples) {
            if (Sim.rng() > 0.7)
              type = "apple";
          } else {
            if (counts.sugars > counts.apples * 2)
              type = "apple";
          }    
          
          var counter = 100;
          while(counter-- > 0) {
            var randAngle = Sim.rng()*360;
            var minD = Sim.Opts.NahrungMindestEntfernung;
            var randDist = Sim.rng()*(Sim.Opts.NahrungMaximalEntfernung - minD) + minD;
            var pos = Sim.Util.moveDir(curHill.getPos(), randAngle, randDist);
            if (!Sim.playground.isInBound(pos, 30))
              continue;
              
            // check collision
            var closestHill = Sim.Util.closest(pos, Sim.hills, minD)
            if (closestHill !== undefined)
              continue;
            var closestApple = Sim.Util.closest(pos, Sim.apples, Sim.Opts.NahrungAbstand)
            if (closestApple !== undefined)
              continue;
            var closestSugar = Sim.Util.closest(pos, Sim.sugars, Sim.Opts.NahrungAbstand)
            if (closestSugar !== undefined)
              continue;
            
            if (type == "apple") {
              Sim.apples.push(new Sim.Apple(pos));
            } else {
              Sim.sugars.push(new Sim.Sugar(pos));
            }
            
            var affectedHills = [];
            Sim.hills.forEach(function(h){
              if (Sim.Util.dist(pos, h.getPos()) < Sim.Opts.NahrungMaximalEntfernung) {
                affectedHills.push(h);
              }
            })
            affectedHills.forEach(function(h){
              var f = 1 / affectedHills.length;
              f *= (2000 - Sim.Util.dist(h.getPos(), pos)) / 2000;
              if (type == "apple") {
                h.addFeed(f * Sim.Opts.EnergieProApfel);
              } else {
                h.addFeed(f * Sim.Opts.EnergieProZucker * Sim.Opts.ZuckerGröße);
              }              
            })
            break;
          }
        }
      }
          
      var maximalBugs = (Sim.playerCount() + 1) * Sim.Opts.WanzenProSpieler;
      if (timeToNextBug-- <= 0 && Sim.bugs.length < maximalBugs) {
        timeToNextBug = Sim.Opts.WanzenWartezeit;
        Sim.bugs.push(new Sim.Bug(this.randomPos()));
      }
      
      Sim.Util.removeIf(Sim.sugars, function(sugar){
        if (sugar.getAmount() <= 0) {
          return true;
        }
        return false;
      })
      
      Sim.Util.removeIf(Sim.apples, function(apple){
        return apple.reachedHome()
      });
      
      Sim.Util.removeIf(Sim.bugs, function(bug){
        var poisonNear = Sim.Util.inRange(bug.getPos(),
          Sim.poisons, 80)
        var pCounter = {}
        poisonNear.forEach(function(p){
          if (!pCounter) return
          var pid = p.getPlayerid()
          if (!pCounter[pid]) pCounter[pid] = 0
          pCounter[pid]++
          if (pCounter[pid] >= 3) {
            Sim.players[pid].addPoison()
            Sim.players[pid].addPoints(500)
            bug.die()
            pCounter = undefined
          }
        })
        if (!pCounter) return true
        else return false
      })
      
      Sim.Util.removeIf(Sim.ants, function(ant) {
        var reason = undefined
        var level = Sim.levels[ant.getPlayerid()]
        if (ant.getLap() > Sim.Opts.AmeisenReichweite) {
          reason = "Müdigkeit"
        } else if (ant.getEnergy() <= 0) {
          reason = "Wanze"
        } else if (!level || level <= 5) {
          // check poison
          var poisonNear = Sim.Util.inRange(ant.getPos(),
            Sim.poisons, 80, function(p){
              return p.getPlayerid() == ant.getPlayerid()
            })
          var pCounter = {}
          poisonNear.forEach(function(p){
            if (!pCounter) return
            var pid = p.getPlayerid()
            if (!pCounter[pid]) pCounter[pid] = 0
            pCounter[pid]++
            if (pCounter[pid] >= 3) {
              reason = "Gift"
              Sim.players[pid].addPoison()
              Sim.players[pid].addPoints(300)
              pCounter = undefined
            }
          })  
        }
        if (reason) {
          if (Sim.players[ant.getPlayerid()]) { // for dummy ants
            // Ab Level 6 gibt es Punktabzug für tote Ameisen
            if (level && level >= 6) {
              Sim.players[ant.getPlayerid()].addPoints(-300)
            }
            Sim.API.setAnt(ant)
            Sim.API.callUserFunc("IstGestorben", [reason])
            Sim.API.close()
          }
          ant.die()
          return true
        }
        return false;
      })
    }
    
    // constructor
    Sim.Bus.emit('set-xy', my.width, my.height)
  }
  
  Sim.Playground = Playground

})(AntIT._rawsim)
