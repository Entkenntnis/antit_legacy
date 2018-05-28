module.exports.tutorials = {
  1: {
    level : 1,
    name : "Herzlich Willkommen!",
    text : `
      <p>Während du diese Zeilen liest, bist du höchst wahrscheinlich Teil einer Schülergruppe, die gerade an einem Ameisen-Workshop teilnimmt. Vielleicht freust du dich schon auf den Tag/die nächsten Tage. Du bist neugierig darauf, was man mit diesen Ameisen alles machen kann. Schön, dass du da bist! Vielleicht aber denkst du dir auch nur: Was soll das schon wieder?
      </p>
      
      <p>Die Wenigsten kommen hier an und haben eine Vorstellung, was sie erwarten wird. Genausowenig haben die meisten Menschen eine Vorstellung davon, was es heißt zu programmieren. In einer Zeit, in der wir tagtäglich mit IT in Verbindung stehen, ist das ziemlich schade. Denn dadurch entgeht uns die Chance, unsere Lebenswelt besser zu verstehen. Und es entgeht und die Chance, diese Welt mitzugestalten.
      </p>
      
      <p>AntIT! ist mit dem Wunsch entstanden, dir das Programmieren beizubringen. Selbst wenn man am Ende des Workshops kein fertiger Programmierer ist - sollte AntIT! doch einen Einblick geben, was Programmieren bedeutet. Beim Programmieren erlebt man, wie der eigene Code das Verhalten des Computers steuert und verändert. Gleichzeitig ist man auch gezwungen, sich mit der Funktionsweise des Computer selber auseinanderzusetzen. Je besser man den Computer und seine Software versteht, umso besser kann man selber Code schreiben. Du lernst hier nicht nur, wie man Ameisen steuert, sondern gleichzeitig auch, wie dein Code vom Computer ausgeführt wird. Beide Teile gehören zum Programmieren dazu. Und du wirst das nicht nur theoretisch lernen, sondern du wirst das auch ganz praktisch ausprobieren können.
      </p>
      
      <p>Das wird dich hier erwarten. Und das wird eine Herausforderung sein. Etwas Neues zu lernen ist anstrengend und verbraucht Energie und Aufmerksamkeit. Auf diesem Weg wollen wir dich so gut wie möglich begleiten:
      </p>
      
      <ul>
        <li>Alle Inhalte des Workshops können vollständig über Tutorials gelernt werden. Du kannst ganz nach deinem Tempo arbeiten. Wenn dich Themen besonders interessieren kannst du dir da mehr Zeit nehmen. Solltest du etwas wieder vergessen haben kannst du jederzeit auf die vorherigen Tutorials zurückgreifen. Damit liegt die Kontrolle ganz bei dir.
        </li>
        <li>Unmittelbar nach dem Tutorial findest du ein kleines Quiz, mit dem du dich abfragen kannst. Ein Quiz enthält sechs Antwortmöglichkeiten, von denen keine bis alle richtig sein können. Kreuze die richtigen Antworten an. Das Quiz ist weniger als Prüfung gedacht, sondern vielmehr als kleiner "Energizer" zwischendurch. Nach dem Quiz wird auch das Tutorial als fertig markiert.
        </li>
        <li>Die Inhalte der Workshops können praktisch an Aufgaben ausprobiert werden. Diese knüpfen eng an die erlernten Inhalte an, fordern aber manchmal ein bisschen Umdenken. An den Aufgaben kannst du deinen Lernfortschritt ablesen und sehen, ob du es wirklich verstanden hast.
        </li>
        <li>Das Auge programmiert mit: Bei AntIT! haben wir uns bemüht, die Oberfläche und die Simulation möglichst anschaulich zu gestalten. Sind diese Ameisen nicht süß?
        </li>
      </ul>
      
      <img src="/images/ameiseapfel.png" class="img-thumbnail" title="Hey Jo!">
    
      <br><br>
      <p>Ach, herrlich ... So, das ist jetzt genug an Informationen. Bearbeite zum Schluss noch dieses Quiz:
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
        <li><p>Gib den Ameisen den Namen "Hallo Welt".</p>
        </li>
        <li><p>Öffne die Ameisen, in dem du auf "Bearbeiten" klickst.</p>
        </li>
        <li><p>Trage die fehlenden Teile in Zeile 3 und Zeile 4 ein:
        <img src="/images/l1_schnipsel_hallowelt.png" class="img-thumbnail" title="Der Code wird automatisch gefärbt."></p>
        </li>
        <li><p>Gehe auf den Trainingsplatz.
        </p></li>
        <li><p>Klicke auf die Aufgabe "Erste Schritte" von Stufe 1.
        </p></li>
        <li><p>Wähle bei "Lösung einreichen" deine neue Ameise "Hallo Welt" und klicke auf "Level starten".
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
      
      <p>Oben links ist die Statusübersicht. In der ersten Zeile wird angezeigt, wie viel Zeit noch bleibt, bis die Simulation zu Ende ist. Die Aufgaben müssen innerhalb dieser Zeit gelöst werden. Die Punktzahl wird später in der Kampfarena wichtig. Diese erhält man, wenn man Nahrungsmittel sammelt oder Gegner vergiftet.
      </p>
      
      <p>Das Diagramm ganz oben links gibt die Anzahl der Ticks pro Sekunden aus. Dies entspricht der Geschwindigkeit der Simulation. Diese führt im Normalfall 40 Rechenschritte, sog. Ticks, in einer Sekunde aus. Falls du eine komplizierte Ameise entwickelst, die viel Rechenleistung verbraucht, kann diese Anzahl sinken.
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
      <p>Im letzten Tutorial hast du bereits dein erstes Ameisenvolk programmiert. Im Grunde ist es für den Anfang ziemlich einfach. Erstelle ein neues Ameisenvolk und nenne es "Stufe 1 Aufgabe". Wenn du die Ameise bearbeitest, dann sieht der Code so aus:
      </p>
      
      <p><img src="/images/l1_schnipsel_name_falsch.png" class="img-thumbnail" title="Sehr kreativer Name ..."></p>
      
      <p>Aber ups! Es gibt ja in Stufe 1 mehrere Aufgaben und du möchtest gerne für jede Aufgabe eine eigene Ameise anlegen. Der Name der Ameise lässt sich zum Glück noch nachträglich ändern, indem die erste Zeile angepasst wird:
      </p>
      
      <p><img src="/images/l1_schnipsel_name.png" class="img-thumbnail" title="Ordnung muss sein, nicht?"></p>
      
      <p>So, passt. Die Zeilen 3 bis 5 definieren ein Ereignis. Später können noch weitere Ereignisse hinzukommen. Ereignisse werden nie verschachtelt! Innerhalb eines Ereignis kommt nur Code hinein. Weitere Ereignisse kommen in eigene Zeilen.</p>
      
      <p>Wir müssen außerdem bei jedem Ereignis angeben, von welchem Typ er ist. Innerhalb einer Ameise sollte es pro Typ nur eine Definition geben. Der einzige Typ, den wir aktuell kennen, ist <code>"IstGeboren"</code>. Dieses Ereignis wird genau einmal bei der Geburt der Ameise aufgerufen. Trage den Typ ein und füge schon mal ein paar Zeilen Code ein:
      </p>
      
      <p><img src="/images/l1_schnipsel_event.png" class="img-thumbnail" title="Befehle innerhalb von Ereignisse werden eingerückt. Nutze die Tab-Taste."></p>
      
      <p>Es gibt den Befehl <code>Gehe</code> und den Befehl <code>Drehe</code>. Wenn der Geh-Befehl ausgeführt wird, dann bewegt sich die Ameise geradeaus nach vorne um die angegebene Anzahl Schritte. Beim Dreh-Befehl dreht sich die Ameise um den angegebenen Winkel im Uhrzeigersinn. Positive Winkel entsprechen damit Rechtsdrehungen, der Befehl in Zeile 5 entspricht einer 90-Grad-Drehung nach links.
      </p>
      
      <p>Jeder Befehl wird mit runden Klammern abgeschlossen, selbst wenn mal in den Klammern nichts steht. Fehlen die Klammern, dann wird der Befehl auch nicht ausgeführt. Basta.
      </p>
      
      <p>Du kannst jetzt mit dieser Ameise weiterarbeiten für die erste Aufgabe von Stufe 1. Ein letzter Hinweis zum Schluss: Tutorials mit dem Zusatz [API] stellen neue Befehle vor. Diese werden rot im Text hervorgehoben und erleichtern damit die Suche nach bestimmten Funktionen.
      </p>
    `,
    questions : [
      "Der Name eines Ameisenvolks lässt sich nach dem Erstellen nicht mehr ändern.",
      "Pro Ereignistyp soll es in einer Ameise nur eine Definition geben.",
      "Wir haben bisher nur das Ereignis \"IstGeboren\" kennengelernt.",
      "Jeder Befehl braucht runde Klammern.",
      "Jeder Befehl kommt auf eine eigene Zeile.",
      "Wir kennen bisher die Befehle Geh und Dreh."
    ],
    solution : [0,1,1,1,1,0],
  },
  4 : {
    level : 2,
    name : "Nahrungsmittel [API]",
    text : `
      
      <p>In diesem Tutorial lernst du, wie deine Ameisen Zucker und Äpfel sammeln können. Im Grunde ist es kinderleicht und daher wird dieses Tutorial recht kurz sein.
      </p>
      
      <p>Um Zucker zu sammeln, muss du deine Ameise zuerst ganz nah an den Zuckerhaufen hinbewegen. Wenn die Ameise am Zucker steht, führst du den Befehl <code>NimmZucker()</code> aus. Damit lädt sich die Ameise ein Stückchen Zucker auf.
      </p>
      
      <p><img src="/images/02_ameisezucker.jpg" class="img-thumbnail" title="Ein richtig perfekter Zuckerwürfel auf ihrem Rücken!"></p>
      
      <p>Jetzt muss die Ameise nach Hause. Dazu gibt es den Befehl <code>GeheZuBau()</code>, der die Ameise direkt in den Bau führt. Die Ameisen sind wie Geister - sie müssen nicht um Hindernisse herumgehen, sondern können einfach durch alles hindurchlaufen. Auch wenn das komisch aussieht: Es ist für dich als Entwickler ziemlich praktisch.
      </p>
      
      <p>Die zwei Befehle, die du gerade kennengelernt hast, brauchen keinen Parameter. Deshalb steht nichts in den runden Klammern. Die Klammern sind aber trotzdem wichtig! Wenn du sie vergisst, wird der Befehl einfach nicht ausgeführt.
      </p>
      
      <p><img src="/images/ameisezucker.png" width="400px" class="img-thumbnail" title="Huch!"></p>
      
      <p>Am Ende, wenn die Ameise im Bau steht, kann sie mit dem Befehl <code>LadeZuckerAb()</code> den Zucker in den Bau geben. Dann erhält du deine Punkte dafür und die Menge wird in der Statistik angezeigt.
      </p>
      
      <p>Für Äpfel gibt es nur einen Befehl: <code>TrageApfel()</code>. Sobald die Ameise am Apfel steht, kann sie diesen Befehl ausführen. Dann fängt sie an, auf ihre Kollegen zu warten. Wenn vier Ameisen zusammenkommen, tragen sie den Apfel zurück zum Bau. Das alles steckt in diesem einen Befehl. Du musst dich nur darum kümmern, dass die Kollegen zum Apfel hinfinden.
      </p>
      
      <p><img src="/images/02_apfel.png" class="img-thumbnail" title="Wie schön die Sonne sich spiegelt ..."></p>
      
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
      <p>Du hast jetzt bereits ein wenig Erfahrung mit dem Programmieren von Ameisen. Dieses Tutorial möchte dir noch ein paar kleine Tricks zeigen, mit denen du schon fast wie ein "Profi" arbeiten kann.
      </p>
      
      <h4>Simulationsgeschwindigkeit einstellen</h4>
      
      <p>Vielleicht die nützlichste Funktion überhaupt: Mit den Zahlentasten 1, 2 und 3 kannst du während der Simulation von einer Aufgabe die Geschwindigkeit einstellen. 2 ist normal, 1 ist Zeitlupe und 3 ist ganz schnell.
      </p>
      
      <h4>Mit Tabs arbeiten</h4>
      
      <p>Wenn man nur in einen Tab arbeitet, ist es oft sehr umständlich, die Ameise zu bearbeiten und sich dann bei den Aufgaben durchzuklicken, um das Level zu starten. Das Problem lässt sich geschickt lösen, in dem man zwei Tabs im Browser verwendet:
      </p>
      
      <p><img src="/images/02_tabs.png" class="img-thumbnail" title="Firefox, Chrome, Edge - nutze den Browser, der dir gefällt."></p>
      
      <p>In einem Tab kann man den Editor öffen, in anderem die Simulation laufen lassen. Wenn man die Ameise speichert, reicht es, die Simulation neu zu laden (mit einem Klick auf den runden Pfeil oder mit der Taste F5) - schon wird die neue Version der Ameise ausgeführt. Wer will kann auch den Bildschirm teilen und einen Tab links und den anderen Tab rechts anzeigen lassen.
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
      
      <p>ProTip: Anstatt auf "Speichern" zu klicken, kann man den Editor auch mit Strg-S schließen. Praktisch, wenn man nach dem Tippen nicht gleich zur Maus greifen möchte.</p>
      
      <h4>Kommentare nutzen</h4>
      
      <p>Oft möchte man etwas ausprobieren, aber nicht den ganzen Code löschen. In dieser Situation können einzelne Zeilen mit <code>//</code> auskommentiert werden:
      </p>
      
      <p><img src="/images/02_kommentar.png" class="img-thumbnail" title="Da hat jemand den Ereignisnamen vergessen."></p>
      
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
  6 : {
    level : 3,
    name : "Suchen und Finden [API]",
    text : `
      <p>Du bist jetzt bereit, ein paar neue Ereignisse kennenzulernen. Diese kümmern sich darum, dass dein Ameisenvolk ausschwärmen kann, um Nahrungsmittel zu suchen und diese dann auch zu finden.
      </p>
      
      <p>Folge den Schritten dieser Anleitung. Diese bereiten die erste Aufgabe dieser Stufe vor.
      </p>
      
      <ol>
        <li><p>Erstelle ein neues Ameisenvolk mit dem Namen "Stufe 3 Aufgabe 1".
        </p>
        </li>
        <li><p>Trage für das erste Ereignis den Typ "IstUntätig" ein. <code>IstUntätig</code> wird immer wieder aufgerufen, wenn die Ameise gerade nichts zu tun hat.
        </p>
        </li>
        <li><p>Klicke auf die neue Schaltfläche "Ereignis hinzufügen" im Editor. Diese erzeugt eine neue Vorlage für ein Ereignis. Trage für dieses Ereignis den Typ "SiehtZucker" ein. Der Code sollte dann so aussehen:<img src="/images/l3_tut1_1.png" class="img-thumbnail">
        </p>
        </li>
        <li><p><code>SiehtZucker</code> wird aufgerufen, wenn eine Ameise in ihrer Sichtweite von 70 Ameisenschritten einen Zuckerhaufen sieht. Die Ameise kann dann zu diesem Zuckerhaufen hinlaufen. Füge in die runden Klammern den Paramter "zucker" hinzu und nutze ihn für den Befehl <code>GeheZuZiel</code>:<img src="/images/l3_tut1_2.png" class="img-thumbnail" title="Der Name des Parameters darf frei gewählt werden."><br>
        </p>
        </li>
        <li><p>Entsprechend gibt es das Ereignis <code>SiehtApfel</code>. Füge ein weiteres Ereignis hinzu und trage als Typ "SiehtApfel" ein. Schreibe den Parameter dazu und lasse die Ameise auf diesen Apfel zulaufen.
        </p>
        </li>
      </ol>
      
      <p>Ergänze diese Vorlage mit dem Wissen, das du schon hast, damit die Ameise ihre Aufgabe vollständig erfüllen kann.
      </p>
      
      <p>Noch mal ein Hinweis zu Ereignissen: Diese werden nicht verschachtelt. Definitionen von Ereignissen exisitieren als eigener Block. Außerdem soll es pro Ereignistyp nur eine Definition geben. Eine Definition mehrfach anzugeben ist nicht sinnvoll.
      </p>
    `,
    questions : [
      "IstUntätig wird während einer Simulation nur einmal aufgerufen.",
      "SiehtZucker besteht aus 10 Buchstaben.",
      "Eine Ameise hat eine Sichtweite von 70 Ameisenschritten.",
      "GeheZuZiel kann für Zucker und Äpfel verwendet werden.",
      "Ameisen sind blind für Äpfel.",
      "Dieses Tutorial hat 6 Unterpunkte."
    ],
    solution : [0,0,1,1,0,0],
  },
  12 : {
    level : 3,
    name : "Gefahren ausweichen [API]",
    text : `
      <p>Damit sich die Ameise schützen kann, gibt es außerdem eine Reihe von Funktionen, mit denen die Ameise ihre Feinde wahrnehmen und auf diese reagieren kann.
      </p>
      
      <p>Wanzen auf dem Spielfeld in Sichtweite nimmt die Ameise mit dem Ereignistyp <code>SiehtWanze</code> wahr. Dieser Typ liefert einen Parameter mit, der die Wanze darstellt. Mit <code>DreheWegVonObjekt</code> kann sich die Ameise von der Wanze wegbewegen. Es gibt noch die spezielle Variante <code>SiehtWanzeVoraus</code>, die aufgerufen wird, wenn sich die Wanze im Winkel +-45 Grad vor der Ameise befindet. In diesem Fall wird SiehtWanze ebenfalls aufgerufen.
      </p>
      
      <p>Ameisen aus gegnerischen Teams werden mit dem Ereignistyp <code>SiehtGegner</code> wahrgenommen. Der Vollständigkeit halber sei noch erwähnt, dass es zu DreheWegVonObjekt noch das Gegenstück <code>DreheZuObjekt</code> existiert. Dieser Befehl dreht die Ameise auf ein Objekt zu. 
      </p>
      
      <p>Im Gefahrenfall kann man die Ameise auch einfach in Schockstarre versetzen. Mit dem Befehl <code>Warte</code> kann man die Ameise eine gewisse Zeit lang stehen lassen. Die Zeit wird dabei in Anzahl Ticks angegeben. Normalerweise vergehen 40 Ticks pro Sekunde. In dieser Zeit tut die Ameise nichts.
      </p>
      
      <p>Der Rand stellt für die Ameisen zum Glück keine Lebensgefahr dar. Trotzdem ist es gut, wenn sie darauf reagieren kann. Der Ereignistyp <code>RandErreicht</code> wird aufgerufen, wenn die Ameise an den Rand angestoßen ist. Sie kann sich dann z.B. um einen bestimmten Winkel drehen oder zum Bau zurückkehren.
      </p>
      
      <p>Nicht alle Funktionen sind immer sinnvoll. Hier ist mal ein Beispiel, das ziemlich willkürlich gewählt ist. Dafür zeigt es zumindest, wie die Ereignisse und Befehle verwendet werden:
      </p>
      
      <p><img src="/images/l3_ausweichen.png" class="img-thumbnail">
      </p>
    `,
    questions : [
      "Eine Ameise kann auf Gegner und Wanzen reagieren.",
      "Eine Ameise kann sich zu einem Objekt und weg von einem Objekt drehen.",
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
      
      <p><img src="/images/04_gift.png" class="img-thumbnail" title="Es kommt immer auf die Dosis an!"></p>
      
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
      
      <p>Viel Spaß also bei dem Kampf!
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
      
      <p>Naja, fast. An zwei Punkten muss man sich doch mit den Feinheiten des AAV beschäftigen. Diese möchte hier noch zum Schluss darstellen.
      </p>
      
      <ol>
      <li><p>Was ist nämlich, wenn der Programmierer Anweisungen gibt und es noch unfertige Befehle im AAV gibt, typischerweise dann, wenn die Ameise etwas sieht. Wie soll der Mitarbeiter mit den Befehlen im AAV umgehen? Dafür wurde folgende Regelung gesetzt, die sich im praktischen Alltag bewährt hat: Falls die neuen Anweisungen den Befehl "GeheZuBau" oder "GeheZuZiel" enthalten, dann werden die alten Befehle im AAV gelöscht. Es wird davon ausgegangen, dass diese keine Bedeutung mehr haben. Das ist der Normalfall. Falls die neuen Anweisungen diese Befehle aber nicht enthalten, dann wird davon ausgegangen, dass die alten Anweisungen noch gebraucht werden und die neuen Anweisungen werden <em>vor</em> den alten Anweisungen ausgeführt. Das passiert meist, wenn man z.B einer Wanze ausweicht.
      </p></li>
      
      <li><p>Eine Abfrage, wie z.B. Reichweite, kann nur den Wert zum aktuellen Zeitpunkt liefern, nicht den zu einen späteren Zeitpunkt. Eine konkrete Situation:<br><img src="/images/l4_aav.png" class="img-thumbnail"><br>Die Abfrage in Zeile 9 prüft den Wert der Abfrage, bevor die 1000 Schritte gegangen wurden - obwohl die Abfrage nach dem Befehl steht! Mit dem AAV wird das klarer: Die 1000 Schritte wurden notiert, die Abfrage wird aber sofort vom Mitarbeiter ausgeführt. Das ist ein subtiler Punkt, der dann doch ziemlich unintutiv wird. Die Lösung dafür ist, nach den 1000 Schritten ein neues Ereignis zu aktivieren und in diesem Ereignis dann die Abfrage zu setzen. Das geht mit dem Befehl SendeSelber, den wir noch kennenlernen werden:<br><img src="/images/l4_aav2.png" class="img-thumbnail"><br>Jetzt wird nach den 1000 Schritten das Ereignis "prüfeReichweite" aufgerufen. Der Mitarbeiter ruft den Programmierer erneut an und jetzt kann die Abfrage im richtigen Zeitpunkt ausgeführt werden.
      </p></li>
      </ol>
      
      <p>Geschafft! Wenn du diese zwei Punkte verstanden hast, dann hast du auch die AAV verstanden. Sowas wie eine AAV wird in vielen Anwendungen verwendet, um Probleme mit der Parallelität zu vermeiden, z.B. auch hier im Browser oder bei graphischen Oberflächen wie Visual C# oder JavaFx. Dort heißt sie Event Queue und kümmert sich noch um weitere Aufgaben. Die grundlegende Idee aber bleibt gleich: Es gibt nur einen Mitarbeiter (der für die Oberfläche zuständig ist) und dieser kümmert sich nacheinander um alle Aufgaben.
      </p>
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
    name : "Der Ameisenwettbewerb",
    text : `
      <p>Ab Level 5 kann man am Ameisenwettbewerb teilnehmen.<br>
      Spielregeln: 20 Ameisen werden um den Bau herum geboren. Äpfel, Zucker und Wanzen erscheinen auf dem Spielfeld. Ziel ist es, möglichst viele Punkte zu sammeln. Es gibt Punkte für eingesammelte Äpfel (1000), Zucker (25 pro Stückchen, 1250 pro Haufen) und getötete Wanzen und Gegner (je 500 Punkte).<br>
      Ameisen können durch Wanzen und Müdigkeit sterben. Nahrungsmittel lassen neue Ameisen entstehen. Bevölkerungslimit sind 100 Ameisen.<br>
      Eine Simulation dauert 7500 Runden (~ 3 Minuten), danach wird ausgewertet.<br><br>
      Simlationen können mit beliebigen Ameisen ausgeführt werden. Um in der Ergebnisliste aufgenommen zu werden gibt es ein paar Bedingungen:<br>
      1. Das Ameisenvolk muss freigegeben sein. Anderen Spielern soll damit die Möglichkeit gegeben werden, gegen deine Ameise zu spielen<br>
      2. Pro Simulationen müssen 2 bis 4 Ameisen teilnhemen aus jeweils verschiedenen Teams. Alle Ameisen pro Simulation müssen auch freigegeben sein.<br>
      3. Die Simulation zählt dann, wenn sie bis zum Ende durchgeführt wurde. Die Statusleiste zeigt dann "Simulation abgeschlossen" an.<br><br>
      Die durchschnittliche Punktzahl entscheidet dann darüber, auf welcher Platzierung man sich befindet.<br><br>
      Viel Erfolg!
      </p>
    `,
    questions : [
      "wahr",
      "falsch",
      "falsch",
      "wahr",
      "wahr",
      "wahr"
    ],
    solution : [1,0,0,1,1,1],
  },
  10 : {
    level : 5,
    name : "Programmieren mit Bedingungen",
    text : `
      <p>Wir lernen jetzt, Befehle unter Bedingungen auszuführen. Dazu gibt es den if-Block. Im Kern besteht er aus dem Wort 'if', einer runden Klammer mit der Bedingung und einer geschweiften Klammer mit den Befehlen, die unter dieser Bedingungen stehen:
      </p>
      
      <p><img src="/images/if_1.png" class="img-thumbnail" title="Beim Cursor kommen die Befehle hin. Einrücken nicht vergessen!"></p>
      
      <p>Man kann als Bedingungen verschiedene Vergleiche verwenden. Am besten, wir schauen uns ein paar Beispiele an:
      </p>
      
      <p><img src="/images/if_2.png" class="img-thumbnail" title=""></p>
      
      <p>Hier wird der Befehl ausgeführt, wenn die Reichweite der Ameise größer als 2000 beträgt. <code>Reichweite</code> ist eine vordefinierter Wert, den die Ameise jederzeit verwenden kann. Ein anderer solcher Wert ist <code>Runde</code>:
      </p>
      
      <p><img src="/images/if_3.png" class="img-thumbnail" title=""></p>
      
      <p>Der Befehl wird genau in der Runde 200 ausgeführt. Man beachte die doppelten Ist-Gleich-Zeichen! Schauen wir uns noch ein weiteres Beispiel an:
      </p>
      
      <p><img src="/images/if_4.png" class="img-thumbnail" title=""></p>
      
      <p>Hier verwenden wir als Vergleich ein kleiner gleich. Als neue Funktion gibt es den Befehl <code>Distanz</code>. Diese kann von zwei Objekten auf dem Spielfeld die Entfernung berechnen. Dazu schreibt man sie mit Komma getrennt in die runden Klammern. Vordefinierte Objekte sind <code>Bau</code> für den Heimatbau und <code>Position</code> für die aktuelle Position der Ameise. Zusätzlich können Objekte aus Sieht...-Ereignissen verwendet werden. Ein letztes Beispiel:
      </p>
      
      <p><img src="/images/if_5.png" class="img-thumbnail" title=""></p>
      
      <p>Mit der Funktion <code>Winkel</code> kann der Blickwinkel bestimmt werden, aus dem das erste Objekt das zweite Objekt sieht. Die Zahl entspricht der Richtung, wie bei DreheZuRichtung. Ein anschauliches Beispiel: Wenn sich die Ameise genau über dem Bau befindet, dann ergibt die Berechnung oben 270.
      </p>
    `,
    questions : [
      "Eine Bedingung besteht aus 'if' und dahinter geschweiften Klammern.",
      "Innerhalb der geschweiften Klammer können mehrere Befehle stehen.",
      "Gleichheit wird mit = überprüft.",
      "Es können die Operatoren >= und <= verwendet werden.",
      "Mithilfe von Distanz kann die Entfernung von zwei Objekten bestimmt werden.",
      "Sichtungsobjekte können wir Vermessungen nicht verwendet werden."
    ],
    solution : [0,1,0,1,1,0],
  },
  11 : {
    level : 6,
    name : "Weitere Inhalte",
    text : `
      <p>Für weitere Inhalte besuche folgende Datei: <a href="/script.pdf">AntIT für Fortgeschrittene</a>
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
