
(function(Sim){

  function init() {
  }
  
  function createPlayers() {
    Sim.Bus.emit('update-levelstatus', "Hallo!")
    console.log("hi")
  }
  
  function update() {
  
  }
  
  Sim.Level = {
    init : init,
    createPlayers: createPlayers,
    update : update,
  }

})(AntIT._rawsim)
