module.exports.exercises = {
  11 : {
    name : "Erste Schritte",
    description : `
      <p>Auf dem Spielfeld befinden sich drei Checkpoints. Laufe mit allen Ameisen diese Checkpoints in einer beliebigen Reihenfolge ab. Die Orte der Checkpoints werden in einem Koordinatensystem angegeben: Der Ursprung befindet sich im Mittelpunkt des Baus. Die x-Achse zeigt aus der Anfangsansicht nach rechts (Osten), die y-Achse nach oben (Norden), wie aus der Schule gewohnt.
      </p>
      
      <p>Checkpoint 1 : (300|100)<br>
      Checkpoint 2: (-200|-200)<br>
      Checkpoint 3: (0|400)
      </p>
      
      <p>Die Ameisen werden alle mit Blick nach Osten geboren.
      </p>
    `,
    level : 1,
  },
  
  13 : {
    name : "Himmelsrichtungen",
    description : `
      <p>Es sind wieder drei Checkpoints angegeben, die abgelaufen werden müssen:</p>
      
      <p>Checkpoint 1 : (-300|0)<br>
      Checkpoint 2: (-150|150)<br>
      Checkpoint 3: (0|300)
      </p>
      
      <p>Allerdings starten die Ameisen diesmal mit einer beliebigen Richtung. Richte sie zu Beginn richtig aus.</p>
    `,
    level : 1,
  },
  
  15 : {
    name : "Die reisende Handelsmeise",
    description : `
      <p>Auf der Karte befinden sich eine Reihe von Checkpoints. Das Ziel ist es, in möglichst kurzer Zeit mit den Ameisen die Checkpoints abzulaufen und zum Bau zurückzukehren. Wähle die Reihenfolge mit Geschick. Das ist eine optionale Aufgabe.
      </p>
      
      <p>Mit der Taste G kannst du dir während der Simulation eine Koordinatengitter anzeigen lassen. Das Gitter hat einen Abstand von 50 Ameisenschritten. Damit kannst du die Koordinaten der Checkpoints bestimmen. Tipp: Die Diagonale eines Gitters ist 71 Ameisenschritte lang.
      </p>
      
      <p>In der Informatik in dieses Problem als "Traveling Salesman" berühmt geworden. Mit vielen Checkpoints auf dem Spielfeld wird es ziemlich schwer, eine optimale Route zu berechnen. Bislang ist es noch niemanden gelungen, einen schnellen Algorithmus für die optimale Route zu finden. Es gibt allerdings viele Möglichkeiten, das Problem anzunähern.
      </p>
    `,
    level : 1,
  },
  
  21 : {
    name : "Wir haben Hunger",
    description : `
      <p>Die Ameisen bekommen langsam richtig Hunger. Zum Glück sind auf dem Spielfeld einige Nahrungsmittel verteilt. Sammle sie alle ein. Vermeide es, mit den Wanzen in Berühung zu kommen!
      </p>
      <p>Hinweis: Nutze das Koordinatengitter, um die Positionen zu bestimmen. Teams sind noch nicht nötig.
      <p>
    `,
    level : 2,
  },
  
  23 : {
    name : "Schneller in Teams",
    description : `
      <p>Auf dem Spielfeld befinden sich wieder vier Nahrungsmittel. Diese sollen eingesammelt werden. Wenn die Ameisen sich aufteilen, geht alles viel schnellern. Nutze dafür folgende <a href="/txt/l2_teams.txt">Vorlage</a>:
      </p>
      
      <p><img src="/images/l2_teams.png"></p>
      
      <p>Klicke auf den obigen Link, um die Vorlage zu kopieren. Ergänze die weiteren bedingten Anweisungen für die Teams. Passe die Befehle so an, dass die Ameisen die Nahrungsmittel einsammeln.
      </p>
    `,
    level : 2,
  },
  
  25 : {
    name : "Labyrinth",
    description : `
      <p>Zwei Zuckerhaufen sind in einem Labyrinth aus Wanzen versteckt. Bilde zwei Teams und sammle den Zucker ein, bevor die Zeit abläuft. Du kannst folgende <a href="/txt/l2_labyrinth.txt">Vorlage</a> verwenden:
      </p>
      
      <p><img src="/images/l2_labyrinth.png" class="img-thumbnail"></p>
      
      <p>In Zeile 5 bis 13 werden zwei Hilfsfunktionen definiert. Der neue Befehl <code>rechts</code> dreht die Ameise um 90 Grad nach rechts und geht 50 Schritte, der Befehl <code>links</code> tut das entsprechende nach links. Diese können wie vorgegebene Befehle verwendet werden, siehe Zeile 23 bis 25. Vergesse die Klammern nicht.
      </p>
      
      <p>Ergänze ab Zeile 26 den Code für das Team 0 und schreibe den Code für Team 1.
      </p>
    `,
    level : 2,
  },
  
  27 : {
    name : "Versteckte Botschaften",
    description : `
      <p>Unter der Oberfläche dieser Website befindet sich eine versteckte Welt, die nur für Programmierer zugänglich ist. Die Aufgabenstellung ist dort zu finden.
      </p>
      
      <p>Diese Welt ist besonders, denn dort kannst du auf ganz andere Art mit deinem Programm und der Website interagieren. Aber diese Art ist auch viel geheimnisvoller ...</p>
      
      <p>Die Welt befindet sich in der <em>Konsole</em> des Browser. Hier sei dir verraten, wie du sie betrittst:
        <ul>
          <li>Im Firefox: Strg + Shift + K</li>
          <li>Im Chrome: Strg + Shift + J</li>
          <li>Im IExplorer/Edge: F12</li>
          <li>Im Safari: Cmd + Alt + C</li>
        </ul>
      </p>
      
      <p>Dort findest du die Aufgabenstellung zu dieser Aufgabe.</p>
      
      <script>console.log("Aufgabenstellung: Starte eine Simulation mit einem beliebigen Ameisenvolk. Innerhalb der Simulation werden dir auf der Konsole weitere Anweisungen gegeben.")
      </script>
    `,
    level : 2,
  },
  
  31 : {
    name : "Ganz allein",
    description : `
      <p>Du hast zu Anfang nur eine einzelne Ameise zur Verfügung. Baue damit den ganzen Zuckerhaufen ab und bringe ihn zum Bau. Der Zucker befindet sich bei (300|0).
      </p>
    `,
    level : 3,
  },
  
  33 : {
    name : "Verlockung",
    description : `
      <p>Im Osten befinden sich einige Nahrungsmittel. Bringe davon zwei Zuckerhaufen und zwei Äpfel zum Bau. Lass dich nicht ablenken und tappe der Wanze nicht in die Falle.
      </p>
    `,
    level : 3,
  },
  
  35 : {
    name : "Schlaraffenland",
    description : `
      <p>Auf dem Spielfeld sind üppig Nahrungsmittel verteilt. Sammle insgesamt 600 Zucker und 2 Äpfel, um die Aufgabe zu lösen.
      </p>
    `,
    level : 3,
  },
  
  37 : {
    name : "Alles oder nichts",
    description : `
      <p>Sammle alle Nahrungsmittel auf dem Spielfeld ein. Es sind genau 600 Zucker und 2 Äpfel.</p>
    `,
    level : 3,
  },
  
  39 : {
    name : "Mehr Botschaften",
    description : `
      <p>Es gibt noch mehr Orte, an denen Botschaften zu finden sind. Für diese Aufgabe braucht es einen Blick in den Quelltext dieser Seite.
      </p>
      
      <p>Du kannst den Quelltext mit der Tastenkombination Strg + U anzeigen lassen (Mac: cmd+alt+u). Dort findest du weitere Hinweise.
      </p>
      
      <!--
      
      HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER!
      
      HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER!
      
      HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER! HIER!
      
      
      Also, das ist also der Code, den ich als Programmierer schreibe, damit du eine Website siehst. Denn eine Website nur mit Text wäre ja laaangweilig.
      
      Wenn du die Aufgabe startest, wirst du für die Ameisen einen neuen Befehl haben: AntIT.DieAntwortIst(). Damit kannst du die Antwort abschicken und die Aufgabe lösen.
      
      Ein Beispiel: Wenn die Antwort HASE lautet, dann schreibst du folgenden Code:
      
      _________________________________________________________
      
      var Ameise = AntIT.NeueAmeise("Stufe 3 Aufgabe 5")
      
      Ameise.wenn("IstGeboren", function(){
          AntIT.DieAntwortIst("HASE")
      })
      
      _________________________________________________________
      
      
      Und wie bekommst du die Antwort? Löse das Kreuzworträtsel, welches du unter folgenden Link findest:
      
      ants.arrrg.de/extern/raetsel/informatik.html
      
      (Oder mit einem anderen Host, je nach Startseite deines Servers)
      
      
      Viel Spaß!
      
      
      -->
    `,
    level : 3,
  },
  
  44 : {
    name : "Wanzenstraße",
    description : `
      <p>Überquere die Wanzenstraßen, ohne zu sterben. Bleibe stehen, wenn eine Wanze vorbeikommt! Ziel ist es, den ganzen Zuckerhaufen abzubauen. Die Ameisen dürfen dabei die x-Achse nicht verlassen.
      </p>
    `,
    level : 4,
  },
  
  41 : {
    name : "Kampf den Wanzen",
    description : `
      <p>Eine Gruppe von Wanzen hat sich um den Bau herum niedergelassen. Dein Ameisenvolk hat sie als Gefahr erkannt und möchte sie gerne beseitigen. Vergifte innerhalb der Zeit alle Wanzen auf dem Spielfeld.
      </p>
    `,
    level : 4,
  },
  
  43 : {
    name : "Verteidigung",
    description : `
      <p>Eine Horde gegnerischer Ameisen greift deinen Bau an! Verteidige dich und stelle sicher, dass bis Ende der Simulation kein Gegner die gelbe Zone um den Bau betritt.
      </p>
    `,
    level : 4,
  },
  
  45 : {
    name : "Apfelsaison",
    description : `
      <p>Es ist Erntezeit und viele Äpfel liegen vor der Tür. Sammle mit deinem Ameisenvolk 25 Äpfel ein, um die Aufgabe zu erfüllen.
      </p>
      <p>Ein Problem gibt es aber: Die ganze Umgebung riecht nach Apfel und die meisten Ameisen denken fälschlicherweise, dass sich die Äpfel im grünen Bereich befinden.
      </p>
    `,
    level : 4,
  },
  
  47 : {
    name : "Befreiungsaktion",
    description : `
      <p>Die Wanzen haben die wertvollen Nahrungsmittel umzingelt. Befreie die Nahrungsmittel und sammle 400 Zucker und 2 Äpfel.
      </p>
    `,
    level : 4,
  },
  
  49 : {
    name : "Code-Knacker",
    description : `
      <p>Um den Bau herum befinden sich vier Checkpoints mit folgender Belegung: Ost=1, Süd=2, West=3 und Nord=4. Das Ziel der Aufgabe ist es, den Code zu knacken. Der Code besteht aus vier Ziffern zwischen 1 und 4, die den Checkpoints entsprechen. Die Ameisen sollen entsprechend dem Code die Checkpoints ablaufen.
      </p>
      <p>Ein Beispiel: Wenn der Code 4,2,2,3 lautet, dann muss eine Ameise zuerst den Checkpoint im Norden besuchen, dann den Checkpoint im Süden, diesen wieder verlassen und wieder besuchen und zum Schluss den Checkpoint im Westen besuchen. Ist der Code richtig, wird die Aufgabe abgeschlossen. Ist der Code falsch, wird eine entsprechende Nachricht in der Konsole ausgegeben. Schaue dort nach, um weitere Ausgaben zu erhalten.
      </p>
      <p>Während jeder Simulation wird der Code neu generiert. Es gibt keine Möglichkeit, diesen Code auszulesen - er muss erraten werden.
      </p>
    `,
    level : 4,
  },
  
  51 : {
    name : "Der Ruf des Apfels",
    description : `
      <p>Nutze die Macht der Kommunikation und sammle 10 Äpfel ein.
      </p>
    `,
    level : 5,
  },
  
  53 : {
    name : "Vorsichtige Suche",
    description : `
    <p>Erreiche innerhalb der Simulation 4000 Punkte. Achte darauf, dass keine Ameise stirbt.
    </p>
    `,
    level : 5,
  },
  
  54 : {
    name : "Gefährliche Flucht",
    description : `
      <p>Verlasse mit mindestens 15 Ameisen den roten Bereich. Komm den Wanzen und den Gegner dabei nicht zu nahe!
      </p>
    `,
    level : 5,
  },
  
  55 : {
    name : "Geduld",
    description : `
      <p>Verlockend viel Zucker liegt vor dem Bau, doch dein Ameisenvolk muss bis zur Runde 1500 warten, bis es den Zucker abbauen darf. Insgesamt hast du 2000 Runden Zeit, 600 Zucker einzusammeln.</p>
      
      <!--<p>Ähnlich wie bei der Reichweite kannst du über die Eigenschaft <code>Runde</code> die aktuelle Rundennummer abfragen. Die beginnt bei 1 und zählt für jeden Tick der Simulation eins hoch. Ein kleiner Hinweis:
      </p>
      
      <p><img src="/images/l5_runde.png" class="img-thumbnail"></p>-->
    `,
    level : 5,
  },
  
  61 : {
    name : "Zahlentester [JS]",
    description : `
      <p>Deine Aufgabe ist es, eine Zahl auf ihre grundlegende Eigenschaft zu überprüfen.
      </p>
      
      <p>Deine Ameise soll eine Ereignisdefinition <code>#Zahlentest</code> mit dem Parameter <code>zahl</code> enthalten. Dieser Zahlentester unterscheidet zwischen drei Fällen:
      </p>
      
      <p>1. Wird dem Zahlentester die Zahl 0 gegeben, dann gibt er als Antwort <code>Zahl ist null</code> zurück.
      </p>
      
      <p>2. Wird dem Zahlentester eine positive Zahl gegeben, dann gibt er als Antwort <code>Zahl ist positiv</code> zurück.
      </p>
      
      <p>3. Wird dem Zahlentester eine negative Zahl gegeben, dann gibt er als Antwort <code>Zahl ist negativ</code> zurück.
      </p>
      
      <p>Der Zahlentester soll mit den Zahlen 0, 1 und -1 funktionieren, sowie vier Zufallsbeispiele richtig beantworten.
      </p>
    `,
    level : 6,
  },
  
  63 : {
    name : "Rechenmaschine [JS]",
    description : `
      <p>Deine Ameise soll die vier Grundrechenarten verstehen. Dazu soll sie eine Ereignisdefinition <code>#Rechner</code> mit den drei Parametern <code>rechenart, a, b</code> enthalten.
      </p>
      
      <p>Wenn als Rechenart der Wert <code>plus</code> übergeben wird, dann soll diese Funktion die Summe der Zahlen a und b zurückgeben.
      </p>
      
      <p>Wenn als Rechenart der Wert <code>minus</code> übergeben wird, dann soll diese Funktion die Differenz a minus b zurückgeben.
      </p>
      
      <p>Entsprechend gibt diese Funktion bei der Rechenart <code>mal</code> das Produkt a mal b, bei <code>geteilt</code> den Quotienten a geteilt durch b zurück.
      </p>
    `,
    level : 6,
  },
  
  65 : {
    name : "Schere, Stein, Papier [JS]",
    description : `
      <p>Zwei Spieler spielen Schere, Stein, Papier. Deine Ameise soll entscheiden, wer gewonnen hat.
      </p>
      
      <p>Erstelle dazu die Ereignisdefinition <code>#Spiel</code> mit den Parametern <code>a, b</code>. Dabei ist a die Auswahl vom Spieler A und b die Auswahl vom Spieler B.
      </p>
      
      <p>Wenn beide Spieler das gleiche Zeichen spielen, dann soll die Funktion den Wert "Unentschieden" zurückgeben. Ansonsten soll die Funktion entweder "Spieler A gewinnt" oder "Spieler B gewinnt" zurückgeben.
      </p>
      
      <p>Die Parameter können die Werte "Schere", "Stein" und "Papier" annehmen.
      </p>
    `,
    level : 6,
  },
  
  71 : {
    name : "Der richtige Abstand",
    description : `
      <p>Diese Aufgabe ist für Teilnehmer geeignet, die bereits Erfahrungen mit einer Programmiersprache wie Java oder C/C++/C# haben. 
      </p>
      
      <p>Die Ameisen unserer kleinen Welt hier sind in der Lage, Entfernungen und Richtungen auf dem Spielfeld präzise zu berechnen. Dazu stellen sie die Funktionen <code>Distanz</code> und <code>Winkel</code> zur Verfügung. Diese Funktionen nehmen zwei Parameter. Diese entsprechen den zu vermessenden Objekten. Diese können folgende sein:
      <ul>
      <li>Ein Sichtungsobjekt aus SiehtZucker, SiehtApfel, SiehtWanze oder SiehtGegner.</li>
      <li>Der Wert <code>Bau</code> für den Heimatbau der Ameise.</li>
      <li>Der Wert <code>Position</code> für die aktuelle Position der Ameise</li>
      </ul>
      </p>
      
      <p>Distanz gibt den Abstand in Ameisenschritten zurück. Der Aufruf <pre>Distanz(Bau, Position)</pre>berechnet z.B. den aktuellen Abstand der Ameise zum Bau. Die Reihenfolge der Parameter ist egal.
      </p>
      
      <p>Winkel berechnet die Himmelsrichtung, aus der der erste Parameter den zweiten Parameter sieht. Der Aufruf<pre>Winkel(Position, Bau)</pre>gibt z.B. die Himmelsrichtung an, in die sich die Ameise drehen muss, damit sie den Bau anschaut. Hierbei macht die Reihenfolge natürlich einen Unterschied. Kombiniert man diese zwei Funktionen mit Abfragen, dann lässt sich folgende Aufgabe lösen:
      </p>
      
      <p>Von den Äpfel auf dem Spielfeld befindet sich einer genau 245 Schritte vom Bau entfernt. Trage diesen Apfel zum Bau. Berühre die anderen Äpfel nicht.
      </p>
    `,
    level : 7,
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
