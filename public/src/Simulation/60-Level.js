"use strict";
(function(Sim){

  function level1Init() {
    Sim.Opts.NahrungsWartezeit = 100000
    Sim.Opts.WanzenProSpieler = 0
    Sim.Opts.NahrungMindestEntfernung = 100000
    Sim.Opts.WanzeDrehgeschwindigkeit = 0
    Sim.Opts.WanzeGeschwindigkeit = 0
    Sim.Opts.SpawnRadius = 70
    Sim.Opts.SpawnWinkel = 0
  }
  
  function level1create() {
    Sim.hills.push(new Sim.Hill({x:Sim.playground.getWidth()/3,y:Sim.playground.getHeight()/2}, 0))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
  }

  var levels = {
    1 : {
      init : function(){
        level1Init()
        Sim.Opts.Runden = 1000
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        level1create()
        Sim.Bus.emit('move-spawn-point', 0, {x:763,y:234})
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(f){
            if (Sim.Util.dist({x:763,y:234}, f.getPos()) > 10)
              ok = false
          })
          if (ok)
            return true
        }
        return false
      }
    },
    2 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1000
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        level1create()
        Sim.Bus.emit('move-spawn-point', 0, {x:864,y:712})
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(f){
            if (Sim.Util.dist({x:864,y:712}, f.getPos()) > 10)
              ok = false
          })
          if (ok)
            return true
        }
        return false
      }
    },
  }
  
  var l = levels[Sim.Opts.Level]

  function init() {
    if (!l)
      throw "Unbekanntes Level"
    Sim.Bus.emit('update-levelstatus', "Level " + Sim.Opts.Level + " gestartet")
    l.init()
  }
  
  function createPlayers() {
    if (l.create) l.create()
  }
  
  function isDone() {
    var d = l.isDone()
    Sim.Bus.emit('update-levelstatus', "Level " + Sim.Opts.Level + (d ? " geschafft" : " beendet"))
    return  d
  }
  
  Sim.Level = {
    init : init,
    createPlayers: createPlayers,
    isDone : isDone,
  }

})(AntIT._rawsim)
