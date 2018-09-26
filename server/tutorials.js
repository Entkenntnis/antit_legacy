module.exports.tutorials = {
  1: {
    level : 1,
    name : "Herzlich Willkommen!",
    text : ` 
      <p>Während du diese Zeilen liest, bist du höchstwahrscheinlich Teil einer Schülergruppe, die gerade an einem Ameisen-Workshop teilnimmt. Vielleicht freust du dich schon auf den Tag/die nächsten Tage. Du bist neugierig darauf, was man mit diesen Ameisen alles machen kann. Schön, dass du da bist!
      </p>
      
      <p> Vielleicht aber denkst du dir auch nur: Was soll das schon wieder? Die Wenigsten kommen hier an und haben eine Vorstellung, was sie erwartet. Genausowenig haben die meisten Menschen eine Vorstellung davon, was es heißt zu programmieren. In einer Zeit, in der wir tagtäglich mit IT in Verbindung stehen, ist das ziemlich schade. Denn dadurch entgeht uns die Chance, unsere Lebenswelt besser zu verstehen. Und es entgeht uns die Chance, diese Welt mitzugestalten.
      </p>
      
      <p>AntIT! ist mit dem Wunsch entstanden, dir das Programmieren beizubringen. Selbst wenn man am Ende des Workshops kein fertiger Programmierer ist - sollte AntIT! doch einen Einblick geben, was Programmieren bedeutet. Beim Programmieren erlebt man, wie der eigene Code das Verhalten des Computers steuert und verändert. Gleichzeitig ist man auch gezwungen, sich mit der Funktionsweise des Computer selber auseinanderzusetzen. Je besser man den Computer und seine Software versteht, umso besser kann man selber Code schreiben. Du lernst hier nicht nur, wie man Ameisen steuert, sondern gleichzeitig auch, wie dein Code vom Computer ausgeführt wird. Und du wirst das nicht nur theoretisch lernen, sondern du wirst das ganz praktisch ausprobieren können.
      </p>
      
      <p>Das wird dich hier erwarten. Und das wird eine Herausforderung sein. Etwas Neues zu lernen ist anstrengend und verbraucht Energie und Aufmerksamkeit. Auf diesem Weg wollen wir dich so gut wie möglich begleiten:
      </p>
      
      <ul>
        <li>Alle Inhalte des Workshops können vollständig über Tutorials gelernt werden. Du kannst ganz nach deinem Tempo arbeiten. Wenn dich Themen besonders interessieren kannst du dir da mehr Zeit nehmen. Solltest du etwas wieder vergessen haben, kannst du jederzeit auf die vorherigen Tutorials zurückgreifen. Damit liegt die Kontrolle ganz bei dir.
        </li>
        <li>Unmittelbar nach dem Tutorial findest du ein kleines Quiz, mit dem du dich abfragen kannst. Ein Quiz enthält sechs Antwortmöglichkeiten, von denen keine bis alle richtig sein können. Kreuze die richtigen Antworten an. Das Quiz ist weniger als Prüfung gedacht, sondern vielmehr als kleiner "Energizer" zwischendurch. Nach dem Quiz wird auch das Tutorial als fertig markiert.
        </li>
        <li>Die Inhalte der Workshops können praktisch an Aufgaben ausprobiert werden. Diese knüpfen eng an die erlernten Inhalte an, fordern aber manchmal ein bisschen Umdenken. An den Aufgaben kannst du deinen Lernfortschritt ablesen und sehen, ob du es wirklich verstanden hast.
        </li>
        <li>Das Auge programmiert mit: Bei AntIT! haben wir uns bemüht, die Oberfläche und die Simulation möglichst anschaulich zu gestalten. Sind diese Ameisen nicht süß?
        </li>
      </ul>
      
      <img src="/images/l1_ameiseapfel.png" class="img-thumbnail" title="Hey Jo!">
    
      <br><br>
      <p>Ach, herrlich ... So, das ist jetzt genug an Informationen. Bearbeite zum Schluss noch dieses Quiz und gehe danach gleich zum zweiten Tutorial weiter.
      </p>
    `,
    questions : [
      "Viele Menschen können sich unter Programmieren wenig vorstellen.",
      "Das Tempo des Workshops ist streng vorgegeben.",
      "Ameisen haben 6 Beine.",
      "Neues zu lernen geht ganz locker.",
      "Man muss dieses Quiz wie eine Prüfung behandeln.",
      "Programmierer sollten verstehen, wie ein Computer funktioniert.",
    ],
    solution : [1,0,1,0,0,1],
  },
  2 : {
    level : 1,
    name : "Die Welt der Ameisen",
    text : `
      <p>Beginnen wir gleich damit, die Welt der Ameisen zu erkunden. Diese gesamte Website entspricht einem "Dorf", in dem die Ameisen und vor allem auch deren Programmierer leben. Die Bibliothek kennst du jetzt bereits. Du wirst jetzt noch das Dorfzentrum und den Trainingsplatz kennenlernen. Folge dazu den Anweisungen dieser Schritt-für-Schritt-Anleitung:
      </p>
      
      <ol>
        <li><p>Gehe ins Dorfzentrum und klicke auf "Neues Ameisenvolk".</p>
        </li>
        <li><p>Gib dem Ameisenvolk den Namen "Hallo Welt".</p>
        </li>
        <li><p>Öffne die Ameisen, in dem du auf "Bearbeiten" klickst.</p>
        </li>
        <li><p>Trage die fehlenden Teile in Zeile 3 und Zeile 4 ein:<br>
        <img src="/images/l1_schnipsel_hallowelt.png" class="img-thumbnail" title="Der Code wird automatisch gefärbt."></p>
        </li>
        <li><p>Gehe auf den Trainingsplatz.
        </p></li>
        <li><p>Klicke auf die Aufgabe "Erste Schritte" von Stufe 1.
        </p></li>
        <li><p>Wähle bei "Lösung einreichen" deine neue Ameise "Hallo Welt" aus und klicke auf "Aufgabe starten".
        </p></li>
      </ol>
      
      <p>Fertig. Wenn alles gutgegangen ist sieht du folgenden Bildschirm:</p>
      <p><img src="/images/l1_overview.png" class="img-thumbnail" title="Der gelbe Kreis hinten rechts ist Teil der ersten Aufgabe.">
      </p>
      
      <p>Der Startpunkt der Ameisen ist der Ameisenbau. Ameisen werden dort in der Mitte geboren. Dein Programm hat bewirkt, dass sie sich aus dem Bau herausbewegen. Dein Ameisenvolk hat die Farbe rot. Die Körperteile der Ameise sind passend zur Farbe des Baus.
      </p>
      
      <p>Die Ameisen haben Fühler, deren Farben deiner aktuellen Stufe entsprechen. Sie sind an den Judo-Gürtelfarben angelehnt, und gehen über orange, grün, blau und braun schließlich zu den schwarzen Fühlern auf Stufe 9.
      </p>
      
      <p>Du kannst dich in der Welt umschauen. Mit gedrückter linken Maustaste lässt sich die Ansicht drehen, mit Mausrad zoomt man und mit der rechten Maustaste kann man die Ansicht verschieben.
      </p>
      
      <p>Oben links ist die Statusübersicht. In der ersten Zeile wird angezeigt, wie viel Zeit noch bleibt, bis die Simulation zu Ende ist. Die Aufgaben müssen innerhalb dieser Zeit gelöst werden. Die Punktzahl wird später in der Arena wichtig. Diese erhält man, wenn man Nahrungsmittel sammelt oder Gegner vergiftet.
      </p>
      
      <p>Das Diagramm ganz oben links gibt die Anzahl der Ticks pro Sekunden aus. Dies entspricht der Geschwindigkeit der Simulation. Diese führt im Normalfall 40 Rechenschritte, sog. Ticks, in einer Sekunde aus. Falls du eine komplizierte Ameise entwickelst, die viel Rechenleistung verbraucht, kann diese Anzahl sinken.
      </p>
      
      <p>Schaue in das nächste Tutorial um zu erfahren, mit welchen Befehlen du die Ameisen steuern kannst.
      </p>
    `,
    questions : [
      "Ameisen starten im Ameisenbau.",
      "Auf der Stufe 1 hat man komplett weiße Fühler.",
      "Die Ansicht ist fixiert und kann nicht bewegt werden.",
      "Die Simulation läuft mit 60 TPS.",
      "Ameisen tun und lassen, was sie wollen.",
      "Du bist verantwortlich für das Verhalten der Ameisen."
    ],
    solution : [1,0,0,0,0,1],
  },
  3 : {
    level : 1,
    name : "Grundlagen der Programmierung [API]",
    text : `
      <p>Im letzten Tutorial hast du bereits dein erstes Ameisenvolk programmiert. Jetzt werden wir den Ameisen ein nützliches Verhalten geben. Schauen wir uns dazu nochmal den Code aus dem vorherigen Tutorial an:</p>
      
      <p><img src="/images/l1_schnipsel_hallowelt.png" class="img-thumbnail" title="Hey, das gleiche Bild wieder."></p>
      
      <p>Der Code besteht aus zwei wichtigen Blöcken: der ersten Zeile und den Zeilen 3 bis 5. Die erste Zeile ist die <em>Ameisendefinition</em>. Diese legt den Namen des Ameisenvolks fest und sagt der Simulation, dass ein neuer Ameisenbau erstellt werden soll. Jedes unserer Programme beginnt mit einer Ameisendefinition. Der Name lässt sich jederzeit ändern.
      </p>
      
      <p><img src="/images/l1_nameanders.png" class="img-thumbnail" title="Hey, das gleiche Bild wieder."></p>
      
      <p>Schauen wir uns nun Zeile 3 bis Zeile 5 an. Das ist eine <em>Ereignisdefinition</em>. Das Verhalten der Ameisen wird über Ereignisse gesteuert. Ereignisse sind ein ziemlich mächtiges Mittel, um Software zu bauen. Gleichzeitig braucht es etwas Zeit, bis man sich daran gewöhnt hat. Für den Anfang werden wir uns daher nur mit einem einzigen Ereignis namens <code>"IstGeboren"</code> beschäftigen. Wie der Name schon sagt, definieren wir damit das Verhalten der Ameise, nachdem sie geboren wurde. Für die ersten Programme kommen wir mit diesem einen Ereignis aus. Innerhalb der Ereignisdefinition schreiben wir unsere <em>Anweisungen</em> (Zeile 4 bis 6):
      </p>
      
      <p><img src="/images/l1_schnipsel_event.png" class="img-thumbnail" title="Befehle innerhalb von Ereignisse werden eingerückt. Nutze die Tab-Taste."></p>
      
      <p>Achte darauf, dass die Anweisungen innerhalb einer Ereignisdefinition eingerückt sind. Das funktioniert meist automatisch. Falls nicht, kannst du eine Zeile einrücken, indem du an den Anfang der Zeile klickst und dann die TAB-Taste auf der Tastatur drückst (die große Taste links neben dem Q mit den zwei Pfeilen). Das Einrücken macht den Code leserlicher und bei größeren Ameisen mit vielen Definitionen hilft es, den Überblick zu bewahren.
      </p>
      
      <p>Schauen wir uns jetzt noch die Anweisungen genauer an. Die Anweisungen bestehen aus einzelnen <em>Befehlen</em>. In diesem Tutorial werden wir die drei grundlegendsten Befehle kennenlernen.
      </p>
      
      <p>Der erste Befehl heißt <code>Gehe()</code>. Dieser Befehl lässt die Ameise eine bestimmte Anzahl an Schritten geradeaus gehen. Ein Befehl besteht aus seinem Namen und runden Klammern, die den <em>Parameter</em> des Befehls enthalten. Beim Gehe-Befehl ist der Parameter die Anzahl der Schritte.
      </p>
      
      <p>Der zweite Befehl heißt <code>Drehe()</code>. Dessen Parameter gibt an, um wie viel Grad sich die Ameisen im Uhrzeigersinn um die eigene Achse drehen soll. Ein positiver Parameter bestimmt einer Rechtsdrehung. Ein negativer Parameter wie in Zeile 5 gibt eine Linksdrehung an.
      </p>
      
      <p>Schließlich gibt es noch den Befehl <code>DreheZuRichtung()</code>. Dieser nimmt als Parameter eine Himmelsrichtung. Dabei beginnt man im Osten und zählt die Grad im Uhrzeigersinn weiter. Es gilt damit Osten = 0, Süden = 90, Westen = 180 und Norden = 270. Mit DreheZuRichtung kann man die Ameise also in eine bestimmte Richtung des Spielsfelds ausrichten:
      </p>
      
      <p><img src="/images/l1_koordinaten2.jpg" class="img-thumbnail" title=""></p>
      
      <p>Mit diesem Wissen kannst du nun die Aufgaben dieser Stufe bearbeiten. Ein letzter Hinweis zum Schluss: Tutorials mit dem Zusatz [API] stellen neue Befehle oder Ereignisse vor. Diese werden im Text rot hervorgehoben und erleichtern damit die Suche nach bestimmten Funktionen. Außerdem findest du auf der Startseite einen Inhaltsüberblick mit den wichtigsten Inhalten.
      </p>
    `,
    questions : [
      "Der Name der Ameise lässt sich in der Ameisendefinition anpassen.",
      "Der Ereignisname wird außerhalb einer Ereignisdefinition eingetragen.",
      "Wir nutzen bisher nur das Ereignis \"IstGeboren\".",
      "Der Parameter eines Befehls steht in runden Klammern.",
      "'Geh!' ist die umgangssprachliche Form von 'Gehe!'",
      "Südwest = 45."
    ],
    solution : [1,0,1,1,1,0],
  },
  4 : {
    level : 2,
    name : "Nahrungsmittel [API]",
    text : `
      
      <p>In diesem Tutorial lernst du, wie deine Ameisen Zucker und Äpfel sammeln können. Im Grunde ist es kinderleicht und daher wird dieses Tutorial recht kurz sein.
      </p>
      
      <p>Um Zucker zu sammeln, muss du deine Ameise zuerst ganz nah an den Zuckerhaufen hinbewegen. Wenn die Ameise am Zucker steht, führst du den Befehl <code>NimmZucker()</code> aus. Damit lädt sich die Ameise ein Stückchen Zucker auf.
      </p>
      
      <p><img src="/images/l2_ameisezucker.jpg" class="img-thumbnail" title="Ein richtig perfekter Zuckerwürfel auf ihrem Rücken!"></p>
      
      <p>Jetzt muss die Ameise nach Hause. Dazu gibt es den Befehl <code>GeheZuBau()</code>, der die Ameise direkt in den Bau führt. Die Ameisen sind wie Geister - sie müssen nicht um Hindernisse herumgehen, sondern können einfach durch alles hindurchlaufen. Auch wenn das komisch aussieht: Es ist für dich als Entwickler ziemlich praktisch.
      </p>
      
      <p>Die zwei Befehle, die du gerade kennengelernt hast, brauchen keinen Parameter. Deshalb steht nichts in den runden Klammern. Die Klammern sind aber trotzdem wichtig! Wenn du sie vergisst, wird der Befehl nicht ausgeführt.
      </p>
      
      <p><img src="/images/l2_ameisezucker2.png" width="400px" class="img-thumbnail" title="Huch!"></p>
      
      <p>Am Ende, wenn die Ameise im Bau steht, kann sie mit dem Befehl <code>LadeZuckerAb()</code> den Zucker in den Bau geben. Dann erhält du deine Punkte dafür und die Menge wird in der Statistik angezeigt.
      </p>
      
      <p>Für Äpfel gibt es nur einen Befehl: <code>TrageApfel()</code>. Sobald die Ameise am Apfel steht, kann sie diesen Befehl ausführen. Dann fängt sie an, auf ihre Kollegen zu warten. Wenn vier Ameisen zusammenkommen, tragen sie den Apfel zurück zum Bau. Das alles steckt in diesem einen Befehl. Du musst dich nur darum kümmern, dass die Kollegen zum Apfel hinfinden.
      </p>
      
      <p><img src="/images/l2_apfel.png" class="img-thumbnail" title="Wie schön die Sonne sich spiegelt ..."></p>
      
      <p>Mit der eingesammelten Nahrung können neue Ameisen geboren werden. Das Volk vergrößert sich und die Ameisen können noch schneller Nahrung sammeln. 
      </p>
    
    `,
    questions : [
      "Der Befehl NimmZucker() hat nur in der Nähe eines Zuckerhaufens Wirkung.",
      "Die Ameisen wissen immer, wo ihr Heimatbau liegt.",
      "Der Zucker wird im Bau automatisch abgeladen.",
      "TrageApfel() darf man nur ausführen, wenn schon genügend Ameisen am Apfel stehen.",
      "Ameisen sind wie Geister - sie können durch Gegenstände hindurchlaufen",
      "Man braucht mindestens drei Ameisen, um einen Apfel zu tragen."
    ],
    solution : [1,1,0,0,1,0],
  },
  5 : {
    level : 2,
    name : "Effektives Arbeiten",
    text : `
      <p>Du hast jetzt bereits ein wenig Erfahrung mit dem Programmieren von Ameisen. Dieses Tutorial möchte dir noch ein paar kleine Tricks zeigen, mit denen du schon quasi wie ein "Profi" arbeiten kann.
      </p>
      
      <h4>Simulationsgeschwindigkeit einstellen</h4>
      
      <p>Vielleicht die nützlichste Funktion überhaupt: Mit den Zahlentasten 1, 2 und 3 kannst du während der Simulation von einer Aufgabe die Geschwindigkeit einstellen. 2 ist normal, 1 ist Zeitlupe und 3 ist ganz schnell.
      </p>
      
      <h4>Mit Tabs arbeiten</h4>
      
      <p>Wenn man nur in einen Tab arbeitet, ist es oft sehr umständlich, die Ameise zu bearbeiten und sich dann bei den Aufgaben durchzuklicken, um das Level zu starten. Das Problem lässt sich geschickt lösen, in dem man zwei Tabs im Browser verwendet:
      </p>
      
      <p><img src="/images/l2_tabs.png" class="img-thumbnail" title="Firefox, Chrome, Edge - nutze den Browser, der dir gefällt."></p>
      
      <p>In einem Tab kann man den Editor öffen, in anderem die Simulation laufen lassen. Wenn man die Ameise speichert, reicht es, die Simulation neu zu laden (mit einem Klick auf den runden Pfeil oder mit der Taste F5) - schon wird die neue Version der Ameise ausgeführt. Wer will kann auch den Bildschirm teilen und einen Tab links und den anderen Tab rechts anzeigen lassen.
      </p>
      
      <h4>Koordinatengitter verwenden</h4>
      
      <p>Mit der Taste G kann innerhalb Simulation ein Koordinatengitter um den Bau angezeigt werden. Damit kann man die Positionen von Objekten auf dem Spielfeld genau bestimmen. Das Koordinatengitter hat einen Abstand von 50 Ameisenschritten. ProTipp: Eine Diagonale hat eine Länge von 71 Ameisenschritten.
      </p>
      
      <h4>Sonderzeichen tippen</h4>
      
      <p>Hast du ausversehen eine Klammer oder ein Ausführungszeichen gelöscht und findest das Zeichen nicht mehr? Hier eine kleine Übersicht:
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>(</td>
            <td>Shift + 8</td>
          </tr>
          <tr>
            <td>)</td>
            <td>Shift + 9</td>
          </tr>
          <tr>
            <td>"</td>
            <td>Shift + 2</td>
          </tr>
          <tr>
            <td>/</td>
            <td>Shift + 7</td>
          </tr>
          <tr>
            <td>{</td>
            <td>Alt Gr + 7</td>
          </tr>
          <tr>
            <td>}</td>
            <td>Alt Gr + 0</td>
          </tr>
        </tbody>
      </table> 
      
      Falls dir das Tippen schwerfällt (selbst mit Auto-Vervollständigung und Vorlage), kann du mit einem Tipptrainer (z.B. Tipp10) etwas üben. Tippen ist hauptsächlich Übungssache und jeder kann sich darin verbessern - wenn er/sie es will.
      </p>
      
      <h4>Mit Tastenkürzel speichern</h4>
      
      <p>ProTipp: Anstatt auf "Speichern" zu klicken, kann man den Editor auch mit Strg-S schließen. Praktisch, wenn man nach dem Tippen nicht gleich zur Maus greifen möchte.</p>
      
      <h4>Kommentare nutzen</h4>
      
      <p>Oft möchte man etwas ausprobieren, aber nicht den ganzen Code löschen. In dieser Situation können einzelne Zeilen mit <code>//</code> auskommentiert werden:
      </p>
      
      <p><img src="/images/l2_kommentar.png" class="img-thumbnail" title="Da hat jemand den Ereignisnamen vergessen."></p>
      
      <p>Zeile 7 und 8 sind auskommentiert und werden nicht ausgeführt.
      </p>
    `,
    questions : [
      "Taste 1 ist die normale Geschwindigkeit.",
      "Man kann mehrerer Tabs für AntIT! nutzen.",
      "Die Seite kann mit Alt + F4 neugeladen werden.",
      "Die öffnende geschweifte Klammer wird mit Alt Gr + 7 getippt.",
      "Mit Strg + S kann man im Editor speichern.",
      "Zwei Schrägstriche kommentieren eine Zeile im Code aus."
    ],
    solution : [0,1,0,1,1,1],
  },
  13 : {
    level : 2,
    name : "Teamwork [API]",
    text : `
      <p>Bei so vielen Ameisen ergibt es sich ganz natürlich, dass man das Ameisenvolk aufteilen  möchte. Jedes Team soll dann eine eigene Aufgabe bekommen. Wir werden in diesem Tutorial sehen, wie das geht und lernen dabei auch bedinge Anweisungen kennen.
      </p>
      
      <p>Über eine <em>Teamdefinition</em> kannst du festlegen, in wie viele Teams das Volk unterteilt wird. Der wesentliche Parameter ist dabei die Anzahl der Teams. Diese übergibt man an eine Funktion namens "SetzeTeams" (die aber kein normaler Befehl ist!). Die Teamdefinition kommt direkt nach der Ameisendefinition und vor allen Ereignisdefinitionen:
      </p>
      
      <p><img src="/images/l2_teamdef.png" class="img-thumbnail" title=""></p>
      
      <p>Sind Teams definiert, dann werden die Ameisen der Reihenfolge ihrer Geburt nach abwechselnd in die Teams eingeteilt. Die Teams haben jeweils eine Nummer, die Informatiker-typisch mit 0 beginnend durchnummeriert sind. Hier konkret: Sind 3 Teams gesetzt, dann wird die erste Ameise in das Team 0 eingeteilt, die zweite Ameise in das Team 1 und die dritte Ameise in das Team 2. Die vierte Ameise kommt dann in das Team 0, die fünfte in das Team 1 und so weiter ... Damit sind alle Teams von der Größe her ausgeglichen.
      </p>
      
      <p>Innerhalb der Anweisungen können die Befehle dann für die einzelnen Teams festgelegt werden. Dabei wird der normale Anweisungsblock nochmal in einzelne <em>bedingte Anweisungsblöcke</em> unterteilt: 
      </p>
      
      <p><img src="/images/l2_inteam.png" class="img-thumbnail" title=""></p>
      
      <p>Alle Befehle finden sich hier also innerhalb von bedingten Anweisungen. Die erste Zeile einer bedingten Anweisung ist eine Kopfzeile, die die <em>Bedingung</em> festlegt. Die Funktion <code>InTeam</code> nimmt als Parameter die Nummer des Teams und sagt, ob eine Ameise innerhalb dieses Teams ist oder nicht. Trifft diese Bedingung ein, dann werden die Anweisungen ausgeführt, sonst nicht. Die Kopfzeile öffnet eine geschweifte Klammer, die in der Schlusszeile wieder geschlossen wird. Die Befehle innerhalb einer bedingten Anweisungen werden nochmal eingerückt, also insgesamt zweimal eingerückt.
      </p>
      
      <p>Bedingte Anweisungen werden uns noch in vielen anderen Situationen begegnen. Tatsächlich machen Bedingungen einen großen Anteil am Code aus. Hier werden wir uns ganz langsam an sie herantasten. Um das obige Beispiel nochmal zu veranschaulichen: Wird die erste Ameise geboren, wird diese in das Team 0 eingeteilt. Dann wird für diese Ameise das Ereignis "IstGeboren" aufgerufen. Die (normalen) Anweisungen werden ausgeführt. Diese bestehen aus bedingten Anweisungen, also werden diese nacheinander geprüft. Die erste Bedingung ist erfüllt und die Ameise bekommt den Befehl, sich nach Osten zu drehen und 200 Schritte zu gehen. Die zweite und die dritte Bedingung sind nicht erfüllt und werden daher nicht ausgeführt. Bei der zweiten Ameise ist die erste Bedingung nicht erfüllt, dafür aber die zweite Bedingung und die Anweisungen dort werden ausgeführt ...
      </p>
    `,
    questions : [
      "Die Teamdefinition legt die Anzahl der Teams fest.",
      "Die erste Ameise kommt in das Team 1.",
      "Bedingte Anweisungen kommen innerhalb von Ereignissen vor.",
      "\"InTeam(2)\" prüft, ob die Ameise im dritten Team ist.",
      "Das zweite Codebeispiel enthält 10 geschweifte Klammern.",
      "Bedingte Anweisungen werden nochmals eingerückt.",
    ],
    solution : [1,0,1,1,0,1]
  },
  6 : {
    level : 3,
    name : "Programmieren für Fortgeschrittene [API]",
    text : `
      <p>Jetzt ist der Zeitpunkt gekommen, um uns nochmal intensiv mit Ereignissen zu beschäftigen. Bisher kennst du nur "IstGeboren". In diesem Tutorial wirst du (endlich!) weitere Ereignisse kennenlernen.
      </p>
      
      <p>Stell dir das Leben einer Ameise als Zeitstrahl vor. Am Anfang steht die Geburt und am Ende der Tod. Ein Ereignis ist im Kern die Definition eines Zeitpunkts. Diese können als Kreuze auf dem Zeitstrahl dargestellt werden.
      </p>
      
      <p><img src="/images/l3_zeitstrahl1.png" class="img-thumbnail" title=""></p>
      
      <p>Die Befehle, die die Ameise als Anweisungen in der Ereignisdefinition erhalten hat, werden dann unmittelbar danach ausgeführt. Diese werden also als pinken Strich dargestellt.
      </p>
      
      <p><img src="/images/l3_zeitstrahl2.png" class="img-thumbnail" title=""></p>
      
      <p>Soweit kennen wir das System bereits. Jetzt kommt ein neues Ereignis hinzu: <code>"IstUntätig"</code>. Dieses Ereignis wird immer dann aufgerufen, wenn die Ameise ihre Anweisungen fertig ausgeführt hat.
      </p>
      
      <p><img src="/images/l3_zeitstrahl3.png" class="img-thumbnail" title=""></p>
      
      <p>Im Unterschied zu "IstGeboren" kann "IstUntätig" mehrfach aufgerufen werden, und zwar immer, wenn die Ameise mit ihren Anweisungen fertig ist. Diesen Umstand kann man nutzen, um die Ameise eine Tätigkeit wiederholen zu lassen.
      </p>
      
      <p><img src="/images/l3_zeitstrahl4.png" class="img-thumbnail" title=""></p>
      
      <p>Wir geben der Ameise bei der Geburt ein paar kleine Anweisungen. Diese werden einmalig ausgeführt. Dann wird "IstUntätig" immer wieder aufgerufen und die Ameise arbeitet in einer Schleife. Die Ameise kann z.B. das Spielfeld ablaufen.
      </p>
      
      <p>Über Ereignisse können die Ameisen Nahrungsmittel wahrnehmen. Sieht die Ameise innerhalb ihres Sichtbereichs von 70 Schritten einen Zuckerhaufen, dann wird das Ereignis <code>"SiehtZucker"</code> aufgerufen. Die Ameise unterbricht ihre Anweisungen und führt stattdessen die Anweisungen des neuen Ereignisses aus:
      </p>
      
      <p><img src="/images/l3_zeitstrahl5.png" class="img-thumbnail" title=""></p>
      
      <p>Hier sieht man, wie bei der zweiten Schleife die Ameise einen Zuckerhaufen sieht und ihre Tätigkeit unterbricht. Stattdessen werden die Anweisungen von "SiehtZucker" ausgeführt. Sind diese fertig, wird wieder "IstUntätig" aufgerufen.
      </p>
      
      <p>Analog dazu gibt es auch das Ereignis <code>"SiehtApfel"</code>, das aufgerufen wird, wenn die Ameise einen Apfel sieht. Mit diesen Ereignissen kann man jetzt eine Ameise programmieren, die das Spielfeld absucht und Nahrungsmittel finden kann. Bisher musste man immer genau wissen, wo die Nahrungsmittel sind, weil die Ameisen "blind" waren. Jetzt können sie sehen.
      </p>
      
      <p>Im nächsten Tutorial lernst du, wie du diese Ereignisse im Code umsetzen kannst.
      </p>
    `,
    questions : [
      "Ereignisse sind im Kern Zeitpunkte.",
      "\"IstGeboren\" wird mehrfach aufgerufen.",
      "Der Zeitstrahl läuft von rechts nach links.",
      "\"IstUntätig\" und \"IstGeboren\" kann man kombinieren.",
      "IstGeboren und IstUntätig haben die gleiche Anzahl an Buchstaben.",
      "Mit \"SiehtZucker\" und \"SiehtApfel\" kann die Ameise Nahrungsmittel sehen."
    ],
    solution : [1,0,0,1,1,1],
  },
  12 : {
    level : 3,
    name : "Suchen und Finden [API]",
    text : `
      <p>Jetzt werden wir das Wissen des letzten Tutorials konkret auf ein Ameisenvolk anwenden. Folge dazu den Schritten dieser Anleitung. Diese bereiten die erste Aufgabe dieser Stufe vor.
      </p>
      
      <ol>
        <li><p>Erstelle ein neues Ameisenvolk mit dem Namen "Stufe 3 Aufgabe 1".
        </p>
        </li>
        <li><p>Trage in die Kopfzeile der ersten Ereignisdefinition den Ereignisnamen "IstUntätig" ein.
        </p>
        </li>
        <li><p>Klicke auf die Schaltfläche "Ereignis hinzufügen" im Editor, die ab jetzt verfügbar ist. Diese erzeugt eine neue Vorlage für eine Ereignisdefinition. Trage in die Kopfzeile der zweiten Ereignisdefinition den Ereignisnamen "SiehtZucker" ein. Jetzt haben wir zwei Ereignisse definiert und der Code sollte so aussehen:<img src="/images/l3_tut1_1.png" class="img-thumbnail">
        </p>
        </li>
        <li><p>Neu kommt hinzu, dass das Ereignis "SiehtZucker" einen Parameter annimmt. Bisher haben wir nur Parameter weitergegeben, jetzt nehmen wir selber einen Parameter an. Dieser Parameter ist das Zuckerobjekt, das wir gesehen haben und wir geben diesem Objekt einen Namen. Schreibe dazu in die runden Klammern der Kopfzeile "zucker" (Zeile 7). Dieses Objekt übergeben wir an den neuen Befehl <code>GeheZuZiel</code> (Zeile 8):<img src="/images/l3_tut1_2.png" class="img-thumbnail" title="Der Name des Parameters darf frei gewählt werden."><br>
        </p>
        </li>
        <li><p>Entsprechend gibt es das Ereignis "SiehtApfel". Füge ein weiteres Ereignis hinzu und trage als Ereignisname "SiehtApfel" ein. Schreibe den Parameter dazu und lasse die Ameise auf diesen Apfel zulaufen.
        </p>
        </li>
        <li><p>Ergänze die Anweisungen für SiehtZucker und SiehtApfel so, dass die Ameise die Nahrungsmittel jeweils auch zum Bau transportiert.
        </p></li>
        <li><p>Überlege dir, welche Tätigkeit die Ameise bei "IstUntätig" ausführen soll, damit sie möglichst gut das Spielfeld ablaufen kann.
        </p></li>
      </ol>
      
      <p>Damit hast du das Grundgerüst einer suchenden Ameise zur Hand. Sie ist noch nicht perfekt. Man muss nämlich beachten, dass eine Ameise nur eine Reichweite von 3000 Schritten hat. Überschreitet sie diese Reichweite, dann stirbt sie. Wenn sie zum Bau zurückkehrt, kann sie ihre Reichweite wiederherstellen. Diese Reichweite ist für den Moment genug. Auf der nächsten Stufe wirst du lernen, wie man verhindert, dass die Ameise ihre Reichweite überschreitet und stirbt.
      </p>
    `,
    questions : [
      "Ereignisse nehmen nie Parameter.",
      "SiehtZucker besteht aus 10 Buchstaben.",
      "Eine Ameise hat eine Sichtweite von 70 Ameisenschritten.",
      "GeheZuZiel kann für Zucker und Äpfel verwendet werden.",
      "Ameisen sind blind für Äpfel.",
      "Dieses Tutorial hat 6 Unterpunkte."
    ],
    solution : [0,0,1,1,0,0],
  },
  14 : {
    level : 3,
    name : "Gefahren ausweichen [API]",
    text : `
      <p>Damit sich die Ameise schützen kann, gibt es außerdem eine Reihe von Funktionen, mit denen die Ameise ihre Feinde wahrnehmen und auf diese reagieren kann.
      </p>
      
      <p>Wanzen auf dem Spielfeld in Sichtweite nimmt die Ameise mit dem Ereignis namens <code>"SiehtWanze"</code> wahr. Dieses Ereignis liefert einen Parameter mit, der die Wanze darstellt. Mit <code>DreheWegVonObjekt</code> kann sich die Ameise von der Wanze wegbewegen. Es gibt noch die spezielle Variante <code>"SiehtWanzeVoraus"</code>, die aufgerufen wird, wenn sich die Wanze im Winkel +-45 Grad vor der Ameise befindet. In diesem Fall wird "SiehtWanze" ebenfalls aufgerufen.
      </p>
      
      <p>Ameisen aus gegnerischen Teams werden mit dem Ereignis <code>"SiehtGegner"</code> wahrgenommen. Der Vollständigkeit halber sei noch erwähnt, dass es zu DreheWegVonObjekt noch das Gegenstück <code>DreheZuObjekt</code> existiert. Dieser Befehl dreht die Ameise auf ein Objekt zu. 
      </p>
      
      <p>Im Gefahrenfall kann man die Ameise auch einfach in Schockstarre versetzen. Mit dem Befehl <code>Warte</code> kann man die Ameise eine gewisse Zeit lang stehen lassen. Die Zeit wird dabei in Anzahl Ticks angegeben. Normalerweise vergehen 40 Ticks pro Sekunde. In dieser Zeit tut die Ameise nichts.
      </p>
      
      <p>Der Rand stellt für die Ameisen zum Glück keine Lebensgefahr dar. Trotzdem ist es gut, wenn sie darauf reagieren kann. Das Ereignis <code>"RandErreicht"</code> wird aufgerufen, wenn die Ameise an den Rand angestoßen ist. Sie kann sich dann z.B. um einen bestimmten Winkel drehen oder zum Bau zurückkehren.
      </p>
      
      <p>Nicht alle Funktionen sind immer sinnvoll. Hier ist mal ein Beispiel, das ziemlich willkürlich gewählt ist. Dafür zeigt es zumindest, wie die Ereignisse und Befehle verwendet werden:
      </p>
      
      <p><img src="/images/l3_ausweichen.png" class="img-thumbnail">
      </p>
    `,
    questions : [
      "Eine Ameise kann auf Gegner und Wanzen reagieren.",
      "Eine Ameise kann sich zu einem Objekt hin und weg von einem Objekt drehen.",
      "Die Wartezeit für den Befehl Warte wird in Millisekunden angegeben.",
      "DreheWegVonObjekt hat sechs Vokale.",
      "Wenn die Ameise den Rand erreicht wird das Ereignis IstAmRand aufgerufen.",
      "Wenn SiehtWanzeVoraus aufgerufen wird, dann wird SiehtWanze nicht aufgerufen."
    ],
    solution : [1,1,0,1,0,0],
  },
  7 : {
    level : 4,
    name : "Gift, Zufall und Fühler [API]",
    text : `
      <p>Bisher konntest du gegen die Wanzen nichts tun: Sie standen im Weg und du musstest ihnen ausweichen. Das ändert sich jetzt, denn du lernst, wie du die giftige Ladung deiner Ameisen dazu einsetzen kannst, Wanzen zu beseitigen.
      </p>
      
      <p>Dafür hast den den neuen Befehl <code>SetzeGift()</code> zur Verfügung. Diese lässt die Ameise eine Giftwolke versprühen, die sich wie ein Nebel um die Ameise legt:
      </p>
      
      <p><img src="/images/l4_gift.png" class="img-thumbnail" title="Es kommt immer auf die Dosis an!"></p>
      
      <p>Für den optimalen Einsatz des Gifts sind ein paar Punkte zu beachten:
      <ul>
      <li>Eine Giftwolke hat einen Radius von 80 Ameisenschritten. (Zum Vergleich: Der Sichtradius beträgt 70 Ameisenschritte)
      </li>
      <li>Eine Giftwolke hält 160 Ticks (das entsprechen 4 Sekunden). Danach verstreut sie sich wieder.
      </li>
      <li>Giftwolken werden erst dann giftig, wenn mindestens 3 Wolken sich überlappen. In diesen Bereichen sterben Wanzen und gegnerische Ameisen sofort.
      </li>
      <li>Eine Ameise kann nur eine Ladung Gift setzen. Danach muss sie zum Bau zurückkehren (mit dem Befehl GeheZuBau()) und regeneriert dort ihre Ladung.
      </li>
      </ul>
      </p>
      
      <p>Viel Spaß beim Kämpfen!
      </p>
      
      <p>Die weiteren zwei Funktionen sind weniger aggressiv. So unscheinbar sie auch wirken, sind sie in einigen Situationen trotzdem unersetzlich.
      </p>
      
      <p>Die erste Funktion gibt den Ameisen die Möglichkeit, Zufallszahlen zu erzeugen. Für eine Computerameise, die ein komplett vorherbestimmtes Leben hat, ist dies keine einfache Leistung. Ohne sich in die technischen Details zu verstricken ist es trotzdem möglich und es steht der Befehl <code>Zufall</code> zur Verfügung. Dieser Befehl nimmt zwei Parameter, die den Bereich angeben, innerhalb dessen eine Zahl erzeugt werden soll. Ein paar Beispiele:
      </p>
      
      <p><img src="/images/l4_zufall.png" class="img-thumbnail" title="* = Multiplikation"></p>
      
      <p>Die Funktion Zufall kann dort verwendet werden, so sonst eine feste Zahl stehen würde. Diese Zahl wird nun zufällig bestimmt. In Zeile 5 geht die Ameise 100 bis 300 Schritte, in Zeile 6 dreht sich die Ameise zwischen -30 bis 30 Grad. In Zeile 7 dreht sich die Ameise in eine der Richtung 0, 90, 180 oder 270.
      </p>
      
      <p>Zum Schluss verfügt die Ameise ab dieser Stufe über die zwei neuen Befehle <code>GeheZuBauOffen()</code> und <code>GeheZuZielOffen</code>. Das sind ganz klar Varianten von den bekannten Befehlen. Was ist da nun der Unterschied?
      </p>
      
      <p>Diese Befehle haben mit den Fühlern der Ameise zu tun. Diese Fühler sind normalerweise geschlossen, wenn die Ameise zum Bau, zu einem Apfel oder zu einem Zucker geht (oder gehen wird). Erst wenn die Ameise das Ziel erreicht hat, schaut sie sich wieder um. Konkret heißt es, dass auf dem Weg zum Ziel die beiden Ereignisse "SiehtZucker" und "SiehtApfel" zeitweise deaktiviert werden. Das ist ein vernünftiges Verhalten, denn die Ameise hat ja bereits ein Ziel und soll nicht abgelenkt werden (und sich womöglich in eine Schleife festsetzen).
      </p>
      
      <p>In speziellen Situationen möchte man aber dieses Verhalten nicht. In diesen Fällen kann man die Fühler offen lassen und die Ereignisse "SiehtZucker" und "SiehtApfel" weiter aufrufen lassen. Ein Beispiele wäre, wenn die Ameise zum Bau zurückkehrt, aber auf dem Weg dahin gerne nach Nahrungsmittel mitnehmen würde. Dann kann diese spezielle Variante verwendet werden. Sonst verhalten sich die Befehle genau gleich.
      </p>
      
      <p>"SiehtWanze" und "SiehtGegner" sind davon ausgenommen. Diese werden immer aufgerufen, unabhängig von den Fühlern.
      </p>
    `,
    questions : [
      "Wanzen sind unsterblich.",
      "Die Reichweite von Gift ist größer als die Sichtweite",
      "Giftwolken bleiben für immer bestehen.",
      "Zufallszahlen zu erzeugen ist nicht trivial.",
      "Zufall(3,6) hat die möglichen Ergebnisse 3, 4, 5 und 6.",
      "Wenn die Fühler geschlossen sind, werden trotzdem noch Wanzen gesehen."
    ],
    solution : [0,1,0,1,1,1],
  },
  8 : {
    level : 4,
    name : "Hinter den Kulissen: Das Ameisenaufgabenverzeichnis",
    text : `
      <p>Unter der Oberfläche einer Programmiersprache passieren eine Menge an Sachen. Im Idealfall funktionieren diese so wie erwartet und man muss seine Aufmerksamkeit nicht darauf richten. Als Programmierer möchte man den Befehl "Gehe" schreiben und man erwartet, dass die Simulation die Position entsprechend aktualisieren, die Interaktionen mit dem Spielfeld korrekt passieren und schließlich die 3D-Ansicht sich neu zeichnet. Wenn es gut läuft braucht man sich nicht mit den Details zu beschäftigen.
      </p>
      
      <p>Glücklicherweise hat AntIT! mittlerweile eine Stabilität erreicht, wo man sich darüber tatsächlich keine Sorgen machen muss. Alle Sprachelemente sind schon in vielen Kombinationen getestet worden und Fehler korrigiert. In den ersten Workshops kam es z.B. noch regelmäßig vor, dass Befehle nicht ausgeführt wurden oder Ereignisse nicht oder falsch aufgerufen wurden.
      </p>
      
      <p>Trotzdem <em>kann</em> es den einen oder anderen Interessieren, wie die Abläufe hinter den Kulissen genau ablaufen. Insbesondere wenn jemand AntIT! weiterentwickeln möchte, muss diese Person sich mit den Details beschäftigen. Das gilt auch für mich als Entwickler. Dieses Tutorial ist auch für mich geschrieben, damit ich an in ein paar Jahren noch weiß, wie die Ameisen hier funktionieren.
      </p>
      
      <p>Wir wollen uns jetzt also das <strong>Ameisenaufgabenverzeichnis</strong> anschauen. Dieser Teil kümmert sich darum, dass Befehle entgegen genommen werden und später zum richtigen Zeitpunkt ausgeführt werden. Dieser Teil ist die erste Schnittstelle, die man als Programmierer mit dem System hat. Daher habe ich mich dazu entschieden, meine Erklärungen mit dem Ameisenaufgabenverzeichnis zu beginnen (und nicht mit der Simulation oder der 3D-Ansicht, was sicherlich auch manche interessieren würde).
      </p>
      
      <p>Um die Situation ein wenig zu illustrieren beginne ich mit einer kleinen Geschichte. Diese möchte zeigen, dass es zu Problemen kommen kann, wenn mehrere Personen an einer Sache gleichzeitig arbeiten:
      </p>
      
      <p><em>Die Firma ABC bietet ein teures Gerät tageweise zum Verleih an. Leider ist diese Firma noch schlecht vernetzt und verwaltet die Verfügbarkeit des Geräts über eine schriftliche Liste im Zimmer 102. Die Mitarbeiter, die mit den Kunden kommunizieren, müssen bei Anfragen in das Zimmer 102 kommen, die Liste überprüfen und sich dann dort eintragen. Es ist geplant, das System möglichst bald umzustellen, aber noch ist das nicht geschehen.</em>
      </p>
      
      <p><em>So passiert es also, dass eines Tages der Kunde X anruft und den Mitarbeiter Y fragt, ob er das Gerät für den 2. Dezember ausleihen könnte. Der Mitarbeiter Y freut sich über die Anfrage und geht sofort los in das Zimmer 102, um die Verfügbarkeit zu überprüfen. In diesem Moment ruft der Kunde &alpha; an. Dieser hat den Mitarbeiter &beta; am Apparat und möchte ebenfalls das Gerät für den 2. Dezember ausleihen. Also geht er auch dieser los zum Zimmer 102. Auf dem Weg treffen sich die beiden Mitarbeiter nicht. Beide sehen, dass der 2. Dezember noch verfügbar ist.</em>
      </p>
      
      <p><em>Das teilen sie ihren Kunden mit und versprechen, das Gerät für diesen Tag unverzüglich in der Liste zu reservieren. Die Kunden verabschieden sich und gehen davon aus, dass alles geklappt hat. Nun gehen Mitarbeiter Y und Mitarbeiter &beta; wieder in das Zimmer 102, um die Reservierung durchzuführen. Als &beta; ankommt, sieht dieser, wie sich Y gerade für den 2. Dezember eingetragen hat. Sein Gesichtsausdruck war sicherlich sehr verdutzt. Hatte er nicht extra überprüft, dass die Liste frei war? Wie konnte es dann zu dieser Situation kommen?</em>
      </p>
      
      <p>Innerhalb der Simulation laufen viele Sachen gleichzeitig ab. Wenn die Simulation so schlecht verwaltet wird wie die Firma ABC, dann kann es passieren, dass Ameisen einen Apfel tragen sollen, der schon von einem anderen Team weggeschnappt worden ist oder sich ein Zuckerstück von einem leeren Zuckerhaufen nehmen. Das sind Fehlerzustände, die unbedingt verhindert werden sollten.
      </p>
      
      <p>Die Programmiersprache, in der die Ameisen entwickelt sind, hat für dieses Problem ein einfaches wie radikales Mittel: Sie hat nur einen einzigen Mitarbeiter und dieser kümmert sich um alle Geschäfte. Mit nur einem Mitarbeiter wäre der Firma ABC dieser Fehler nicht passiert: Der Mitarbeiter arbeitet zuerst den Kunden X ab und kümmert sich dann um den Kunden &alpha;, dem er dann absagen wird.
      </p>
      
      <p>Diese Lösung hat natürlich auch ihren Preis. Die Telefonwarteschlange der Firma ABC ist nun öfters in Gebrauch. Für AntIT! heißt es, dass wir nun das Ameisenaufgabenverzeichnis einführen müssen. So läuft das genau ab:
      </p>
      
      <p>Die Firma AntIT! führt Ameisensimulationen durch. Dazu haben sie einen Raum, in dem die ganze Simulation nachgebaut ist. Ein Mitarbeiter verwaltet die Simulation und verschiebt die Ameisenfiguren entsprechend den Anweisungen der Programmierer. Um Probleme mit der Synchronität zu vermeiden hat die Firma AntIT! nur einen einzigen Mitarbeiter angestellt.
      </p>
      
      <p>Der Mitarbeiter berechnet die Simulation Tick für Tick. Für jede Ameise auf dem Spielfeld führt er einen Eintrag im Ameisenaufgabenverzeichnis, kurz AAV. Dort steht drin, welchen Befehl die Ameise gerade ausführt, z.B., dass die Ameise 200 Schritte gehen soll. Der Mitarbeiter verschiebt die Ameise pro Tick immer nur um ein kleines Stückchen, aber irgendwann hat er die 200 Schritte geschafft und hakt die Aufgabe im AAV als erledigt ab. Um das AAV zu füllen, ruft der Mitarbeiter immer wieder die Programmierer an.
      </p>
      
      <p>Beispielsweise wird eine neue Ameise geboren. Der Mitarbeiter stellt die Ameise auf das Spielfeld, erstellt für diese Ameise einen Eintrag im AAV und ruft den Programmierer an: "Hey, eine neue Ameise ist geboren. Was soll sie tun?". Der Programmierer antwortet: "Die Ameise soll bitte 300 Schritte gehen und sich dann um 90 Grad drehen." Der Mitarbeiter trägt diese beiden Befehle im AAV ein. Tick für Tick arbeitet er diese ab. Sobald der Mitarbeiter sieht, dass die Ameise mit beiden Befehlen fertig ist, ruft er wieder die Programmierer an: "Hey, die Ameise hat nichts mehr zu tun. Soll sie was machen?" Der Programmierer antwortet: "Gehe jetzt 500 Schritte". Der Mitarbeiter trägt das wieder ins AAV ein. Wenn der Mitarbeiter feststellt, dass die Ameise einen Zucker sieht, ruft er wieder den Programmierer an: "Hey, deine Ameise hat gerade einen Zucker gesehen. Was soll sie machen?" ... So geht das Spiel immer weiter.
      </p>
      
      <p>Die Anrufe des Mitarbeiters entsprechen den Ereignissen der Simulation wie "IstGeboren", "IstUntätig" oder "SiehtZucker". Als Programmierer schreibt man rein, welche Befehle die Ameise dann ausführen soll. Diese werden vom Mitarbeiter nicht sofort ausgeführt, sondern erstmal in das AAV eingetragen. Davon merkt man als Programmierer eigentlich nichts. Es wirkt so, als ob die einzelnen Befehle direkt danach ausgeführt werden.
      </p>
      
      <p>An zwei Punkten muss man sich aber doch mit den Feinheiten des AAV beschäftigen. Diese möchte ich hier zum Schluss noch erwähnen:
      </p>
      
      <ol>
      <li><p>Was ist nämlich, wenn der Programmierer Anweisungen gibt und es noch unfertige Befehle im AAV gibt, typischerweise dann, wenn die Ameise etwas sieht. Wie soll der Mitarbeiter mit den Befehlen im AAV umgehen? Dafür wurde folgende Regelung gesetzt, die sich im praktischen Alltag bewährt hat: Falls die neuen Anweisungen den Befehl "GeheZuBau" oder "GeheZuZiel" enthalten, dann werden die alten Befehle im AAV gelöscht. Es wird davon ausgegangen, dass diese keine Bedeutung mehr haben. Das ist der Normalfall. Falls die neuen Anweisungen diese Befehle aber nicht enthalten, dann wird davon ausgegangen, dass die alten Anweisungen noch gebraucht werden und die neuen Anweisungen werden <em>vor</em> den alten Anweisungen ausgeführt. Der wesentliche Anwendungsfall ist, wenn man einer Wanze ausweicht.
      </p></li>
      <li><p>Auf der nächsten Stufe wirst du bedingte Anweisungen kennenlernen, um beispielsweise mit der Reichweite oder der Runde umzugehen. Diese Anweisungen passen erstmal nicht in das Schema des AAV. Solange die Abfragen einfach sind und nicht mit anderen Befehlen verschachtelt werden, kommt es auch noch nicht zu Problemen. Zu diesem Punkt wird es an gegebener Stelle nochmal ein Tutorial geben.
      </p></li>
      </ol>
    `,
    questions : [
      "Solange die Dinge wie erwartet funktionieren benötigt man kein Wissen über die Details.",
      "AntIT! enthält viele Bugs.",
      "AntIT! ist die beste Ameisensimulation der Welt.",
      "Bei mehreren Mitarbeitern kommt es nie zu Problemen.",
      "Die Programmiersprache der Ameisen enthält genau zwei Mitarbeiter.",
      "Dieser Satz enhält sechs Wörter."
    ],
    solution : [1,0,1,0,0,0],
  },
  9 : {
    level : 5,
    name : "Kommunikation [API]",
    text : `
      <p>Die Ameisen sind in der jetzigen Form ziemliche Eigenbrötler: Sie arbeiten ihre Aufgaben ab und kümmern sich eigentlich nicht darum, was ihre Kollegen machen.
      </p>
      
      <p>Und bisher ging das auch ziemlich gut. Bisher. Die erste Aufgabe dieser Stufe bietet in dieser Hinsicht eine Herausforderung: Auf dem Spielfeld befindet sich zu jeder Zeit nur ein Apfel. Diesen müssen die Ameisen aber gemeinsam zum Bau tragen. Es wäre doch praktisch, wenn die Ameise, die als erstes beim Apfel ist, an ihre Kollegen eine Nachricht schicken könnte?
      </p>
      
      <p>In diesem Tutorial wird es genau darum gehen, wie man kommuniziert. Dazu können die Ameisen Nachrichten senden. Eine Nachricht kann mit dem Befehl <code>SendeNachricht</code> verschickt werden. Eine Nachricht besteht aus einem Betreff und einem (optionalen) Inhalt. Der Betreff ist ein frei wählbarer Text, der verwendet wird, um verschiedene Nachrichtentypen zu unterscheiden. Sehen wir uns dazu mal ein erstes Beispiel an:
      </p>
      
      <p><img src="/images/l5_sendetanzt.png" class="img-thumbnail"></p>
      
      <p>Die Ameise geht 1000 Schritte. Dann sendet sie eine Nachricht mit dem Betreff "Tanzt!". Danach geht sie zum Bau. Der Nachrichtenbefehl kann jederzeit wie ein normaler Befehl eingesetzt werden. Um auf diese Nachricht zu reagieren, fügen wir dem Code eine weitere Ereignisdefinition hinzu:
      </p>
      
      <p><img src="/images/l5_empfangetanzt.png" class="img-thumbnail"></p>
      
      <p>Der Ereignisname entspricht dem Betreff mit einem Doppelpunkt vorangestellt. Dieser Doppelpunkt bedeutet: Das hier ist eine Nachricht. Jede Ameise empfängt diese Nachricht und führt dann die Anweisungen aus, in diesem Fall dreht sie sich einmal um 360 Grad.
      </p>
      
      <p>Je näher eine Ameise am Sender, umso früher bekommt sie die Nachricht. Man kann festlegen, dass nur eine bestimmte Anzahl an Ameisen eine Nachricht bekommt. Wenn eine feste Anzahl an Ameisen um den Sender herum die Nachricht erhalten haben, dann wird sie nicht mehr weitergegeben. Dafür schreibt man unmittelbar vor dem Nachrichtenbefehl den Befehl <code>SetzeLimit</code> und gibt als Parameter an, wie viele Ameisen die Nachricht erhalten sollen:
      </p>
      
      <p><img src="/images/l5_sendetanztlimit.png" class="img-thumbnail"></p>
      
      <hr>
      
      <p>Die Nachrichten haben eine weitere coole Funktion: Mit ihnen kann man auch zusätzliche Informationen übertragen. Deine Ameise hat zum Beispiel einen Apfel gesehen und du möchtest den anderen Ameisen sagen, wo dieser Apfel ist.  Dann kannst du das Apfelobjekt als Parameter zum Nachrichtenbefehl hinzufügen:
      </p>
      
      <p><img src="/images/l5_sende.png" class="img-thumbnail"></p>
      
      <p>In diesem Beispiel sieht die Ameise einen Apfel und sendet eine Nachricht mit dem Betreff "ApfelGesehen" und dem Apfelobjekt als Inhalt. Auf entsprechende Weise kann man der Ereignisdefinition einen Parameter hinzufügen und beispielsweise auf diesen Apfel zulaufen:
      </p>
      
      <p><img src="/images/l5_empfange.png" class="img-thumbnail"></p>
      
      <hr>
      
      <p>Der Inhalt ist nicht auf Objekte beschränkt. Es spricht nichts dagegen, auch Zahlen oder andere Daten zu übertragen. Wenn wir nochmal kurz zu unserem Anfangsbeispiel zurückkehren. Hier können wir angeben, wie viele Runden die Ameisen tanzen sollen:
      </p>
      
      <p><img src="/images/l5_tanztparameter.png" class="img-thumbnail"></p>
    `,
    questions : [
      "Ameisen können nicht miteinander reden.",
      "Beim Nahrungssammeln kann Kommunikation sehr nützlich sein.",
      "Nachrichten werden mit dem Befehl 'Rufe' verschickt.",
      "Über SetzeLimit kann die Anzahl der Empfänger eingeschränkt werden.",
      "KOMMUNIKATION enthält einen Konsonant mehr als Vokale.",
      "Nachrichten bestehen nur aus einem Betreff."
    ],
    solution : [0,1,0,1,1,0],
  },
  53 : {
    level : 5,
    name : "Reichweite und Runde abfragen [API]",
    text : `
      <p>Bedingte Anweisungen sind uns schon beim Teamwork begegnet. Jetzt lernst du eine Reihe von neuen Bedingungen kennen, mit denen du deine Ameisen steuern kannst.
      </p>
      
      <p>Wir erinnern uns zurück: Die Anweisungen innerhalb einer Ereignisdefinition können nochmals verschachtelt werden zu bedingten Anweisungen. Die bedingten Anweisungen haben ebenfalls eine Kopfzeile und eine Schlusszeile. Die Kopfzeile besteht aus dem Schlüsselwort "if", einem runden Paar Klammern mit der Bedingung und einer öffnenden geschweiften Klammer, die in der Schlusszeile wieder geschlossen wird:
      </p>
      
      <p><img src="/images/l5_bedingteleer.png" class="img-thumbnail"></p>
      
      <p>Dazwischen liegen die bedingten Anweisungen. In diesem Fall sind es die zwei Befehle Drehe(360) und Gehe(100). Diese Befehle werden ausgeführt, wenn zusätzlich zum Ereignis auch eine bestimmte Bedingung erfüllt ist. Jetzt geht es also um die Frage, was für Bedingungen uns zur Verfügung stehen.
      </p>
      
      <p>Eine Bedingung kann entweder den Wert true (wahr) oder false (falsch) haben. Der Computer schaut sich die Bedingung an und entscheidet dann, ob sie in der aktuellen Situation wahr oder falsch ist. Die Reichweite und die aktuellen Runde sind beides Zahlen. Für diese gibt es einige Vergleichsoperatoren.
      </p>
      
      <p>
      <script>
        function checkcond() {
          var cond = document.getElementById('cond').value
          var result 
          try {
            result = eval(cond)
          } catch (e) { }
          if (result === true || result === false) {
            document.getElementById('output').innerHTML = result
          } else {
            document.getElementById('output').innerHTML = "Keine Bedingung"
          }
        }
      </script>
      <input id="cond"><button onclick="checkcond()">Prüfen</button></p>
      <p><span style="margin-left:30px" id="output">...</span>
      </p>
      
      <p>Dieses Tool nimmt eine Bedingung und sagt dir, welchen Wert sie ergibt. Schreibe die folgenden Zeilen in das Tool und beobachte, welcher Wert herauskommt:
      </p>
      
      <p><pre>100 < 200
400 > 1000
10 >= 10
123
lalala</pre></p>

      <p>Die ersten drei Zeilen sind verschiedene Möglichkeiten, Zahlen miteinander zu vergleichen. Die entsprechen den Bedeutungen, die man aus dem Mathe-Unterricht kennt. 123 und lalala sind keine Bedingungen. Diese geben einen Fehler. Zusätzlich zu den Vergleichsoperatoren stehen uns die Variablen <code>Reichweite</code> und <code>Runde</code> zur Verfügung. Diese können innerhalb einer Bedingung verwendet werden:
      </p>
      
      <p><img src="/images/l5_bedingt2.png" class="img-thumbnail"></p>
      
      <p>In diesem Fall werden die bedingten Anweisungen nur ausgeführt, wenn die Rundenzahl kleiner als 500 ist. Die Rundenzahl startet bei 1 und zählt mit jedem Tick um eins hoch. In einer Sekunde vergehen bei normaler Geschwindigkeit 40 Ticks. Die Bedingung prüft, ob das Ereignis noch innerhalb der ersten 12,5 Sekunden der Simulation ist.
      </p>
      
      <p><img src="/images/l5_bedingt3.png" class="img-thumbnail"></p>
      
      <p>Diesmal werden die Anweisungen ausgeführt, wenn die Reichweite der Ameise größer als 2000 ist. Die Reichweite gibt an, wie viele Schritte die Ameise noch laufen kann. Sie ist zu Beginn bei 3000 und wird mit jedem Schritt runtergezählt. Bei 0 stirbt die Ameise an Müdigkeit.
      </p>
      
      <p>Es spricht nichts dagegen, auch hier wieder mehrere bedingte Anweisungen zu schreiben. Hier ändert die Ameise ihr Verhalten, je nach dem, ob die 1000. Runde vorbei ist oder nicht:
      </p>
      
      <p><img src="/images/l5_bedingt4.png" class="img-thumbnail"></p>
      
      <p>Bedingte Anweisungen können in jeder Ereignisdefinition verwendet werden. Sie empfehlen sich aber vor allem für "IstUntätig", um die Tätigkeit der Schleife zu steuern. Zum Beispiel kann die Ameise bei genügend großer Reichweite die Gegend erkunden und bei kleiner Reichweite zum Bau zurückkehren.
      </p>
    `,
    questions : [
    "Die Kopfzeile einer bedingten Anweisung beginnt mit 'if'",
    "Die bedingten Anweisungen sind in geschweiften Klammern eingeschlossen.",
    "Die Reichweite ist keine Zahl.",
    "42 == 42 ergibt true.",
    "1 = 1 ergibt true.",
    "42 ergibt true."
    ],
    solution : [1,1,0,1,0,0],
  },
  55 : {
    level : 5,
    name : "Der Ameisenwettbewerb",
    text : `
      <p>Ein Höhepunkt jedes Workshops ist der Ameisenwettbewerb, der bald stattfinden wird. Auf der Stufe 5 hast du nun Zugriff auf die Kampfarena. Dort kannst du deine Ameisen nochmal ausgiebig optimieren und schließlich gegeneinander antreten lassen.
      </p>
      
      <p>Für den Wettkampf dürfen und sollen alle Teile der API verwendet werden, die bisher vorgestellt wurden. Dazu gehören die Befehle und Ereignisse, Teamarbeit, Reichweite, Kommunikation und Gift. Gegnerische Ameisen zu vergiften kann empfindlichen Schaden verursachen und bringt für diesen Wettbewerb große Vorteile.
      </p>
      
      <p>Die Regeln einer Wettkampfrunde sind wie folgt:
      </p>
      
      <ul>
      <li>Es können zwei bis acht Ameisen an einer Runde teilnehmen.
      </li>
      <li>Der Sieger wird anhand von Punkten bestimmt. Es gibt Punkte für gesammelte Nahrung, 1000 Punkte für einen Apfel und 25 Punkte für ein Zuckerstücken (1250 Punkte für einen ganzen Zuckerhaufen). Pro vergiftete Wanze gibt es 500 Punkte, pro vergiftete Gegnerameise gibt es 300 Punkte.
      </li>
      <li>Zu Beginn starten 20 Ameisen nacheinander um den Bau. Gesammelte Nahrung vergrößert das Ameisenvolk auf bis zu 100 Ameisen.
      </li>
      <li>Eine Runde dauert 7500 Ticks (etwa 3 Minuten). Danach wird der Punktstand abgeschickt. Die Statusleiste zeigt dann "Simulation abgeschlossen" an.
      </li>
      </ul>
      
      <p>Der Wettbewerb erstreckt sich über mehrere Runden und die Sieger wird noch Turnierregeln, die an die Anzahl der Teilnehmer angepasst ist, bestimmt.
      </p>
      
      <p>Zur Vorbereitung auf den Wettbewerb stehen dir ab sofort zwei neue Werkzeuge zur Verfügung: Einerseits gibt es im Editor die neue Schaltfläche "Syntax überprüfen". Dieser checkt den Code auf gängige Fehler und stellt sicher, dass alle Klammern richtig gesetzt sind. Andererseits kannst du dir in der Simulation anzeigen lassen, wo die Ameisen sterben und wie sie sterben. Drücke in der Simulation die Taste T, um diese Funktion zu aktivieren.
      </p>
      
      <p>Vor dem Wettbewerb können vorab Testrunden gespielt werden. Wenn man seine Ameise freischaltet, kann diese von anderen Teams gespielt werden. Die Ergebnisse dieser Spiele kann in der Ergebnisübersicht gesehen werden. Um in der Übersicht angezeigt zu werden müssen alle Ameisen aus verschiedenen Teams stammen und es müssen mindestens zwei Ameisen an der Runde teilnehmen.
      </p>
      
      <p>Die Stufe 6 wird nach dem Wettbewerb freigeschaltet.
      </p>
    `,
    questions : [
      "Ab Stufe 5 kann man auf die Kampfarena zugreifen.",
      "Ein Zuckerhaufen besteht aus 15 Zuckerstücken.",
      "Vergiftete Gegner bringen mehr Punkte als vergiftete Wanzen.",
      "Eine Runde dauert etwa 3 Minuten.",
      "4 * 1250 == 5 * 1000",
      "Nach dem Wettbewerb geht es mit Stufe 6 weiter."
    ],
    solution : [1,0,0,1,1,1],
  },
  61 : {
    level : 6,
    name : "Programmieren in JS",
    text : `
      <p>[Vorstellung, wie man mit den Aufgaben umgeht.]
      </p>
    `,
    js: true,
    noq : true,
    questions : [
      "Frage 1",
      "Frage 2",
      "Frage 3",
      "Frage 4",
      "Frage 5",
      "Frage 6"
    ],
    solution : [0,0,0,1,1,1],
  },
  91 : {
    level : 9,
    name : "Weitere Inhalte",
    text : `
      <p>Für weitere Inhalte besuche folgende Datei: <a href="/doc/script.pdf">AntIT für Fortgeschrittene</a>
      </p>
    `,
    noq : true,
    questions : [
      "Frage 1",
      "Frage 2",
      "Frage 3",
      "Frage 4",
      "Frage 5",
      "Frage 6"
    ],
    solution : [0,0,0,1,1,1],
  },
  /*2 : {
    level : 1,
    name : "Herzlich Willkommen 2",
    text : "lalala",
    noq : true,
    questions : [
      "Frage 1",
      "Frage 2",
      "Frage 3",
      "Frage 4",
      "Frage 5",
      "Frage 6"
    ],
    solution : [0,0,0,1,1,1],
  },*/
}
