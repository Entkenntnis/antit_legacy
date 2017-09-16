

(function(){

  var Opts = AntIT.AddOptions({
    HügelAbstand : 500,
    HügelRandAbstand : 200,
    EckenAbstand : 300,
    HügelStreifenBreite : 200,
  })
  
  function getHillPos(hills) {
    var width = AntIT.Board.getWidth()
    var height = AntIT.Board.getHeight()
    var topW = width - Opts.EckenAbstand * 2
    var leftH = height - Opts.EckenAbstand * 2
    var pos = {}
    var limit = 100
    while(limit-- > 0) {
      // alle möglichen Orte abdecken
      pos.x = Math.random()*(topW+leftH)
      pos.y = Math.random()*Opts.HügelStreifenBreite * 2
      // auf echte Koordinaten umrechnen
      if (pos.x < topW) {
        if (pos.y >= Opts.HügelStreifenBreite) {
          pos.y += (height - Opts.HügelStreifenBreite*2 - Opts.HügelRandAbstand*2)
        } 
        pos.x += Opts.EckenAbstand
        pos.y += Opts.HügelRandAbstand
      } else {
        var t = pos.y
        pos.y = pos.x - topW
        pos.x = t
        if (pos.x >= Opts.HügelStreifenBreite) {
          pos.x += (width - Opts.HügelStreifenBreite*2 - Opts.HügelRandAbstand*2)
        }
        pos.x += Opts.HügelRandAbstand
        pos.y += Opts.EckenAbstand
      }
      // validieren
      var isGood = true;
      for(var i = 0; i < hills.length; i++) {
        if (AntIT.Util2d.dist(hills[i].getPos(), pos) < Opts.HügelAbstand) {
          isGood = false
        }
      }
      if (!isGood) continue
      return pos
    }
    return pos
  }

  AntIT.AddProp("HillSpawner", {
    getHillPos: getHillPos,
  })

})()
