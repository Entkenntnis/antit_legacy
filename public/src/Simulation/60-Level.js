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
    Sim.Opts.ZufallRichtungsVerschiebung = 0
    Sim.Opts.WanzenAngriff = 300
  }
  
  function level1create() {
    Sim.hills.push(new Sim.Hill({x:Sim.playground.getWidth()/3,y:Sim.playground.getHeight()/2}, 0))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
  }
  
  function getRandPos(pos) {
    var angle = Sim.rng()*360
    return Sim.Util.moveDir(pos, angle, Sim.rng()*35+10)
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
    
    3 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1000
      },
      create : function(){
        level1create()
        Sim.Bus.emit('move-spawn-point', 0, {x:176,y:392})
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(f){
            if (Sim.Util.dist({x:176,y:392}, f.getPos()) > 10)
              ok = false
          })
          if (ok)
            return true
        }
        return false
      }
    },
    
    4 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1200
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.EnergieProZucker = 0
      },
      create : function(){
        level1create()
        Sim.sugars.push(new Sim.Sugar({x:824,y:512}));
        Sim.bugs.push(new Sim.Bug({x:674,y:512}))
        Sim.bugs.push(new Sim.Bug({x:624,y:412}))
        Sim.bugs.push(new Sim.Bug({x:614,y:612}))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 100
      }
    },
    
    5 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1200
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.AnfangsEnergie = 800
        Sim.Opts.EnergieProApfel = 0
      },
      create : function(){
        level1create()
        Sim.apples.push(new Sim.Apple({x:624,y:112}));
        Sim.bugs.push(new Sim.Bug({x:624,y:362}))
        Sim.bugs.push(new Sim.Bug({x:524,y:112}))
      },
      isDone : function(){
        return Sim.players[0].getApple() == 1
      }
    },
    
    6 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1500
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.EnergieProZucker = 0
      },
      create : function(){
        level1create()
        Sim.sugars.push(new Sim.Sugar({x:455,y:712}))
        Sim.sugars.push(new Sim.Sugar({x:455,y:312}))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 200
      }
    },
    
    7 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 2000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.EnergieProZucker = 0
      },
      create : function(){
        level1create()
        Sim.sugars.push(new Sim.Sugar({x:924,y:712}));
        var bugs = [
          [-1,-2],
          [0,-2],
          [1,-2],
          [1,-1],
          [1,0],
          [1,1],
          [0,1],
          [-1,1],
          [-1,0],
          [-2,0],
          [-3,0],
          [-3,-1],
          [-3,-2],
          [-1,-3],
          [-1,-4],
          [-2,-4],
          [-3,-4],
          [-4,-4],
          [-5,-4],
          [-5,-3],
          [-5,-2],
        ]
        bugs.forEach(function(diff){
          Sim.bugs.push(new Sim.Bug({x:924+50*diff[0],y:712-50*diff[1]}))
        })
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 100
      }
    },
    
    8 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1500
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.EnergieProZucker = 0
      },
      create : function(){
        level1create()
        var pos = [{x:524,y:712},{x:524,y:912},{x:724,y:912}]
        pos.forEach(function(pos, id){Sim.Bus.emit('move-spawn-point2', id, pos)})
        var angle = Sim.rng()*360
        var num = Math.floor(Sim.rng()*3)
        Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(pos[num], angle, Sim.rng()*35+10)))
        //Sim.sugars.push(new Sim.Sugar({x:455,y:312}))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 100
      }
    },
    
    9 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 650
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.EnergieProApfel = 0
      },
      create : function(){
        level1create()
        Sim.Bus.emit('move-spawn-point2', 0, {x:824,y:212})
        var angle = Sim.rng()*360
        Sim.apples.push(new Sim.Apple(Sim.Util.moveDir({x:824,y:212}, angle, Sim.rng()*35+10)))
      },
      isDone : function(){
        return Sim.players[0].getApple() == 1
      }
    },
    
    10 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 3000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.EnergieProApfel = 0
      },
      create : function(){
        level1create()
        Sim.apples.push(new Sim.Apple({x:655,y:312}))
        Sim.apples.push(new Sim.Apple({x:655,y:712}))
        Sim.apples.push(new Sim.Apple({x:255,y:312}))
        Sim.apples.push(new Sim.Apple({x:255,y:712}))
      },
      isDone : function(){
        return Sim.players[0].getApple() == 4
      }
    },
    
    11 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 3000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.EnergieProZucker = 0
      },
      create : function(){
        level1create()
        var mid = {x:924,y:512}
        var pos = []
        for (var dx = -1; dx <= 1; dx++) {
          for (var dy = -1; dy <= 1; dy++) {
            pos.push({x:mid.x+dx*150,y:mid.y+dy*150})
          }
        }
        pos.forEach(function(pos, id){Sim.Bus.emit('move-spawn-point2', id, pos)})
        var ids = []
        while (ids.length < 3) {
          var t = Math.floor(Sim.rng()*9)
          if (ids.indexOf(t) < 0)
            ids.push(t)
        }
        ids.forEach(function(id){
          var angle = Sim.rng()*360
          Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(pos[id], angle, Sim.rng()*35+10)))
        })
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 300
      }
    },
    
    12 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 1500
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.AnfangsEnergie = 600
      },
      create : function(){
        level1create()
        Sim.bugs.push(new Sim.Bug({x:1024,y:812}))
        Sim.bugs.push(new Sim.Bug({x:524,y:112}))
        Sim.bugs.push(new Sim.Bug({x:224,y:412}))
      },
      isDone : function(){
        return Sim.players[0].getPoison() == 3
      }
    },
    
    13 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 10000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.EnergieProZucker = 0
        Sim.Opts.ZuckerGröße = 50
        Sim.Opts.AnfangsEnergie = 2000
      },
      create : function(){
        level1create()
        var pos = [{x:755,y:512}, {x:755,y:812}, {x:455,y:812}]
        pos.forEach(function(p, id){
          Sim.Bus.emit('move-spawn-point2', id, p)
        })
        Sim.tmp = {}
        Sim.tmp.pos = pos
        Sim.tmp.nextTime = Sim.rng()*800 + 200
      },
      update : function(){
        if (Sim.sugars.length == 0 && Sim.tmp.nextTime-- <= 0) {
          Sim.tmp.nextTime = Sim.rng()*800 + 200
          Sim.sugars.push(new Sim.Sugar(getRandPos(Sim.tmp.pos[Math.floor(Sim.rng()*3)])))
        }
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 250
      }
    },
    
    14 : {
      init : function() {
        level1Init()
        Sim.Opts.Runden = 3000
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        level1create()
        Sim.Bus.emit('set-ring', {x:455,y:512}, 0x0000aa, {inner:190,outer:200})
        Sim.tmp = {}
        Sim.tmp.lost = false
        Sim.tmp.nextTime = 100
      },
      isDone : function(){
        return Sim.cycles >= 2900 && !Sim.tmp.lost
      },
      failed : function(){
        return Sim.tmp.lost
      },
      update : function(){
        if (Sim.tmp.nextTime-- <= 0) {
          Sim.tmp.nextTime = 300
          var pos = {x:1100+Sim.rng()*200,y:100+Sim.rng()*800}
          var a = new Sim.Ant(pos, 1, true)
          Sim.ants.push(a)
          var angle = Sim.Util.getDir(pos, Sim.hills[0].getPos())
          a.turn(angle)
        }
        Sim.ants.forEach(function(a){
          if (a.getPlayerid() == 1) {
            a.setPos(Sim.Util.moveDir(a.getPos(), a.getHeading(), 3))
            if (Sim.Util.dist(a.getPos(), Sim.hills[0].getPos()) < 190) {
              Sim.tmp.lost = true
            }
          }
        })
      }
    },
  }
  
  var l = levels[Sim.Opts.Level]

  function init() {
    if (!l)
      throw "Unbekanntes Level"
    //Sim.Bus.emit('update-levelstatus', "Level " + Sim.Opts.Level + " gestartet")
    l.init()
  }
  
  function createPlayers() {
    if (l.create) l.create()
  }
  
  function isDone() {
    var d = l.isDone()
    //Sim.Bus.emit('update-levelstatus', "Level " + Sim.Opts.Level + (d ? " geschafft" : " beendet"))
    return  d
  }
  
  function update() {
    if (l.update) l.update()
    if (Sim.cycles % 100 == 40) {
      if (isDone())
        Sim.Bus.emit('submit-level')
    }
    if (l.failed && l.failed()) {
      Sim.cycles = Infinity
    }
  }
  
  Sim.Level = {
    init : init,
    createPlayers: createPlayers,
    isDone : isDone,
    update : update,
  }

})(AntIT._rawsim)
