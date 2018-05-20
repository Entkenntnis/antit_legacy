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
      
      <img src="/images/ameiseapfel.png" class="img-thumbnail" title="Hey Jo!"></img>
    
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
        <img src="/images/l1_schnipsel_hallowelt.png" class="img-thumbnail" title="Der Code wird automatisch gefärbt."></img></p>
        </li>
        <li><p>Gehe auf den Trainingsplatz.
        </p></li>
        <li><p>Klicke auf die Aufgabe "Erste Schritte" von Stufe 1.
        </p></li>
        <li><p>Wähle bei "Lösung einreichen" deine neue Ameise "Hallo Welt" und klicke auf "Level starten".
        </p></li>
      </ol>
      
      <p>Fertig. Wenn alles gutgegangen ist sieht du folgenden Bildschirm:</p>
      <p><img src="/images/l1_overview.png" class="img-thumbnail" title="Der gelbe Kreis hinten rechts ist Teil der ersten Aufgabe."></img>
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
      
      <p><img src="/images/l1_schnipsel_name_falsch.png" class="img-thumbnail" title="Sehr kreativer Name ..."></img></p>
      
      <p>Aber ups! Es gibt ja in Stufe 1 mehrere Aufgaben und du möchtest gerne für jede Aufgabe eine eigene Ameise anlegen. Der Name der Ameise lässt sich zum Glück noch nachträglich ändern, indem die erste Zeile angepasst wird:
      </p>
      
      <p><img src="/images/l1_schnipsel_name.png" class="img-thumbnail" title="Ordnung muss sein, nicht?"></img></p>
      
      <p>So, passt. Die Zeilen 3 bis 5 definieren ein Ereignis. Später können noch weitere Ereignisse hinzukommen. Ereignisse werden nie verschachtelt! Innerhalb eines Ereignis kommt nur Code hinein. Weitere Ereignisse kommen in eigene Zeilen.</p>
      
      <p>Wir müssen außerdem bei jedem Ereignis angeben, von welchem Typ er ist. Innerhalb einer Ameise sollte es pro Typ nur eine Definition geben. Der einzige Typ, den wir aktuell kennen, ist <code>"IstGeboren"</code>. Dieses Ereignis wird genau einmal bei der Geburt der Ameise aufgerufen. Trage den Typ ein und füge schon mal ein paar Zeilen Code ein:
      </p>
      
      <p><img src="/images/l1_schnipsel_event.png" class="img-thumbnail" title="Befehle innerhalb von Ereignisse werden eingerückt. Nutze die Tab-Taste."></img></p>
      
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
    name : "Nahrungsmittel",
    text : `
      
      <p>In diesem Tutorial lernst du, wie deine Ameisen Zucker und Äpfel sammeln können. Im Grunde ist es kinderleicht und daher wird dieses Tutorial recht kurz sein.
      </p>
      
      <p>Um Zucker zu sammeln, muss du deine Ameise zuerst ganz nah an den Zuckerhaufen hinbewegen. Wenn die Ameise am Zucker steht, führst du den Befehl <code>NimmZucker()</code> aus. Damit lädt sich die Ameise ein Stückchen Zucker auf.
      </p>
      
      <p><img src="/images/02_ameisezucker.jpg" class="img-thumbnail" title="Ein richtig perfekter Zuckerwürfel auf ihrem Rücken!"></img></p>
      
      <p>Jetzt muss die Ameise nach Hause. Dazu gibt es den Befehl <code>GeheZuBau()</code>, der die Ameise direkt in den Bau führt. Die Ameisen sind wie Geister - sie müssen nicht um Hindernisse herumgehen, sondern können einfach durch alles hindurchlaufen. Auch wenn das komisch aussieht: Es ist für dich als Entwickler ziemlich praktisch.
      </p>
      
      <p>Die zwei Befehle, die du gerade kennengelernt hast, brauchen keinen Parameter. Deshalb steht nichts in den runden Klammern. Die Klammern sind aber trotzdem wichtig! Wenn du sie vergisst, wird der Befehl einfach nicht ausgeführt.
      </p>
      
      <p><img src="/images/ameisezucker.png" width="400px" class="img-thumbnail" title="Huch!"></img></p>
      
      <p>Am Ende, wenn die Ameise im Bau steht, kann sie mit dem Befehl <code>LadeZuckerAb()</code> den Zucker in den Bau geben. Dann erhält du deine Punkte dafür und die Menge wird in der Statistik angezeigt.
      </p>
      
      <p>Für Äpfel gibt es nur einen Befehl: <code>TrageApfel()</code>. Sobald die Ameise am Apfel steht, kann sie diesen Befehl ausführen. Dann fängt sie an, auf ihre Kollegen zu warten. Wenn vier Ameisen zusammenkommen, tragen sie den Apfel zurück zum Bau. Das alles steckt in diesem einen Befehl. Du musst dich nur darum kümmern, dass die Kollegen zum Apfel hinfinden.
      </p>
      
      <p><img src="/images/02_apfel.png" class="img-thumbnail" title="Wie schön die Sonne sich spiegelt ..."></img></p>
      
      <p>Auch in diesem Bild sieht man: Die Ameisen stehen so perfekt auf der gleichen Stelle, dass man nicht erkennt, dass es eigentlich vier Ameisen sind. Diese Ameisen unterscheiden sich in diesem Punkt doch sehr von ihren natürlichen Verwandten da draußen.
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
      
      <p><img src="/images/02_tabs.png" class="img-thumbnail" title="Firefox, Chrome, Edge - nutze den Browser, der dir gefällt."></img></p>
      
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
      
      Falls dir das Tippen schwerfällt (selbst mit Auto-Vervollständigung und Vorlage), kann du mit einem Tipptrainer (z.B. Tipp10) etwas üben. Tippen ist nichts weiter als Übungssache und wer das nicht kann ist einfach ... hm ... faul.
      </p>
      
      <h4>Mit Tastenkürzel speichern</h4>
      
      <p>ProTip: Anstatt auf "Speichern" zu klicken, kann man den Editor auch mit Strg-S schließen. Praktisch, wenn man nach dem Tippen nicht gleich zur Maus greifen möchte.</p>
      
      <h4>Kommentare nutzen</h4>
      
      <p>Oft möchte man etwas ausprobieren, aber nicht den ganzen Code löschen. In dieser Situation können einzelne Zeilen mit <code>//</code> auskommentiert werden:
      </p>
      
      <p><img src="/images/02_kommentar.png" class="img-thumbnail" title="Da hat jemand den Ereignisnamen vergessen."></img></p>
      
      <p>Zeile 7 und 8 sind auskommentiert und werden nicht ausgeführt.
      </p>
    `,
    questions : [
      "Taste 1 ist die normale Geschwindigkeit.",
      "Man kann mehrerer Tabs für AntIT! nutzen.",
      "Die Seite kann mit F11 neugeladen werden.",
      "Die öffnende geschweifte Klammer wird mit Alt Gr + 7 getippt.",
      "Mit Strg + S kann man im Editor speichern.",
      "Zwei Schrägstriche kommentieren eine Zeile im Code aus."
    ],
    solution : [0,1,0,1,1,1],
  },
  6 : {
    level : 3,
    name : "Äpfel und Zucker finden",
    text : `
      <p class="lead"><em>Gibt es noch mehr Ereignisse als nur "IstGeboren"?</em></p>
      
      <p>Ja. Und du wirst in diesem Tutorial zwei neue Ereignisse kennenlernen. Bereit? Dann lasst uns beginnen.
      </p>
      
      <p>Wenn du jetzt den Editor öffnest, dann kannst du mit eine Klick auf "Ereignis hinzufügen" ein neues Ereignis erstellen. Nehmen wir also an, du verwendest bereits "IstGeboren". Klicke jetzt auf "Ereignis hinzufügen". Dann sieht der Code so aus:
      </p>
      
      <p><img src="/images/03_ereignis.png" class="img-thumbnail" title="Lass zwischen den Ereignissen eine Zeile frei."></img></p>
      
      <p>In Zeile 7 bis 9 findest du den eingefügten Code. Das erste Ereignis, dass wir neu lernen werden, heißt "SiehtZucker". Dieses Ereignis wird aufgerufen, sobald die Ameise in Sichtweite einen Zuckerhaufen erkennt. Die Ameise kann 70 Schritte weit sehen. Schreibe den Namen des Ereignis zwischen die Anführungsstriche:
      </p>
      
      <p><img src="/images/03_editor2.png" class="img-thumbnail" title="Groß-/Kleinschreibung beachten"></img></p>
      
      <p>Dieses Ereignis besitzt außerdem einen Parameter, der angibt, wo der Zuckerhaufen sich befindet. Gib diesem Parameter einen Namen, in dem du ihn zwischen die runden Klammern schreibst. Meist verwendet man ein kleingeschriebenes Wort, hier also konkret "zucker":
      </p>
      
      <p><img src="/images/03_editor3.png" class="img-thumbnail" title="'zucker' kann nun innerhalb des Ereignis verwendet werden."></img></p>
      
      <p>Passend dazu gibt es einen neuen Befehl namens <code>GeheZuZiel(ort)</code>, mit denen du an solche Orte hingehen kannst. Dazu schreibt du den Namen des Orts zwischen die runden Klammern des Befehls. Wenn die Namen übereinstimmen, dann färbt sich der Code hellblau ein:
      </p>
      
      <p><img src="/images/03_editor4.png" class="img-thumbnail" title="Einrücken nicht vergessen"></img></p>
      
      <p>Fertig. Wir haben jetzt der Ameise beigebracht, dass sie zum Zucker hinläuft, sobald sie welchen sieht. Jetzt müssen wir nicht mehr den genauen Standort des Zuckers kennen, um ihn abbauen zu können. Stattdessen können wir die Gegend ablaufen und nach einen Zuckerhaufen suchen. Wie bei IstGestorben können auch alle anderen bisherigen Befehle in SiehtZucker verwendet werden. Das kannst du in den folgenden Aufgaben üben.
      </p>
      
      <p>Das ganze funktioniert genauso auch für Äpfel und sieht dann so aus:
      </p>
      
      <p><img src="/images/03_editor5.png" class="img-thumbnail" title="Alle Zucker wurden mit Apfel ersetzt ..."></img></p>
      
      <p>Im nächsten Level wirst du dann noch zwei weitere Ereignisse kennenlernen!
      </p>
    `,
    questions : [
      "Es gibt insgesamt nur ein Ereignis für die Ameisen.",
      "Den Code für ein neues Ereignis muss man jedes komplett selber schreiben.",
      "Die Ameise hat eine Sichtweite von 70 Schritten.",
      "Den Parameter von SiehtZucker darf man nennen wie man will. 'zucker' war nur ein Beispiel.",
      "GeheZuZiel nimmt keinen Paramter.",
      "Innerhalb von SiehtApfel kann man nur einen Befehl schreiben."
    ],
    solution : [0,0,1,1,0,0],
  },
  7 : {
    level : 4,
    name : "Mit Gift gegen Wanzen und Gegner",
    text : `
      <p>In diesem Tutorial lernst du, wie sich die Ameisen verteidigen können. Dazu haben die Ameisen die Möglichkeit, eine Giftwolke mit einem Radius von 80 Schritten um sich herum zu sprühen. Sie hält 4 Sekunden lang. Solange nur eine Wolke da ist, passiert den Wanzen und den Ameisen aus dem gegnerischen Team nichts. Überlappen sich allerdings drei Wolken, dann werden die Gegner vergiftet und sterben.
      </p>
      
      <p>Die Giftwolke kann man mit dem Befehl <code>SetzeGift()</code> versprühen. Jede Ameise kann maximal eine Giftwolke auf einmal setzen. Danach muss sie zum Bau zurück und dort ihre Ladung wiederherstellen.
      </p>
      
      <p><img src="/images/04_gift.png" class="img-thumbnail" title="Es kommt immer auf die Dosis an!"></img></p>
      
      <p>Die einzelne Wolke im Bild oben ist noch harmlos. Wenn zwei weitere hinzukommen, dann wird es für die Gegner gefährlich. Hier ist also eine ordentliche Koordination der Ameisen gefragt.
      </p>
      
      <p>Um die Ladungen gezielt auf die Gegner setzen zu können gibt es dazu zwei neue Ereignisse: SiehtWanze und SiehtGegner. Beide werden aufgerufen, sobald ein feindliches Objekt in Sicht kommt. Als Parameter übergeben sie das gesichtete Objekt. Dieser Parameter wird bei den Aufgaben dieses Levels noch nicht gebraucht. Es ist aber gut zu wissen, dass es sie gibt. Ungenutzte Paramter können auch ganz weggelassen werden.
      </p>
      
      <p><img src="/images/04_wanze.png" class="img-thumbnail" title="Bloß nicht zu nahe kommen!"></img></p>
      
      <p>Analog dazu das Ereignis mit dem Gegner:
      </p>
      
      <p><img src="/images/04_gegner.png" class="img-thumbnail" title="Hau ab!"></img></p>
      
      <p>Damit sind die Ameisen nun in der Lage, Gegner und Wanzen zu erkennen und sich mit Gift zu verteidigen.
      </p>
    `,
    questions : [
      "Die Ameisen können Gegner mit ihren Greifern zwicken.",
      "Der Angriff hat eine Reichweite von 80 Schritten",
      "Die Giftwolke bleibt für immer auf dem Spielfeld.",
      "Nach jeder Giftwolke muss die Ameise zurück, um eine neue Ladung zu holen.",
      "Erst ab drei überlappenden Giftwolken wird die Dosis tödlich.",
      "SiehtWanze und SiehtGegner besitzen einen Parameter, der in diesem Level noch nicht gebraucht wird."
    ],
    solution : [0,1,0,1,1,1],
  },
  8 : {
    level : 4,
    name : "Ameisen in Arbeitsschleife",
    text : `
      <p>Um das Ziel mancher Aufgaben zu erreichen braucht es viel Arbeit. Dabei soll keine Ameise untätig in der Gegend herumstehen. Um genau solche Ameisen anzusprechen, gibt es das Ereignis "Wartet". Es nimmt keinen Parameter und wird für die Ameisen aufgerufen, die ihre Befehle abgearbeitet haben und gerade nichts zu tun haben.
      </p>
      
      <p><img src="/images/04_wartet.png" class="img-thumbnail" title="Hau ab!"></img></p>
      
      <p>Das ist ein guter Ort, um Befehle zu programmieren, die die Ameisen in Dauerschleife ausführen sollen. Denn sobald die Ameise fertig ist, wird sie ja mit diesem Ereignis von vorne beginnen. Somit kann man den Ameisen Wiederholungen beibringen, z.B. damit sie das Spielfeld absucht.
      </p>
      
      <p>Umgekehrt ist es manchmal auch nützlich, die Ameise eine gewisse Zeitspanne warten zu lassen. Hier müssen wir noch kurz ansprechen, wie die Zeit für die Ameisen vergeht: Für die Ameise läuft die Simulation in Runden ab. Pro Sekunde werden 40 Runden simuliert. Mit dem Befehl <code>Warte(zeit)</code> kann die Ameise eine bestimmte Anzahl von Runden warten. Um zwei Sekunden zu warten, schreibt man den Befehl <code>Warte(80)</code>
      </p>
      
      <h4>Kleine technische Ergänzung:
      </h4>
      
      <p>Wenn die Ameise ständig in Bewegung ist, dann kommt sie irgendwann an ihre Reichweitengrenze von 3000 Schritten. In diesem Fall soll sie zum Bau zurückkehren. Nun ist es so, dass die Ameise in zwei verschiedenen Zuständen sein kann: offen oder geschlossen. Solange sie kein Ziel anvisiert, ist sie offen (z.B. durch Befehle wie Gehe oder Drehe). Sobald sie aber ein Ziel anvisiert oder anvisieren wird (wenn der Befehl also erteilt ist, nur noch nicht ausgeführt), dann wird die Ameise geschlossen. Konkret geschieht das durch die Befehle GeheZuBau() und GeheZuZiel().
      </p>
      
      <p>Wenn die Ameise geschlossen ist, dann ignoriert sie alle Nahrungsmittel auf ihrem Weg. Auf dem Rückweg zum Bau ist das normalerweise auch erwünscht. Möchte man nun, dass die Ameise auf dem Weg zum Bau trotzdem Nahrungsmittel wahrnimmt, dann gibt es den Befehl <code>GeheZuBau(OFFEN)</code>. Dieser Befehl lässt die Ameise zum Bau gehen, ohne dass die Ameise geschlossen wird. Damit lassen sich nun Suchpfade programmieren, auf denen die Ameise nach einer gewissen Zeit zurückkehrt und trotzdem Nahrungsmittel findet.
      </p>
      
      <p>Umgehen lässt sich das Problem auch, wenn man die Reihenfolge der Befehle abändert. Das ist dann wieder stark von der konkreten Situation abhängig. Als Faustregel: Wenn die Ameise Nahrungsmittel ignoriert, obwohl die Ereignisse dafür angelegt sind, dann mal den Parameter <code>OFFEN</code> ausprobieren.
      </p>
    `,
    questions : [
      "Das Ereignis Wartet wird aufgerufen, wenn die Ameise nichts mehr zu tun hat.",
      "Das Ereignis besitzt einen Parameter.",
      "Mit 'Wartet' können Wiederholungen programmiert werden.",
      "In einer Sekunde vergehen 60 Runden.",
      "Warte(3) wartet 3 Sekunden.",
      "Wenn die Ameise ein Ziel anvisiert, dann ist sie offen."
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
      
      <p><img src="/images/if_1.png" class="img-thumbnail" title="Beim Cursor kommen die Befehle hin. Einrücken nicht vergessen!"></img></p>
      
      <p>Man kann als Bedingungen verschiedene Vergleiche verwenden. Am besten, wir schauen uns ein paar Beispiele an:
      </p>
      
      <p><img src="/images/if_2.png" class="img-thumbnail" title=""></img></p>
      
      <p>Hier wird der Befehl ausgeführt, wenn die Reichweite der Ameise größer als 2000 beträgt. <code>Reichweite</code> ist eine vordefinierter Wert, den die Ameise jederzeit verwenden kann. Ein anderer solcher Wert ist <code>Runde</code>:
      </p>
      
      <p><img src="/images/if_3.png" class="img-thumbnail" title=""></img></p>
      
      <p>Der Befehl wird genau in der Runde 200 ausgeführt. Man beachte die doppelten Ist-Gleich-Zeichen! Schauen wir uns noch ein weiteres Beispiel an:
      </p>
      
      <p><img src="/images/if_4.png" class="img-thumbnail" title=""></img></p>
      
      <p>Hier verwenden wir als Vergleich ein kleiner gleich. Als neue Funktion gibt es den Befehl <code>Distanz</code>. Diese kann von zwei Objekten auf dem Spielfeld die Entfernung berechnen. Dazu schreibt man sie mit Komma getrennt in die runden Klammern. Vordefinierte Objekte sind <code>Bau</code> für den Heimatbau und <code>Position</code> für die aktuelle Position der Ameise. Zusätzlich können Objekte aus Sieht...-Ereignissen verwendet werden. Ein letztes Beispiel:
      </p>
      
      <p><img src="/images/if_5.png" class="img-thumbnail" title=""></img></p>
      
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
