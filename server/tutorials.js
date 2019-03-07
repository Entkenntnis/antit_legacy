module.exports.tutorials = {
  11: {
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
  12 : {
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
  13 : {
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
      "Um die Ameisen vorwärts zu bewegen verwendest du den Befehl 'Gehe'.",
      "Südwest = 45."
    ],
    solution : [1,0,1,1,1,0],
  },
  21 : {
    level : 2,
    name : "Nahrungsmittel [API]",
    text : `
      
      <p>In diesem Tutorial lernst du, wie deine Ameisen Zucker und Äpfel sammeln können. Im Grunde ist es kinderleicht und daher wird dieses Tutorial recht kurz sein.
      </p>
      
      <p>Um Zucker zu sammeln, muss du deine Ameise zuerst ganz nah an den Zuckerhaufen hinbewegen. Wenn die Ameise am Zucker steht, führst du den Befehl <code>NimmZucker()</code> aus. Damit lädt sich die Ameise ein Stückchen Zucker auf.
      </p>
      
      <p><img src="/images/l2_ameisezucker.jpg" class="img-thumbnail" title="Ein richtig perfekter Zuckerwürfel auf ihrem Rücken!"></p>
      
      <p>Jetzt muss die Ameise nach Hause. Dazu gibt es den Befehl <code>GeheZuBau()</code>, der die Ameise direkt in den Bau führt. Die Ameisen sind wie Geister - sie müssen nicht um Hindernisse herumgehen, sondern können einfach durch alles hindurchlaufen (fast alles: Wanzen sind aggressiv und bringen die Ameisen um). Auch wenn das komisch aussieht: Es ist für dich als Entwickler ziemlich praktisch.
      </p>
      
      <p>Die zwei Befehle, die du gerade kennengelernt hast, brauchen keinen Parameter. Deshalb steht nichts in den runden Klammern. Die Klammern sind aber trotzdem wichtig! Wenn du sie vergisst, wird der Befehl nicht ausgeführt.
      </p>
      
      <p><img src="/images/l2_ameisezucker2.png" width="400px" class="img-thumbnail" title="Huch!"></p>
      
      <p>Am Ende, wenn die Ameise im Bau steht, kann sie mit dem Befehl <code>LadeZuckerAb()</code> den Zucker in den Bau geben. Dann erhälst du deine Punkte dafür und die Menge wird in der Statistik angezeigt.
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
  22 : {
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
      
      <p>Mit der Taste G kann innerhalb der Simulation ein Koordinatengitter um den Bau angezeigt werden. Damit kann man die Positionen von Objekten auf dem Spielfeld genau bestimmen. Das Koordinatengitter hat einen Abstand von 50 Ameisenschritten. ProTipp: Eine Diagonale hat eine Länge von 71 Ameisenschritten.
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
  23 : {
    level : 2,
    name : "Teamwork [API]",
    text : `
      <p>Bei so vielen Ameisen ergibt es sich ganz natürlich, dass man das Ameisenvolk aufteilen  möchte. Jedes Team soll dann eine eigene Aufgabe bekommen. Wir werden in diesem Tutorial sehen, wie das geht und lernen dabei auch bedingte Anweisungen kennen.
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
      "Befehle innerhalb von bedingten Anweisungen werden insgesamt zweimal eingerückt.",
    ],
    solution : [1,0,1,1,0,1]
  },
  31 : {
    level : 3,
    name : "Programmieren mit Ereignissen [API]",
    text : `
      <p>Jetzt ist der Zeitpunkt gekommen, um uns nochmal intensiv mit Ereignissen zu beschäftigen. Bisher kennst du nur "IstGeboren". In diesem Tutorial wirst du ein paar weitere Ereignisse kennenlernen.
      </p>
      
      <p>In den ersten zwei Stufen hast du nur Anweisungen geschrieben, die bei der Geburt der Ameisen ausgeführt wurden. Danach blieben die Ameisen stehen. Dieses Prinzip ist relativ einfach zu verstehen und hat für die bisherigen Aufgaben auch gereicht. Jetzt wollen wir aber auch Probleme lösen, die darüber hinausgehen und wir werden sehen, dass unsere bisherige Methode zu unflexibel ist.
      </p>
      
      <p>Programmieren mit Ereignissen ist dagegen sehr flexibel, was die möglichen Anwendungen betrifft. Das macht es aber wiederum schwerer zu verstehen. Wir wollen uns daher Schritt für Schritt annähern und auf dieser Stufe zwei neue, wesentliche Muster anschauen. Das eine ist die Ausführung von Anweisungen in Schleife und das andere ist Suchen und Finden. Letzteres wird im nächsten Tutorial genauer erklärt.</p>
      
      <p>Nehmen wir an, wir wollen, dass eine Ameise ständig zwischen dem Bau und einem bestimmten Punkt hin und her läuft, z.B. um etwas zu bewachen. Wir können die Anweisungen 10-Mal hinschreiben, oder 100-Mal, aber immer wird es einen Zeitpunkt geben, an dem die Ameise mit allen Anweisungen fertig ist und aufhört. Wir können noch nicht sagen, dass eine Ameise etwas <em>immer</em> tun soll. Der folgende Codeausschnitt zeigt eine solche Situation:
      </p>
      
      <p><img src="/images/l3_schleife.png" class="img-thumbnail" title=""></p>
      
      <p>Wir wollen, dass die Ameise immer wieder 200 Schritte nach Osten geht. Aber wir müssen jede einzelne Wiederholung selber programmieren. Das ist eine ziemliche Einschränkung. Das Ereignis <code>"IstUntätig"</code> kommt uns hier zur Rettung. Dieses Ereignis wird in dem Moment aktiviert, wo die Ameise fertig ist mit ihren Aufgaben. Anweisungen, die hier programmiert werden, werden also immer wieder aufgerufen. Konkret sieht das so aus:
      </p>
      
      <p><img src="/images/l3_schleife2.png" class="img-thumbnail" title=""></p>
      
      <p>Geändert hat sich der Name in der Ereignisdefinition. Dieser lautet nun "IstUntätig". Wir schreiben die Anweisungen, die wir wiederholen wollen, einmal hin. Bei der Geburt ist die Ameise automatisch untätig und das Ereignis wird aufgerufen. Sind alle Anweisungen ausgeführt, dann wird "IstUntätig" erneut aufgerufen und die Schleife beginnt von vorne. Damit haben wir es geschafft, eine Aufgabe immer zu tun. Sollte die Ameise zwischendrin noch andere Anweisungen erhalten, dann führt sie diese aus und begibt sich danach zurück in ihre Schleife. Auf ein zusätzliches "IstGeboren" kann verzichtet werden, weil die Ameise am Anfang ja automatisch untätig ist.</p>
      
      <p>Soweit dazu. Im nächsten Tutorial werden wir sehen, dass eine Programm auch mit mehreren Ereignissen gleichzeitig arbeiten kann und damit dann suchen und finden kann. Als Hilfsmittel kannst du mit der Schaltfläche "Ereignis hinzufügen" eine neue Ereignisdefinition zum Code hinzufügen. Ergänze darin dann den Ereignisnamen:</p>
      
      <p><img src="/images/l3_hinzu.png" class="img-thumbnail" title=""></p>
      
      <p><img src="/images/l3_ereignisneu.png" class="img-thumbnail" title=""></p>
      
      <p>Noch zwei wichtige Hinweise: Jedes Ereignis kann im Programm maximal einmal definiert werden. Ereignisse dürfen also nicht mehrfach vorkommen:</p>
      
      <p><img src="/images/l3_doppel.png" class="img-thumbnail" title=""></p>
      
      <p>Genausowenig dürfen Ereignisse verschachtelt werden. Ereignisdefinition kommen niemals innerhalb von Ereignissen vor:
      </p>
      
      <p><img src="/images/l3_schachtel.png" class="img-thumbnail" title=""></p>
    `,
    questions : [
      "Ereignisse sind sehr flexibel.",
      "Mit \"IstGeboren\" lassen sich Schleifen programmerien.",
      "Die Ameise ist am Anfang nicht untätig.",
      "Wenn man keine Schleife braucht, kann weiterhin \"IstGeobren\" verwendet werden.",
      "Ereignisse kommen nicht doppelt vor.",
      "Ereignisse werden nicht verschachtelt."
    ],
    solution : [1,0,0,1,1,1],
  },
  32 : {
    level : 3,
    name : "Suchen und Finden [API]",
    text : `
      <p>In diesem Tutorial werden wir lernen, wie man mit der Ameise gezielt nach Nahrungsmitteln suchen kann. Im Normalfall ist es nämlich so, dass die Ameise nicht genau weiß, wo sich die Nahrungsmittel auf dem Spielfeld befinden. Beim bisherigen Ansatz musste man immer die Ameise genau zum Zucker oder zum Apfel hinsteuern, sonst haben die Befehle nicht funktioniert. Mit Ereignissen werden wir in der Lage sein, ein Gebiet abzulaufen, anzuhalten, wenn ein Zucker oder ein Apfel in Sichtweite kommt und dann darauf zuzulaufen.
      </p>
      
      <p>Das Ablaufen eines Gebiets, am besten in einer Schleife, können wir mit dem letzten Tutorial schon bewerkstelligen. Jetzt geht es darum, die Ameise anzuhalten, wenn ein Nahrungsmittel in Sichtweite kommt. Jede Ameise hat eine Sichtweite von 70 Schritten. Sobald sie darin ein Nahrungsmittel wittert, wird nun eines der Ereignisse <code>"SiehtZucker"</code> oder <code>"SiehtApfel"</code> aufgerufen. Wir sind in der Lage, darauf zu reagieren. Diese zwei Ereignisse sind etwas besondern, weil sie zusätzlich ein <em>Sichtungsobjekt</em> übertragen, das dem Programm genauere Informationen mitgibt.
      </p>
      
      <p>Nehmen wir das Beispiel des Zuckers. Sobald die Ameise den Zucker sieht, soll sie darauf zulaufen. Das funktioniert mit dem neuen Befehl <code>GeheZuZiel()</code>.
      </p>
      
      <p><img src="/images/l3_zucker.png" class="img-thumbnail" title=""></p>
      
      <p>In die Ereignisdefinition wird nun zusätzlich zum Ereignisnamen noch der Name des Parameters angegeben. Dieser Name gibt an, wie das Sichtungsobjekt heißt, das die Ameise gerade gesehen hat. Passend dazu erwartet GeheZuZiel() genau diesen Namen, um zum jeweiligen Nahrungsmittel zu laufen. In diesem Fall lautet der Parameter 'zucker', er kann aber frei gewählt werden. Wichtig ist nur, dass die beiden Namen gleich sind.
      </p>
      
      <p>Das Programm ist hier noch nicht vollständig. Ab jetzt können noch die bekannten Befehle ergänzt werden, um den Zucker abzubauen und zum Bau zu bringen. Dieses ganze System funktioniert natürlich auf mit Äpfeln. Diesmal wurde als Parameter ein etwas anderer Name gewählt:
      </p>
      
      <p><img src="/images/l3_apfel.png" class="img-thumbnail" title=""></p>
      
      <p>Diese Sichtungsereignisse werden immer dann aufgerufen, wenn ein Nahrungsmittel in die Reichweite der Ameise von 70 Schritten kommen. Die Ameise vergisst dann alle bisherigen Befehle und führt die Anweisungen aus, die sie neu erhält. Wenn sie das Nahrungsmittel verlässt und nach einer Weile wieder sieht, dann wird das Ereignis erneut aufgerufen.
      </p>
      
      <p>Es gibt jetzt noch die Möglichkeit, dieses Verhalten zu steuern. Zu den bekannten Befehlen gibt es dafür die Befehlsvarianten <code>GeheZuBauDirekt()</code> und <code>GeheZuZielDirekt()</code>. Diese Befehle verhalten sich genau wie die normalen Varianten, mit der einzigen Ausnahme, dass die Ameise auf dem Weg <em>nicht</em> auf Nahrungsmittel reagiert. Ein wichtiger Anwendungsfall ist, wenn eine Ameise sich Zucker aufgeladen hat und auf dem Rückweg zum Bau nicht auf einen weiteren Zuckerhaufen reagieren möchte. In diesem Fall sollte die Version GeheZuBauDirekt() statt der normalen Version GeheZuBau() benutzt werden.
      </p>
      
      <p>An dieser Stelle sei auch noch erwähnt, dass die Ameisen nur eine Reichweite von 3000 Schritten haben. Nach dieser Schrittzahl sterben die Ameisen. Die Schrittzahl kann im Bau zurückgesetzt werden, indem die Ameise mit GeheZuBau() (oder GeheZuBauDirekt()) zum Bau zurückkehrt. Du musst also darauf achten, dass die Ameisen immer wieder zum Bau zurückkehren, z.B. über eine entsprechend programmierte Schleife.
      </p>
      
      <p>Zusatz: An manchen Stellen kannst du (als Lösungsvariante) die Ameisen auch auf den Rand reagieren lassen. Dazu gibt es das Ereignis <code>"RandErreicht"</code>. Dieses Ereignis wird aufgerufen, sobald die Ameise gegen den Rand läuft. Ein Beispiel ist, dass sich die Ameise um 180 Grad dreht:
      </p>
      
      <p><img src="/images/l3_rand.png" class="img-thumbnail" title=""></p>
      
      <p>Es gilt weiterhin, dass Ereignisse nicht verschachtelt werden dürfen. Solcher Code ist also falsch:
      </p>
      
      <p><img src="/images/l3_falsch.png" class="img-thumbnail"></p>
      
      <p>Die richtige Version sieht so aus:</p>
      
      <p><img src="/images/l3_richtig.png" class="img-thumbnail"></p>
    `,
    questions : [
      "Ereignisse können keine Sichtungsobjekte übergeben.",
      "SiehtZucker besteht aus 10 Buchstaben.",
      "Eine Ameise hat eine Sichtweite von 70 Ameisenschritten.",
      "GeheZuZiel kann für Zucker und Äpfel verwendet werden.",
      "Ameisen sind blind für Äpfel.",
      "GeheZuZiel() und GeheZuZielDirekt() haben keine Unterschiede."
    ],
    solution : [0,0,1,1,0,0],
  },
  41 : {
    level : 4,
    name : "Gift, Teams und Zufall [API]",
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
      <li>Eine Giftwolke hält 160 Ticks (das entspricht 4 Sekunden). Danach verstreut sie sich wieder.
      </li>
      <li>Giftwolken werden erst dann giftig, wenn sich mindestens 3 Wolken überlappen. In diesen Bereichen sterben Wanzen und gegnerische Ameisen sofort.
      </li>
      <li>Eine Ameise kann nur eine Ladung Gift setzen. Danach muss sie zum Bau zurückkehren (mit dem Befehl GeheZuBau()) und regeneriert dort ihre Ladung.
      </li>
      </ul>
      </p>
      
      <p>Viel Spaß beim Kämpfen!
      </p>
      
      <p>Um das Gift effektiv einsetzen zu können, gibt es noch eine Reihe weiterer Funktionen, die dir helfen, die Ameisen besser zu koordinieren:
      </p>
      
      <p>Zum einen gibt es die Möglichkeit, feiner zu steuern, die die Ameisen in die Teams eingeteilt werden. Bisher konntest du die Anzahl der Teams setzen und dann wurden die Ameisen nacheinander in die Teams zugeteilt. Wenn du 4 Teams setzt, dann werden die Ameisen in der Reihenfolge der Geburt in die Teams 0, 1, 2, 3, 0, 1, 2, 3, usw. zugeordnet:
      </p>
      
      <p><img src="/images/l4_teams.png" class="img-thumbnail"></p>
      
      <p>Für den Einsatz von Gift ist das ungünstig. Die Ameisen aus einem bestimmten Team sind zu weit auseinander und die Giftwolken verschwinden, bevor sich drei überlappen können. Es wäre besser, wenn sich die Teams in Gruppen einteilen könnten. Das geht mit der neuen Teamdefinition <code>SetzeTeamFolge()</code>. Mit diesem Befehl schreibst du direkt auf, in welche Teams die Ameisen in der Reihe der Geburt eingeteilt werden sollen:
      </p>
      
      <p><img src="/images/l4_teamfolge.png" class="img-thumbnail"></p>
      
      <p>Jetzt werden die ersten drei Ameisen in das Team 0 gesetzt, die nächsten drei Ameisen in Team 1, und so weiter bis zum vierten Team. Wenn die Folge zu Ende ist, dann beginnt sie von vorne, die 13. Ameise kommt also wieder ins Team 0. Mit der Teamfolge hast du nun eine sehr flexible Möglichkeit zur Hand, die Teams einzuteilen. Du entscheidest, wie groß die Teams sind und in welcher Folge sie zugeteilt werden.
      </p>
      
      <p>Außerdem gibt es die Möglichkeit, Zufallszahlen zu erzeugen. Für eine Computerameise, die ein komplett vorherbestimmtes Leben hat, ist dies keine einfache Leistung. Ohne sich in die technischen Details zu verstricken ist es trotzdem möglich und es steht die Funktion <code>Zufall()</code> zur Verfügung. Diese Funktion nimmt zwei Parameter, die den Bereich angeben, innerhalb dessen eine Zahl erzeugt werden soll. Ein paar Beispiele:
      </p>
      
      <p><img src="/images/l4_zufall.png" class="img-thumbnail" title="* = Multiplikation"></p>
      
      <p>Die Funktion Zufall ist kein selbstständiger Befehl, sondern kann nur in Kombination mit einem bekannten Befehl verwendet werden und zwar dort, wo sonst eine feste Zahl stehen würde. Diese Zahl wird nun zufällig bestimmt. In Zeile 5 geht die Ameise zwischen 100 und 300 Schritte, in Zeile 6 dreht sich die Ameise zwischen -30 bis 30 Grad. In Zeile 7 dreht sich die Ameise in eine der Richtung 0, 90, 180 oder 270.
      </p>
      
      <p>Schließlich kann es manchmal nützlich sein, wenn die Ameise kurz innehält. Dazu gibt es den neuen Befehl <code>Warte()</code>. Diese veranlasst die Ameise, eine bestimmte Zeitspanne stehen zu bleiben. Der Parameter gibt die Wartezeit in Ticks an (zur Erinnerung: 40 Ticks entsprechen einer Sekunde). Um die Ameise 2 Sekunden warten zu lassen schreibt man also:
      </p>
      
      <p><img src="/images/l4_warte.png" class="img-thumbnail" title=""></p>
    `,
    questions : [
      "Wanzen sind unsterblich.",
      "Die Reichweite von Gift ist größer als die Sichtweite",
      "Giftwolken bleiben für immer bestehen.",
      "SetzeTeamFolge(0,1,2,3) ist das gleiche wie SetzeTeams(4).",
      "Zufall(3,6) hat die möglichen Ergebnisse 3, 4, 5 und 6.",
      "120 Ticks entsprechen drei Sekunden."
    ],
    solution : [0,1,0,1,1,1],
  },
  42 : {
    level : 4,
    name : "Gefahren erkennen [API]",
    text : `
      <p>Damit die Ameise sich schützen kan, gibt es außerdem eine Reihe von Funktionen, mit denen die Ameise ihre Feinde wahrnehmen kann. Diese bestehen aus ein paar Ereignissen, die sehr ähnlich sind zu den bisher eingeführten Ereignissen.
      </p>
      
      <p>Das erste Ereignis, um auf Wanzen zu reagieren, heißt <code>"SiehtWanze"</code>. Dieses Ereignis wird aktiviert, wenn die Ameise innerhalb ihrer Sichtweite eine Wanze sieht. Dieses Ereignis stellt auch ein Sichtungsobjekt zur Verfügung und man kann zur Wanze gehen (was aber gefährlich ist!). Besser ist es aber, einfach gibt zu setzen und zum Bau zurückzukehren. Der Befehl in Zeile 4 ist auskommentiert und wird daher nicht ausgeführt:
      </p>
      
      <p><img src="/images/l4_wanze.png" class="img-thumbnail" title=""></p>
      
      <p>Dieses Ereignis gibt es auch in einer speziellen Variante, die nur auf Wanzen reagiert, die sich im 45-Grad-Bereich vor der Ameise befinden. Das Ereignis heißt <code>"SiehtWanzeVoraus"</code> und verhält sich sonst genauso wie "SiehtWanze". Beide werden unabhängig voneinander aufgerufen, man sollte sich also für eine der beiden Varianten entscheiden und nicht beide gleichzeitig verwenden.
      </p>
      
      <p><img src="/images/l4_wanzevoraus.png" class="img-thumbnail" title=""></p>
      
      <p><img src="/images/l4_winkel.png" class="img-thumbnail" title=""></p>

      <p>Eine weitere Version gibt es, um auf gegnerische Ameisen zu reagieren. Dieses Ereignis heißt <code>"SiehtGegner"</code> und wird aktiviert, sobald sich eine gegnerische Ameise im Sichtbereich befinden. Dieses Ereignis liefert auch ein Sichtungsobjekt mit, hat aber keine Variant mit 45-Grad-Bereich:
      </p>
      
      <p><img src="/images/l4_gegner.png" class="img-thumbnail" title=""></p>
      
      <p>Kleiner Hinweis: Die Befehle GeheZuBauDirekt() und GeheZuZielDirekt() wirken sich nicht auf die Sichtung von Wanzen und Gegner aus. Diese sind immer aktiviert und werden mit diesen Befehlen nicht ignoriert.
      </p>
      
      <p>Zum Abschluss wollen wir uns noch anschauen, was eigentlich mit den alten Befehlen passiert, die die Ameise ausführt, wenn ein Ereignis aktiviert wird. Sollten innerhalb eines Ereignis neue Befehle gegeben werden, dann werden die alten Befehle gelöscht. Das kann schlecht sein.
      </p>
      
      <p>Ein Beispiel: Die Ameise hat die Anweisungen, zu einem festen Zuckerhaufen zu gehen und dort Zucker zu holen:
      </p>
      
      <p><img src="/images/l4_beispiel.png" class="img-thumbnail" title=""></p>
      
      <p>Die Ameise hat den Zuckerhaufen bereits erreicht und sich den Zucker aufgeladen. Sie führt gerade Zeile 7 aus (GeheZuBau()) und hat noch Zeile 8 vorgemerkt. Auf dem Rückweg trifft sie auf eine Wanze. Diese ist erstmal so programmiert:
      </p>
      
      <p><img src="/images/l4_wanzeloesche.png" class="img-thumbnail" title=""></p>
      
      <p>Die Ameise weicht der Wanze aus. Sie hat immer noch ihren Zucker geladen, aber weil alle alten Befehle gelöscht wurden, bleibt sie mit dem Zucker auf dem Spielfeld stehen! Das wollen wir vermeiden. Dazu können wir innerhalb eines Ereignis sagen, dass die alten Befehle weiter ausgeführt werden sollen. Das passiert mit dem Befehl <code>FühreAlteBefehleAus()</code>. An Stelle dieses Befehls werden nun die bisherigen Befehle weiter ausgeführt:
      </p>
      
      <p><img src="/images/l4_wanzegut.png" class="img-thumbnail" title=""></p>
      
      <p>Für alle die bis zum Schluss durchgehalten haben: Es gibt im Editor eine neues Tool, den Syntax-Checker! Dieser liest deinen Programmcode ein und prüft ihn auf Klammerfehler. Sollte irgendwo eine Klammer zu wenig oder zu viel sein, gibt er eine Fehlermeldung und sagt auch, was er auszusetzen hat. Einfach draufklicken und der Code wird überprüft.
      </p>
      
      <p><img src="/images/l4_syntax.png" class="img-thumbnail" title=""></p>
    `,
    questions : [
      "Eine Ameise kann auf Gegner und Wanzen reagieren.",
      "SiehtWanzeVoraus beachtet nur Wanzen im 45-Grad-Bereich.",
      "SiehtGegnerVoraus kann verwendet werden.",
      "GeheZuBauDirekt() reagiert weiterhin auf Wanzen.",
      "Bei einem alten Ereignis werden automatisch die alten Befehle behalten.",
      "Es gibt keine Möglichkeit, die alten Befehle weiter auszuführen."
    ],
    solution : [1,1,0,1,0,0],
  },
  51 : {
    level : 5,
    name : "Kommunikation [API]",
    text : `
      <p>Die Ameisen sind in der jetzigen Form ziemliche Eigenbrötler: Sie arbeiten ihre Aufgaben ab und kümmern sich eigentlich nicht darum, was ihre Kollegen machen.
      </p>
      
      <p>Und bisher ging das auch ziemlich gut. Bisher. Die erste Aufgabe dieser Stufe bietet in dieser Hinsicht eine Herausforderung: Auf dem Spielfeld befindet sich zu jeder Zeit nur ein Apfel. Diesen müssen die Ameisen aber gemeinsam zum Bau tragen. Es wäre doch praktisch, wenn die Ameise, die als erstes beim Apfel ist, an ihre Kollegen eine Nachricht schicken könnte?
      </p>
      
      <p>In diesem Tutorial wird es genau darum gehen, wie man kommuniziert. Dazu können die Ameisen Nachrichten senden. Eine Nachricht kann mit dem Befehl <code>SendeNachricht()</code> verschickt werden. Eine Nachricht besteht aus einem Betreff und einem (optionalen) Inhalt. Der Betreff ist ein frei wählbarer Text, der verwendet wird, um verschiedene Nachrichtentypen zu unterscheiden. Sehen wir uns dazu mal ein erstes Beispiel an:
      </p>
      
      <p><img src="/images/l5_sendetanzt.png" class="img-thumbnail"></p>
      
      <p>Die Ameise geht 1000 Schritte. Dann sendet sie eine Nachricht mit dem Betreff "Tanzt!". Danach geht sie zum Bau. Der Nachrichtenbefehl kann jederzeit wie ein normaler Befehl eingesetzt werden. Um auf diese Nachricht zu reagieren, fügen wir dem Code eine weitere Ereignisdefinition hinzu:
      </p>
      
      <p><img src="/images/l5_empfangetanzt.png" class="img-thumbnail"></p>
      
      <p>Der Ereignisname entspricht dem Betreff mit einem Doppelpunkt vorangestellt. Dieser Doppelpunkt bedeutet: Das hier ist eine Nachricht. Jede Ameise empfängt diese Nachricht und führt dann die Anweisungen aus, in diesem Fall dreht sie sich einmal um 360 Grad.
      </p>
      
      <p>Je näher eine Ameise am Sender, umso früher bekommt sie die Nachricht. Man kann festlegen, dass nur eine bestimmte Anzahl an Ameisen eine Nachricht bekommt. Wenn eine feste Anzahl an Ameisen um den Sender herum die Nachricht erhalten haben, dann wird sie nicht mehr weitergegeben. Dafür schreibt man unmittelbar vor dem Nachrichtenbefehl den Befehl <code>SetzeLimit()</code> und gibt als Parameter an, wie viele Ameisen die Nachricht erhalten sollen:
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
  52 : {
    level : 5,
    name : "Der Ameisenwettbewerb [API]",
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
      
      <p>Der Wettbewerb erstreckt sich über mehrere Runden und die Sieger wird nach Turnierregeln, die an die Anzahl der Teilnehmer angepasst ist, bestimmt.
      </p>
      
      <p>Vor dem Wettbewerb seien dir hier noch ein paar neue Funktionen vorgestellt:
      </p>
      
      <p>Zwei praktische Helfer stehen wir nun zur Verfügung: Einerseits kannst du dir in der Simulation anzeigen lassen, wo und wie deine Ameisen gestorben sind. Drücke dafür während der Simulation auf die Taste T. Andererseits kannst du ab jetzt deine Ameisen freigeben. Freigegebene Ameisen können von anderen Teilnehmern dieser Kolonie in der Arena gestartet werden. Damit kannst du erste Testrunden spielen und die Stärke deiner Ameisen abschätzen.
      </p>
      
      <p>Außerdem gibt es die neuen Befehle <code>DreheZuObjekt()</code> und <code>DreheWegVonObjekt()</code>. Diese dienen als Ergänzung zu GeheZuZiel() und sind von der Verwendung her flexibler. Beispielsweise kann man damit programmieren, dass die Ameisen, wenn sie einen Zucker sehen, erstmal 100 Schritte davon weggehen:
      </p>
      
      <p><img src="/images/l5_drehezu.png" class="img-thumbnail"></p>
      
      <p>DreheWegVonObjekt() lässt die Ameise sich so drehen, dass sie vom Zuckerhaufen wegschaut. Dann geht sie 100 Schritte und dreht sich mit DreheZuObjekt() dann zum Zuckerhaufen. Dieses Programm kann nützlich sein, um sich zum Beispiel davor zu schützen, in eine Giftwolke reinzulaufen, die um den Zucker herum besteht. Diese zwei Befehle können auch im Zusammenhang mit Wanzen und Gegner verwendet werden.</p>
      
      <p>Schließlich können über die Variablen <code>SchrittZahl</code> und <code>TickZahl</code> auf Informationen über die Ameise und die Simulation zugegriffen werden. SchrittZahl gibt an, wie viele Schritte die Ameise schon gelaufen ist. Das Maximum beträgt 3000. Ähnlich wie bei Teamabfragen kann ein Teil der Anweisungen nur unter einer bestimmen Bedingung aufgerufen werden, wenn z.B. die Anzahl der Schritt größer oder kleiner ist als eine bestimmte Zahl:
      </p>
      
      <p><img src="/images/l5_bedingt.png" class="img-thumbnail"></p>
      
      <p>In der ersten Abfrage (Zeile 4 bis 7) werden die Anweisungen nur ausgeführt, wenn die Ameise noch weniger als 1000 Schritte gegangen ist. In der zweiten Abfrage geht die Ameise zum Bau zurück, wenn sie mehr als 2500 Schritte gegangen ist. Es können die Vergleichsoperatoren <, <=, > und >= verwendet werden.</p>
      
      <p>Ähnlich kann man mit der TickZahl das Verhalten der Ameise ändern, je nach dem, wie viele Ticks vergangen sind. Hier ist nochmal ein Beispiel dafür:
      </p>
      
      <p><img src="/images/l5_tick.png" class="img-thumbnail"></p>
      
      <p>Vor der Runde 1000 setzt die Ameise beim Zucker das Limit auf 1000. Danach setzt die Ameise das Limit auf 10.
      </p>
    `,
    questions : [
      "Ab Stufe 5 kann man auf die Kampfarena zugreifen.",
      "Ein Zuckerhaufen besteht aus 15 Zuckerstücken.",
      "Vergiftete Gegner bringen mehr Punkte als vergiftete Wanzen.",
      "DreheZuObjekt() nimmt als Parameter ein Sichtungsobjekt.",
      "SchrittZahl gibt an, wie viele Schritte die Ameise schon gelaufen ist.",
      "TickZahl <= 400 und TickZahl < 401 bedeuten das gleiche."
    ],
    solution : [1,0,0,1,1,1],
  },
  65 : {
    level : 6,
    name : "Funktionen erstellen",
    text : `
      <p>Nach dem ganzen Kämpfen ist es nun an der Zeit, etwas nützliches zu machen. Im Ameisendorf gibt es viele Leute, die deine Hilfe im Alltag brauchen und hier lernst du, wie du ihnen helfen kannst.
      </p>
      
      <p>Dazu brauchen wir <em>Funktionen</em>. Du kannst dir eine Funktion wie eine automatische Maschine vorstellen, die Daten als Eingabe nimmt und nach der Verarbeitung Daten als Ausgabe wieder ausspuckt: 
      </p>
      
      <p><img src="/images/l6_funktion_q.png" class="img-thumbnail"></p>
      
      <p>Hier ist eine "Maschine", die Zahlen quadriert. Erhält sie eine 11 als Eingabe, dann spuckt sie die Zahl 121 als Ausgabe aus. Die Eingabe hat hier den Namen x - und das erinnert schon sehr an die Mathematik.</p>
      
      <p>Diese Funktionen lässt sich nun in Code schreiben:
      </p>
      
      <p><img src="/images/l6_funktion_code.png" class="img-thumbnail"></p>
      
      <p>Das hier ist ein Ameisenvolk, dass Zahlen quadrieren kann. Ereignisse werden nicht benötigt und können aus dem Code gelöscht werden. In Zeile 3 bis 5 ist die eigentliche Definition unserer Funktion. Begonnen wird mit dem Schlüsselwort <code>function</code>, dahinter folgt der Name der Funktion. In die runden Klammern wird der Name der Eingabe geschrieben. In unserem Fall heißt die Funktion 'quadriere' und die Eingabe hat den Namen 'x'. In Zeile 3 öffnen wir geschweifte Klammern und schließen sie wieder in Zeile 5.
      </p>
      
      <p>Innerhalb der geschweiften Klammern kommt nun der Code für die Berechnung. In unserem Fall ist das recht klar: Wir nehmen die Eingabe und multiplizieren sie mit sich selbst. Das wird in Zeile 4 gemacht. Um zu zeigen, dass das bereits unsere Antwort ist, schreiben wir vor die Rechnung das Schlüsselwort <code>return</code>. Damit weiß die Funktion, dass das ihre Ausgabe ist. Und fertig! Damit haben wir unsere erste Funktion definiert.
      </p>
      
      <p>Diese kann dann zum Beispiel mit <code style="color:blue">quadriere(11)</code> aufgerufen werden. Das liefert das Ergebnis 121. Der Aufruf <code style="color:blue">quadriere(101)</code> liefert das Ergebnis 10201. Bei den Aufgaben auf dieser Stufe werden wir die Funktion nicht selber verwenden, sondern anderen zur Verfügung stellen. Dazu brauchen wir die Zeile 7: Mit dem Befehl <code>Exportiere</code> geben wir die Funktion 'quadriere' frei und andere Leute können sie dann verwenden.
      </p>
      
      <p><img src="/images/l6_tester.png" class="img-thumbnail"></p>
      
      <p>Hier siehst du das Beispiel einer Aufgabe, bei der Zahlen quadriert werden sollen. Unsere Funktion erfüllt ihren Zweck und hat alle Testaufrufe bestanden. In den runden Klammern stehen die Eingaben, in den eckigen Klammern unsre Ausgabe.
      </p>
      
      <p>Bei einer anderen Aufgabe könnte allerdings das passieren:
      </p>
      
      <p><img src="/images/l6_test_fail.png" class="img-thumbnail"></p>
      
      <p>Unser Ameisenvolk kann Zahlen quadrieren, aber bei der Aufgabe war nach der dritten Potenz gefragt. Das führt natürlich zu einer Fehlermeldung und der Test scheitert.
      </p>
      
      <p>Jetzt wollen wir uns noch ein paar <em>Operatoren</em> anschauen, mit denen Funktionen aufgebaut werden können. Zum Rechnen mit Zahlen gibt die die Operatoren <code>+</code>, <code>-</code>, <code>*</code> (mal) und <code>/</code> (geteilt). <b>Wichtig</b>: Um Dezimalzahlen zu schreiben, verwende den Punkt!
      </p>
      
      <p>Ein kleines Beispiel, wo eine Funktion auch mehr als eine Eingabe verwenden kann (p und q sind dabei die Seitenlängen der Diagonalen):
      </p>
      
      <p><img src="/images/l6_raute.png" class="img-thumbnail"></p>
      
      <p>
      </p>
      
      <p>Außer mit Zahlen können wir auch mit <em>Text</em> arbeiten. Hier ist eine Funktion, die eine Begrüßung erzeugt:
      </p>
      
      <p><img src="/images/l6_strings.png" class="img-thumbnail"></p>
      
      <p>Ein Text wird immer in doppelte Anführungszeichen geschrieben. Um Texte miteinander zu verbinden, wird der Operator <code>+</code> verwendet. Dieses plus hat also eine ganz andere Funktion als das plus für Zahlen. Die Zeile 4 ist wie eine Schablone, in die die Eingabe an die entsprechenden Stellen eingefügt wird.
      </p>
      
      <p>Ein Beispielaufruf sieht so aus:
      </p>
      
      <p><img src="/images/l6_begr.png" class="img-thumbnail"></p>
    `,
    questions : [
      "Funktionen werden mit dem Schlüsselwort 'funktion' eingeleitet.",
      "Das Schlüsselwort 'return' wird für die Rückgabe verwendet",
      "Eine Funktion nimmt maximal eine Eingabe.",
      "Funktionen können Zahlen und Text verarbeiten.",
      "Wenn man 3 kubiert, kommt 27 heraus.",
      "Die Division wird mit Doppelpunkt geschrieben."
    ],
    solution : [0,1,0,1,1,0],
  },
  73 : {
    level : 7,
    name : "If-Anweisung: Einführung",
    text : `
      <p>Mit den Funktionen aus dem letzten Tutorial können schon viele Situationen im Alltag gemeistert werden. Allerdings ist die Welt nicht immer so einfach, dass sie sich in einer einzelnen Formel darstellen lässt.
      </p>
      
      <p>Ein Beispiel ist die Preisermittlung bei einem Großhändler, z.B. für Holzbretter. Ein einzelnes Brett kostet 10€. Wenn man genau 400 Bretter kauft, passen die genau auf eine Palette und kosten im Aktionspreis statt 4000€ nur 3000€. Wenn man mehr als 400 Bretter kauft, gibt es einen Mengenrabatt und man zahlt nur 8€ pro Brett. Puh, das lässt sich nicht mehr in einer einfachen Formel darstellen. Am besten, wir zeichnen uns die Situation auf:
      </p>
      
      <p><img src="/images/l7_flow1.png" class="img-thumbnail"></p>
      
      <p>Das ist ein Flussdiagramm und kann folgendermaßen gelesen werden: Beginne bei Start und laufe zur ersten Verzweigung. Kauft man weniger als 400 Bretter, dann geht man nach rechts zum ersten Kasten. Der Preis berechnet sich dann mit 10€ pro Brett (x = Anzahl der Bretter). Ansonsten geht man zur zweiten Verzweigung. Dort wird geprüft, ob man genau 400 Bretter kauft. Ist das der Fall, zahlt man 3000€. Falls das nicht zutrifft, dann kann es nur noch sein, dass man mehr als 400 Bretter kauft und dann gilt der ermäßigte Preis von 8€.
      </p>
      
      <p>Genau das lässt sich nun mit <em>If-Anweisungen</em> in Code ausdrücken:
      </p>
      
      <p><img src="/images/l7_preis.png" class="img-thumbnail"></p>
      
      <p>Zeile 4 bildet die erste Verzweigung. Die Verzweigung beginnt mit dem Schlüsselwort <code>if</code> und wird gefolgt von runden Klammern, in denen die <em>Bedingung</em> steht. In diesem Fall ist die Bedingung, dass die Anzahl der gekauften Bretter (das x) kleiner als 400 ist. Trifft die Bedingung zu, dann wird der Code innerhalb der geschweiften Klammern ausgeführt, also Zeile 5. Diese Zeile gibt den Preis zurück und beendet damit die Funktion
      </p>
      
      <p>Sollte die Bedingung in Zeile 4 nicht zutreffen, dann wird der Block übersprungen und man landet in Zeile 7. Hier wird die nächste Bedingung überprüft, in diesem Fall, ob x gleich 400 ist. <b>Wichtig:</b> Die Gleichheit wird mit doppelten Anführungszeichen geprüft! Falls genau 400 Bretter gekauft wurden, wird der Wert 3000 zurückgegeben und die Funktion wird beendet.
      </p>
      
      <p>Falls beide Bedingungen nicht zutreffen, dann landet man in Zeile 10 und hier wird einfach der ermäßigte Preis berechnet.
      </p>
      
      <p>Man kann so viele Bedingungen untereinander schreiben, wie man benötigt. Für die Bedingungen stehen insgesamt folgende Operatoren zur Verfügung: <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> (kleiner und größer gleich), <code>==</code> (für Gleichheit) und <code>!=</code> (für Ungleichheit).
      </p>
      
      <p>If-Anweisungen sind einer der wesentlichen Grundbausteine von Software. Daher hier nochmal ein Beispiel. Diesmal wird kein Ergebnis berechnet, sondern ein Text zurückgegeben. Die neuen Vergleichsoperatoren sind im Einsatz:
      </p>
      
      <p><img src="/images/l7_zahl.png" class="img-thumbnail"></p>
    `,
    questions : [
      "Eigentlich lassen sich alle Dinge der Welt in einer einzelnen Formel darstellen.",
      "Ein Flussdiagramm dient zur Darstellung von Entscheidungen.",
      "Verzweigungen werden mit Rechtecken gezeichnet.",
      "Der Start ist eine Raute.",
      "x = 4 prüft, ob x gleich 4 ist.",
      "In einer Funktionen können viele If-Anweisungen enthalten sein."
    ],
    solution : [0,1,0,0,0,1],
  },
  74 : {
    level : 7,
    name : "If-Anweisung: Logik und mehr",
    text : `
      <p>Verzweigungen sind beim Programmieren ziemlich wichtig und deshalb gibt es eine Reihe von weiteren Funktionen, mit denen wir uns hier vertraut machen wollen.
      </p>
      
      <p>Die erste solche Funktion ermöglicht es uns, Bedingungen aus mehreren Teilen zusammenzusetzen. Dabei helfen uns die Operatoren <code>&&</code> (UND) bzw. <code>||</code> (ODER). Mit UND tritt die Bedingung ein, wenn BEIDE Teile erfüllt sind, bei ODER tritt die Bedingung ein, wenn ein oder beide Teile erfüllt sind. Ein kleines Beispiel: 
      </p>
      
      <p><img src="/images/l7_logik.png" class="img-thumbnail"></p>
      
      <p>Die Bedingung in Zeile 4 tritt nur ein, wenn sowohl a als auch b gleich 3 ist. Schlägt einer der Teile fehl, dann trifft die Bedingung nicht zu. Anders in Zeil 7. Hier reicht es, wenn mindestens eine der Zahlen gleich 5 ist. Sie trifft auch dann zu, wenn beide Zahlen gleich 5 sind (also <em>kein</em> entweder-oder). Logische Verknüpfungen lassen sich wie Rechenoperatoren mit Klammern gliedern und es dürfen auch mehrere Verknüpfungen auf einmal vorkommen. Dann wird es aber immer schwerer, die Logik zu verstehen ...
      </p>
      
      <p><img src="/images/l7_logikdeep.png" class="img-thumbnail"></p>
      
      <p>Die nächste Funktion ist nicht schwer zu verstehen, aber man sollte sie mal gesehen haben:
      </p>
      
      <p><img src="/images/l7_typparam.png" class="img-thumbnail"></p>
      
      <p>Der Parameter 'anzahl' gibt die Anzahl von Menschen an, ist also eine ganz normale Zahl. Der Parameter 'typ' ist speziell an unsere Funktion angepasst und nimmt nur einen der Werte "Kind" oder "Erwachsener" an. Das wird im Vorfeld, z.B. in der Aufgabenstellung, so festgelegt. Mit dieser Annahme schreiben wir die Funktion so, dass sie entsprechend auch nur auf diese beiden Fälle reagiert. Das besondere ist eben, dass dafür ein Text verwendet wird, wir aber für diesen Text nur ganz bestimmte Werte zulassen.
      </p>
      
      <p>Manchmal reicht auf eine Frage eine ganz simples Ja oder Nein. In der Informatik übersetzt sich das in die Schlüsselwörter <code>true</code> und <code>false</code>. Diese können von einer Funktion zurückgegeben werden und entsprechen einer Ja/Nein-Antwort:
      </p>
      
      <p><img src="/images/l7_iq.png" class="img-thumbnail"></p>
      
      <p>Ist der IQ größer als 180, dann ist die Person superschlau und die Antwort lautet true (= ja). Bei einem IQ darunter lautet die Antwort false (= nein). Dieses Beispiel lässt sich noch etwas umschreiben, und zwar mit dem Schlüsselwort <code>else</code>:
      </p>
      
      <p><img src="/images/l7_else.png" class="img-thumbnail"></p>
      
      <p>Hinter den if-Block fügt am das Wort 'else' hinzu und eröffnet einen neuen Block. Wichtig zu wissen: Es wird immer nur einer der beiden Blöcke ausgeführt. Wenn die Bedingung wahr ist, wird der erste Block (Zeile 5) ausgeführt. Ist die Bedingung falsch, dann wird der zweite Block (Zeile 7) ausgeführt. Es kann nicht passieren, dass beide Blöcke zusammen ausgeführt werden - genauso passiert es nicht, dass keiner der beiden Blöcke ausgeführt wird. In diesem Fall ist es natürlich ziemlich egal, ob wir den else-Block verwenden, weil unsere Funktion beim 'return' einfach abbricht. Beim nächsten Beispiel allerdings ist die Unterscheidung wichtig:
      </p>
      
      <p><img src="/images/l7_else2.png" class="img-thumbnail"></p>
      
      <p>Die Ameise tut eine von zwei Dingen: Zum Bau zurückkehren oder weiterlaufen. Was die Ameise tut, entscheidet sich an der Bedingung in Zeile 4. Die Ameise soll sich immer für eine der beiden Alternativen entscheiden und zwar so, wie es der Situation angemessen ist. Das wird mit dieser If-Else-Anweisung erreicht.
      </p>
    `,
    questions : [
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    solution : [0,1,0,1,1,0],
  },
  83 : {
    level : 8,
    name : "Variablen verwenden",
    text : `
      <p>
      </p>
    `,
    questions : [
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    solution : [0,1,0,1,1,0],
  },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*91 : {
    level : 9,
    name : "Programmieren mit Logik",
    text : `
      <p>Du hast jetzt einige Erfahrung mit Code gesammelt. Deine Ameisen sind auf dem Spielfeld spazieren gewesen, haben Nahrungsmittel gefunden, haben gekämpft und Nachrichten gesendet. Dabei hast du viele Funktionen und Befehle aus der API verwendet, wie z.B. GeheZuZiel() oder SendeNachricht(). Diese reichen aber nicht immer aus.
      </p>
      
      <p>Für stärkere Ameisen wird es nötig sein, eigene Funktionen zu entwickeln. Dafür brauchen wir Logik. Du hast sie schon bei der Einteilung der Teams und der der Abfrage von Schrittzahl und Runde kennengelernt. Auf dieser Stufe wollen wir uns noch einmal intensiv mit Logik beschäftigen.
      </p>
      
      <p>Dabei wirst du sehen, dass die Programmiersprache, die du hier lernst, alltagstauglich ist. Sie ist nicht nur dazu gut, Ameisen zu programmieren, sondern man kann mit ihr auch Probleme aus ganz anderen Bereichen angehen. Daher haben die Aufgaben auf dieser Stufe auch erstmal scheinbar wenig mit Ameisen zu tun. Die Technik dahinter ist aber gleich und wird dann später auf die Ameisen angewendet.
      </p>
      
      <p>Die Aufgaben auf dieser Stufe sind anders. Neu ist, dass du jetzt eine Ereignisdefinition vorgegeben bekommst. Diese unterscheidet sich aber von den Ereignissen, die wir bisher kennen:
      </p>
      
      <p><img src="/images/l6_beispiel.png" class="img-thumbnail"></p>
      
      <p>Zum einen beginnt der Ereignisname mit einem Hashtag. Für jede Aufgabe gibt es ein eigenes Ereignis. Außerdem kommt hinzu, dass diese Ereignisse eine Antwort von dir erwarten. Daher sprechen wir in diesem Fall von einer <em>Funktion</em>. Hier wurde also die Funktion 'Beispiel' definiert.
      </p>
      
      <p>Funktionen nehmen Parameter entgegen. Diese werden in der ersten Zeile der Ereignisdefinition in die runden Klammern geschrieben. Es gibt viele Funktionen, die mehr als einen Parameter annehmen. Unsere Funktion nimmt nur den einen Parameter 'x' an. Für jede Aufgabe ist angegeben, wie die Parameter heißen und was sie bedeuten.
      </p>
      
      <p>Jede Funktion erwartet von dir eine Antwort. Diese wird mit dem Schlüsselwort <code>return</code> zurückgegeben. Die Antwort hat einen bestimmten Datentyp, für uns sind erstmal zwei wichtig: Einerseits gibt es Zahlen, z.B. der der Wert <code style="color:blue">4</code> oder der Wert <code style="color:blue">2.5</code> (kein Komma, sondern Punkt als Dezimalzeichen). Andererseits gibt es Zeichenketten wie z.B. der Wert <code style="color:brown">"Hallo"</code> (mit doppelten Anführungszeichen). In der Angabe wird auch ziemlich deutlich, von welchem Typ die Antwort seien soll.
      </p>
      
      <p>Unsere Beispielfunktion soll einfach die Zeichenkette "Alles in Ordnung" zurückgeben. Dazu schreibst du:
      </p>
      
      <p><img src="/images/l6_return.png" class="img-thumbnail"></p>
      
      <p>'return' ist kein Befehl und braucht keine runden Klammern. Schreibe einfach den Wert dahinter. Zu beachten ist, dass nach dem 'return' kein weiterer Code ausgeführt wird. Die Funktion ist damit abgeschlossen.
      </p>
      
      <p>Unsere Funktion 'Beispiel' hat jetzt ihren Parameter ignoriert. Als zweites Beispiel schauen wir uns eine Funktion mit dem Namen 'QuadratHalbe' an. Diese macht etwas mit ihrem Parameter:
      </p>
      
      <p><img src="/images/l6_quadrat.png" class="img-thumbnail"></p>
      
      <p>Der Parameter 'x' ist eine Zahl (wie das x aus dem Matheunterricht). Das Sternchen (<code>*</code>) ist ein Multiplikationszeichen. Das x wird also mit sich selber multipliziert. Der Schrägstrich (<code>/</code>) ist ein Divisionszeichen. Danach wird das x durch 2 geteilt. Daher hat die Funktion den Namen 'QuadratHalbe'. Das Ergebnis wird zurückgegeben und der Datentyp der Antwort ist Zahl.
      </p>
      
      <p>Wer ruft nun diese Funktionen auf? Auf dem Spielfeld befindet sich ein Checkpoint. Gehe mit der Ameise dort hin, dann starten eine Reihe von Tests. Diese Tests rufen deine Funktion auf und schauen sich deine Antwort. Je nach dem, ob die Funktion den Vorschriften entspricht, wird eine Meldung zurückgegeben:
      </p>
      
      <p><img src="/images/l6_tests.png" class="img-thumbnail"></p>
      
      <p>Hier siehst du, wie die Ameise die Tests starten, den Ersten besteht und beim Zweiten einen Fehler macht. Als Lösung wurde die Zeichenkette "Zahl ist positiv" erwartet, die Funktion hat aber gar keine Antwort gegeben. Hier wurde natürlich nicht QuadratHalbe getestet, sondern die Vorzeichenfunktion aus der ersten Aufgabe.
      </p>
      
      <p>Das ist unser Grundgerüst, mit dem wir die Logik üben wollen. Im nächsten Tutorial geht es direkt weiter mit Bedingungen.
      </p>
    `,
    questions : [
      "Viele Probleme können logisch gelöst werden.",
      "Ereignisse mit Hashtag nennen wir hier Funktionen.",
      "Jede Funktion nimmt genau einen Parameter.",
      "Jede Funktion erwartet eine Antwort mit 'return'.",
      "Division schreibt man mit Doppelpunkt.",
      "Die Funktion wird während der Aufgabe ausführlich getestet."
    ],
    solution : [1,1,0,1,0,1],
  },
  93 : {
    level : 9,
    name : "Bedingte Anweisungen",
    text : `
      <p>Das Kernstück der Logik sind bedingte Anweisungen. Diese ermöglichen es dem Programm, auf die Umgebung zu reagieren und aufgrund dessen Entscheidungen zu treffen. Das Grundgerüst einer bedingten Anweisung sieht so aus:
      </p>
      
      <p><img src="/images/l6_if.png" class="img-thumbnail"></p>
      
      <p>Begonnen wir mit dem Schlüsselwort 'if'. Danach kommt in die runden Klammern eine Bedingungen. Das ist ein logischer Ausdruck, der wahr oder falsch sein kann. Ist die Bedingung wahr, werden die Anweisungen innerhalb der geschweiften Klammern ausgeführt. Ist die Bedingung falsch, werden diese Anweisungen übersprungen. Die Anweisungen werden also nur <em>bedingt</em> ausgeführt. Anweisungen können sein: Befehle, eine 'return' Anweisung oder sogar wieder eine 'if'-Abfrage!
      </p>
      
      <p>Bedinungen können mit einem Vergleichsoperator geschrieben werden. Vier Stück kennst du bereits: <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code> und <code>&gt;=</code>. Damit kannst du eine Funktion schreiben, die je nach Parameter eine andere Antwort zurückgibt:
      </p>
      
      <p><img src="/images/l6_groesser.png" class="img-thumbnail"></p>
      
      <p>Diese Funktion gibt "Ja" zurück, wenn die Zahl größer als 10 ist. Wenn die Zahl kleiner gleich 10 ist, gibt sie "Nein" zurück. Es kommen zwei bedingte Anweisungen vor mit allen Elementen.
      </p>
      
      <p>Wenn du diese Beispiel nochmal genauer anschaust, wirst du sehen, dass immer entweder der eine Fall oder der andere Fall eintritt. Egal welche Zahl als Parameter eingesetzt wird, immer ist genau eine der Bedingungen richtig. Weil das ein besonderer Fall ist gibt es dafür eine spezielle Erweiterung: Mit dem Schlüsselwort 'else' lassen sich zwei <em>Anweisungsblöcke</em> hintereinanderkoppeln, wie zwei Waggons. Der erste Anweisungsblock direkt nach dem 'if' wird ausgeführt, wenn die Bedingung wahr ist. Der andere Anweisungsblock wird ausgeführt, wenn die Anweisung falsch ist. Dazwischen steht das 'else':
      </p>
      
      <p><img src="/images/l6_if2.png" class="img-thumbnail"></p>
      
      <p>Die vier Vergleichsoperatoren gelten nur für Zahlen. Es gibt einen weiteren Operator, der auf Gleichheit prüft und für Zahlen und Zeichenketten funktioniert. Dieser wird mit zwei (!) Gleichheitszeichen geschrieben: <code>==</code>. Das folgende Programm prüft, ob der Name gleich "Peter" ist und gibt dann eine Antwort zurück.
      </p>
      
      <p><img src="/images/l6_string.png" class="img-thumbnail"></p>
      
      <p>Schließlich kommen noch die logischen Verknüpfungen <code>&&</code> (UND) und <code>||</code> (ODER)  ins Spiels. Bei der UND-Verknüpfung müssen beide Seiten wahr sein, damit die Bedingung insgesamt zutrifft. Bei der ODER-Verknüfung reicht es, wenn mindestens eine der Seiten wahr ist. Es können zwei oder mehr Bedingungen verknüpft werden. Eventuell muss auf die Klammersetzung geachtet werden. Sehen wir uns dazu ein Beispiel an:
      </p>
      
      <p><img src="/images/l6_verkn.png" class="img-thumbnail"></p>
      
      <p>Hier sind also alle Elemente in Aktion: In Zeile 4 werden drei Bedingungen mit ODER verknüpft. Der Block in Zeile 5 wird also ausgeführt, sobald eines der drei Bedingungen erfüllt ist. In Zeile 7 und Zeile 10 wurde je zwei Bedingungen mit UND verknüpft. Dabei ist es zulässig, dass die eine Seite mit Zeichenketten arbeitet und die andere Seite mit Zahlen. Tritt keine der Bedingungen zu, wurde also keine Antwort gegeben, wird die Zeile 13 aufgerufen.
      </p>
    `,
    questions : [
      "Bedingte Anweisungen beginnen mit dem Schlüsselwort 'wenn'.",
      "'<=' funktioniert nur mit Zahlen.",
      "Bei 'else' wird immer genau einer der zwei Blöcke ausgeführt.",
      "Zahlen vergleicht man wie in der Schule mit '='",
      "&& steht für die UND-Verknüpfung.",
      "Bei ODER reicht es, wenn eines der Bedingungen zutrifft."
    ],
    solution : [0,1,1,0,1,1],
  },*/
  /*102 : {
    level : 9,
    name : "Listen",
    text : `
      <p>Eine Liste gibt dir die Möglichkeit, mehrere Werte gemeinsam zu speichern und als ganzen Paket zu transportieren. Dabei musst du noch nicht einmal wissen, wie viele Werte du dabei speichern willst: Es können 10 Werte sein, oder auch 1000. Damit sind Listen ein wesentliches Werkzeug, um Informationen zu speichern und zu verwalten.
      </p>
      
      <p>In diesem Tutorial wirst du die Grundlagen von Listen kennenlernen. Damit kannst du schon einige Dinge anpacken, wobei natürlich noch nicht der volle Umfang erreicht ist.
      </p>
      
      <p>Beginnen wir damit, eine Liste zu erzeugen. Das funktioniert mit dem Syntax <code>[ , , ... ]</code>, den du in der Überschrift dieser Stufe schon gesehen hast. Innerhalb von eckigen Klamern werden die einzelnen Werte mit Komma getrennt aufgeschrieben. Diese bilden dann die <em>Einträge</em> der Liste. Eine Beispielfunktion, die als Antwort eine Liste zurückgibt:
      </p>
      
      <p><img src="/images/l7_listedek.png" class="img-thumbnail"></p>
      
      <p>Das ist eine Liste aus Zahlen. Es gibt auch Listen aus Zeichenketten. Und sogar die leere Liste, die allein aus dem Symbol <code>[]</code> besteht.
      </p>
      
      <p>Oft ist die Liste schon erstellt und wird dir von der Funktion als Parameter übergeben. Um von einer solchen Liste die Werte zu erhalten, schreiben wir hinter den Namen in eckigen Klammern die Nummer des Eintrags, den wir haben wollen, der sogenannte <em>Index</em>. Beachte: Dieser beginnt in der Zählung mit 0:
      </p>
      
      <p><img src="/images/l7_index.png" class="img-thumbnail"></p>
      
      <p>Der zweite Eintrag hat den Index 1, und der dritte Eintrag hat den Index 2. Auf diese zwei Werte greifen wir zu und addieren sie auf. Ist z.B. in arr der Wert <code>[4,6,8]</code> enthalten, dann rechnet die Funktion 6 + 8 = 14 aus.
      
      <p>Der Namme 'arr' ist eine Abkürzung von Array, was das englische Original ist von Liste. Wenn auf einer Website von Arrays gesprochen wird, dann sind genau diese Listen hier gemeint.
      </p>
      
      <p>Aus einer Liste lassen sich noch weitere Informationen auslesen. Zum Beispiel können wir über <code>.length</code> ermitteln, wie lang die Liste ist. Dieser Wert kann direkt verwendet werden oder in einer Bedingung, wie hier im Beispiel:
      </p>
      
      <p><img src="/images/l7_laenge3.png" class="img-thumbnail"></p>
      
      <p>Schließlich lernst du hier zwei Methoden kennen, mit denen du die Liste verändern kannst. Die eine Methode heißt <code>.push(obj)</code> und diese fügt am Ende einer Liste ein Element hinzu. Die Methode <code>.shift()</code> entfernt das erste Element und schiebt alle Elemente eins nach vorne. Beide zusammen machen eine Liste zu einer Warteschlange: Hinten kommen die Einträge rein, wandern zum Anfang und werden dort entfernt. Konkret im Code sieht das so aus:
      </p>
      
      <p><img src="/images/l7_pp.png" class="img-thumbnail"></p>
      
      <p>Wir erstellen eine neue Liste 'arr'. Zeile 4 definiert eine neue Variablen und das wird im nächsten Tutorial genauer angeschaut. In der nächsten Zeile löschen wir das erste Element, "Max". Danach fügen wir zwei Namen hinzu, Zeile 8 zeigt, wie die Liste danach aussieht. Dann geben wir den ersten Eintrag zurück, der ist das "Paul".
      </p>
      
      <p>Damit haben wir die Grundlagen der Listen gemeistert!
      </p>
    `,
    questions : [
      "Listen haben stets eine vorgegebene Länge.",
      "Die Werte innerhalb einer Liste heißen Einträge.",
      "Eine leere Liste wird mit [EMPTY] erzeugt.",
      "Die Länge einer Liste kann man abfragen.",
      "shift() entfernt ein Element am Anfang der Liste ein.",
      "pop() löscht ein Element vom Anfang der Liste."
    ],
    solution : [0,1,0,1,1,0],
  },*/
  /*97 : {
    level : 9,
    name : "Globale Variablen und Mathematik [???]",
    text : `
      <p>In letzten Tutorial hast du bereits ein Beispiel einer Variabledefinition gesehen. Variablen sind ein Hilfsmittel, um mit Informationen umzugehen. Die Parameter von Ereignissen und Funktionen sind bereits eine Form von Variablen. Diese werden verwendet, um Informationen zwischen der Simulation und dem Programm zu übertragen. Wir werden Variablen jetzt verwenden, um Informationen zu speichern.
      </p>
      
      <p>Die Variablen, die wir hier als Informationspeicher verwenden, werden global sein. Das bedeutet, dass diese Variable nicht an eine Ameise oder ein Ereignis gebunden ist, sondern an das gesamte Programm. Eine globale Variable kann also dazu verwendet werden, Informationen zwischen allen Ameisen zu jederzeit auszutauschen. Das ist sehr mächtig - aber wie es in der Informatik oft ist: Mächtige Werkzeuge brauchen auch fähige Programmierer ;).
      </p>
      
      <p>Wir werden uns daher zuerst mit einem ganz bestimmten Anwendungsfall beschäftigen, dazu ein Beispiel:
      </p>
      
      <p><img src="/images/l7_global.png" class="img-thumbnail"></p>
      
      <p>Zeile 3 definiert die globale Variable 'ZuckerListe'. Die Definition beginnt mit dem Schlüsselwort <code>var</code>. Nach dem Schlüsselwort kommt der Name der Variablen, dann ein einfaches Gleichheitszeichen und schließlich der Anfangswert. In unserem Beispiel ist der Anfangswert eine leere Liste.
      </p>
      
      <p>Jedesmal, wenn ein Zuckerhaufen gesehen wird, wird das Sichtungsobjekt zur dieser Liste hinzugefügt. Diese Liste gibt es für das gesamte Ameisenvolk nur einmal. Alle Ameisen greifen auf die gleiche Liste zu. Ereignisaufrufe zu unterschiedlichen Zeiten greifen auch auf die gleiche Liste zu. Das macht diese Liste global. Mit der Zeit werden ganz viele Sichtungsobjekte in dieser Variablen gespeichert sein.
      </p>
      
      <p>Auf diese Liste kann dann wiederum zugegriffen werden. Wenn eine Ameise untätig ist, nimmt sie das erste Element der Liste, geht dahin und löscht dieses dann aus der Liste. Wir behalten die Zucker nicht in der Liste, damit die Ameisen immer zu abwechselnden Zuckerhaufen hingehen. Man muss ja bedenken, dass <em>jede</em> Ameise, die beim Zucker ankommt, einen neuen Eintrag anlegt. Das kann mit der Zeit schon viel werden:
      </p>
      
      <p><img src="/images/l7_zugriff.png" class="img-thumbnail"></p>
      
      <p>Dieser Code hat allerdings noch ein Problem: Wenn die Liste leer ist, wird der Aufruf in Zeile 10 nicht funktionieren, weil kein Element mit dem Index 0 vorhanden ist. Um das zu reparieren wird noch eine Abfrage gebraucht:
      </p>
      
      <p><img src="/images/l7_zugriff2.png" class="img-thumbnail"></p>
      
      <p>Und damit haben wir eine Ameise, die Zuckerhaufen speichert und wieder auf diese zugreifen kann. Wenn diese Vorlage entsprechend ergänzt wird, kann damit ein sehr starkes Ameisenvolk programmiert werden.
      </p>
      
      <p>Zum Schluss soll es noch ein wenig um Mathematik gehen. Zwei Funktionen möchten wir dir hier vorstellen: Einerseits die Funktion <code>Math.pow()</code>. Diese kann Potenzen berechnen, wie z.B. 2 hoch 8. Dafür schreibst du: Math.pow(2, 8). Der erste Parameter ist die Basis, und der zweite Parameter ist der Exponent. Hier ist eine Funktion, die ihren Parameter 'x' in die fünfte Potenz hebt:
      </p>
      
      <p><img src="/images/l7_potenz.png" class="img-thumbnail"></p>
      
      <p>Außerdem kannst du mit <code>Math.round()</code> Zahlen runden. Die Zahl 3.4 wird auf 3 gerunden, die Zahl 3.5 auf 4, usw, wie aus der Schule bekannt. Auch hierzu ein Beispiel:
      </p>
      
      <p><img src="/images/l7_runden.png" class="img-thumbnail"></p>
    `,
    questions : [
      "Globale Variablen sind an eine einzelne Ameise gebunden.",
      "Variablen werden mit dem Schlüsselwort 'var' definiert.",
      "Leere Listen sind oft ein Spezialfall und müssen abfragt werden.",
      "Eine leere Liste hat die Länge -1.",
      "Math.pow(3,2) berechnet 2 hoch 3.",
      "7.5 wird auf 8 aufgerundet."
    ],
    solution : [0,1,1,0,0,1],
  },*/
  99 : {
    level : 9,
    name : "Vermessung, Statuswerte und Co. [API]",
    text : `
      <p>Nachdem du dich mit der Logik vertraut gemacht hast, bist du bereit, die letzten Teile der API kennenzulernen.
      </p>
      
      <p>Die Ameisen können auf dem Spielfeld Vermessungen durchführen. Dazu gibt es die Funktionen <code>Distanz()</code> und <code>Richtung()</code>. Diese Funktionen sind keine selbstständige Befehle, sondern können nur in Kombination mit bedingten Anweisungen oder anderen Befehlen verwendet werden. Meisten kommen sie innerhalb von Bedingungen vor.
      </p>
      
      <p>Beide Befehle braucht zwei Parameter. Diese stellen Orte auf dem Spielfeld dar. Distanz berechnet den Abstand zwischen diesen zwei Orten. Richtung berechnet die Richtung, in die man schauen muss, um vom ersten Ort zum zweiten Ort zu gelangen. Die Richtung wird als Himmelsrichtung (0 bis 359) angegeben. Ein Beispiel mit einem Zuckerhaufen (A) als ersten Parameter und einer Ameise (B) als zweiten Parameter:
      </p>
      
      <p><img src="/images/l8_vermessung.png" class="img-thumbnail"></p>
      
      <p>Als Orte können Sichtungsobjekte verwendet werden. Außerdem kann mit der Variablen <code>Bau</code> auf dem Heimatbau, mit <code>Position</code> auf die aktuelle Position der Ameise zugegriffen werden. Hier ein Beispiel mit allem in Kombination:
      </p>
      
      <p><img src="/images/l8_vermessungcode.png" class="img-thumbnail"></p>
      
      <p>Wenn die Ameise einen Zuckerhaufen sieht, dann prüft sie, ob die Entfernung zum Bau maximal 1000 ist und geht erst dann dahin. Eine andere Art der Verwendung besteht darin, die Zahl, die diese Funktionen zurückgeben, in einem Befehl zu verwenden:
      </p>
      
      <p><img src="/images/l8_vermessungcode2.png" class="img-thumbnail"></p>
      
      <p>Die Ameise bestimmt hier die Himmelsrichtung von ihrer Position aus zum Bau und dreht sich dann in diese Richtung. Das ist übrigens das Gleiche wie <code>DreheZuObjekt(Bau)</code>.
      </p>
      
      <p>Es gibt außerdem drei neue Statuswerte, auf die über Variablen zugegriffen werden kann. Kennen tust du bereits den Status SchrittZahl, jetzt kommen die Variablen <code>HatZucker</code>, <code>HatApfel</code> und <code>Blickrichtung</code> hinzu. Der letzte Status ist eine Zahl die angibt, in welche Himmelsrichtung die Ameise gerade schaut. In fortgeschrittenen Programmen (hihi) kann das manchmal wichtig sein. Die anderen zwei neuen Statuswerte geben an, ob die Ameise aktuell einen Zucker trägt bzw. ob die Ameise an einem Apfel steht oder diesen trägt. Dazu ein Beispiel:
      </p>
      
      <p><img src="/images/l8_status.png" class="img-thumbnail"></p>
      
      <p>Wenn die Ameise einen Apfel sieht, dann prüft sie, ob sie aktuell einen Zucker trägt. Wenn ja, dann lädt sie diesen ab und wird damit "Ballast" los. Eine Besonderheit hier: 'HatZucker' braucht keinen Operator sondern kann direkt als Bedingung verwendet werden. Das liegt daran, dass die Variable selber bereits einen Wahrheitswert dargestellt, also 'wahr' oder 'falsch' ist.
      </p>
      
      <p>Desweiteren gibt es ein neues Ereignis mit dem Namen <code>"Tick"</code>. Dieses Ereignis wird <em>jeden</em> Simulationstick für <em>jede</em> Ameise aufgerufen. Das Ereignis findet damit quasi ständig statt. Das kann genutzt werden, um zu ganz bestimmten Zeitpunkten ganz bestimmte Aktionen auszulösen:</p>
      
      <p><img src="/images/l8_tick.png" class="img-thumbnail"></p>
      
      <p>Genau im Tick 1000 werden alle Ameisen zum Bau zurückgeschickt. Das bewirkt diese Ereignisdefinition. Eine andere Anwendung wäre es, die Ameisen über einer gewissen Schrittzahl sofort zum Bau zurückzuschicken. Das ist nicht ganz einfach und sprengt leider den Umfang dieses Tutorials. Für die Aufgaben wird es mit diesen Informationen reichen.
      </p>
      
      <p>Globalen Variablen hast du nun kennengelernt. Es gibt dazu noch die Möglichkeit, jeder Ameise persönlich Variablen zuzuordnen. Diese Variablen werden im <code>Gedächtnis</code> gespeichert. Im Gegensatz zu globalen Variablen müssen die Einträge im Gedächtnis nicht definiert werden, sondern werden automatisch bei der ersten Zuweisung erstellt. Die Namen für die Einträge mit einem Punkt hinter das Objekt 'Gedächtnis' geschrieben:
      </p>
      
      <p><img src="/images/l8_gedaechtnis.png" class="img-thumbnail"></p>
      
      <p>Die Ameise kann mit jeder Zuckersichtung den Wert im Gedächtnis erhöhen. Außerdem können Gedächtniseinträge in Abfragen verwendet werden:
      </p>
      
      <p><img src="/images/l8_ged2.png" class="img-thumbnail"></p>
      
      <p>Beim zehnten Zucker gibt sie über den Befehl <code>alert</code> eine Meldung aus:
      </p>
      
      <p><img src="/images/l8_ged3.png" class="img-thumbnail"></p>
      
      <p>Zum Schluss gibt es noch die Funktion <code>Aktiv()</code>, mit der man gespeicherte Nahrungsmittel darauf prüfen kann, ob sie noch auf dem Spielfeld vorhanden sind. 
      </p>
    `,
    questions : [
      "Distanz berechnet immer den Abstand vom Bau zu einem Ort.",
      "Die aktuelle Position kann mit der Variablen 'this' abgefragt werden.",
      "HatZucker gibt an, ob die Ameise noch Zucker aufladen kann.",
      "Tick wird jeden Simulationstick für jede Ameise aufgerufen.",
      "Gedächtniswerte gelten für jede Ameise persönlich.",
      "Mit 'alert()' lässt sich eine Meldung ausgeben."
    ],
    solution : [0,0,0,1,1,1],
  },
  101 : {
    level : 9,
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
      
      <p>Probleme treten auf, wenn Befehle mit anderen Anweisungen gemischt werden, die sofort ausgeführt werden. Dazu gehören Bedingungen und Zuweisungen zu Variablen. Diese stören sich dann untereinander:
      </p>
      
      <p><img src="/images/l8_async.png" class="img-thumbnail"></p>
      
      <p>Das ist ein typisches Beispiel: Man würde erwarten, dass die Ameise nach dem Aufladen des Zuckers eine Meldung gibt. Allerdings kommt nie eine Meldung. Das liegt daran, dass die Bedingung zum Zeitpunkt des Ereignis sofort ausgeführt werden, die Befehle aber im AAV zwischengespeichert werden und später erst ausgeführt werden. Beim Zeitpunkt des Ereignis hat die Ameise noch einen Zucker geladen.
      </p>
      
      <p>Weil das ärgerlich ist, gibt es eine offizielle Möglickeit, das Programm zu 'unterbrechen' und bis zu bestimmten Befehlen zu warten. Das geht dadurch, dass man in der Ereignisdefinition ein Sternchen hinzufügt und beim entsprechenden Befehl das Schlüsselwort <code>yield</code> anwendet:
      </p>
      
      <p><img src="/images/l8_yield.png" class="img-thumbnail"></p>
      
      <p>Anweisungen sind also unterbrochen. Der erste Teil geht bis zum Befehl 'NimmZucker()'. Durch das yield bleibt das Programm "stehen" und wird erst zu dem Zeitpunkt ausgeführt, wo der Befehl 'NimmZucker()' fertig ausgeführt wurde. Erst dann wird die Bedingung ausgewertet und dann erscheint auch die richtige Meldung.
      </p>
      
      <p>Wie das mit dem AAV gelöst ist? Der Programmierer sagt, dass er gerne zurückgeruft werden möchte. Der Mitarbeiter schreibt sich die Nummer auf und notiert sie nach dem letzten Befehl, der im AAV steht. Ist dieser Befehl dann fertig ausgeführt, ruft er zurück und der Programmierer kann seine weiteren Anweisungen geben.
      </p>
    `,
    questions : [
      "Solange die Dinge wie erwartet funktionieren benötigt man kein Wissen über die Details.",
      "AntIT! enthält viele Bugs.",
      "AntIT! ist die beste Ameisensimulation der Welt.",
      "Bei mehreren Mitarbeitern kommt es nie zu Problemen.",
      "Die Programmiersprache der Ameisen enthält genau zwei Mitarbeiter.",
      "Mit function* und yield kann ein Rückruf organisiert werden."
    ],
    solution : [1,0,1,0,0,1],
  },
  103 : {
    level : 9,
    name : "Ausblick",
    text : `
      <p>Hier sind wir also, beim letzten Tutorial. Wie geht es danach für dich weiter?
      </p>
      
      <p>Wenn dir die Aufgaben Spaß gemacht haben und du noch nicht alle gelöst hast, kannst du jetzt nochmal zurückgehen und die restlichen Aufgaben lösen. Diese stellen eine gute Übung dar, um die gelernten Inhalte zu vertiefen.
      </p>
      
      <p>Die Programmiersprache, die du hier gelernt hast, heißt "JavaScript". Wenn du dich für weitere Programmiertechniken interessiert: Dafür gibt es im Internet sehr viele Ressourcen, Tutorials und Einführungen.
      </p>
      
      <p>Schwieriger wird es, gute Aufgaben zu finden, an denen du deine Fähigkeiten üben kannst.
      </p>
      
      <p>TODO: Erstelle hier eine Liste mit Links
      </p>
    `,
    noq: true,
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
