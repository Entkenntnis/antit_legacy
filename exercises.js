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
    name : "Labyrinth",
    description : `
      <p>Oh je, der Zuckerhaufen ist ja von Wanzen eingezäunt! Findest du trotzdem einen Weg, diesen Zuckerhaufen abzubauen? Seien Koordinaten lauten (400|-200), die Wanzen stehen immer in einem Abstand von 50 Einheiten.
      </p>
    `,
    level : 2,
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
