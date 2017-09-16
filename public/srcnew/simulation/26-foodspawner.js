

(function(){

  var Opts = AntIT.AddOptions({
    NahrungWartezeit : 450,
    NahrungMindestEntfernung : 450,
    NahrungMaximalEntfernung : 1000,
    NahrungAbstand : 150,
  })
  
  var timeToNextFeed = 30
  
  var foodTypes = []
  var foodMinCount = {}
  var foodFeedCount = {}
  
  AntIT.AddProp("AddFoodType", function(type, minCount, feed) {
    foodTypes.push(type)
    foodMinCount[type] = minCount
    foodFeedCount = feed
  })
  
  AntIT.Unit.addAttribute('Hill', 'feedindex', 0)
  
  function getFoodInRange(hill, range) {
    var x = {}
    foodTypes.forEach(function(t){
      x[t] = AntIT.Util2d.inRange(hill.getPos(), AntIT.Units[t], range).length
    })
    return x
  }

  AntIT.Bus.on('tick', function(){
    if (foodTypes.length == 0) return
    if (timeToNextFeed-- <= 0) {
      timeToNextFeed = Opts.NahrungWartezeit
      // find hills in need
      var hillsToFeed = []
      AntIT.Units.Hill.forEach(function(h){
        var counts = getFoodInRange(h, Opts.NahrungMaximalEntfernung)
        var need = false
        foodTypes.forEach(function(t){
          if (counts[t] < foodMinCount[t])
            need = true
        })
        if (need)
          hillsToFeed.push(h)
      })
      // feed n-times
      for (var i = 0; i < hillsToFeed.length; i++) {
        // the lowest
        hillsToFeed.sort(function(a,b){
          if (a.getAttr('feedindex') == b.getAttr('feedindex'))
            return Math.random() >= 0.5 ? 1 : -1
          return a.getAttr('feedindex') > b.getAttr('feedindex') ? 1 : -1
        })
        var curHill = hillsToFeed[0]
        var counts = getFoodInRange(curHill, Opts.NahrungMaximalEntfernung)
        // calc food type
        var type = foodTypes[Math.floor(Math.random()*foodTypes.length)]
        if (Math.random() >= 0.2) {
          var sum = 0
          foodTypes.forEach(function(t){
            sum += foodMinCount[t]
          })
          var maxd = -Infinity
          foodTypes.forEach(function(t){
            var should = foodMinCount[t]/sum
            var deriv = -(counts[t] - should) / should
            if (deriv > maxd) {
              maxd = deriv
              type = t
            }
          })
        }
        // spawn
        var counter = 100;
        while(counter--) {
          var randAngle = Math.random()*360;
          var minD = Opts.NahrungMindestEntfernung;
          var randDist = Math.random()*(Opts.NahrungMaximalEntfernung - minD) + minD;
          var pos = AntIT.Util2d.moveDir(curHill.getPos(), randAngle, randDist);
          if (!AntIT.Board.isInBound(pos, 30)) continue
          // check collision
          var isCollide = false
          if(AntIT.Util2d.closest(pos, AntIT.Units.Hill, minD))
            isCollide = true
          foodTypes.forEach(function(t){
            if(AntIT.Util2d.closest(pos, AntIT.Units[t], Opts.NahrungAbstand))
              isCollide = true
          })
          if (isCollide) continue
          // ok
          AntIT.Unit.create(type, pos)
          // increase feed index
          var affectedHills = []
          AntIT.Units.Hill.forEach(function(h){
            if (AntIT.Util2d.dist(pos, Opts.NahrungMaximalEntfernung))
              affectedHills.push(h)
          })
          affectedHills.forEach(function(h){
            var f = 1 / affectedHills.length
            f *= (2000 - AntIT.Util2d.dist(h.getPos(), pos)) / 2000
            var newfi = h.getAttr('feedindex') + f * foodFeedCount[type]
            h.setAttr('feedindex', newfi)
          })
          break
        }
      }
    }
  })

})()










    
    
