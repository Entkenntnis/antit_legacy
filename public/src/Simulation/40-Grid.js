
(function(Sim){

  // einfache Optimierung zur 2D-Suche
  
  function Grid() {

    var gridsize = 80
    
    var grids = {}
    var idtogrid = {}
    
    function toGrid(c) {
      return Math.floor(c/gridsize)
    }
    
    function getGrid(pos) {
      var gx = toGrid(pos.x)
      var gy = toGrid(pos.y)
      return gx + "-" + gy
    }
    
    function addObj(id, pos, obj) {
      var g = getGrid(pos)
      if (!(g in grids))
        grids[g]  = {}
      grids[g][id] = obj
      idtogrid[id] = g
    }
    
    function move(id, pos) {
      var obj = grids[idtogrid[id]][id]
      remove(id)
      addObj(id, pos, obj)
    }
    
    function remove(id) {
      delete grids[idtogrid[id]][id]
    }
    
    function inRange(pos, range) {
      var lowx = toGrid(pos.x - range)
      var highx = toGrid(pos.x + range)
      var lowy = toGrid(pos.y - range)
      var highy = toGrid(pos.y + range)
      var objs = []
      for (var x = lowx; x <= highx; x++) {
        for (var y = lowy; y <= highy; y++) {
          var g = x + "-" + y
          if (g in grids) {
            for (id in grids[g]) {
              if (Sim.Util.dist(pos, grids[g][id].getPos()) <= range) {
                objs.push(grids[g][id])
              }
            }
          }
        }
      }
      return objs
    }
    
    function byId(id) {
      return grids[idtogrid[id]][id]
    }
    
    this.add = addObj
    this.move = move
    this.remove = remove
    this.inRange = inRange
    this.byId = byId
  }
  
  Sim.Grid = Grid

})(AntIT._rawsim)
