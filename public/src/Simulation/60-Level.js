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
  
  function AntTest(pos) {
    var ypos = pos.y
    function println(text, color) {
      Sim.Bus.emit('draw-text', {text:text, pos: {x:pos.x,y:ypos}, nocenter:true, color:color})
      ypos += 30
    }
    
    var nextTick = 0
    var nextF = undefined
    
    this.update = function() {
      if (nextF) {
        if (nextTick <= Sim.cycles) {
          nextTick = 0
          var t= nextF
          nextF = undefined
          t()
        }
      }
    }
    
    function delay(f, ticks) {
      nextTick = Sim.cycles + ticks
      nextF = f
    }
    
    var tests = []
    
    this.addTest = function(test) {
      tests.push(test)
    }
    
    var done = false
    var started = false
    
    this.isDone = function() {
      return done
    }
    
    function doTests(){
      var cur = tests.pop()
      if (cur) {
        var result
        if (typeof cur.userFunc != "function") {
          result = "[Funktion nicht gefunden]"
        } else {
          try {
            result = cur.userFunc.apply(null, cur.params)
            if (result === undefined)
              result = "[leer]"
          } catch (e) {
            result = e + " [Fehler]"
          }
        }
        if (result === cur.expected) {
          println(cur.title + " bestanden [" + result + "]", 0x00ff00)
          delay(doTests, 40)
        } else {
          println(cur.title + " gescheitert:", 0xff0000)
          println(cur.description, 0x111111)
          println("Lösung: " + cur.expected, 0x111111)
          println("Deine Antwort: " + result, 0x111111)
          println("")
          println("gescheitert", 0xff0000)
        }
      } else {
        println("")
        println("Alles bestanden!", 0x00ff00)
        done = true
      }
    }
    
    this.start = function() {
      if (started) return
      started = true
      tests.reverse()
      delay(doTests, 40)
    }
  }
  
  function makeTestLevel(cb, offsetx){
    if (!offsetx) offsetx = 200
    return {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 10000
        Sim.Opts.AnfangsEnergie = 200
      },
      create : function() {
        defaultLevelCreate()
        Sim.Bus.emit('set-ring', locPos(offsetx,100), 0xae00ff, {inner:10, outer:20})
        //Sim.Bus.emit('draw-text', {text:"Tests gibt es hier", pos: locPos(230,100), nocenter:true, color:0x000000, key:1})
        
        Sim.lx_test = new AntTest(locPos(offsetx + 30,100))
        cb(Sim.lx_test)
        Sim.players[0].getKI().wenn("IstGeboren", function() {
          DreheZuRichtung(0)
          Gehe(offsetx)
          Drehe(-90)
          Gehe(100)
        })
        Sim.Bus.emit('set-camera', 0, 900, 200)
        
      },
      update : function() {
        if (Sim.ants[0] && Sim.Util.dist(Sim.ants[0].getPos(), locPos(offsetx,100)) < 10) {
          Sim.lx_test.start()
        }
        if (Sim.lx_test) {
          Sim.lx_test.update()
        }
      },
      isDone : function() {
        if (Sim.lx_test)
          return Sim.lx_test.isDone()
      },
    }
  }

  var levels = {
    11 : {
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
        return Sim.ants.length == 20 &&
          Sim.ants.every(function(a){ return a.hasc1 && a.hasc2 && a.hasc3 })
      }
    },
    13 : {
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
    
    15 : {
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
    
    21 : {
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
    
    23 : {
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
    
    25 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1300
        Sim.Opts.ZuckerGröße = 50
      },
      create : function(){
        defaultLevelCreate()
        var needAlert = true
        window.SetzeGift = function(){
          if (needAlert) {
            needAlert = false
            alert("Gift kann im Labyrinth nicht eingesetzt werden.")
          }
        }
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
    
    27 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 10000
        Sim.Opts.ZuckerGröße = 100
        
        var factor = 1
        
        console.log("Sehr gut, dass du hierher gefunden hast...")
        setTimeout(function(){
          console.log("Unten an der Konsole findest du eine Befehlszeile.")
          setTimeout(function(){
            console.log("Tippe dort WeitereInfos() ein und drücke auf Enter.")
            window.WeitereInfos = function(){
              delete window.WeitereInfos
              console.log("Super gemacht...")
              setTimeout(function(){
                console.log("Du bist ja schon ein richtiger Profi :)")
                setTimeout(function(){
                  console.log("Tippe als nächstes InfoObjekt ein und drücke Enter.")
                  window.InfoObjekt = {
                    lalala:123,
                    lol:4543,
                    Hinweis:"Es kann bis zu 30 Sekunden dauern, bis die nächste Nachricht erscheint."
                  }
                  setTimeout(function(){
                    delete window.InfoObjekt
                    console.log("Wir sollten uns besser kennenlernen. Schreibe mir deinen Namen. Füge ihn dazu in den Befehl MeinNameIst() ein. Wenn du Max heißt, dann würdest du schreiben: MeinNameIst(\"Max\")")
                    window.MeinNameIst = function(name) {
                      if (name != undefined && typeof name == "string" &&  name.length > 1) {
                        delete window.MeinNameIst
                        console.log("Hallo " + name + ", wie alt bist du denn? Schreibe mir das im Befehl MeinAlterIst(). Wenn du 12 Jahre alt bist, dann würdest du schreiben: MeinAlterIst(12) (Zahlen werden ohne Anführungszeichen geschrieben).")
                        window.MeinAlterIst = function(alter) {
                          delete window.MeinAlterIst
                          if (typeof alter == "number" && alter > 5 && alter < 100) {
                            console.log("Schön, du bist " + alter + " Jahre alt.")
                            setTimeout(function(){
                               console.log("Hier ist zum Schluss noch ein Rätsel:")
                               setTimeout(function(){
                                 console.log("Multipliziere dein Alter mit 3. Addiere dazu die Anzahl der Buchstaben deines Namens. Ziehe von dieser Zahl 10 ab und multipliziere das Ergebnis wieder mit drei. Sage mir die Antwort mit DieAntwortIst().")
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
 
    31 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.AnfangsEnergie = 200
      },
      create : function(){
        defaultLevelCreate()
        Sim.sugars.push(new Sim.Sugar(locPos(300, 0)))
        Sim.sugars.push(new Sim.Sugar(locPos(-300, 0)))
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 200
      }
    },
 
    33 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
        Sim.Opts.ZuckerGröße = 50
      },
      create : function(){
        defaultLevelCreate()
        var delta = 300 + Sim.rng()*20
        var y = Sim.rng()*30 - 15
        Sim.sugars.push(new Sim.Sugar(locPos(delta, y)))
        Sim.apples.push(new Sim.Apple(locPos(delta+65, y)))
        Sim.sugars.push(new Sim.Sugar(locPos(delta+65+65, y)))
        Sim.apples.push(new Sim.Apple(locPos(delta+65+65+65, y)))
        Sim.sugars.push(new Sim.Sugar(locPos(delta+65+65+65+65, y)))
        Sim.bugs.push(new Sim.Bug(locPos(delta+65+65+65+65+32, y)))
        Sim.apples.push(new Sim.Apple(locPos(delta+65+65+65+65+65, y)))
      },
      isDone : function(){
        return Sim.players[0].getDeadAnts() == 0 && Sim.cycles > 2000 && Sim.players[0].getSugar() >= 100 && Sim.players[0].getApple() >= 2
      },
      failed: function() {
        return Sim.players[0].getDeadAnts() > 0
      }
    },
    
    35 : {
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
    
    37 : {
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
    
    39 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 100
        Sim.Opts.AnfangsEnergie = 200
        AntIT.DieAntwortIst = function(x){
          if (x.toLowerCase() == "alanturing") {
            Sim.l3_done = true
          } else {
            alert("Die Antwort '" + x + "' ist falsch.")
          }
        }
      },
      create : function(){
        defaultLevelCreate()
      },
      isDone : function(){
        return Sim.l3_done
      }
    },
    
    41 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 4300
        Sim.Opts.AnfangsRichtung = 0 // notwendig, damit Gegner richtig spawnen
      },
      create : function(){
        defaultLevelCreate()
        Sim.Bus.emit('set-ring', locPos(0,0), 0xffff00, {inner:140,outer:150})
        Sim.tmp = {}
        Sim.tmp.lost = false
        Sim.tmp.nextTime = 800
        Sim.tmp.delta = 200
      },
      isDone : function(){
        return Sim.cycles >= 4200 && !Sim.tmp.lost
      },
      failed : function(){
        return Sim.tmp.lost
      },
      update : function(){
        if (Sim.tmp.nextTime-- <= 0) {
          Sim.tmp.nextTime = Sim.tmp.delta
          if (Sim.tmp.nextTime < 2)
            Sim.tmp.nextTime = 2
          Sim.tmp.delta -= 8
          //var pos = {x:1100+Sim.rng()*200,y:100+Sim.rng()*800}
          var angle = Sim.rng()*360
          var pos = Sim.Util.moveDir(locPos(0,0), angle, 450)
          var a = new Sim.Ant(pos, 1, true)
          Sim.ants.push(a)
          var angle = Sim.Util.getDir(pos, Sim.hills[0].getPos()) + (Sim.rng()*50-25)
          a.turn(angle)
        }
        Sim.ants.forEach(function(a){
          if (a.getPlayerid() == 1) {
            a.setPos(Sim.Util.moveDir(a.getPos(), a.getHeading(), 2))
            if (Sim.Util.dist(a.getPos(), Sim.hills[0].getPos()) < 149) {
              Sim.tmp.lost = true
            }
          }
        })
      }
    },
    
    43 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 3000
      },
      create : function(){
        defaultLevelCreate()
        Sim.bugs.push(new Sim.Bug(locPos(-100,-400)))
        Sim.bugs.push(new Sim.Bug(locPos(650,350)))
        Sim.bugs.push(new Sim.Bug(locPos(550,300)))
        Sim.tmp = {}
        Sim.tmp.b1 = Sim.bugs[0]
        Sim.tmp.b2 = Sim.bugs[1]
        Sim.tmp.b3 = Sim.bugs[2]
        Sim.tmp.b1.setHeading(0)
        Sim.tmp.b2.setHeading(90)
        Sim.tmp.b3.setHeading(180)
        // normal bugs
        Sim.bugs.push(new Sim.Bug(locPos(100,450)))
        Sim.bugs.push(new Sim.Bug(locPos(-350,150)))
        Sim.bugs.push(new Sim.Bug(locPos(-300,100)))
        Sim.bugs.push(new Sim.Bug(locPos(-400,-400)))
        Sim.bugs.push(new Sim.Bug(locPos(200,-250)))
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
        return Sim.players[0].getPoison() == 8
      }
    },
    
    45 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 4000
        Sim.Opts.ZuckerGröße = 500
      },
      create : function(){
        defaultLevelCreate()
        var needAlert = true
        window.SetzeGift = function(){
          if (needAlert) {
            needAlert = false
            alert("Gift kann nicht eingesetzt werden.")
          }
        }
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
      isDone : function(){
        return Sim.players[0].getSugar() >= 250
      }
    },
    
    47 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 5000
        Sim.Opts.ZuckerGröße = 100
      },
      create : function(){
        defaultLevelCreate()
        function bugify(pos) {
          for (var i = 0; i < 360; i += 45) {
            var a = new Sim.Ant(Sim.Util.moveDir(pos, i, 30), 1, true)
            Sim.ants.push(a)
          }
        }
        function getSpawnPos() {
          for (;;) {
            var angle = Sim.rng()*360
            var dist = 200 + Sim.rng()*200
            var pos = Sim.Util.moveDir(locPos(0,0), angle, dist)
            var ok = true
            Sim.sugars.forEach(function(s){
              if (Sim.Util.dist(s.getPos(), pos) < 90)
                ok = false
            })
            Sim.apples.forEach(function(a){
              if (Sim.Util.dist(a.getPos(), pos) < 90)
                ok = false
            })
            if (ok)
              return pos
          }
        }
        while (Sim.apples.length < 3) {
          var pos = getSpawnPos()
          Sim.apples.push(new Sim.Apple(pos))
          bugify(pos)
        }
        while (Sim.sugars.length < 7) {
          var pos = getSpawnPos()
          Sim.sugars.push(new Sim.Sugar(pos))
          bugify(pos)
        }
      },
      update : function(){
        Sim.ants.forEach(function(a){
          if (a.getPlayerid() == 1) {
            Sim.ants.forEach(function(b){
              if (b.getPlayerid() == 0) {
                if (Sim.Util.dist(a.getPos(), b.getPos()) < 14) {
                  b.markJobsAsOutOfDate()
                  b.addWaitJob(10)
                }
              }
            })
          }
        })
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 400 && Sim.players[0].getApple() >= 2
      },
    },
    
    49 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 2000
        Sim.Opts.AnfangsEnergie = 200
      },
      create : function(){
        defaultLevelCreate()
        Sim.l4_codeindex = 0
        function getCode() {
          return Math.floor(Sim.rng()*3) // 0 = Apple, 1 = Sugar, 2 = Bug
        }
        Sim.l4_code = [getCode(), getCode(), getCode(), getCode(), getCode()]
        for (var y = 0; y < 5; y++) {
          var pos = locPos(-50, 350 - y*50)
          if (Sim.l4_code[y] == 0) {
            Sim.apples.push(new Sim.Apple(pos))
          }
          if (Sim.l4_code[y] == 1) {
            Sim.sugars.push(new Sim.Sugar(pos))
          }
          if (Sim.l4_code[y] == 2) {
            Sim.bugs.push(new Sim.Bug(pos))
          }
          Sim.Bus.emit('draw-text', {
            text:"Nr. " + (y+1),
            pos:locPos(-110,350-y*50),
            color:0x000000
          })
        }
        Sim.Bus.emit('move-spawn-point', 0, locPos(200,0))
        Sim.Bus.emit('move-spawn-point', 1, locPos(0,-200))
        Sim.Bus.emit('move-spawn-point', 2, locPos(-200,0))
        Sim.Bus.emit('draw-text', {
          text:"Apfel",
          pos:locPos(200,-30),
          color:0x00ff00
        })
        Sim.Bus.emit('draw-text', {
          text:"Zucker",
          pos:locPos(0,-230),
          color:0xdddddd
        })
        Sim.Bus.emit('draw-text', {
          text:"Wanze",
          pos:locPos(-200,-30),
          color:0x006666
        })
      },
      update : function(){
        if (!Sim.ants[0]) return
        if (Sim.Util.dist(Sim.ants[0].getPos(), locPos(200,0)) < 15) { // Apfel
          if (!Sim.l4_c1lock) {
            if (Sim.l4_code[Sim.l4_codeindex] === 0) {
              Sim.l4_codeindex++
            } else {
              Sim.l4_codeindex = -1
            }
            Sim.l4_c1lock = true
          }
        } else {
          Sim.l4_c1lock = false
        }
        if (Sim.Util.dist(Sim.ants[0].getPos(), locPos(0,-200)) < 15) { // Zucker
          if (!Sim.l4_c2lock) {
            if (Sim.l4_code[Sim.l4_codeindex] == 1) {
              Sim.l4_codeindex++
            } else {
              Sim.l4_codeindex = -1
            }
            Sim.l4_c2lock = true
          }
        } else {
          Sim.l4_c2lock = false
        }
        if (Sim.Util.dist(Sim.ants[0].getPos(), locPos(-200,0)) < 15) { // Wanze
          if (!Sim.l4_c3lock) {
            if (Sim.l4_code[Sim.l4_codeindex] == 2) {
              Sim.l4_codeindex++
            } else {
              Sim.l4_codeindex = -1
            }
            Sim.l4_c3lock = true
          }
        } else {
          Sim.l4_c3lock = false
        }
      },
      isDone : function(){
        return Sim.l4_codeindex == 5
      },
      failed : function(){
        return Sim.l4_codeindex == -1
      }
    },
 
    51 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 5500
      },
      create : function(){
        defaultLevelCreate()
        Sim.l5_spawn = function(){
          var dist = 400
          var angle = Sim.rng()*360
          Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), angle, dist)))
        }
        Sim.l5_spawn()
      },
      update : function() {
        if (Sim.apples.length == 0)
          Sim.l5_spawn()
      },
      isDone : function(){
        return Sim.players[0].getApple() >= 10;
      },
    },
 
    53 : {
      init : function() {
        //defaultLevelInit()
        Sim.Opts.WanzenProSpieler = 0
        Sim.Opts.Runden = 5500
        Sim.Opts.SpielfeldGrundGröße = 1500000
      },
      create : function(){
        defaultLevelCreate()
      },
      failed : function(){
        return Sim.players[0].getDeadAnts() > 0
      },
      isDone : function(){
        return Sim.players[0].getPoints() >= 4000 && Sim.players[0].getDeadAnts() == 0
      },
    },
 
    55 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 2000
      },
      create : function(){
        defaultLevelCreate()
        for (var i = 0; i < 360; i += 30) {
          Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(locPos(0,0), i, 100)))
        }
      },
      failed : function(){
        if (Sim.cycles < 1500) {
          if (Sim.players[0].getSugar() > 0) {
            return true
          }
        }
      },
      isDone : function(){
        return Sim.players[0].getSugar() >= 500
      },
    },
    
    57 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 5000
        Sim.Opts.ZuckerGröße = 100
        Sim.Opts.WanzenKampfweite = 20
      },
      create : function(){
        defaultLevelCreate()
        var needAlert = true
        window.SetzeGift = function(){
          if (needAlert) {
            needAlert = false
            alert("Gift kann bei dieser Flucht nicht eingesetzt werden.")
          }
        }
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
 
    61 : makeTestLevel(function(test){
      var userFunc = function (x) {
        return Sim.Util.roundTo(Sim.players[0].getKI().exports[0].call(null, x), 5)
      }
      function addTest(title, zahl) {
        test.addTest({
          title:title + " " + zahl + "kg",
          description:"Kunde kauft " + zahl + "kg Zucker",
          expected: Sim.Util.roundTo(2.99 + 9.90 * zahl, 5),
          userFunc:userFunc,
          params:[zahl]
        })
      }
      addTest("Kleiner Einkauf", 0.5)
      addTest("Kleiner Einkauf", 1.5)
      addTest("Mittlerer Einkauf", 3.5)
      addTest("Mittlerer Einkauf", 4.5)
      addTest("Großer Einkauf", 10)
      addTest("Großer Einkauf", 20)
      addTest("Leerer Einkauf", 0)
      for (var i = 1; i <= 4; i++) {
        var number = Math.floor(Math.random()*100)
        addTest("Zufallsteinkauf " + i + " mit", number)
      }
    }),
 
    63 : makeTestLevel(function(test){
      var userFunc = function (x) {
        return Sim.players[0].getKI().exports[0].call(null, x)
      }
      function addTest(title, name) {
        test.addTest({
          title:title + " " + name,
          description:"Erzeuge Nachricht an " + name,
          expected: "Hallo " + name + ", komm bitte ins Seketariat und hole dein Formular ab.",
          userFunc:userFunc,
          params:[name]
        })
      }
      addTest("Beispiel 1", "Peter")
      addTest("Beispiel 2", "Sarah")
      addTest("Schüler 1", "Pablo")
      addTest("Schülerin 1", "Lucy")
      addTest("Schüler 2", "Wang Xi")
      addTest("Schülerin 2", "Lydia")
    }, 50),
 
    65 : makeTestLevel(function(test){
      var userFunc = function (x, y) {
        return Sim.Util.roundTo(Sim.players[0].getKI().exports[0].call(null, x, y), 5)
      }
      function addTest(title, gr, rt) {
        test.addTest({
          title:title + " (" + gr + ", " + rt + ")",
          description:"Kunde kauft  " + gr + "kg grüne Äpfel und " + rt + "kg rote Äpfel.",
          expected: Sim.Util.roundTo((gr * 6.9 + rt * 7.9 + 2.5) * 0.8, 5),
          userFunc:userFunc,
          params:[gr, rt],
        })
      }
      addTest("Beispiel 1", 0.5, 0.5)
      addTest("Beispiel 2", 3, 1.3)
      for (var i = 1; i <= 5; i++) {
        addTest("Zufälliger Kunde " + i, Sim.Util.roundTo(Math.random()*5,1), Sim.Util.roundTo(Math.random()*5,1))
      }
    }),
 
    67 : makeTestLevel(function(test){
      var userFunc = function (wort1, wort2) {
        return Sim.players[0].getKI().exports[0].call(null, wort1, wort2)
      }
      function addTest(title, wort1, wort2) {
        test.addTest({
          title:title + " (" + wort1 + ", " + wort2 + ")",
          description:"Kinder bauen Reim mit " + wort1 + " und " + wort2,
          expected:  wort1 + " " + wort2 + ", " + wort1 + " " + wort2 + " " + wort2 + ", " + wort1 + " " + wort2 + " " + wort1 + " " + wort2 + " " + wort1 + "!",
          userFunc:userFunc,
          params:[wort1, wort2],
        })
      }
      addTest("Beispiel 1", "Tee", "Toh")
      addTest("Beispiel 2", "Max", "Paul")
      var konsonanten = "BCDFGHJKLMNPQRSTVWXYZ"
      var vocale = "aeioc"
      for (var i = 1; i <= 5; i++) {
        var k = konsonanten.charAt(Math.floor(Math.random()*konsonanten.length))
        var vind = Math.floor(Math.random() * 4)
        addTest("Zufallsbeispiel " + i, k + vocale.charAt(vind), k + vocale.charAt(vind + 1))
      }
    }, 50),
 
    68 : makeTestLevel(function(test){
      var userFunc = function (x) {
        return Sim.players[0].getKI().exports[0].call(null, x)
      }
      function addTest(title, x) {
        test.addTest({
          title:title + " (x=" + x + ")",
          description:"In der linken Spalte steht " + x,
          expected: x * x + (x / 10),
          userFunc:userFunc,
          params:[x]
        })
      }
      addTest("Zeile 1", 10)
      addTest("Zeile 2", 20)
      addTest("Zeile 3", 30)
      addTest("Zeile 4", 40)
      addTest("Zeile 5", 50)
      for (var i = 1; i <= 5; i++) {
        addTest("Zufallstest " + i, Math.floor(Math.random() * 90 + 10) * 10)
      }
    }),
 
    69 : makeTestLevel(function(test){
      var userFunc = function (t, p) {
        return Sim.players[0].getKI().exports[0].call(null, t, p)
      }
      function addTest(title, t, p) {
        test.addTest({
          title:title + " (" + t + ", " + p + ")",
          description:"Die Messstation liefert die Werte " + t + " und " + p,
          expected: "Temp.: " + ((t-32)/1.8) + "C/" + t + "F|Druck: " + p + "hPa",
          userFunc:userFunc,
          params:[t, p]
        })
      }
      addTest("Beispiel", 50, 1023)
      addTest("Normaler Tag", 77, 1011)
      addTest("Heißer Tag", 86, 1039)
      addTest("Kalter Tag", 5, 994)
    }, 50),
 
    71 : makeTestLevel(function(test){
      var userFunc = function (mbs) {
        return Sim.Util.roundTo(Sim.players[0].getKI().exports[0].call(null, mbs), 5)
      }
      function solution(mbs) {
        return Math.min(41.99, Math.max(2.99, 2.99 + (mbs-50)*0.02))
      }
      
      function addTest(title, mbs) {
        test.addTest({
          title:title + " (" + mbs + " MB)",
          description:"Der Benutzer hat " + mbs + " MB im Monat verbraucht.",
          expected: Sim.Util.roundTo(solution(mbs), 5),
          userFunc:userFunc,
          params:[mbs]
        })
      }
      addTest("Beispiel 1", 51, 3.01)
      addTest("Beispiel 2", 100, 3.99)
      addTest("Wenig Verbrauch", 4, 2.99)
      addTest("Viel Verbrauch", 2100, 41.99)
      addTest("An der Grenze unten", 50, 2.99)
      addTest("An der Grenze oben", 1999, 41.97)
      for (var i = 1; i <= 4; i++) {
        addTest("Zufallstest " + i, Math.floor(Math.random() * 3000))
      }
    }),
 
    73 : makeTestLevel(function(test){
      var userFunc = function (pkt) {
        return Sim.players[0].getKI().exports[0].call(null, pkt)
      }
      function solution(pkt) {
        if (pkt < 60)
          return "Nicht bestanden."
        if (pkt < 120)
          return "Ausreichend"
        if (pkt < 150)
          return "Gut"
        if (pkt < 180)
          return "Sehr gut!"
        return "Exzellent!"
      }
      
      function addTest(title, pkt) {
        test.addTest({
          title:title + " (" + pkt + " Punkte)",
          description:"Der Kandidat hat " + pkt + " Punkte in der Prüfung erreicht.",
          expected: solution(pkt),
          userFunc:userFunc,
          params:[pkt]
        })
      }
      addTest("Kandidat 1", 30)
      addTest("Kandidat 2", 60)
      addTest("Kandidat 3", 119)
      addTest("Kandidat 4", 140)
      addTest("Kandidat 5", 150)
      addTest("Kandidat 6", 180)
      for (var i = 1; i <= 5; i++) {
        addTest("Zufallskandidat " + i, Math.floor(Math.random() * 200))
      }
    }),
 
    75 : makeTestLevel(function(test){
      var userFunc = function (name, alter, geschlecht) {
        return Sim.players[0].getKI().exports[0].call(null, name, alter, geschlecht)
      }
      function solution(name, alter, geschlecht) {
        return "Liebe" + (geschlecht=="männlich"?"r":"") + " " + name + ", wir wünschen dir alles Gute zum " + alter + ". Geburtstag!"
      }
      
      function addTest(title, name, alter, geschlecht) {
        test.addTest({
          title:title,
          description:"Name: " + name + ", Alter: " + alter + ", Geschlecht: " + geschlecht,
          expected: solution(name, alter, geschlecht),
          userFunc:userFunc,
          params:[name, alter, geschlecht]
        })
      }
      addTest("Beispiel 1", "Thomas", 16, "männlich")
      addTest("Beispiel 2", "Stella", 12, "weiblich")
      addTest("Gruß 1", "Markus", 13, "männlich")
      addTest("Gruß 2", "Luca", 15, "weiblich")
      addTest("Gruß 3", "Alix", 17, "weiblich")
    }, 50),
 
    77 : makeTestLevel(function(test){
      var userFunc = function (sp1, sp2) {
        return Sim.players[0].getKI().exports[0].call(null, sp1, sp2)
      }
      function solution(sp1, sp2) {
        var code = ["Stachel", "Stock", "Blüte"]
        var result = (code.indexOf(sp1) + code.indexOf(sp2) * 2) % 3
        if (result == 0)
          return "Unentschieden"
        else
          return "Spieler " + result + " gewinnt!"
      }
      
      function addTest(title, sp1, sp2) {
        test.addTest({
          title:title + " (" + sp1 + " vs " + sp2 + ")",
          description: "Es wurde " + sp1 + " gegen " + sp2 + " gespielt.",
          expected: solution(sp1, sp2),
          userFunc:userFunc,
          params:[sp1, sp2]
        })
      }
      addTest("Beispiel 1", "Stachel", "Blüte")
      addTest("Beispiel 2", "Blüte", "Stock")
      addTest("Beispiel 3", "Stock", "Stachel")
      addTest("Gleiches Zeichen 1", "Stachel", "Stachel")
      addTest("Gleiches Zeichen 2", "Stock", "Stock")
      addTest("Gleiches Zeichen 3", "Blüte", "Blüte")
      addTest("Beispiel 1b", "Blüte", "Stachel")
      addTest("Beispiel 2b", "Stock", "Blüte")
      addTest("Beispiel 3b", "Stachel", "Stock")
    }, 100),
 
    78 : makeTestLevel(function(test){
      var userFunc = function (L, G, K, S, Z) {
        return Sim.players[0].getKI().exports[0].call(null, L, G, K, S, Z)
      }
      function solution(L, G, K, S, Z) {
        var c1 = G > 0 && K > 0
        var c2 = S > 0 || Z > 0
        var c3 = S > 0 && Z > 0
        return L > 25 || (L > 17 && (c1 || c2)) || (L > 11 && c1 && c2) || (L > 7 && c1 && c3)
      }
      
      function addTest(title, L, G, K, S, Z) {
        test.addTest({
          title:title + " (" + L + ", " + G + ", " + K + ", " + S + ", " + Z + ")",
          description: "Das Passwort ist " + L + " Zeichen lang mit " + G + " Großbuchstaben, " + K + " Kleinbuchstaben, " + S + " Sonderzeichen und " + Z + " Ziffern.",
          expected: solution(L, G, K, S, Z),
          userFunc:userFunc,
          params:[L, G, K, S, Z]
        })
      }
      function analyse(pwd) {
        var l = pwd.length
        var g = (pwd.match(/[A-Z]/g) || []).length
        var k = (pwd.match(/[a-z]/g) || []).length
        var z = (pwd.match(/[0-9]/g) || []).length
        var s = l - g - k - z
        addTest(pwd, l, g, k, s, z)
      }
      analyse("abc123")
      analyse("Schalke04!")
      analyse("?rVR,@qD&6TC!{erF")
      analyse("lala123") // zu kurz
      analyse("kaffeepause") // zu wenige Varianten
      analyse("3L!TeHkr") // ok
      analyse("MaxMustermann") // zu wenige Varianten
      analyse("PaulSuperschlau!") // ok
      analyse("BestPassword03") // ok
      analyse("LoLroflasdfghjklqw") // ok
      analyse("QWERTZUIOPASDFGHJKL") // zu wenige Varianten
      analyse("mnbvcxylkjhgfdsapoiuztrewq") // ok
    }, 100),
 
    79 : makeTestLevel(function(test){
      var userFunc = function (erw, kin) {
        return Sim.players[0].getKI().exports[0].call(null, erw, kin)
      }
      function solution(erw, kin) {
        if (kin >= 20) {
          return Math.max(0, (erw-2) * 8 + kin * 3)
        }
        if (erw + kin >= 10) {
          return erw * 9 + kin * 5
        }
        return erw * 11 + kin * 6
      }
      
      function addTest(title, erw, kin) {
        test.addTest({
          title:title + " (" + erw + " Erw, " + kin + " Kin)",
          description:erw + " Erwachsene und " + kin + " Kinder besuchen das Museum.",
          expected: solution(erw, kin),
          userFunc:userFunc,
          params:[erw, kin]
        })
      }
      addTest("Einzelpersonen", 1, 0)
      addTest("Einzelpersonen", 2, 2)
      addTest("Einzelpersonen", 5, 4)
      addTest("Gruppe", 4, 6)
      addTest("Gruppe", 15, 10)
      addTest("Gruppe", 5, 19)
      addTest("Klasse", 2, 20)
      addTest("Klasse", 4, 25)
      addTest("Klasse", 6, 45)
    }, 100),
 
    81 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 3000
      },
      create : function(){
        defaultLevelCreate()
        Sim.l8_checkpoints = []
        for (var i = 0; i < 20; i++) {
          Sim.l8_checkpoints.push(Sim.Util.moveDir(locPos(0, 0), i * 18, 200))
        }
        Sim.l8_checkpoints.forEach(function(pos, id) {
          Sim.Bus.emit('move-spawn-point', id, pos)
        })
      },
      update : function(){
      },
      isDone : function(){
        return Sim.l8_checkpoints.every(function(pos) {
          return Sim.ants.some(function(ant){
            return Sim.Util.dist(ant.getPos(), pos) < 3
          })
        })
      }
    },
 
    83 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 3000
      },
      create : function(){
        defaultLevelCreate()
        Sim.l8_checkpoints = []
        let x = 100
        let y = 10
        for (var i = 0; i < 20; i++) {
          Sim.l8_checkpoints.push(Sim.Util.moveDir(locPos(0, 0), 0, x))
          x += y
          y += 3
        }
        Sim.l8_checkpoints.forEach(function(pos, id) {
          Sim.Bus.emit('move-spawn-point', id, pos)
        })
      },
      update : function(){
      },
      isDone : function(){
        return Sim.l8_checkpoints.every(function(pos) {
          return Sim.ants.some(function(ant){
            return Sim.Util.dist(ant.getPos(), pos) < 3
          })
        })
      }
    },
 
    85 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 3000
      },
      create : function(){
        defaultLevelCreate()
        Sim.l8_checkpoints = []
        let x = 100
        let y = 10
        for (var i = 0; i < 20; i++) {
          Sim.l8_checkpoints.push(Sim.Util.moveDir(locPos(0, 0), 45 + i * 18, x))
          x += y
          y += 3
        }
        Sim.l8_checkpoints.forEach(function(pos, id) {
          Sim.Bus.emit('move-spawn-point', id, pos)
        })
      },
      update : function(){
      },
      isDone : function(){
        return Sim.l8_checkpoints.every(function(pos) {
          return Sim.ants.some(function(ant){
            return Sim.Util.dist(ant.getPos(), pos) < 3
          })
        })
      }
    },
 
    87 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 3000
      },
      create : function(){
        defaultLevelCreate()
        var curX = 90
        var dir = 2
        
        Sim.l8_ok = 0
        Sim.l8_fail = 0
        
        var orig = window.SetzeGift
        window.SetzeGift = function(){
          orig().then(function() {
            var x = Sim.Util.getDir(locPos(0,0), Sim.API.curAnt.getPos())
            
            if (Math.abs(x-curX)<3) Sim.l8_ok++
            else Sim.l8_fail++
            
            if (curX > 135) dir = -2
            if (curX < 45) dir = 2
            curX += dir
          })
        }
      },
      update : function(){
      },
      isDone : function(){
        var sum = Sim.l8_ok + Sim.l8_fail
        var okrate = Sim.l8_ok / sum
        if (sum > 250 && okrate > 0.8) {
          console.log(okrate)
          return true
        }
        return false
      }
    },
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
    993 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Testergebnis")[0]
      function lösung(p) {
        if (p > 80 || p < 0) {
          return "Ungültige Punktzahl"
        }
        if (p >= 65) {
          return "summa cum laude"
        }
        if (p >= 50) {
          return "cum laude"
        }
        if (p >= 35) {
          return "rite"
        } else {
          return "non probatum"
        }
      }
      
      function addTest(title, zahl) {
        test.addTest({
          title:title + " (" + zahl + ")",
          description:"Teste das Prüfungsergebnis " + zahl,
          expected:lösung(zahl),
          userFunc:userFunc,
          params:[zahl]
        })
      }
      addTest("Zu kleine Punktzahl", -1)
      addTest("Zu hohe Punktzahl", 81)
      addTest("Test 1", 75)
      addTest("Test 2", 60)
      addTest("Test 3", 40)
      addTest("Test 4", 10)
      addTest("Randfall 1", 65)
      addTest("Randfall 2", 64)
      addTest("Randfall 3", 50)
      addTest("Randfall 4", 49)
      addTest("Randfall 5", 35)
      addTest("Randfall 6", 34)
    }),
 
    965 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Spiel")[0]
      function solution(a, b) {
        if (a == b)
          return "Unentschieden"
        if ((a == "Stein" && b == "Schere") ||
            (a == "Schere" && b == "Papier") ||
            (a == "Papier" && b == "Stein"))
          return "Spieler A gewinnt"
        else
          return "Spieler B gewinnt"
      }
      function addTest(title, a, b) {
        test.addTest({
          title:title + " [" + a + " vs " + b + "]",
          description:"Spieler A zeigt " + a + " und Spieler B zeigt " + b,
          expected:solution(a, b),
          userFunc:userFunc,
          params:[a, b]
        })
      }
      addTest("Gleichstand 1", "Schere", "Schere")
      addTest("Gleichstand 2", "Stein", "Stein")
      addTest("Gleichstand 3", "Papier", "Papier")
      addTest("A gewinnt 1", "Schere", "Papier")
      addTest("A gewinnt 2", "Stein", "Schere")
      addTest("A gewinnt 3", "Papier", "Stein")
      addTest("B gewinnt 1", "Papier", "Schere")
      addTest("B gewinnt 2", "Schere", "Stein")
      addTest("B gewinnt 3", "Stein", "Papier")
    }),
 
    967 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Statistik")[0]
      function solution(art, a, b) {
        if (art == "Minimum")
          return a < b ? a : b
        if (art == "Maximum")
          return a > b ? a : b
        if (art == "Summe")
          return a + b
        if (art == "Durchschnitt")
          return (a + b) / 2
      }
      function addTest(title, art, a, b) {
        test.addTest({
          title:title + " (" + art + ", " + a + ", " + b + ")",
          description:"Führe die Operation  '" + art + "' auf den Zahlen " + a + " und " + b + " aus",
          expected:solution(art, a, b),
          userFunc:userFunc,
          params:[art, a, b]
        })
      }
      addTest("Summe 1", "Summe", 10, 20)
      addTest("Summe 2", "Summe", -4.5, 7.24)
      addTest("Durchschnitt 1", "Durchschnitt", 4, 10)
      addTest("Durchschnitt 2", "Durchschnitt", 25, -40)
      addTest("Minimum 1", "Minimum", 0, 4)
      addTest("Minimum 2", "Minimum", 3, 2)
      addTest("Minimum 3", "Minimum", -3, -3)
      addTest("Maximum 1", "Maximum", 543, 444)
      addTest("Maximum 2", "Maximum", -23, -21)
      addTest("Maximum 3", "Maximum", 0, 0)
      for (var i = 0; i < 4; i++) {
        addTest("Zufallsbeispiel " + (i+1),
                ["Summe", "Durchschnitt", "Minimum", "Maximum"][Math.floor(Sim.rng()*4)],
                Math.round(Sim.rng()*100-50),
                Math.floor(Sim.rng()*100-50))
      }
    }),
 
    971 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Rechenmaschine")[0]
      function solution(ns, m) {
        if (m == "A") {
          return ns[0] + ns[1] + ns[2]
        }
        if (m == "B") {
          return ns[3] - ns[1]
        }
        if (m == "C") {
          return ns[3] * ns[4]
        }
      }
      function addTest(title, arr, m) {
        test.addTest({
          title:title + " ([" + arr.join(",") + "] / " + m + ")",
          description:"Führe Vorschrift " + m + " auf [" + arr + "] aus.",
          expected:solution(arr, m),
          userFunc:userFunc,
          params:[arr, m]
        })
      }
      addTest("Beispiel A", [2, 3, 4.5, 1, 2], "A")
      addTest("Beispiel B", [2, 3, 4.5, 1, 2], "B")
      addTest("Beispiel C", [2, 3, 4.5, 1, 2], "C")
      function numGen(nd, sm){
        var diff = !nd?Math.floor(Sim.rng()*8)/8:0
        return Math.floor(sm?Sim.rng()*10+2:Sim.rng()*100-50) + diff
      }
      var arr = [numGen(), numGen(true, true), numGen(), numGen(), numGen(true, true)]
      addTest("Zufall 1 A", arr.slice(0), "A")
      addTest("Zufall 1 B", arr.slice(0), "B")
      addTest("Zufall 1 C", arr.slice(0), "C")
      var arr2 = [numGen(), numGen(true, true), numGen(), numGen(), numGen(true, true)]
      addTest("Zufall 2 A", arr2.slice(0), "A")
      addTest("Zufall 2 B", arr2.slice(0), "B")
      addTest("Zufall 2 C", arr2.slice(0), "C")
    }),
 
    973 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Check")[0]
      function solution(arr) {
        if (arr.length == 0)
          return "Array ist leer"
        if (arr.length == 1)
          return "Array besteht aus genau einem Element"
        else
          return arr.length
      }
      function addTest(title, arr) {
        test.addTest({
          title:title + " (" + arr.length + ")",
          description:"Teste ein Array der Länge " + arr.length,
          expected:solution(arr),
          userFunc:userFunc,
          params:[arr]
        })
      }
      addTest("Leeres Array", [])
      addTest("Array mit einem Element", [4])
      addTest("Großes Array 1", [4,5,6,7,8,9])
      addTest("Großes Array 2", [1,2,3,4,5,6,7,8,9,10])
      addTest("Großes Array 3", [1,2,4,5,7,8,1,2,4,5,7,8,1,2,6,7,9,8,9])
      for (var i = 0; i < 4; i++) {
        var arr = []
        arr.length = Math.floor(Sim.rng()*40)
        addTest("Zufallstest " + (i+1), arr)
      }
    }),
 
    975 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Mittelwert")[0]
      var buffer = [0,0,0,0]
      function solution(x) {
        buffer.push(x)
        buffer.shift()
        return (buffer[0] + buffer[1] + buffer[2] + buffer[3]) / 4
      }
      function addTest(title, x) {
        test.addTest({
          title:title + " (füge " + x + " hinzu)",
          description:"Füge neuen Datenpunkt " + x + " hinzu.",
          expected:solution(x),
          userFunc:userFunc,
          params:[x]
        })
      }
      addTest("Beispiel 1", 4)
      addTest("Beispiel 2", 8)
      addTest("Beispiel 3", 6)
      addTest("Neuer Wert 1", 6)
      addTest("Neuer Wert 2", 16)
      addTest("Neuer Wert 3", 18)
      addTest("Neuer Wert 4", 24)
      for (var i = 0; i < 6; i++) {
        addTest("Zufallswert " + (i+1), Math.floor(Sim.rng()*100))
      }
    }),
 
    977 : makeTestLevel(function(test){
      var userFunc1 = Sim.players[0].getKI().Bus.getHandler("#Anfrage")[0]
      var userFunc2 = Sim.players[0].getKI().Bus.getHandler("#Besuch")[0]
      var list = []
      function add(name) {
        if (list.length < 4) {
          list.push(name)
          return "Okay"
        } else
          return "Besucherliste leider voll"
      }
      function visit(name) {
        if (list[0] == name) {
          list.shift()
          return "Herzlich Willkommen"
        } else {
          return "Leider nicht angemeldet"
        }
      }
      function addTest1(title, name) {
        test.addTest({
          title:title + " (Anfrage " + name + ")",
          description:"Neue Anfrage von " + name,
          expected:add(name),
          userFunc:userFunc1,
          params:[name]
        })
      }
      function addTest2(title, name) {
        test.addTest({
          title:title + " (Besuch " + name + ")",
          description:"Person " + name + " ist zu Besuch",
          expected:visit(name),
          userFunc:userFunc2,
          params:[name]
        })
      }
      addTest1("Beispiel 1", "Thomas Hook")
      addTest1("Beispiel 2", "Fabian Taggart")
      addTest2("Beispiel 3", "Thomas Hook")
      addTest2("Beispiel 4", "Max Müller")
      addTest1("Viele Anfragen 1", "Gabriel Tall")
      addTest1("Viele Anfragen 2", "Moritz West")
      addTest1("Viele Anfragen 3", "Hagen Murr")
      addTest1("Viele Anfragen 4", "Timon Rust")
      addTest1("Viele Anfragen 5", "John Galt")
      addTest2("Viele Besucher 1", "Fabian Taggart")
      addTest2("Viele Besucher 2", "Timon Rust")
      addTest2("Viele Besucher 3", "Gabriel Tall")
      addTest2("Viele Anfragen 4", "Hagen Murr")
      addTest2("Viele Anfragen 5", "Moritz West")
      addTest2("Viele Anfragen 6", "Hagen Murr")
      addTest2("Viele Anfragen 7", "Max Müller")
      
    }),
 
    979 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Rechenmaschine")[0]
      function solution(ns, m) {
        if (m == "A") {
          return ns[0] + ns[1] + ns[2]
        }
        if (m == "B") {
          return ns[3] - ns[1]
        }
        if (m == "C") {
          return ns[3] * ns[4]
        }
        if (m == "D") {
          return ns[0] * ns[1] * ns[2] * ns[3] / ns[4]
        }
        if (m == "E") {
          return Math.round(ns[2])
        }
        if (m == "F") {
          return Math.pow(ns[0], ns[1])
        }
      }
      function addTest(title, arr, m) {
        test.addTest({
          title:title + " ([" + arr.join(",") + "] / " + m + ")",
          description:"Führe Vorschrift " + m + " auf [" + arr + "] aus.",
          expected:solution(arr, m),
          userFunc:userFunc,
          params:[arr, m]
        })
      }
      addTest("Beispiel A", [2, 3, 4.5, 1, 2], "A")
      addTest("Beispiel B", [2, 3, 4.5, 1, 2], "B")
      addTest("Beispiel C", [2, 3, 4.5, 1, 2], "C")
      addTest("Beispiel D", [2, 3, 4.5, 1, 2], "D")
      addTest("Beispiel E", [2, 3, 4.5, 1, 2], "E")
      addTest("Beispiel F", [2, 3, 4.5, 1, 2], "F")
      function numGen(nd, sm){
        var diff = !nd?Math.floor(Sim.rng()*8)/8:0
        return Math.floor(sm?Sim.rng()*10+2:Sim.rng()*100-50) + diff
      }
      var arr = [numGen(), numGen(true, true), numGen(), numGen(), numGen(true, true)]
      addTest("Zufall A", arr.slice(0), "A")
      addTest("Zufall B", arr.slice(0), "B")
      addTest("Zufall C", arr.slice(0), "C")
      addTest("Zufall D", arr.slice(0), "D")
      addTest("Zufall E", arr.slice(0), "E")
      addTest("Zufall F", arr.slice(0), "F")
    }),
 
    981 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 2000
      },
      create : function(){
        defaultLevelCreate()
        var sugar = Sim.Util.moveDir(locPos(0,0), Sim.rng()*360, 200 + Sim.rng()*200)
        Sim.sugars.push(new Sim.Sugar(sugar))
        var hill = locPos(0,0)
        Sim.l8_mid = {x:(sugar.x+hill.x)/2,y:(sugar.y+hill.y)/2}
        Sim.Bus.emit('move-spawn-point', 0, Sim.l8_mid)
      },
      isDone : function(){
        return Sim.ants.length == 20 &&
          Sim.ants.every(function(a){ return Sim.Util.dist(a.getPos(), Sim.l8_mid) < 10})
      }
    },
 
    982 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 2000
      },
      create : function(){
        defaultLevelCreate()
        var d1 = Sim.rng()*90
        var d2 = Sim.rng()*90 + 120
        var d3 = Sim.rng()*90 + 240
        Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), d1, 250 + Sim.rng()*150)))
        Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), d2, 250 + Sim.rng()*150)))
        Sim.apples.push(new Sim.Apple(Sim.Util.moveDir(locPos(0,0), d3, 250 + Sim.rng()*150)))
        Sim.Bus.emit('set-ring', locPos(0,0), 0x00aa00, {inner:195,outer:205})
      },
      isDone : function(){
        return Sim.apples.length == 3 && Sim.apples.every(function(a){
          var dist = Sim.Util.dist(a.getPos(), locPos(0,0))
          return dist >= 195 && dist <= 205
          
        })
      },
      failed : function(){
        return Sim.apples.length != 3
      }
    },
 
    983 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 2000
        Sim.Opts.AnfangsEnergie = 1200
      },
      create : function(){
        defaultLevelCreate()
        var basedist = 150 + Sim.rng()*280
        Sim.l8_bugs = []
        for (var i = 0; i < 5; i++) {
          var bug = new Sim.Bug(locPos(
            basedist + i*110 + (Sim.rng()*30-15),
            (Sim.rng()*10+20)*(Math.floor(Sim.rng()*2)*2-1)))
          if (i != 2)
            Sim.l8_bugs.push(bug)
          Sim.bugs.push(bug)
        }
      },
      isDone : function(){
        return Sim.cycles > 1000 && Sim.bugs.length == 4 && Sim.bugs.every(function(b){
          return Sim.l8_bugs.indexOf(b) >= 0
        })
      },
      failed : function() {
        return Sim.bugs.length < 4
      },
    },
 
    984 : {
      init : function(){
        defaultLevelInit()
        Sim.Opts.Runden = 2000
        Sim.Opts.AnfangsEnergie = 200
        
      },
      create : function(){
        defaultLevelCreate()
        var cps = [locPos(200,0), locPos(-200,0), locPos(0,200), locPos(0,-200)]
        var sum = 0
        cps.forEach(function(cp){
          var number = 5 + Math.floor(Sim.rng()*20)
          sum += number
          for (var i = 0; i < number; i++) {
            Sim.sugars.push(new Sim.Sugar(Sim.Util.moveDir(cp, Sim.rng()*360, 20 + Sim.rng()*20)))
          }
          Sim.Bus.emit('move-spawn-point', sum, cp)
        })
        Sim.l8_result = sum
        Sim.Bus.emit('draw-text', {
          text:sum + " Zucker",
          pos:locPos(200,200),
          color:0xabcd00
        })
      },
      isDone : function(){
        return Sim.l8_done
      },
      failed : function(){
        if (Sim.l8_fail) {
          alert("Antwort war leider falsch")
        }
        return Sim.l8_fail
      },
      preload : function(){
        var origAlert = window.alert
        window.alert = function(x){
          if (Sim.l8_result) {
            if (x == Sim.l8_result) {
              Sim.l8_done = true
            } else {
              Sim.l8_fail = true
            }
          }
          origAlert(x)
        }
      }
    },
 
    991 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 1500
      },
      create : function(){
        defaultLevelCreate()
        Sim.Bus.emit('draw-text', {text:"Hallo"})
        Sim.Bus.emit('set-ring', locPos(0,0), 0x0000aa, {inner:245,outer:247})
        var targetAngle = Math.floor(Sim.rng()*12)*30
        for (var i = 0; i < 360; i += 30) {
          var dist = Sim.rng()*100 + 200
          if (targetAngle == i)
            dist = 245
          else {
            if (dist > 225 && dist < 265)
              dist = 225
          }
          var apple = new Sim.Apple(Sim.Util.moveDir(locPos(0,0), i, dist))
          if (dist == 245)
            apple.l5_ok = true
          Sim.apples.push(apple)
        }
      },
      failed : function() {
        var failed = false
        Sim.ants.forEach(function(ant){
          Sim.apples.forEach(function(apple){
            if (!apple.l5_ok && Sim.Util.dist(ant.getPos(), apple.getPos()) < 10) {
              failed = true
            }
          })
        })
        return failed
      },
      isDone : function(){
        return Sim.players[0].getApple() == 1;
      },
    },
 
    /*20 : {
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
    },*/
  }
  
  var l = Sim.Opts.Level ? levels[Sim.Opts.Level] : undefined
  
  if (l && l.preload) l.preload()

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
      if (isDone()) {
        Sim.Bus.emit('submit-level')
        Sim.cycles = Infinity
      }
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
