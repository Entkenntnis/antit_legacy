
(function(){

  console.log("AntIT! Simulation Logger")
  
  function printPos(pos) {
    return Math.round(pos.x) + "|" + Math.round(pos.y)
  }
  
  var routes = [
    'add-player',
    'add-board',
    'new-hill',
    'move-hill',
    'remove-hill',
    'set-hill-player',
    'add-ant',
    'move-ant',
    'remove-ant',
    'turn-ant',
    'set-ant-player',
    'add-sugar',
    'move-sugar',
    'remove-sugar',
    'set-sugar-amount',
    'add-apple',
    'move-apple',
    'remove-apple',
    'set-apple-packed',
  ]
  
  routes.forEach(function(route){
    AntIT.Bus.on(route, function() {
      var args = []
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "object" && 'x' in arguments[i] && 'y' in arguments[i])
          args.push(printPos(arguments[i]))
        else
          args.push(JSON.stringify(arguments[i]))
      }
      console.log(route + " [" + args.join(', ') + "]")
    })
  })

})()
