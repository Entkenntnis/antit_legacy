

(function(){

  var Opts = AntIT.AddOptions({
    SpielerFarben : [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff,
                     0xffff00, 0xff00ff, 0xffffff, 0x000000]
  })
  
  AntIT.AddProp("ColorOf", function(id) {
    if (id >= Opts.SpielerFarben.length) {
      return Math.floor(Math.random()*0x1000000)
    }
    return Opts.SpielerFarben[id]
  })

})()

