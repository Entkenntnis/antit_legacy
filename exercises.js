module.exports.exercises = {
  1 : {
    name : "Erste Schritte",
    description : `
      <p>Bewege alle Ameisen in den gelben Bereich hinein. Gehe dazu 455 Schritt geradeaus, drehe dich um 128 Grad nach links und gehe weitere 353 Schritte geradeaus.
      </p>
    `,
    level : 1,
  },
  
  2 : {
    name : "Koordinaten",
    description : `
      <p>Mithilfe von Koordinaten können Punkte in einem Raum genau bestimmt werden. Das ist meist praktischer, als eine Abfolge von Bewegungen anzugeben wie in der Aufgabe zuvor.</p>
      
      <p>Wir legen also ein Koordinatensystem (kurz Kosy) auf das Spielfeld der Ameisen. Der Mittelpunkt liegt beim Geburtsort der Ameisen. Die Ameisen schauen der positiven x-Achse entlang. Die positive y-Achse verläuft von den Ameisen aus gesehen nach links. Hier ist ein Bild:</p>
      
      <p><img src="/images/01_koordinaten.jpg"></img></p>
      
      <p>Dein Ziel liegt bei der x-Koordinate 340 und bei der y-Koordinate -200, kurz (340|-200). Bewege alle Ameisen in diesen gelben Bereich hinein.
      </p>
    `,
    level : 1,
  },
  
  3 : {
    name : "Himmelsrichtungen",
    description : `
      <p>Zusätzlich zum Koordinatensystem ist es auch praktisch, Himmelsrichtungen festzulegen. Diese sind wie folgt festgelegt:
      </p>
      
      <p><img src="/images/01_koordinaten2.jpg"></img></p>
      
      <p>Um die Himmelsrichtung anzugeben, verwenden wir Zahlen. Wir beginnen bei Osten und zählen dann die Winkel im Uhrzeigersinn. Für Osten verwenden wir die Zahl 0, für Süden die Zahl 90, für Westen die Zahl 180 und für Norden die Zahl 270. Um die Ameise zu eine bestimmte Himmelsrichtung zu drehen, verwende den Befehl <code>DreheZuRichtung</code>.
      </p>
      
      <p>Dein Ziel liegt diesmal bei den Koordinaten (-348|120). Die Ameisen starten wieder im Ursprung des Kosy, aber werden mit einer zufälligen Blickrichtung geboren.
      </p>
    `,
    level : 1,
  },
  
  4 : {
    name : "Lecker, Zucker",
    description : `
      <p>300 Schritte vor dir befindet sich ein Zuckerhaufen. Baue ihn ab, indem du jede Ameise einmal ein Zuckerstückchen tragen lässt. Aber Achtung: Komm den Wanzen nicht zu nahe!
      </p>
    `,
    level : 2,
  },
  
  5 : {
    name : "Ein großer Apfel",
    description : `
      <p>Schon vier Ameisen reichen aus, um diesen Apfel zum Bau zu tragen - wenn auch recht langsam. Der Apfel liegt bei den Koordinaten (100|400). Passe auch diesmal wieder auf die Wanzen auf!
      </p>
    `,
    level : 2,
  },
  
  6 : {
    name : "Zweimal Zucker",
    description : `
      <p>Zweihundert Schritte über dem Bau und zweihundert Schritte unter dem Bau befindet sich jeweils ein Zuckerhaufen. Baue beide vollständig ab.
      </p>
    `,
    level : 2,
  },
  
  7 : {
    name : "Labyrinth",
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
    name : "Zucker / Apfel freisprengen",
    description : `
      <p>Lalala
      </p>
    `,
    level : 4,
  },
  
  16 : {
    name : "Timing mit 3 Wanzen",
    description : `
      <p>Lalala
      </p>
    `,
    level : 4,
  },
  
  17 : {
    name : "Demnächst verfügbar",
    description : `
      <p>Vier spannende Level warten darauf, entwickelt zu werden. Noch ist bisschen Geduld gefragt.
      </p>
    `,
    level : 5,
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
