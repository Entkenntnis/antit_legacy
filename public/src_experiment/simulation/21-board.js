
(function(){

  var Opts = AntIT.AddOptions({
    SpielfeldVerhältnis : 4.0/3.0,
    SpielfeldGrundGröße : 600000,
  })
  
  AntIT.Bus.on('init', function(){
    
    var area = (1 + (AntIT.Players.length * Opts.SpielfeldVerhältnis)) *
                Opts.SpielfeldGrundGröße
    var width = Math.round(Math.sqrt(area * Opts.SpielfeldVerhältnis))
    var height = Math.round(Math.sqrt(area / Opts.SpielfeldVerhältnis))
    
    function getWidth() { return width }
    function getHeight() { return height }
    
    function isInBound(pos, margin){
      if (margin == undefined)
        margin = 0
      if (pos.x < margin || pos.y < margin)
          return false
      if (width - pos.x < margin || height - pos.y < margin)
        return false
      return true
    }
    
    function randomPos() {
      return {x:Math.random()*width, y:Math.random()*height}
    }
    
    var scope = this
    AntIT.AddProp("Board", {
      getWidth : getWidth,
      getHeight : getHeight,
      isInBound : isInBound,
      randomPos : randomPos,
    })
    
    AntIT.Bus.emit('add-board', width, height)
  })



})()
