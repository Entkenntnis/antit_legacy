
(function(Sim){

  // Stellt Funktionen zur Verfügung, um Kampf zu aktivieren
  
  var Fight = {}
  
  Fight.init = function(){
    AntIT.NeueAmeise("Spieler 1")
    AntIT.NeueAmeise("Spieler 2")
    Sim.Opts.AnfangsEnergie = 40000
    Sim.Opts.WanzenProSpieler = 0
    Sim.Opts.NahrungMindestEntfernung = 100
    Sim.Opts.NahrungMaximalEntfernung = 300
    Sim.Opts.NahrungAbstand = 75
    Sim.units = [[], []]
  }
  
  Fight.createPlayers = function(){
    var width = Sim.playground.getWidth()
    var height = Sim.playground.getHeight()
    Sim.hills.push(new Sim.Hill({x:300,y:height/2}, 0))
    Sim.hills.push(new Sim.Hill({x:width-300,y:height/2}, 1))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
    Sim.players.push(new Sim.Player(1, Sim.API.ants[1]))
  }
  
  Sim.Fight = Fight

})(AntIT._rawsim)
