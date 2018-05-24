"use strict";
(function(Sim){

  function defaultLevelInit() {
    Sim.Opts.NahrungsWartezeit = 100000
    Sim.Opts.WanzenProSpieler = 0
    Sim.Opts.NahrungMindestEntfernung = 100000
    Sim.Opts.WanzeDrehgeschwindigkeit = 0
    Sim.Opts.WanzeGeschwindigkeit = 0
    Sim.Opts.SpawnRadius = 0
    Sim.Opts.SpawnWinkel = 0
    Sim.Opts.ZufallRichtungsVerschiebung = 0
    Sim.Opts.WanzenAngriff = 300
  }
  
  var hillx = 455.3
  var hilly = 512.5
  
  function locPos(x,y){
    return {x:hillx+x,y:hilly-y}
  }
  
  function defaultLevelCreate() {
    Sim.hills.push(new Sim.Hill({x:Sim.playground.getWidth()/3,y:Sim.playground.getHeight()/2}, 0))
    Sim.players.push(new Sim.Player(0, Sim.API.ants[0]))
    // Hillpos: 455.3 | 512.5
  }
  
  function getRandPos(pos) {
    var angle = Sim.rng()*360
    return Sim.Util.moveDir(pos, angle, Sim.rng()*35+10)
  }

  var levels = {
    1 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 2000
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        defaultLevelCreate()
        Sim.l1_checkpoints = [
          {x:hillx+300,y:hilly-100},
          {x:hillx-200,y:hilly+200},
          {x:hillx,y:hilly-400}
        ];
        [0,1,2].forEach(function(id){
          Sim.Bus.emit('move-spawn-point', id, Sim.l1_checkpoints[id])
        })
      },
      update : function(){
        Sim.ants.forEach(function(a){
          [0,1,2].forEach(function(id){
            if (Sim.Util.dist(Sim.l1_checkpoints[id], a.getPos()) < 15) {
              a["hasc" + (id+1)] = true
            }
          })
        })
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(a){
            /*if (Sim.Util.dist({x:763,y:234}, f.getPos()) > 10)
              ok = false*/
            if (!(a.hasc1 && a.hasc2 && a.hasc3)) ok = false
          })
          if (ok)
            return true
        }
        return false
      }
    },
    2 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1500
      },
      create : function(){
        defaultLevelCreate()
        Sim.l1_checkpoints = [
          {x:hillx-300,y:hilly},
          {x:hillx-150,y:hilly-150},
          {x:hillx,y:hilly-300}
        ];
        [0,1,2].forEach(function(id){
          Sim.Bus.emit('move-spawn-point', id, Sim.l1_checkpoints[id])
        })
      },
      update : function(){
        Sim.ants.forEach(function(a){
          [0,1,2].forEach(function(id){
            if (Sim.Util.dist(Sim.l1_checkpoints[id], a.getPos()) < 15) {
              a["hasc" + (id+1)] = true
            }
          })
        })
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(a){
            if (!(a.hasc1 && a.hasc2 && a.hasc3)) ok = false
          })
          if (ok)
            return true
        }
        return false
      }
    },
    
    3 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1100
      },
      create : function(){
        defaultLevelCreate()
        Sim.l1_checkpoints = [
          {x:hillx+100,y:hilly+100},
          {x:hillx+150,y:hilly+50},
          {x:hillx+150,y:hilly-50},
          {x:hillx+100,y:hilly-100},
          {x:hillx+0,y:hilly-200},
          {x:hillx-150,y:hilly-50},
          {x:hillx-100,y:hilly},
          {x:hillx-200,y:hilly+100},
          {x:hillx-150,y:hilly+200},
          {x:hillx-50,y:hilly+100},
        ];
        [0,1,2,3,4,5,6,7,8,9].forEach(function(id){
          Sim.Bus.emit('move-spawn-point', id, Sim.l1_checkpoints[id])
        })
      },
      update : function(){
        Sim.ants.forEach(function(a){
          [0,1,2,3,4,5,6,7,8,9].forEach(function(id){
            if (Sim.Util.dist(Sim.l1_checkpoints[id], a.getPos()) < 15) {
              a["hasc" + (id+1)] = true
            }
          })
        })
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(a){
            if (!(a.hasc1 && a.hasc2 && a.hasc3 && Sim.Util.dist({x:hillx,y:hilly}, a.getPos()) < 15))
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
        defaultLevelInit()
        Sim.Opts.Runden = 2500
        Sim.Opts.ZuckerGröße = 100
      },
      create : function(){
        defaultLevelCreate()
        Sim.sugars.push(new Sim.Sugar(locPos(100,200)))
        Sim.sugars.push(new Sim.Sugar(locPos(-300,-300)))
        Sim.bugs.push(new Sim.Bug(locPos(-150,-150)))
        Sim.bugs.push(new Sim.Bug(locPos(-300,0)))
        Sim.apples.push(new Sim.Apple(locPos(200,-200)))
        Sim.apples.push(new Sim.Apple(locPos(-200,200)))
        Sim.bugs.push(new Sim.Bug(locPos(-200,150)))
        Sim.bugs.push(new Sim.Bug(locPos(-150,200)))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 200 && Sim.players[0].getApple() == 2
      }
    },
    
    5 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1500
        Sim.Opts.ZuckerGröße = 50
      },
      create : function(){
        defaultLevelCreate()
        Sim.sugars.push(new Sim.Sugar(locPos(300,300)))
        Sim.sugars.push(new Sim.Sugar(locPos(-300,-300)))
        Sim.apples.push(new Sim.Apple(locPos(300,-300)))
        Sim.apples.push(new Sim.Apple(locPos(-300,300)))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 100 && Sim.players[0].getApple() == 2
      }
    },
    
    6 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1300
        Sim.Opts.ZuckerGröße = 50
      },
      create : function(){
        defaultLevelCreate()
        var vwalls = [
          [0,0,0,0,0,1,0],
          [1,0,0,0,0,1,0],
          [0,1,0,1,1,0,1],
          [0,0,0,0,0,0,0],
          [1,1,0,0,0,0,1],
          [0,1,1,1,0,1,1],
          [0,0,1,0,1,0,0],
          [1,0,0,0,0,1,0],
        ]
        var hwalls = [
          [0,1,0,1,0,1,0],
          [1,0,1,0,0,1,0],
          [1,1,0,0,0,0,1],
          [1,1,1,0,1,0,0],
          [0,1,0,1,1,1,1],
          [1,0,1,1,1,0,0],
          [0,1,1,1,0,1,1],
          [1,0,0,1,0,0,0],
        ]
        for (var x = -3; x <= 5; x++) {
          for (var y = -4; y <= 4; y++) {
            if (!(x==0&&y==0))
              Sim.bugs.push(new Sim.Bug(locPos(x*50,y*50)))
          }
        }
        for (var i = 0; i < 8; i++) {
          Sim.bugs.push(new Sim.Bug(locPos(i*50-125,200)))
          Sim.bugs.push(new Sim.Bug(locPos(i*50-125,-200)))
          Sim.bugs.push(new Sim.Bug(locPos(-150,i*50-175)))
          Sim.bugs.push(new Sim.Bug(locPos(250,i*50-175)))
        }
        vwalls.forEach(function(arr, iy) {
          arr.forEach(function(val, ix) {
            if (val == 1) {
              Sim.bugs.push(new Sim.Bug(locPos(-100+ix*50,175-iy*50)))
            }
          })
        })
        hwalls.forEach(function(arr, ix){
          arr.forEach(function(val, iy) {
            if (val === 1) {
              Sim.bugs.push(new Sim.Bug(locPos(-125+ix*50,150-iy*50)))
            }
          })
        })
        console.log(Sim.bugs.length)
        Sim.sugars.push(new Sim.Sugar(locPos(175,75)))
        Sim.sugars.push(new Sim.Sugar(locPos(75,-75)))
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 100
      }
    },
    
    7 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 10000
        Sim.Opts.ZuckerGröße = 100
        
        var factor = 1
        
        console.log("Sehr gut, dass du hierher gefunden hast...")
        setTimeout(function(){
          console.log("Unten an der Konsole findest du eine Befehlszeile.")
          setTimeout(function(){
            console.log("Tippe dort \"WeitereInfos()\" ein und drücke auf Enter. Die Anführungszeichen werden nicht mitgeschrieben.")
            window.WeitereInfos = function(){
              delete window.WeitereInfos
              console.log("Super gemacht...")
              setTimeout(function(){
                console.log("Du bist ja schon ein richtiger Profi :)")
                setTimeout(function(){
                  console.log("Tippe als nächstes \"InfoObjekt\" ein und drücke Enter.")
                  window.InfoObjekt = {
                    lalala:123,
                    lol:4543,
                    Hinweis:"Es kann bis zu 30 Sekunden dauern, bis die nächste Nachricht erscheint."
                  }
                  setTimeout(function(){
                    delete window.InfoObjekt
                    console.log("Wir sollten uns besser kennenlernen. Schreibe mir deinen Namen. Füge ihn dazu in den Befehl \"MeinNameIst()\" ein. Wenn du Max heißt, dann würdest du schreiben: \"MeinNameIst(\"Max\")\"")
                    window.MeinNameIst = function(name) {
                      if (name != undefined && typeof name == "string" &&  name.length > 1) {
                        delete window.MeinNameIst
                        console.log("Hallo " + name + ", wie alt bist du denn? Schreibe mir das im Befehl \"MeinAlterIst()\".")
                        window.MeinAlterIst = function(alter) {
                          delete window.MeinAlterIst
                          if (typeof alter == "number" && alter > 5 && alter < 100) {
                            console.log("Schön, du bist " + alter + " Jahre alt.")
                            setTimeout(function(){
                               console.log("Hier ist zum Schluss noch ein Rätsel:")
                               setTimeout(function(){
                                 console.log("Multipliziere dein Alter mit 3. Addiere dazu die Anzahl der Buchstaben deines Namens. Ziehe von dieser Zahl 10 ab und multipliziere das Ergebnis wieder mit drei. Sage mir die Antwort mit \"DieAntwortIst()\".")
                                 window.DieAntwortIst = function(answer) {
                                   if (answer === (((alter * 3) + name.length) - 10) * 3) {
                                     console.log("yo")
                                     Sim.l2_done = true
                                   } else {
                                     console.log("nö")
                                   }
                                 }
                               }, 2000 * factor)
                            }, 2000 * factor)
                          } else {
                            console.log("Ups, das hat nicht funktioniert")
                          }
                        }
                      } else {
                        console.log("Ups, da hat etwas nicht funktioniert")
                      }
                    }
                  }, (20000 + 10000 * Math.random()) * factor)
                }, 3000 * factor)
              }, 3000 * factor)
            }
          }, 3000 * factor)
        }, 4000 * factor)
      },
      create : function(){
        defaultLevelCreate()
        Sim.sugars.push(new Sim.Sugar({x:924,y:712}));
      },
      isDone : function(){
        return Sim.l2_done
      }
    },
    
    8 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.ZuckerGröße = 100
      },
      create : function(){
        defaultLevelCreate()
        while (Sim.sugars.length < 10) {
          var angle = Sim.rng()*360
          var dist = Sim.rng()*200 + 200
          Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(locPos(0,0), angle, dist)))
        }
        while (Sim.apples.length < 3) {
          var angle = Sim.rng()*360
          var dist = Sim.rng()*200 + 200
          Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), angle, dist)))
        }
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 600 && Sim.players[0].getApple() >= 2
      }
    },
    
    9 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 4000
        Sim.Opts.ZuckerGröße = 500
      },
      create : function(){
        defaultLevelCreate()
        function pushBug(x,y,h){
          var bug = new Sim.Bug(locPos(x,y))
          bug.setHeading(h)
          Sim.bugs.push(bug)
        }
        pushBug(150,100,90)
        pushBug(150,200,90)
        pushBug(150,300,90)
        pushBug(150,-200,90)
        pushBug(150,-300,90)
        pushBug(150,-400,90)
        pushBug(350,0,270)
        pushBug(350,50,270)
        pushBug(350,350,270)
        pushBug(350,400,270)
        pushBug(350,-300,270)
        pushBug(350,-350,270)
        pushBug(550,-350,90)
        pushBug(550,-300,90)
        pushBug(550,-200,90)
        pushBug(550,-150,90)
        pushBug(550,150,90)
        pushBug(550,350,90)
        Sim.sugars.push(new Sim.Sugar(locPos(700,0)))
        //Sim.Bus.emit('move-spawn-point2', 0, {x:824,y:212})
        //var angle = Sim.rng()*360
        //Sim.apples.push(new Sim.Apple(Sim.Util.moveDir({x:824,y:212}, angle, Sim.rng()*35+10)))
      },
      update : function(){
        Sim.bugs.forEach(function(bug){
          var pos = bug.getPos()
          pos = Sim.Util.moveDir(pos, bug.getHeading(), 2)
          if (pos.y < 0) {
            pos.y = Sim.playground.getHeight()
          } else if (pos.y > Sim.playground.getHeight()) {
            pos.y = 0
          }
          bug.setPos(pos)
        })
      },
      failed : function(){
        var failed = false
        Sim.ants.forEach(function(ant){
          if (Math.abs(ant.getPos().y-hilly) > 5) {
            failed = true
            alert("Ameise hat die x-Achse verlassen.")
          }
        })
        return failed
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 500
      }
    },
    
    10 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 5000
        Sim.Opts.ZuckerGröße = 100
      },
      create : function(){
        defaultLevelCreate()
        while (Sim.sugars.length < 6) {
          var angle = Sim.rng()*360
          var dist = Sim.rng()*150 + 300
          Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(locPos(0,0), angle, dist)))
        }
        while (Sim.apples.length < 2) {
          var angle = Sim.rng()*360
          var dist = Sim.rng()*150 + 300
          Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), angle, dist)))
        }
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 600 && Sim.players[0].getApple() >= 2
      }
    },
    
    11 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 5000
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.WanzenKampfweite = 20
      },
      create : function(){
        defaultLevelCreate()
        var gap1 = Math.floor(Sim.rng()*36)*10
        for (var i = 0; i < 360; i += 10) {
          if (i < gap1-10 || i > gap1+10)
            Sim.bugs.push(new Sim.Bug(Sim.Util.moveDir(locPos(0,0), i, 200)))
        }
        var gap2 = (gap1+180)%360
        for (var i = 0; i < 360; i += 5) {
          if (i < gap2-10 || i > gap2+10)
            Sim.ants.push(new Sim.Ant(Sim.Util.moveDir(locPos(0,0), i, 400), 1, true))
        }
        Sim.Bus.emit('set-ring', locPos(0,0), 0xaa0000, {inner:430,outer:440})
      },
      update : function(){
        Sim.ants.forEach(function(a){
          if (a.getPlayerid() == 1) {
            Sim.ants.forEach(function(b){
              if (b.getPlayerid() == 0) {
                if (Sim.Util.dist(a.getPos(), b.getPos()) < 20) {
                  b.subEnergy(100)
                }
              }
            })
          }
        })
      },
      isDone : function(){
        var count = 0
        Sim.ants.forEach(function(a){
          if (a.getPlayerid() == 0) {
            if (Sim.Util.dist(a.getPos(), locPos(0,0)) > 440)
              count++
          }
        })
        return count >= 15
      }
    },
    
    12 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1500
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.AnfangsEnergie = 600
      },
      create : function(){
        defaultLevelCreate()
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
        defaultLevelInit()
        Sim.Opts.Runden = 10000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.EnergieProZucker = 0
        Sim.Opts.ZuckerGröße = 50
        Sim.Opts.AnfangsEnergie = 2000
      },
      create : function(){
        defaultLevelCreate()
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
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        defaultLevelCreate()
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
    
    15 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.AnfangsRichtung = 0
        Sim.Opts.AnfangsEnergie = 800
      },
      create : function(){
        defaultLevelCreate()
        Sim.bugs.push(new Sim.Bug({x:355,y:912}))
        Sim.bugs.push(new Sim.Bug({x:1224,y:112}))
        Sim.bugs.push(new Sim.Bug({x:1024,y:212}))
        Sim.tmp = {}
        Sim.tmp.b1 = Sim.bugs[0]
        Sim.tmp.b2 = Sim.bugs[1]
        Sim.tmp.b3 = Sim.bugs[2]
        Sim.tmp.b1.setHeading(0)
        Sim.tmp.b2.setHeading(90)
        Sim.tmp.b3.setHeading(180)
      },
      update : function(){
        var zyklus = Sim.cycles % 400
        if (zyklus < 199) {
          Sim.tmp.b1.setPos(Sim.Util.moveDir(Sim.tmp.b1.getPos(), 0, 3))
          Sim.tmp.b2.setPos(Sim.Util.moveDir(Sim.tmp.b2.getPos(), 90, 3))
          Sim.tmp.b3.setPos(Sim.Util.moveDir(Sim.tmp.b3.getPos(), 180, 3))
        }
        else if (zyklus == 199) {
          Sim.tmp.b1.setHeading(180)
          Sim.tmp.b2.setHeading(270)
          Sim.tmp.b3.setHeading(0)
        }
        else if (zyklus < 399) {
          Sim.tmp.b1.setPos(Sim.Util.moveDir(Sim.tmp.b1.getPos(), 180, 3))
          Sim.tmp.b2.setPos(Sim.Util.moveDir(Sim.tmp.b2.getPos(), 270, 3))
          Sim.tmp.b3.setPos(Sim.Util.moveDir(Sim.tmp.b3.getPos(), 0, 3))
        }
        else if (zyklus == 399) {
          Sim.tmp.b1.setHeading(0)
          Sim.tmp.b2.setHeading(90)
          Sim.tmp.b3.setHeading(180)
        }
      },
      isDone : function(){
        return Sim.players[0].getPoison() == 3
      },
    },
    
    16 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.SpawnWinkel = undefined
        Sim.Opts.SpawnRadius = undefined
      },
      create : function(){
        defaultLevelCreate()
        Sim.apples.push(new Sim.Apple({x:755,y:512}))
        Sim.sugars.push(new Sim.Sugar({x:155,y:512}))
        Sim.sugars.push(new Sim.Sugar({x:455,y:212}))
        function bugify(pos) {
          for (var i = 0; i < 360; i += 45) {
            Sim.bugs.push(new Sim.Bug(Sim.Util.moveDir(pos, i, 30)))
          }
        }
        bugify({x:755,y:512})
        bugify({x:155,y:512})
        bugify({x:455,y:212})
      },
      isDone : function(){
        return Sim.players[0].getSugar() == 500 && Sim.players[0].getApple() == 1
      },
    },
 
    17 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1000
        Sim.Opts.SpawnWinkel = 0
        Sim.Opts.SpawnRadius = 300
        Sim.Opts.AnfangsRichtung = 0
      },
      create : function(){
        defaultLevelCreate()
        Sim.Bus.emit('move-spawn-point', 0, {x:755,y:512})
      },
      onSpawn : function(ant){
        if (Math.random() < 0.5) {
          var x = ant.getPos()
          var y = {x:x.x, y:x.y + 1000}
          ant.setPos(y)
          ant.setPos(x)
          ant.LEVELMARKED = true
        }
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(ant){
            if (Sim.Util.dist({x:755,y:512}, ant.getPos()) > 10)
              ok = false
            if (!ant.LEVELMARKED && ant.getLap() != 0)
              ok = false
            if (ant.getLap() >= 1000)
              ok = false
          })
          return ok
        }
        return false
      },
    },
 
    18 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1000
        Sim.Opts.SpawnWinkel = 0
        Sim.Opts.SpawnRadius = 100
        Sim.Opts.AnfangsRichtung = 90
      },
      create : function(){
        defaultLevelCreate()
      },
      onSpawn : function(ant){
        if (Sim.cycles >= 340) {
          ant.LEVELMARKED = true
        }
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(ant){
            if (ant.LEVELMARKED && ant.getHeading() != 270)
              ok = false
            if (!ant.LEVELMARKED && ant.getHeading() != 90)
              ok = false
          })
          return ok
        }
        return false
      },
    },
 
    19 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1000
      },
      create : function(){
        defaultLevelCreate()
        Sim.Bus.emit('set-ring', {x:455,y:512}, 0x0000aa, {inner:190,outer:200})
      },
      onSpawn : function(ant){
        var angle = Sim.rng()*360
        var dist = Sim.rng()*300 + 70
        if (dist < 210 && dist > 180)
          dist = 180
        var x = {x:455,y:512}
        var y = Sim.Util.moveDir(x, angle, dist)
        ant.setPos(y)
        ant.reachedHome()
        if (dist <= 200)
          ant.LEVELMARKED = true
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(ant){
            if (ant.LEVELMARKED && (ant.getLap() > 0 || Sim.Util.dist(ant.getPos(), Sim.hills[0])<60))
              ok = false
            if (!ant.LEVELMARKED && Sim.Util.dist(ant.getPos(), Sim.hills[0]) > 200)
              ok = false
          })
          return ok
        }
        return false
      },
    },
 
    20 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1000
      },
      create : function(){
        defaultLevelCreate()
        function diffx() { return Sim.rng()*40-20+855 }
        Sim.sugars.push(new Sim.Sugar({x:diffx(),y:780}))
        Sim.sugars.push(new Sim.Sugar({x:diffx(),y:500}))
        Sim.sugars.push(new Sim.Sugar({x:diffx(),y:330}))
      },
      onSpawn : function(ant){
        ant.setPos({x:455+400,y:512+400})
        ant.reachedHome()
      },
      isDone : function(){
        if (Sim.ants.length == 20) {
          var ok = true
          Sim.ants.forEach(function(ant){
            var distance = Sim.Util.dist(ant.getPos(), Sim.sugars[1].getPos())
            if (distance > 10) ok = false
          })
          return ok
        }
        return false
      },
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
  
  function onAntSpawn(ant) {
    if (l.onSpawn) l.onSpawn(ant)
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
    onAntSpawn : onAntSpawn,
  }

})(AntIT._rawsim)
