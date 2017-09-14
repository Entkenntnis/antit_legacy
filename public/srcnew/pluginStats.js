
(function(){

var stats

AntIT.Bus.on('load', function(scene){
      
  stats = new Stats()
  stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom )

})

AntIT.Bus.on('pre-render', function(){
  stats.begin()
})

AntIT.Bus.on('post-render', function(){
  stats.end()
})

})()
