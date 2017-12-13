"use strict";
(function(Sim){

  var levels = {
    1 : {
      init : function(){
        Sim.Opts.Runden = 1000
        Sim.Opts.NahrungsWartezeit = 100000
        Sim.Opts.WanzenProSpieler = 0
        Sim.Opts.NahrungMindestEntfernung = 100000
      },
      create : function(){
        Sim.hills.push(new Sim.Hill({x:Sim.playground.getWidth()/3,y:Sim.playground.getHeight()/2}, 0))
        Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
      },
    },
  }
  
  var l = levels[Sim.Opts.Level]

  function init() {
    if (!l)
      throw "Unbekanntes Level"
    Sim.Bus.emit('update-levelstatus', "Starte Level " + Sim.Opts.Level)
    l.init()
  }
  
  function createPlayers() {
    l.create()
  }
  
  function update() {
  
  }
  
  Sim.Level = {
    init : init,
    createPlayers: createPlayers,
    update : update,
  }

})(AntIT._rawsim)
