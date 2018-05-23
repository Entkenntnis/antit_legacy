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
      <p>Auf dem Spielfeld befinden sich wieder vier Nahrungsmittel. Diese sollen eingesammelt werden. Wenn die Ameisen sich aufteilen, geht alles viel schnellern.
      </p>
      <p>Dazu können sich die Ameisen selber in Teams zuteilen. Nutze dafür folgende <a href="/images/teams.txt">Vorlage</a>:
      </p>
      
      <p><img src="/images/l2_teams.png"></p>
      
      <p style="margin-bottom:0">Erklärung für den Code:<br>Zeile 1: Erzeuge eine Ameise mit dem Namen "Stufe 2 Aufgabe 2" und speichere sie in der Variablen "Ameise".<br>Zeile 3: Setze die Anzahl der Teams mit dem Befehl <code>SetzeTeams</code> auf 4.<br>Zeile 5: Wenn die Ameise geboren ist, dann soll sie folgende Anweisungen ausführen:<br>
      </p>
      
      <p style="margin-left:30px;margin-top:0">Zeile 6: Wenn die Ameise zum Team mit der Nummer 0 gehört, dann dreht sie sich zur Richtung 0 und geht 100 Schritte. Die Abfrage funktioniert mit der Funktion <code>InTeam</code>.<br>Zeile 10: Wenn die Ameise zum Team mit der Nummer 1 gehört, dann dreht sie sich zur Richtung 90 und geht 200 Schritte.</p>
      
      <p>Ergänze die weiteren Abfragen für die restlichen Teams. Passe die Befehle so an, dass die Ameisen die Nahrungsmittel einsammeln.
      </p>
    `,
    level : 2,
  },
  
  6 : {
    name : "Labyrinth",
    description : `
      <p>Zwei Zuckerhaufen sind in einem Labyrinth aus Wanzen versteckt. Bilde zwei Teams und sammle den Zucker ein, bevor die Zeit abläuft. Du kannst folgende <a href="/images/l2_labyrinth.txt">Vorlage</a> verwenden:
      </p>
      
      <p><img src="/images/l2_labyrinth.png" class="img-thumbnail"></p>
      
      <p>In Zeile 5 bis 13 werden zwei Hilfsfunktionen definiert. Der neue Befehl <code>rechts</code> dreht die Ameise um 90 Grad nach rechts und geht 50 Schritte, der Befehl <code>links</code> tut das entsprechende nach links. Diese können wie vorgegebene Befehle verwendet werden, siehe Zeile 23 bis 25. Vergesse die Klammern nicht. Ergänze ab Zeile 26 den Code für das Team 0 und schreibe den Code für Team 1.
      </p>
    `,
    level : 2,
  },
  
  7 : {
    name : "Versteckte Botschaften",
    description : `
      <p>Die Aufgabenstellung findet sich diesmal in der <a target="_blank" href="https://thytos.com/video/programmieren-lernen-mit-javascript/javascript-konsole-oeffnen">Konsole</a> deines Browsers zu dieser Seite.
      </p>
      
      <script>console.log("Aufgabenstellung: Starte eine Simulation mit einem beliebigen Ameisenvolk. Innerhalb der Simulation werden dir auf der Konsole weitere Anweisungen gegeben.")
      </script>
    `,
    level : 2,
  },
  
  8 : {
    name : "Schlaraffenland",
    description : `
      <p>Auf dem Spielfeld sind üppig Nahrungsmittel verteilt. Sammle insgesamt 600 Zucker und 2 Äpfel, um die Aufgabe zu lösen. Nutze die Vorlage aus dem neuen Tutorial.
      </p>
    `,
    level : 3,
  },
  
  9 : {
    name : "Wanzenstraße",
    description : `
      <p>Überquere die Wanzenstraßen, ohne zu sterben. Bleibe stehen, wenn eine Wanze vorbeikommt! Ziel ist es, den ganzen (!) Zuckerhaufen abzubauen. Die Ameisen dürfen dabei die x-Achse nicht verlassen.
      </p>
    `,
    level : 3,
  },
  
  10 : {
    name : "S-hla-a-fe-la-d",
    description : `
      <p>Es ist immer die gleiche Geschichte: Sobald der Mensch anfängt, in die Natur einzugreifen, bringt er Zerstörung. Die Nahrungsmittel sind weniger geworden, der Hunger nicht. Sammle wieder 600 Zucker und 2 Äpfel - also alle Nahrungsmittel auf dem Spielfeld.
      </p>
      
      <p>Du musst jetzt darauf achten, dass die Ameisen nicht zu früh sterben. Jede Ameise hat nur eine Reichweite von 3000 Schritten. Danach stirbt sie. Die Reichweite kann im Heimatbau wiederhergestellt werden, wenn die Ameise mit dem Befehl GeheZuBau zum Bau zurückkehrt.
      </p>
      
      <p>Die Ameise kann ihre Reichweite abfragen. Diese gibt an, wie viele Schritte die Ameise noch gehen kann. Die Reichweite wird also mit der Zeit immer kleiner bis sie null erreicht. Das kann in einer <a target="_blank" href="https://wiki.selfhtml.org/wiki/JavaScript/Verzweigung#Wenn-Dann-Bedingungen_mit_.22if.22">Abfrage</a> verwendet werden. Ein kleiner Hinweis als Code-Schnipsel:
      </p>
      
      <p><img src="/images/l3_reichweite.png" class="img-thumbnail"></p>
    `,
    level : 3,
  },
  
  11 : {
    name : "Escape the Room",
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
