module.exports.exercises = {
  11 : {
    name : "Erste Schritte",
    description : `
      <p>Auf dem Spielfeld befinden sich drei Checkpoints. Laufe mit allen Ameisen diese Checkpoints in einer beliebigen Reihenfolge ab. Die Orte der Checkpoints werden in einem Koordinatensystem angegeben: Der Ursprung befindet sich im Mittelpunkt des Baus. Die x-Achse zeigt aus der Anfangsansicht nach rechts (Osten), die y-Achse nach oben (Norden), wie aus der Schule gewohnt.
      </p>
      
      <p>Checkpoint 1 : (300|100)<br>
      Checkpoint 2: (0|400)<br>
      Checkpoint 3: (-200|-200)
      </p>
      
      <p>Die Ameisen werden in dieser Aufgabe alle mit Blick nach Osten geboren.
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
      <p>Nutze das Koordinatengitter, um die Positionen zu bestimmen
      <p>
    `,
    hint: "Teams sind bei dieser Aufgabe nicht notwendig. Beachte auch, dass die Ameisen mit einer beliebigen Blickrichtung starten.",
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
    hint : "Die Ameisen aus den Zuckerteams müssen zweimal zum Zuckerhaufen laufen, um ihn komplett abzubauen.",
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
      <p>Im Osten befinden sich einige Nahrungsmittel. Bringe davon 2 Zuckerhaufen und 2 Äpfel zum Bau. Lass dich nicht ablenken und tappe der Wanze nicht in die Falle.
      </p>
    `,
    hint: "Nutze für diese Aufgabe die Ereignisse \"SiehtZucker\" und \"SiehtApfel\".",
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
    hint : "Eine 2D-Zahlentabelle nennt man in der Mathematik \"Matrix\".",
    level : 3,
  },
  
  41 : {
    name : "Verteidigung",
    description : `
      <p>Eine Horde gegnerischer Ameisen greift deinen Bau an! Verteidige dich und stelle sicher, dass bis Ende der Simulation kein Gegner die gelbe Zone um den Bau betritt.
      </p>
    `,
    hint : "Wie wäre es damit, den Ameisenbau ständig in Giftwolken einzuhüllen?",
    level : 4,
  },
  
  43 : {
    name : "Kampf den Wanzen",
    description : `
      <p>Eine Gruppe von Wanzen hat sich um den Bau herum niedergelassen. Dein Ameisenvolk hat sie als Gefahr erkannt und möchte sie beseitigen. Vergifte alle Wanzen auf dem Spielfeld.
      </p>
    `,
    hint: "Greife die Wanzen gezielt an. Bei den beweglichen Wanzen kannst du dich ihnen in den Weg stellen und etwas warten.",
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
    hint: "Verwende die Variable TickZahl, siehe dazu das Tutorial 'Ameisenwettbewerb' in der Bibliothek.",
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
    name : "An der Kasse",
    description : `
      <p>Im Supermarkt des Ameisendorfs wird deine Hilfe benötigt! Hier kaufen die Bewohner ihren Zuckervorrat ein und die Kassierer berechnen für jeden Kunden den Preis - aktuell noch per Hand. Vielleicht kann man das mit einem Computerprogramm leichter lösen?
      </p>
      
      <p>Der Zucker wird pro Kilogramm verkauft. Ein Kilogramm kostet 9,90€. Um den Zucker zu transportieren gibt es einen Zuckerkorb, den man für 2,99€ dazu kaufst. In folgender Vorlage findest du das Grundgerüst für die Funktion:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a1.png"></p>
      
      <p>Der Parameter <code style="color:blue">menge</code> gibt die Einwaage des Kunden in Kilogramm an. Berechne daraus den Preis in Euro und gebe ihn zurück. Du kannst annehmen, dass jeder Kunde einen Zuckerkorb dazukauft. Hier sind zwei Beispiele:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a1_bsp1.png"></p>
      
      <p><img class="img-thumbnail" src="/images/l6_a1_bsp2.png"></p>
    `,
    level : 6,
    hint: "Dezimalzahlen werden im Code mit Punkt abgetrennt. Statt 2,99 schreibt man 2.99",
  },
  
  63 : {
    name : "Im Sekretariat",
    description : `
      <p>Als nächstes gibt es im Sekretariat einige Aufgaben zu erledigen. Einige Schülerinnen und Schüler sollen eine Benachrichtigung bekommen, die zum Beispiel so aussieht:
      </p>
      
      <p><code style="color:brown">Hallo Peter, komm bitte ins Seketariat und hole dein Formular ab.</code></p>
      </p>
      
      <p>Da kannst du mit einem Programm helfen. Das Grundgerüst enthält wieder eine Funktion. Diese Funktion erhält als Parameter den Namen des Schülers. Erzeuge daraus die entsprechende Nachricht:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a2.png"></p>
      
      <p>Zwei Beispiele:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a2_bsp1.png"></p>
      
      <p><img class="img-thumbnail" src="/images/l6_a2_bsp2.png"></p>
    `,
    level : 6,
  },
  
  65 : {
    name : "Rabattaktion",
    description : `
      <p>Der Supermarkt braucht wieder deine Hilfe! Diesmal geht es um eine Rabattaktion für Äpfel. Es gibt zwei Sorten von Äpfe, rote und grüne. Die roten Äpfel kosten 7,90€ das Kilogramm, die grünen Äpfel kosten 6,90€. Der Korb dazu kostet 2,50€. Wer beide Sorten zusammen kauft, bekommt auf den gesamten Einkaufspreis einen Rabatt von 20%!
      </p>
      
      <p>Ergänze in dieser Vorlage die dafür notwendige Berechnung:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a3.png"></p>
      
      <p>Diesmal gibt es zwei Parameter: <code style="color:blue">mengeGrün</code> gibt die Einwaage der grünen Äpfel in Kilogramm an, <code style="color:blue">mengeRot</code> entsprechend die Einwaage der roten Äpfel in Kilogramm. Hier sind zwei Beispiele:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a3_bsp1.png"></p>
      
      <p><img class="img-thumbnail" src="/images/l6_a3_bsp2.png"></p>
      
      <p>Es kann passieren, dass das Ergebnis zu viele Nachkommastellen hat. Das braucht nicht korrigiert zu werden. Die Kassierer schneiden den Preis einfach nach der zweiten Kommastelle ab.</p>
    `,
    hint: "Um einen Wert x um 20% zu verkleinern, kannst du x * 0.8 rechnen.",
    level : 6,
  },
  
  67 : {
    name : "Kinderreime",
    description : `
      <p>Im Ameisenkindergarten singen die Ameisenkinder gerne. Dabei erfinden sie auch mal ihre eigenen "Lieder". Aktuell ist folgendes Muster im Trend:
      </p>
      
      <p>Pi Pah, Pi Pah Pah, Pi Pah Pi Pah Pi!
      </p>
      
      <p>Hi Ha, Hi Ha Ha, Hi Ha Hi Ha Hi!
      </p>
      
      <p>Die Kinder nehmen zwei ähnliche Wörter und bauen sie in dieser Reihenfolge hintereinander. Die Kindergärtner haben das Muster erkannt und würden gerne ein Programm haben, dass solche Kinderreime erzeugt. Hier ist die Vorlage dazu:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a4.png"></p>
      
      <p>Dabei beschreiben <code style="color:blue">wort1</code> und <code style="color:blue">wort2</code> die zwei Reimbestandteile. Und gleich noch zwei Beispiele:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a4_bsp1.png"></p>
      
      <p><img class="img-thumbnail" src="/images/l6_a4_bsp2.png"></p>
    `,
    level : 6,
  },
  
  68 : {
    name : "Zahlenrätsel",
    description : `
      <p>Auf einem Baumstumpf sind rätselhafte Zahlen eingraviert:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a5.png"></p>
      
      <p>Aber diese Zahlen sind sicherlich nicht zufällig! Die Spalten stehen in einer exakten Beziehung zu einander. Kannst du ein Programm schreiben, dass solche Zahlen erzeugen kann?
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a5_.png"></p>
      
      <p>Der Name <code style="color:blue">f</code> erinnert an eine mathematische Funktion. Der Parameter <code style="color:blue">x</code> entspricht einer Zahl der linken Spalte. Das Ergebnis der Funktion soll die Zahl in der rechten Spalte. Das sieht also so aus:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a5_bsp.png"></p>
    `,
    level : 6,
    hint: "Quadratzahlen spielen bei dieser Aufgabe eine wichtige Rolle.",
  },
  
  69 : {
    name : "Messwerte",
    description : `
      <p>Die Ameisen betreiben eine Wetterstation und sie wollen die Messerwerte auf einem Display im Dorfzentrum anzeigen lassen. So sollte das aussehen:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a6_lcd.png" width="400"></p>
      
      <p>Deine Aufgabe ist es, die Messwerte der Wetterstation in einen solchen Anzeigetext zu übersetzen. Die Wetterstation misst einerseits die Temperatur in Fahrenheit (die Ameisen haben sich einen amerikanischen Sensor gekauft), das ist der erste Parameter. Der zweite Parameter gibt den Luftdruck in Hektopascal direkt an:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l6_a6.png" width="400"></p>
      
      <p>Als Rückgabewert wird folgender Text erwartet:
      </p>
      
      <p><code>Temp.: 10C/50F|Druck: 1023hPa
      </code></p>
      
      <p>Die Temperatur soll in Celsius und Fahrenheit angezeigt werden, der senkrechte Strich kennzeichnet, dass eine neue Zeile beginnt. Zur Umrechnung gibt es <a href="https://de.wikihow.com/Fahrenheit-in-Celsius-umrechnen" target="_blank">diese Rechenanweisung</a>.
      </p>
    `,
    level : 6,
  },
  
  71 : {
    name : "Flexi-Flat",
    description : `
      <p>Das Handy-Unternehmen des Ameisendorfs möchte die Abrechnungen mithilfe eines Programms automatisieren. Der Tarif der Flexi-Flat ist in diesem Diagramm dargestellt:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a1_flow.png"></p>
      
      <p>Abgerechnet wird nach der Menge an verbrauchten Megabytes. Wenn man weniger oder gleich 50 MB im Monat genutzt hat, kostet das 2,99€. Verbraucht man mehr als 50 MB, dann wird jedes zusätzliche MB über die 50 MB hinaus mit 0,02€ abgerechnet. Der Vertrag ist außerdem nach oben hin begrenzt. Verbraucht man mehr als 2000 MB, dann zahlt man 41,99€.
      </p>
      
      <p>Wenn man 51 MB verbracht, zahlt man also 3,01€, wenn man 100 MB verbraucht, sind es 3,99€. Schreibe dein Programm in folgendes Grundgerüst hinein:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a1.png"></p>
    `,
    level : 7,
  },
  
  73 : {
    name : "Prüfungsergebnis",
    description : `
      <p>Jedes Jahr im Frühjahr finden die Abschlussprüfungen der Ameisenakademie statt. Bei den Prüfungen können insgesamt 200 Punkte erreicht werden. Je nach Punktzahl gibt es eine andere Bewertung:
      </p>
      
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Punktzahl</th>
            <th scope="col">Bewertung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>180 - 200</td>
            <td>Exzellent!</td>
          </tr>
          <tr>
            <td>150 - 179</td>
            <td>Sehr gut!</td>
          </tr>
          <tr>
            <td>120 - 149</td>
            <td>Gut</td>
          </tr>
          <tr>
            <td>60 - 119</td>
            <td>Ausreichend</td>
          </tr>
          <tr>
            <td>0 - 59</td>
            <td>Nicht bestanden.</td>
          </tr>
        </tbody>
      </table>
      
      <p>Hilf den Korrektoren, indem du ein Programm schreibst, das zu einer Punktzahl die entsprechende Bewertung ausgibt. Schreibe dein Programm in folgende Vorlage hinein:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a2.png"></p>
    `,
    level : 7,
  },
  
  75 : {
    name : "Geburtstagsgruß",
    description : `
      <p>Das Sekretariat der Schule braucht wieder deine Hilfe. Die Schule möchte allen Schülern, die Geburtstag haben, eine Grußkarte schreiben. Um den Aufwand gering zu halten soll dazu der Text vom Computer erzeugt werden. Der Text enthält den Namen des Schülers und den Geburtstag. Ein Beispiel:
      </p>
      
      <p><code style="color:brown">Lieber Thomas, wir wünschen dir alles Gute zum 16. Geburtstag!</code>
      </p>
      
      <p>Ein Detail ist aber zu beachten: Bei Mädchen muss die Anrede angepasst werden!
      </p>
      
      <p><code style="color:brown">Liebe Stella, wir wünschen dir alles Gute zum 12. Geburtstag!</code>
      </p>
      
      <p>Dein Programm sollte das natürlich beachten. Hier ist die Vorlage:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a3.png"></p>
      
      <p>Die Funktion hat drei Parameter: Der erste Parameter ist der Name, der zweite Parameter das Alter. Das Geschlecht kann entweder <code style="color:brown">"weiblich"</code> oder <code style="color:brown">"männlich"</code> sein.
      </p>
    `,
    level : 7,
  },
  
  77 : {
    name : "Stachel, Stock, Blüte",
    description : `
      <p>Die Ameisenkinder haben ein Spiel, dass unserem "Schere, Stein, Papier" sehr ähnlich ist, es heißt "Stachel, Stock, Blüte". Der Stachel schlägt die Blüte, die Blüte den Stock und der Stock den Stachel.
      </p>
      
      <p>Weil du dir die Reihenfolge einfach nicht merken kannst, möchtest du gerne ein Programm schreiben, dass dir bei der Auswertung hilft. Dein Programm erhält zwei Parameter: Der erste Parameter beschreibt, welches Zeichen der erste Spieler macht, der zweite Parameter beschreibt, welches Zeichen der zweite Spieler macht. Du möchtest eines von drei Antwortmöglichkeiten zurückgeben:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a4_info.png"></p>
      
      <p>Hier ist der Anfang des Programms:</p>
      
      <p><img class="img-thumbnail" src="/images/l7_a4.png"></p>
    `,
    level : 7,
  },
  
  78 : {
    name : "Passwortsicherheit",
    description : `
      <p>Für das soziale Netzwerk der Ameisen braucht man zur Anmeldung ein sicheres Passwort. Mithilfe eines Programms möchte man überprüfen, ob das Passwort sicher genug ist.
      </p>
      
      <p>Die Buchstaben des Passworts werden in vier Kategorien eingeteilt: Großbuchstaben, Kleinbuchstaben, Sonderzeichen und Ziffern. Außerdem ist die Länge des Passworts entscheidend: Je kürzer das Passwort, umso unterschiedlichen sollten die Zeichen. Als Eingabe erhält dein Programm fünf Eigenschaften des Passworts:
      </p>
      
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Passwort</th>
            <th scope="col">L(änge)</th>
            <th scope="col">G(roßbuchstaben)</th>
            <th scope="col">K(leinbuchstaben)</th>
            <th scope="col">S(onderzeichen)</th>
            <th scope="col">Z(iffern)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>abc123</code></td>
            <td>6</td>
            <td>3</td>
            <td>0</td>
            <td>0</td>
            <td>3</td>
          </tr>
          <tr>
            <td><code>Schalke04!</code></td>
            <td>10</td>
            <td>1</td>
            <td>6</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><code>?rVR,@qD&6TC!{erF</code></td>
            <td>17</td>
            <td>6</td>
            <td>4</td>
            <td>6</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      
      <p>Ein Expertengremium hat sich nach längerer Beratung auf folgende Kritieren festgelegt:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a5_flow.png"></p>
      
      <p>Oh je, Experten machen alles so kompliziert! Und du wurdest beautragt, diese Regeln in ein Programm zu übertragen. Hier ist deine Vorlage:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a5.png"></p>
      
      <p><code style="color:blue">true</code> und <code style="color:blue">false</code> sind spezielle Namen in der Programmiersprache. Sie beschreiben, ob etwas wahr oder falsch ist. Wenn das Passwort sicher ist, gib <code style="color:blue">true</code> zurück, sonst <code style="color:blue">false</code>.
      </p>
    `,
    level : 7,
  },
  
  79 : {
    name : "Gruppenticket",
    description : `
      <p>Am Eingang des Ameisenmuseums hängt folgende Preistafel:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a6_preise.png" width=600></p>
      
      <p>Einzelpersonen zahlen den regulären Preis. Wenn eine Gruppe mit 10 Personen oder mehr das Museum besuchen möchte (Erwachsene und Kinder zusammengerechnet), dann gilt ein ermäßigter Preis. Für eine größere Gruppe von Kindern gilt der Schulklassenpreis, hier dürfen zwei Erwachsene als Begleitpersonen das Museum kostenlos besuchen.
      </p>
      
      <p>Um den Preis schnell berechnen zu können, sollst du nun ein Programm schreiben, dass diese Regeln umsetzt. Dein Programm erhält die Anzahl an Erwachsenen und Kinder. Berechne daraus den Gesamtpreis:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_a6.png"></p>
    `,
    level : 7,
  },
  
  81 : {
    name : "Kreisformation",
    description : `
      <p>Stelle deine 20 Ameisen in einem Kreis um den Ameisenbau auf. Die Zielpositionen sind auf dem Spielfeld markiert.
      </p>
      
      <p>Nutze bei dieser Aufgabe eine Variable. Diese Variable soll den Austrittswinkel beschreiben. Wenn eine Ameise geboren wird, geht sie zu dieser Richtung und erhöhe dann den Austrittswinkel um einen bestimmten Wert. Dadurch werden nach und nach alle Himmelsrichtungen abgedeckt.
      </p>
      
      <p><img class="img-thumbnail" src="/images/l8_a1_flow.png"></p>
    `,
    level : 8,
  },
  
  83 : {
    name : "Gestreckte Linie",
    description : `
      <p>Als nächstes sollen die Ameisen sich auf einer Linie aufstellen, die sich vom Hügel aus in Richtung Osten erstreckt. Die Ameisen sollen sich in folgenden Abständen vom Hügel aufstellen:
      </p>
      
      <p>100, 110, 123, 139, 158, 180, 205, 233, ...
      </p>
      
      <p>Erkennst du das Muster? Die Reihe beginnt bei 100. Der Abstand erhöht sich beim ersten Mal um 10, dann um 13, dann um 16, dann um 19, und so weiter. Insgesamt ergibt sich damit eine gestreckte Linie.
      </p>
      
      <p>Mithilfe von zwei Variablen namens <em>strecke</em> und <em>abstand</em> lässt sich das programmieren. Hier ist ein möglicher Programmablauf:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l8_a2.png"></p>
    `,
    level : 8,
  },
  
  85 : {
    name : "Spirale",
    description : `
      <p>In dieser Aufgabe sollen die Ergebnisse der letzten zwei Aufgaben kombiniert werden. Die Ameisen sollen sich in einer Spirale auf dem Spielfeld aufstellen. Die Spirale beginnt im Südosten, die Positionen sind gleichmäßig im Kreis verteilt. Die Abstände zum Bau entsprechen genau den Abständen aus der letzten Aufgabe (also 100, 110, 123, 139, 158, ...)
      </p>
    `,
    level : 8,
  },
  
  87 : {
    name : "Pendel",
    description : `
      <p>Eine schöne Anwendung von Variablen ist folgendes Pendel:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l8_a4.gif"></p>
      
      
      <p>Die technische Beschreibung sieht so aus: Die erste Ameise soll vom Bau aus 200 Richtung Süden (Winkel 90) gehen und dort eine Giftwolke setzen. Die nächste Ameise geht zwei Grad weiter, also zum Winkel 92, und setzt dort die Giftwolke. Das geht mit den Winkeln 94, 96, 98, ... weiter, bis als letztes der Winkel 136 getroffen wird. Von dort aus gehen die nächsten Ameisen wieder in die andere Richtung, also 132, 134, 136, 134, 132, ... Auf der anderen Seite geht der Winkel bis minimal 44 und dreht sich dann um: 48, 46, 44, 46, 48, ...
      </p>
      
      <p>Du kannst dir mal selber überlegen, wie man das mit Variablen programmieren könnte. Ansonsten findest du hier eine Anleitung:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l8_a4flow.png"></p>
    `,
    level : 8,
  },
  
  88 : {
    name : "Dirigent",
    description : `
      <p>...
      </p>
    `,
    level : 8,
  },
  
  
  
  
  /* REWORK */
  
  // Wird ersetzt
  /*61 : {
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
  },*/
  
  // Wird ersetzt
  /*
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
  },*/
  
  // Wird ersetzt
  /*
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
  */
  
  91 : {
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
    level : 9,
  },
  
  93 : {
    name : "Rechenmaschine",
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
    level : 9,
  },
  
  95 : {
    name : "Array-Check",
    description : `
      <p>Führe eine Analyse auf einem Array durch. Ergänze dazu folgende Funktion:
      </p>
      
      <p><img class="img-thumbnail" src="/images/l7_check.png"></p>
      
      <p>Unterscheide dabei folgende Fälle:<br>
      1. Ist das Array leer, dann gib die Antwort <code style="color:brown">"Array ist leer"</code><br>
      2. Hat das Array die Länge 1, dann gib die Antwort <code style="color:brown">"Array besteht aus genau einem Element"</code><br>
      3. Hat das Array mehr als ein Element, dann gib die Länge des Arrays zurück.
    `,
    level : 9,
  },
  
  97 : {
    name : "Gleitender Mittelwert",
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
    level : 9,
  },
  
  99 : {
    name : "Besucherliste",
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
    level : 9,
  },
  
  101 : {
    name : "Superrechenmaschine",
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
    level : 9,
  },
  
  103 : {
    name : "Mittelpunkt",
    description : `
      <p>Auf dem Spielfeld befindet sich ein einzelner Zuckerhaufen. Finde ihn und bewege alle Ameisen genau in den Mittelpunkt zwischen dem Zucker und dem Bau.
      </p>
    `,
    level : 9,
  },
  
  105 : {
    name : "Gezielter Angriff",
    description : `
      <p>Im Osten befinden sich fünf Wanzen. Vergifte genau die dritte Wanze und lasse die anderen am Leben. Nutze dafür folgende Vorlage:
      </p>
      
      <p><img src="/images/l8_wanzen.png" class="img-thumbnail"></p>
      
    `,
    level : 9,
  },
  
  107 : {
    name : "Zuckerhaufen",
    description : `
      <p>Auf dem Spielfeld befinden sich vier Checkpoints, die von Zuckerhaufen umgeben sind. Laufe alle Checkpoints ab und melde über <code>alert()</code> schließlich, wie viele Zuckerhaufen du insgesamt gesehen hast.
      </p>
      
    `,
    level : 9,
  },
  
  109 : {
    name : "Der richtige Abstand",
    description : `
      <p>Auf dem Spielfeld befinden sich drei Äpfel. Trage sie Richtung Bau und stelle sie auf dem grünen Ring ab. Dieser Ring liegt 200 Schritte um den Bau herum. Die Aufgabe ist geschafft, wenn die drei Äpfel auf dem Ring liegen.
      </p>
      
    `,
    level : 9,
  },
}
