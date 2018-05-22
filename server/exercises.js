module.exports.exercises = {
  1 : {
    name : "Erste Schritte",
    description : `
      <p>Auf dem Spielfeld befinden sich drei Checkpoints. Laufe mit allen Ameisen diese Checkpoints in einer beliebigen Reihenfolge ab. Die Orte der Checkpoints werden in einem Koordinatensystem angegeben. Der Ursprung befindet sich im Mittelpunkt des Baus. Die x-Achse zeigt aus der Anfangsansicht nach rechts, die y-Achse nach oben, wie aus der Schule gewohnt.
      </p>
      
      <p>Checkpoint 1 : (300|100)<br>
      Checkpoint 2: (-200|-200)<br>
      Checkpoint 3: (0|400)
      </p>
      
      <p>Die Ameisen werden mit Blick in Richtung x-Achse geboren.
      </p>
    `,
    level : 1,
  },
  
  2 : {
    name : "Himmelsrichtungen",
    description : `
      <p>Die Himmelsrichtung der Ameisen sind wie folgt festgelegt:
      </p>
      
      <p><img src="/images/01_koordinaten2.jpg"></img></p>
      
      <p>Um eine Himmelsrichtung anzugeben, verwenden wir Zahlen. Wir beginnen bei Osten und zählen dann die Winkel im Uhrzeigersinn. Für Osten verwenden wir die Zahl 0, für Süden die Zahl 90, für Westen die Zahl 180 und für Norden die Zahl 270. Um die Ameise zu eine bestimmte Himmelsrichtung zu drehen, verwende den Befehl <code>DreheZuRichtung</code>.
      </p>
      
      <p>Auch diesmal sind drei Checkpoints angegeben, die abgelaufen werden müssen:</p>
      
      <p>Checkpoint 1 : (-300|0)<br>
      Checkpoint 2: (-150|150)<br>
      Checkpoint 3: (0|300)
      </p>
      
      <p>Allerdings starten die Ameisen mit einer beliebigen Richtung.</p>
    `,
    level : 1,
  },
  
  3 : {
    name : "Die reisende Handelsmeise",
    description : `
      <p>Auf der Karte befinden sich eine Reihe von Checkpoints. Das Ziel ist es, in möglichst kurzer Zeit mit den Ameisen die Checkpoints abzulaufen und zum Bau zurückzukehren. Wähle die Reihenfolge mit Geschick. Das ist eine optionale Aufgabe.
      </p>
      
      <p>Mit der Taste G kannst du dir während der Simulation eine Koordinatengitter anzeigen lassen. Das Gitter hat einen Abstand von 50 Ameisenschritten. Damit kannst du die Koordinaten der Checkpoints bestimmen. Tipp: Die Diagonale eines Gitters ist 71 Ameisenschritte lang.
      </p>
      
      <p>In der Informatik in dieses Problem als "Traveling Salesman" berühmt geworden. Mit vielen Checkpoints auf dem Spielfeld wird es ziemlich schwer, eine optimale Route zu berechnen.
      </p>
    `,
    level : 1,
  },
  
  4 : {
    name : "Wir haben Hunger",
    description : `
      <p>Die Ameisen bekommen langsam richtig Hunger. Zum Glück sind auf dem Spielfeld einige Nahrungsmittel verteilt. Sammle sie alle ein. Vermeide es, mit den Wanzen in Berühung zu kommen!
      </p>
      <p>Hinweis: Lasse dir mit der Taste G wieder ein Gitter (Linienabstand 50 Ameisenschritte) anzeigen.
      <p>
    `,
    level : 2,
  },
  
  5 : {
    name : "Schneller in Teams",
    description : `
      <p>Schon vier Ameisen reichen aus, um diesen Apfel zum Bau zu tragen - wenn auch recht langsam. Der Apfel liegt bei den Koordinaten (100|400). Passe auch diesmal wieder auf die Wanzen auf!
      </p>
    `,
    level : 2,
  },
  
  6 : {
    name : "Labyrinth",
    description : `
      <p>Zweihundert Schritte über dem Bau und zweihundert Schritte unter dem Bau befindet sich jeweils ein Zuckerhaufen. Baue beide vollständig ab.
      </p>
    `,
    level : 2,
  },
  
  7 : {
    name : "Versteckte Nachrichten",
    description : `
      <p>Oh je, der Zuckerhaufen ist ja von Wanzen eingezäunt! Findest du trotzdem einen Weg, diesen Zuckerhaufen abzubauen? Seien Koordinaten lauten (400|-200), die Wanzen stehen immer in einem Abstand von 50 Schritten.
      </p>
    `,
    level : 2,
  },
  
  8 : {
    name : "Zuckersuche",
    description : `
      <p>Normalerweise wissen die Ameisen nicht genau, wo sich die Nahrungsmittel befinden. So auch bei diesen Aufgaben. Dein Ziel ist es, den Zuckerhaufen abzubauen. Dieser wird innerhalb einer der roten Ringe erscheinen. Die Mittelpunkt der Rings befinden sich bei (0|-200), (0|-400) und (200|-400). Jeder Ring hat einen Radius von 50 Schritten.
      </p>
    `,
    level : 3,
  },
  
  9 : {
    name : "Apfel unter Zeitdruck",
    description : `
      <p>Im Umkreis von (300|300) wird ein Apfel erscheinen. Du hast 20 Ameisen, aber nur wenig Zeit. Schaffst du es, den Apfel unter gemeinsamer Anstrengung rechtzeitig zum Bau zu bringen?
      </p>
    `,
    level : 3,
  },
  
  10 : {
    name : "Apfelquadrat",
    description : `
      <p>Der Bau steht im Mittelpunkt eines Quadrats aus Äpfeln. Die Seitenlänge des Quadrats beträgt 400 Schritte. Sammle alle vier Äpfel ein. Diesmal darfst du dir Zeit lassen.
      </p>
    `,
    level : 3,
  },
  
  11 : {
    name : "Zucker-TicTacToe",
    description : `
      <p>Diesmal gibt es viel Zucker zu holen! In drei der neun Felder erscheinen Zuckerhaufen und diese wollen eingesammelt werden. Es bringt Glück, wenn die drei Felder genau eine Reihe oder eine Diagonale bilden :) Der Mittelpunkt des mittleren Felds liegt bei (400|0), die anderen Felder haben jeweils einen Abstand von 150 Schritten.
      </p>
      
      <p>Für diese Aufgabe empfiehlt es sich, "Himmelsrichtungen" aus Level 1 bearbeitet zu haben. Außerdem befindet sich der Mittelpunkt des Baus bei den Koordinaten (-70|0)
      </p>
    `,
    level : 3,
  },
  
  12 : {
    name : "Auf die Wanzen!",
    description : `
      <p>Endlich ist es an der Zeit, es den Wanzen mal richtig zu zeigen. Vergifte die Wanzen, die sich bei den Koordinaten (500|-300), (0|400) und (-300|100) befinden. Vergiss nicht zwischendurch, die Giftladung neu im Bau aufzuladen. Die Wanzen bleiben aber weiterhin gefräßig. Himmelsrichtungen können hilfreich sein.
      </p>
    `,
    level : 4,
  },
  
  13 : {
    name : "Zucker in Dauerschleife",
    description : `
      <p>Du bist jetzt in der Lage, die Ameisen in Dauerschleife zu bewegen. Das wird in dieser Aufgabe ziemlich praktisch sein: In jeweils 300 Schritten Abstand zum Bau befinden sich drei Orte, an denen Zuckerhaufen erscheinen. Du wirst viel Zeit haben. Dein Ziel ist es, 250 Stück Zucker einzusammeln. Das entspricht 5 Zuckerhäufchen.
      </p>
      
      <p>Verwende das Ereignis "Wartet". Je nach dem, wie du die Schleife anlegst, wirst du auch den Paramter "OFFEN" brauchen. Vergiss nicht, immer wieder zum Bau zurückzukehren um die Reichweite wiederherzustellen.
      </p>
    `,
    level : 4,
  },
  
  14 : {
    name : "Verteidigung!",
    description : `
      <p>Eine Horde gegnerischer Ameisen greift deinen Bau an! Verteidige dich mit Gift und stelle sicher, dass bis Ende der Simulation kein Gegner näher als 200 Schritte an den Bau herankommt.
      </p>
    `,
    level : 4,
  },
  
  15 : {
    name : "Angriffs-Timing",
    description : `
      <p>Drei Wanzen laufen über das Spielfeld. Um sie zu treffen braucht es ein genaues Timing.
      </p>
    `,
    level : 4,
  },
  
  16 : {
    name : "Befreiungsaktion",
    description : `
      <p>Zwei Zuckerhaufen und ein Apfel sind von Wanzen umzingelt. Schaffst du es, sie einzusammeln und von den Wanzen zu befreien?
      </p>
      
      <p>An manchen Stellen ist diese Aufgabe etwas knifflig. Die Nahrungsmittel sind 300 Schritte vom Bau entfernt, die Wanzen stehen in einem Umkreis von 40 Schritten außen herum. Ein Zuckerhaufen hat eine Größe von 250 Zuckerstückchen. Außerdem erscheinen durch das Sammeln von Nahrungsmitteln neue Ameisen.
      </p>
    `,
    level : 4,
  },
  
  17 : {
    name : "Alles fit?",
    description : `
      <p>Bei dieser Aufgabe werden die Ameisen bereits am Ziel geboren. Allerdings sind etwa 50% der Ameisen noch nicht fit - sie haben eine Reichweite kleiner als 2000. Diese Ameisen sollen zum Bau zurücklaufen, ihre Reichweite auf 3000 aufladen (passiert dort automatisch) und zum Sammelpunkt zurückkehren, der 300 Schritte vor dem Bau liegt.
      </p>
      
      <p>Wichtig: Hat die Ameise genug Reichweite, dann soll sie sich nicht bewegen!</p>
    `,
    level : 5,
  },
  
  18 : {
    name : "Blick nach Norden",
    description : `
      <p>Alle Ameisen, die in der Runde 340 oder danach geboren werden, sollen sich in Richtung Norden drehen. Die anderen bleiben so, wie sie sind.</p>
    `,
    level : 5,
  },
  
  19 : {
    name : "Nicht zu weit weg",
    description : `
      <p>Die Ameisen werden rings um den Bau geboren. Sollten sie sich außerhalb der blauen Zone mit Radius 200 befinden, dann kehren sie zum Bau zurück. Ansonsten bewegen sie sich nicht von der Stelle.
      </p>
    `,
    level : 5,
  },
  
  20 : {
    name : "Der richtige Zuckerhaufen",
    description : `
      <p>Vom Geburtsort der Ameisen aus liegen im Norden drei Zuckerhaufen. Die Ameisen sollen sich bei dem südlichsten Zuckerhaufen versammeln, dessen Richtung vom Bau aus gesehen größer als 180 Grad ist. Schaffst du es, die Ameisen richtig zu navigieren?
      </p>
    `,
    level : 5,
  },
  
  21 : {
    name : "-- Platzhalter --",
    description : `
      <p>Hinweis: Es gibt auch die Befehle DreheZuObjekt und DreheWegVonObjekt
      </p>
    `,
    level : 5,
  },
  
  22 : {
    name : "-- Platzhalter --",
    description : `
      <p>...
      </p>
    `,
    level : 5,
  },
  
  23 : {
    name : "Demnächst verfügbar",
    description : `
      <p>Vier spannende Level warten darauf, entwickelt zu werden. Noch ist bisschen Geduld gefragt.
      </p>
    `,
    level : 6,
  },
  
  /*2 : {
    name : "Koordinaten",
    description : "Das ist die Beschreibung zur zweiten Aufgabe.",
    level : 1,
  },
  
  3 : {
    name : "Bewegung",
    description : "Das ist die Beschreibung zur dritten Aufgabe.",
    level : 2,
  },*/
}
