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
      
      <script>console.log("Aufgabenstellung: Starte die Aufgabe mit einem beliebigen Ameisenvolk. Innerhalb der Simulation werden dir auf der Konsole weitere Anweisungen gegeben.")
      </script>
    `,
    level : 2,
  },
  
  31 : {
    name : "Ganz allein",
    description : `
      <p>Du hast zu Anfang nur eine einzelne Ameise zur Verfügung. Baue damit den ganzen Zucker ab und bringe ihn zum Bau. Der Zucker befindet sich bei (300|0) und (-300|0).
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
  
  41 : {
    name : "Verteidigung",
    description : `
      <p>Eine Horde gegnerischer Ameisen greift deinen Bau an! Verteidige dich und stelle sicher, dass bis Ende der Simulation kein Gegner die gelbe Zone um den Bau betritt.
      </p>
    `,
    level : 4,
  },
  
  43 : {
    name : "Kampf den Wanzen",
    description : `
      <p>Eine Gruppe von Wanzen hat sich um den Bau herum niedergelassen. Dein Ameisenvolk hat sie als Gefahr erkannt und möchte sie beseitigen. Vergifte alle Wanzen auf dem Spielfeld.
      </p>
    `,
    level : 4,
  },
  
  45 : {
    name : "Wanzenstraße",
    description : `
      <p>Überquere die Wanzenstraßen, ohne zu sterben. Bleibe stehen, wenn eine Wanze vorbeikommt! Ziel ist es, insgesamt 250 Zucker zu sammeln.
      </p>
    `,
    hint : "Vergesse nicht, wenn du eine Wanze siehst, die alten Befehle weiter auszuführen. Ignoriere außerdem Wanzen, die von der Seite oder von hinten kommen.",
    level : 4,
  },
  
  47 : {
    name : "Befreiungsaktion",
    description : `
      <p>Die Gegner haben die wertvollen Nahrungsmittel umzingelt. Befreie die Nahrungsmittel und sammle 400 Zucker und 2 Äpfel. Komme den Gegnern nicht zu nahe, diese können deine Ameisen lähmen.
      </p>
    `,
    level : 4,
  },
  
  49 : {
    name : "Scan-Meise",
    description : `
      <p>Über dem Bau findest du eine Liste von fünf Objekten. Für jede Objektart gibt es im unteren Bereich einen entsprechenden Checkpoint. Deine Scan-Meise hat die Aufgabe, die fünf Objekte abzufahren und dann die Checkpoints in der richtigen Reihenfolge zu besuchen.
      </p>
      
      <p>Ein Beispiel: Wenn Nr. 1 ein Apfel ist, Nr. 2 ein Zucker und Nr. 3 bis Nr. 5 Wanzen sind, dann soll die Scan-Meise zuerst den Apfelcheckpoint im Osten besuchen, dann den Zuckercheckpoint im Süden und schließlich dreimal den Wanzencheckpoint im Westen.
      </p>
      
      <p>Der Schlüssel zu dieser Aufgabe ist der geschickte Einsatz von <code>FühreAlteBefehleAus()</code>.
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
  
  55 : {
    name : "Geduld",
    description : `
      <p>Verlockend viel Zucker liegt vor dem Bau, doch dein Ameisenvolk muss bis Tick 1500 warten, bis es den Zucker abbauen darf. Insgesamt hast du 2000 Ticks Zeit, 500 Zucker einzusammeln.</p>
    `,
    level : 5,
  },
  
  57 : {
    name : "Gefährliche Flucht",
    description : `
      <p>Verlasse mit mindestens 15 Ameisen den roten Bereich. Komm den Wanzen und den Gegner dabei nicht zu nahe!
      </p>
    `,
    level : 5,
  },
  
  61 : {
    name : "Vorzeichen",
    description : `
      <p>Prüfe eine Zahl auf ihr Vorzeichen. Ergänze dazu folgende Funktion:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_vorzeichen.png"></p>
      
      <p>Diese Funktion unterscheidet drei Fälle:<br>
      1. Ist <code style="color:blue">zahl</code> gleich 0, dann gib als Antwort <code style="color:brown">"Zahl ist null"</code> zurück.<br>
      2. Ist <code style="color:blue">zahl</code> größer 0, dann gib als Antwort <code style="color:brown">"Zahl ist positiv"</code> zurück.<br>
      3. Ist <code style="color:blue">zahl</code> kleiner 0, dann gib als Antwort <code style="color:brown">"Zahl ist negativ"</code> zurück.
      </p>
      
      <p>Besuche den Checkpoint, um deine Funktion testen zu lassen. Die Aufgabe ist gelöst, wenn deine Funktion alle Tests besteht.
      </p>
    `,
    level : 6,
  },
  
  63 : {
    name : "Testergebnis",
    description : `
      <p>Bewerte ein Testergebnis. Ergänze dazu folgende Funktion:
      
      <p><img class="img-thumbnail" src="/images/l6_testergebnis.png"></p>
    
      <p>Die Anzahl der Punkte liegt im Bereich 0 bis maximal 80. Sollte <code style="color:blue">punkte</code> kleiner als null oder größer als 80 sein, dann gib als Antwort <code style="color:brown">"Ungültige Punktzahl"</code>.</p>
      
      <p>Für eine gültige Punktzahl gib eine der folgenden Bemerkungen:<br>
      80 - 65 Punkte: <code style="color:brown">"summa cum laude"</code><br>
      64 - 50 Punkte: <code style="color:brown">"cum laude"</code><br>
      49 - 35 Punkte : <code style="color:brown">"rite"</code><br>
      34 - 0 Punkte: <code style="color:brown">"non probatum"</code></p>
    `,
    level : 6,
  },
  
  65 : {
    name : "Schere, Stein, Papier",
    description : `
      <p>Zwei Personen spielen Schere, Stein, Papier. Deine Funktion soll entscheiden, wer gewinnt:</p>
      
      <p><img class="img-thumbnail" src="/images/l6_ssp.png"></p>
      
      <p>Die Parameter <code style="color:blue">a</code> und <code style="color:blue">b</code> entsprechen der Auswahl von Spieler A und Spieler B. Die Parameter können einen der Werte <code style="color:brown">"Schere"</code>, <code style="color:brown">"Stein"</code> oder <code style="color:brown">"Papier"</code> annehmen.</p>
      
      <p>Für den Spielausgang gibt es drei Möglichkeiten:<br>
      <code style="color:brown">"Unentschieden"</code>, wenn beide das gleiche Zeichen gewählt haben.<br>
      <code style="color:brown">"Spieler A gewinnt"</code>, wenn <code style="color:blue">a</code> stärker ist als <code style="color:blue">b</code> und<br>
      <code style="color:brown">"Spieler B gewinnt"</code>, wenn <code style="color:blue">b</code> stärker ist als <code style="color:blue">a</code>.</p>
    `,
    level : 6,
  },
  
  67 : {
    name : "Statistik",
    description : `
      <p>Wir wollen ein wenig Statistik betreiben. Selbst mit zwei Zahlen lassen sich schon einige Werte bestimmen. Ergänze folgende Funktion:</p>
      
      <p><img class="img-thumbnail" src="/images/l6_statistik.png"></p>
      
      <p>Der Parameter <code style="color:blue">modus</code> ist eine Zeichenkette, die beschreibt, was für eine Operation auf den Zahlen <code style="color:blue">a</code> und <code style="color:blue">b</code> ausgeführt werden soll.</p>
      
      <p>Folgende Möglichkeiten sollen programmiert werden:<br>
      1. Modus <code style="color:brown">"Summe"</code>: Gib die Summe der beiden Zahlen zurück.<br>
      2. Modus <code style="color:brown">"Durchschnitt"</code>: Gib den Durchschnitt der beiden Zahlen zurück.<br>
      3. Modus <code style="color:brown">"Minimum"</code>: Gib die kleinere Zahl zurück.<br>
      4. Modus <code style="color:brown">"Maximum"</code>: Gib die größere Zahl zurück.</p>
      </p>
    `,
    level : 6,
  },
  
  71 : {
    name : "Rechenmaschine [JS]",
    description : `
      <p>Dir wird ein Array aus Zahlen gegeben. Je nach Modus soll ein bestimmter Wert berechnet werden. Ergänze folgende Funktion:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_rechenmaschine.png"></p>
      
      <p>In <code style="color:blue">arr</code> ist ein Array mit fünf Einträgen gespeichert, <code style="color:blue">modus</code> gibt die Rechenvorschrift an. Es sollen folgende Möglichkeiten programmiert werden:<br>
      1. Modus <code style="color:brown">"A"</code>: Berechne die Summe des 1., 2. und 3. Eintrags.<br>
      2. Modus <code style="color:brown">"B"</code>: Berechne die Differenz des 4. und des 2. Eintrags.<br>
      3. Modus <code style="color:brown">"C"</code>: Berechne das Produkt des 4. und 5. Eintrags.</p>
      
      <p>Beispiel:<pre>arr = [2, 3, 4.5, 1, 2]
      
Ergebnis "A": 2 + 3 + 4.5 = 9.5
Ergebnis "B": 1 - 3 = -2
Ergebnis "C": 1 * 2 = 2</pre></p>

      <p><br>Tipp: Beachte, dass der erste Eintrag den Index 0 hat.</p>
    `,
    level : 7,
  },
  
  73 : {
    name : "Array-Check [JS]",
    description : `
      <p>Führe eine Analyse auf einem Array durch. Ergänze dazu folgende Funktion:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_check.png"></p>
      
      <p>Unterscheide dabei folgende Fälle:<br>
      1. Ist das Array leer, dann gib die Antwort <code style="color:brown">"Array ist leer"</code><br>
      2. Hat das Array die Länge 1, dann gib die Antwort <code style="color:brown">"Array besteht aus genau einem Element"</code><br>
      3. Hat das Array mehr als ein Element, dann gib die Länge des Arrays zurück.
    `,
    level : 7,
  },
  
  75 : {
    name : "Gleitender Mittelwert [JS]",
    description : `
      <p>Für eine Datenreihe soll ein gleitender Mittelwert berechnet werden. Die Werte werden wir nacheinander einzeln übergeben. Ergänze folgende Vorlage:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_mittel.png"></p>
      
      <p>Zeile 3 definiert die Variable <code style="color:blue">Puffer</code>. Dieser ist ein Array aus vier Einträgen, die jeweils mit Null initialisiert sind. Wenn die Funktion aufgerufen wird, dann füge die neue Zahl an das Ende der Liste hinzu und lösche das erste Element der Liste. Gib anschließend den Mittelwert der vier Einträge im Puffer zurück. Der Mittelwert berechnet sich aus der Summe der Einträge geteilt durch 4.
      </p>
      
      <p>Beispiel:<pre>
Puffer = [0,0,0,0]

// neuer Wert 4

Puffer = [0,0,0,4]
Mittelwert = 1

// neuer Wert 8

Puffer = [0,0,4,8]
Mittelwert = 3

// neuer Wert 6

Puffer = [0,4,8,6]
Mittelwert = 4.5

// und so weiter</pre>
    `,
    level : 7,
  },
  
  77 : {
    name : "Besucherliste [JS]",
    description : `
      <p>Ein Geschäftsmann will sich mit einigen seiner Partner treffen. Um den Ablauf zu organisieren, führt er eine Besucherliste. Verwalte diese Liste und ergänze dazu folgende Vorlage:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_besucher.png"></p>
      
      <p>Zeile 3 definiert eine leere Liste. Dort werden die Besucher gespeichert. Diesmal gibt es zwei Funktionen. Diese haben folgendes Verhalten:
      </p>
      
      <p>Die Funktion <code>#Anfrage</code> wird aufgerufen, wenn ein neuer Partner sich mit dem Geschäftsmann treffen will. Er gibt seinen Namen an. Wenn die Liste weniger als 4 Einträge hat, dann gib die Antwort <code style="color:brown">"Okay"</code> zurück und füge seinen Namen an das Ende der Liste hinzu, ansonsten gib die Antwort <code style="color:brown">"Besucherliste leider voll"</code>.
      </p>
      
      <p>Die Funktion <code>#Besuch</code> wird aufgerufen, wenn sich ein Partner beim Geschäftsmann (bzw seiner Sekretärin) anmeldet. Wenn der Partner ganz vorne in der Besucherliste steht, dann lösche ihn aus der Liste und gibt die Antwort <code style="color:brown">"Herzlich Willkommen"</code>. Ansonsten antworte <code style="color:brown">"Leider nicht angemeldet"</code>
      </p>
      
      <p>Beispiel:<pre>
// Anfrage "Thomas Hook"
// -> Antwort: "Okay"

Liste = ["Thomas Hook"]

// Anfrage "Fabian Taggart"
// -> Antwort: "Okay"

Liste = ["Thomas Hook", "Fabian Taggart"]

// Besuch "Thomas Hook"
// -> Antwort: "Herzlich Willkommen

Liste = ["Fabian Taggart"]

// Besuch "Max Müller"
// -> Antwort: "Leider nicht angemeldet"</pre></p>
    `,
    level : 7,
  },
  
  79 : {
    name : "Superrechenmaschine [JS]",
    description : `
      <p>Ergänze die Rechenmaschine um folgende Modi:<br>
      4. Modus <code style="color:brown">"D"</code>: Berechne das Produkt der ersten vier Einträge und dividiere es durch den fünften Eintrag.<br>
      5. Modus <code style="color:brown">"E"</code>: Gib den gerundeten Wert des 3. Eintrags zurück.<br>
      6. Modus <code style="color:brown">"F"</code>: Berechne den 1. Eintrag hoch den 2. Eintrag.</p>
      
      <p>Beispiel:<pre>arr = [2, 3, 4.5, 1, 2]
      
Ergebnis "A": 2 + 3 + 4.5 = 9.5
Ergebnis "B": 1 - 3 = -2
Ergebnis "C": 1 * 2 = 2
Ergebnis "D": (2 * 3 * 4.5 * 1) / 2 = 27 / 2 = 13.5
Ergebnis "E": 4.5 ~= 5
Ergebnis "F": 2 hoch 3 = 8</pre></p>
    `,
    level : 7,
  },
  
  81 : {
    name : "Mittelpunkt",
    description : `
      <p>Auf dem Spielfeld befindet sich ein einzelner Zuckerhaufen. Finde ihn und bewege alle Ameisen genau in den Mittelpunkt zwischen dem Zucker und dem Bau.
      </p>
    `,
    level : 8,
  },
  
  82 : {
    name : "Der richtige Abstand",
    description : `
      <p>Auf dem Spielfeld befinden sich drei Äpfel. Trage sie Richtung Bau und stelle sie auf dem grünen Ring ab. Dieser Ring liegt 200 Schritte um den Bau herum. Die Aufgabe ist geschafft, wenn die drei Äpfel auf dem Ring liegen.
      </p>
      
    `,
    level : 8,
  },
  
  83 : {
    name : "Gezielter Angriff",
    description : `
      <p>Im Osten befinden sich fünf Wanzen. Vergifte genau die dritte Wanze und lasse die anderen am Leben. Nutze dafür folgende Vorlage:
      </p>
      
      <p><img src="/images/l8_wanzen.png" class="img-thumbnail"></p>
      
    `,
    level : 8,
  },
  
  84 : {
    name : "Zuckerhaufen",
    description : `
      <p>Auf dem Spielfeld befinden sich vier Checkpoints, die von Zuckerhaufen umgeben sind. Laufe alle Checkpoints ab und melde über <code>alert()</code> schließlich, wie viele Zuckerhaufen du insgesamt gesehen hast.
      </p>
      
    `,
    level : 8,
  },
  
  /*991 : {
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
    level : 9,
  },*/
  
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
