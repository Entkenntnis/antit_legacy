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
          result = "Keine Antwort abgegeben."
        } else {
          try {
            result = cur.userFunc.apply(null, cur.params)
          } catch (e) {
            result = e + " [Fehler]"
          }
        }
        if (result === cur.expected) {
          println(cur.title + " bestanden", 0x00ff00)
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
  
  function makeTestLevel(cb){
    return {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 10000
        Sim.Opts.AnfangsEnergie = 200
      },
      create : function() {
        defaultLevelCreate()
        Sim.Bus.emit('set-ring', locPos(200,100), 0xae00ff, {inner:10, outer:20})
        Sim.Bus.emit('draw-text', {text:"Aufgaben gibt es hier", pos: locPos(230,100), nocenter:true, color:0x000000, key:1})
        
        Sim.lx_test = new AntTest(locPos(230,50))
        cb(Sim.lx_test)
        
      },
      update : function() {
        if (Sim.ants[0] && Sim.Util.dist(Sim.ants[0].getPos(), locPos(200,100)) < 10) {
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
                        console.log("Hallo " + name + ", wie alt bist du denn? Schreibe mir das im Befehl \"MeinAlterIst()\". Wenn du 12 Jahre alt bist, dann würdest du schreiben: \"MeinAlterIst(12)\" (Zahlen werden ohne Anführungszeichen geschrieben).")
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
    
    31 : {
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
    
    33 : {
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
    
    35 : {
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
    
    37 : {
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
    
    41 : {
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
    
    43 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 4300
        Sim.Opts.AnfangsRichtung = 0
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
          var angle = Sim.Util.getDir(pos, Sim.hills[0].getPos())
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
    
    45 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 6000
      },
      create : function(){
        defaultLevelCreate()
        Sim.l4_spawn = function(){
          var tries = 100
          while (tries-- > 0) {
            var angle = Sim.rng()*120 - 60
            var dist = Sim.rng()*250 + 200
            var pos = Sim.Util.moveDir(locPos(0,0), angle, dist)
            var free = true
            Sim.apples.forEach(function(a){
              if (Sim.Util.dist(a.getPos(), pos) < 50)
                free = false
            })
            if (!free)
              continue;
            Sim.apples.push(new Sim.Apple(pos))
            break;
          }
        }
        while (Sim.apples.length < 5) {
          Sim.l4_spawn()
        }
        Sim.l4_nexttime = 400
        Sim.l4_nextnoise = 100
        Sim.Bus.emit('draw-plane', locPos(845,0), 90, 1000, 0x00aa00)
      },
      update : function(){
        if (Sim.apples.length < 7 && Sim.l4_nexttime-- <= 0) {
          Sim.l4_nexttime = 200
          Sim.l4_spawn()
        }
        if (Sim.l4_nextnoise-- <= 0) {
          Sim.l4_nextnoise = Math.min(3, Math.ceil(60 / Sim.ants.length))
          var ant = Sim.ants[Math.floor(Sim.rng()*Sim.ants.length)]
          if (ant.isSensing()) {
            var pos = locPos(Sim.rng()*90+800,Sim.rng()*1000-500)
            Sim.API.setAnt(ant)
            Sim.API.callUserFunc("SiehtApfel", [{getPos:function(){return pos}}])
            Sim.API.close()
          }
        }
      },
      isDone : function(){
        return Sim.players[0].getApple() >= 25
      }
    },
    
    47 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 4200
        Sim.Opts.ZuckerGröße = 100
      },
      create : function(){
        defaultLevelCreate()
        function bugify(pos) {
          for (var i = 0; i < 360; i += 45) {
            Sim.bugs.push(new Sim.Bug(Sim.Util.moveDir(pos, i, 30)))
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
      isDone : function(){
        return Sim.players[0].getSugar() >= 400 && Sim.players[0].getApple() >= 2
      },
    },
    
    49 : {
      init : function() {
        defaultLevelInit()
        Sim.Opts.Runden = 30000
      },
      create : function(){
        defaultLevelCreate()
        Sim.Bus.emit('move-spawn-point', 0, locPos(200,0))
        Sim.Bus.emit('move-spawn-point', 1, locPos(-200,0))
        Sim.Bus.emit('move-spawn-point', 2, locPos(0,-200))
        Sim.Bus.emit('move-spawn-point', 3, locPos(0,200))
        Sim.l4_key1 = Math.floor(Sim.rng()*4)+1
        Sim.l4_key2 = Math.floor(Sim.rng()*4)+1
        Sim.l4_key3 = Math.floor(Sim.rng()*4)+1
        Sim.l4_key4 = Math.floor(Sim.rng()*4)+1
        Sim.l4_done = false
      },
      update : function(){
        function addToKey(ant, cpnum) {
          if (!ant.l4_key)
            ant.l4_key = []
          ant.l4_key.push(cpnum)
          console.log("Ameise " + ant.getKey() + " hat Code " + ant.l4_key.join(","))
          if (ant.l4_key.length >= 4) {
            var k = ant.l4_key
            if (k[0] == Sim.l4_key1 && k[1] == Sim.l4_key2 && k[2] == Sim.l4_key3 && k[3] == Sim.l4_key4) {
              alert("Eingabe " + k.join(",") + " ist richtig!")
              Sim.l4_done = true
            } else {
              console.log(">>>>>>>Eingabe: " + ant.l4_key.join(",") + " ist falsch")
            }
            ant.l4_key = []
          }
        }
        Sim.ants.forEach(function(ant){
          if (Sim.Util.dist(ant.getPos(), locPos(200,0)) < 40) {
            if (ant.l4_lastcp != 1) {
              //console.log("Ameise " + ant.getKey() + " an CP 1")
              ant.l4_lastcp = 1
              addToKey(ant, 1)
            }
          } else if (Sim.Util.dist(ant.getPos(), locPos(0,-200)) < 40) {
            if (ant.l4_lastcp != 2) {
              //console.log("Ameise " + ant.getKey() + " an CP 2")
              ant.l4_lastcp = 2
              addToKey(ant, 2)
            }
          } else if (Sim.Util.dist(ant.getPos(), locPos(-200,0)) < 40) {
            if (ant.l4_lastcp != 3) {
              //console.log("Ameise " + ant.getKey() + " an CP 3")
              ant.l4_lastcp = 3
              addToKey(ant, 3)
            }
          } else if (Sim.Util.dist(ant.getPos(), locPos(0,200)) < 40) {
            if (ant.l4_lastcp != 4) {
              //console.log("Ameise " + ant.getKey() + " an CP 4")
              ant.l4_lastcp = 4
              addToKey(ant, 4)
            }
          } else {
            ant.l4_lastcp = undefined
          }
        })
      },
      isDone : function(){
        return Sim.l4_done
      },
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
        return Sim.players[0].getSugar() >= 600
      },
    },
 
    61 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Zahlentest")[0]
      function addTest(title, zahl) {
        test.addTest({
          title:title,
          description:"Teste die Zahl " + zahl,
          expected:zahl==0?"Zahl ist null":(zahl>0?"Zahl ist positiv":"Zahl ist negativ"),
          userFunc:userFunc,
          params:[zahl]
        })
      }
      addTest("Null-Test", 0)
      addTest("Positiv-Test", 1)
      addTest("Negativ-Test", -1)
      for (var i = 1; i <= 4; i++) {
        var number = Math.floor(Math.random()*30000) - 15000
        addTest("Zufallstest " + i + " mit Zahl " + number, number)
      }
    }),
 
    63 : makeTestLevel(function(test){
      var userFunc = Sim.players[0].getKI().Bus.getHandler("#Rechner")[0]
      function solution(art, a, b) {
        if (art == "plus")
          return a + b
        if (art == "mal")
          return a * b
        if (art == "geteilt")
          return a / b
        if (art == "minus")
          return a - b
      }
      function addTest(title, art, a, b) {
        test.addTest({
          title:title + " (" + art + ", " + a + ", " + b + ")",
          description:"Führe die Rechenart '" + art + "' auf den Zahlen " + a + " und " + b + " aus",
          expected:solution(art, a, b),
          userFunc:userFunc,
          params:[art, a, b]
        })
      }
      addTest("Addition", "plus", 3, 4)
      addTest("Subtraktion", "minus", 10, 6)
      addTest("Multiplikation", "mal", 4, 10)
      addTest("Division", "geteilt", 20, 5)
      for (var i = 1; i <= 3; i++) {
        addTest("Zufallsbeispiel Addition " + i,
                "plus",
                Math.floor(Math.random()*30000) - 15000,
                Math.floor(Math.random()*30000) - 15000)
      }
      for (var i = 1; i <= 3; i++) {
        addTest("Zufallsbeispiel Subtraktion " + i,
                "minus",
                Math.floor(Math.random()*30000) - 15000,
                Math.floor(Math.random()*30000) - 15000)
      }
      for (var i = 1; i <= 3; i++) {
        addTest("Zufallsbeispiel Multiplikation " + i,
                "mal",
                Math.floor(Math.random()*30000) - 15000,
                Math.floor(Math.random()*30000) - 15000)
      }
      for (var i = 1; i <= 3; i++) {
        var a = Math.floor(Math.random()*300) - 150
        var b = Math.floor(Math.random()*300) - 150
        addTest("Zufallsbeispiel Division " + i,
                "geteilt",
                a * b, b)
      }
    }),
 
    65 : makeTestLevel(function(test){
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
 
    71 : {
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
