module.exports.tutorials = {
  1: {
    level : 1,
    name : "Herzlich Willkommen!",
    text : `
      <p>Willkommen, liebe Abenteurer, in der Welt von AntIT! Hier beginnt deine große Reise durch die Informatik. Wege voller Schätze und Gefahren liegen vor dir. Entdecke neue, unbekannte Landschaften und lerne dein Potenzial kennen. Dein Ziel ist es, zum Meister der IT zu werden - ein Meister, der die unfassbare Rechenkraft des Computers beherrscht und damit wunderbare Welten erschaffen und gestalten kann. Bist du bereit? Möchtest du dich dieser Herausforderung stellen?
      </p>
      
      <p class="lead"><em>Ja, ich will!</em></p>
      
      <p>Sehr gut, sehr gut. Um dich so gut wie möglich auf diese Reise vorzubereiten, werden wir dich zuerst in den nötigen Grundlagen ausbilden. Diese Ausbildung wird für dich im Land der Ameisen stattfinden.</p>
      
      <p class="lead"><em>Ach nö! Ich will nicht mit Ameisen spielen - ich will mit Drachen kämpfen!</em></p>
      
      
      <p>Mein Junge, mein Mädchen! Jeder große Meister hat auch mal klein angefangen. Und du wirst sehen: Selbst die Ameisen werden dich ordentlich auf Trab halten. Auch in der Mathematik fängt man nicht mit der Integralrechnung an, sondern mit den Grundrechenarten. Wenn du bereits Erfahrung hast, dann werden dir die Aufgaben keine großen Schwierigkeiten bereiten. Wenn das für die die erste Programmiererfahrung ist, dann darfst du dir ruhig Zeit nehmen. Manche Dinge brauchen eine Weile, bis man sie verstehst. Du wirst sehen, es wird dir Spaß - da bin ich mir ganz sicher.
      </p>
      
      <p class="lead"><em>Können wir endlich anfangen und weniger labern?</em></p>
      
      <p>Mein Junge, mein Mädchen! Du hast noch viel zu lernen. Die Fähigkeit zur Geduld und zum Zuhören sind nämlich ganz wichtig für die Ausbildung. Aber nun möchte ich dich nicht mehr länger auf die Folter spannen. Hier ist der Plan:
      </p>
      
      <p>Es gibt insgesamt neun Level. Du beginnt jetzt auf Level 1. Die Ausbildung hast du abgeschlossen, wenn du Level 9 erreicht hast. Danach bist du bereit, deinen weiteren Weg alleine zu gehen. In jedem Level werden ein paar neue Themen behandelt. Dazu gibt es Aufgaben. Wenn du mindestens die Hälfte der Aufgaben löst, kannst du in das nächste Level aufsteigen.
      </p>
      
      <p>Für die Aufgaben wirst du dein Ameisenvolk programmieren und damit ein ganz bestimmtes Ziel erfüllen. Wie das genau funktioniert wirst du im nächsten Tutorial lernen.
      </p>
      
      <p>Ab Level 4 kannst du außerdem am Ameisenwettbewerb teilnehmen. Du kannst gegen die anderen Teilnehmer der Ausbildung antreten und dich mit ihnen messen. Gelöste Aufgaben bringen dir Bonuspunkte, die deine Ameisen stärker machen.
      </p>
      
      <p>Die Ausbildung ist so angelegt, dass du dir alle Fähigkeiten selber beibringen kannst. Vielleicht wird das für dich erstmal eine ungewohnte Erfahrung sein. Um dir zu helfen gibt es am Ende jedes Tutorials ein kleines Quiz. Kreuze die richtigen Aussagen an und lasse sie überprüfen. Es können null bis alle Aussagen richtig sein.
      </p>
      
      <p>Hast du soweit noch Fragen?</p>
      
      <p class="lead"><em>Nein! Ich bin top informiert. Jetzt möchte ich loslegen!</em></p>
      
      <p>Dann kannst du an folgenden Fragen gleich mal sehen, ob du mir auch wirklich gut zugehört hast:</p>
    `,
    questions : [
      "Jeder große Meister hat auch mal klein angefangen.",
      "Es ist wichtig, die Ausbildung so schnell wie möglich zu durchlaufen.",
      "Man kann acht Mal im Level aufsteigen.",
      "Ab Level 9 kannst du am Ameisenwettbewerb teilnehmen.",
      "Das lösen der Aufgaben bringt dir nichts für den Wettbewerb.",
      "Es wird Wert darauf gelegt, dass du dir selber Themen erarbeitest.",
    ],
    solution : [1,0,1,0,0,1],
  },
  2 : {
    level : 1,
    name : "Die Welt der Ameisen",
    text : `
      <p>Sag Hallo zu Bofei und seinen Kollegen:
      </p>
      
      <p><img src="/images/01_bofei.jpg" class="img-thumbnail" title="Sehen die Ameisen nicht süß aus?"></img></p>
    
      <p>Die Ameisen leben auf einem rechteckigen Stück Boden. Dein Volk hat einen Bau, der den Mittelpunkt des Lebens darstellt: Dort werden neue Ameisen geboren und dort wird auch die gesamte Nahrung der Ameisen gesammelt. Um den Bau herum befinden sich Nahrungsmittel: Es gibt Zuckerhaufen und Äpfel, die natürlich gerne eingesammelt werden. Aus der Entfernung sieht das Ganze so aus:
      </p>
      
      <p><img src="/images/02_welt.jpg" class="img-thumbnail" title="Scheint es nicht so, als ob der Boden schweben würde?"></img></p>
      
      <p>Als Feinde gibt es die gefräßigen Wanzen, die gerne mal Ameisen zum Frühstück verputzen. Vor denen sollte man sich in Acht nehmen. Später werden wir noch sehen, wie man sich ihnen zur Wehr setzen kann.
      </p>
      
      <p><img src="/images/01_bug.jpg" class="img-thumbnail" title="Wie schön die Wanzen doch glänzen ..."></img></p>
      
      <p>Im Wettbewerb werden noch andere Ameisen das Spielfeld bevölkern. Dann geht es richtig zur Sache und man versucht sich gegenseitig die Nahrungsmittel wegzuschnappen. Doch nicht nur Gegner sind ein Problem für die Ameisen: Jede Ameise hat nur eine bestimmte Reichweite und muss immer wieder zum Bau zurück, um sich auszuruhen. Vergessen sie das, dann sterben sie. Aber mit bisschen Geschick lässt sich das ganz gut umgehen.
      </p>
      
      <p>Die Ameisen sind sehr treue Untertanen. Sie tun genau das, was in ihrer Programm festgelegt wurde. Um ein Ameisenvolk zu programmieren, kann du unter dem Menüpunkt "AntIT! Home" ein neues Ameisenvolk anlegen. Wenn du auf bearbeiten klickst, dann erscheint der Code-Editor. Hier kannst du das Verhalten der Ameisen so definieren, wie du es haben willst. Und mit Macht kommt auch Verantwortung: Solltest die Ameisen irgendetwas falsch machen, dann wirst natürlich du zur Rechenschaft gezogen:
      </p>
      
      <p><img src="/images/01_overview.png" class="img-thumbnail" title="Wenn dir ein Ameisenvolk nicht gefällt, kannst du es wieder löschen."></img></p>
      
      <p>Im nächsten Tutorial wirst du lernen, wie man mit dem Code-Editor das Verhalten der Ameisen programmiert.</p>
    `,
    questions : [
      "Der Bau ist für die Ameisen das Zentrum des Lebens.",
      "Als Nahrung gibt es Zucker, Äpfel und Birnen.",
      "Wanzen sind vollkommen harmlos und ungefährlich.",
      "Ameisen können unbegrenzt herumlaufen.",
      "Ameisen tun und lassen, was sie wollen.",
      "Du bist verantwortlich für das Verhalten der Ameisen."
    ],
    solution : [1,0,0,0,0,1],
  },
  3 : {
    level : 1,
    name : "Grundlagen der Programmierung",
    text : `
      <p class="lead"><em>Und wie steuert man jetzt die Ameisen?</em></p>
    
      <p>Die Ameisen werden nicht per Hand einzeln gesteuert - das wäre bei der großen Menge an Ameisen etwas mühsam - sondern mithilfe von Programm-Code. Das ist ein besonderer Text, den der Computer einlesen kann und der das genaue Verhalten der Ameisen bestimmt. Wenn du ein neues Ameisenvolk erstellt, ihm einen Namen gibst und dann auf "Bearbeiten" klickst, dann erscheint folgendes Fenster:
      </p>
      
      <p><img src="/images/01_editor.png" class="img-thumbnail" title="Sehr kreativer Name ..."></img></p>
      
      <p>Das ist das Grundgerüst jeder Ameise. In der ersten Zeile wird festgelegt, dass wir eine Ameise programmieren wollen (und nicht ein Auto oder eine Waschmaschine). Dazu rufen wir eine Funktion namens "NeueAmeise" auf, die uns dann eine neue Ameise erzeugt. Diese speichern wir in der Variablen "Ameise". In den Anführungszeichen steht der Name der Ameise. Du kannst ihn jederzeit ändern, wenn du willst.
      </p>
      
      <p>Es gibt ganz viele verschiedene Möglichkeiten, Programmcode zu schreiben und Software aufzubauen. Umso wichtiger ist es zu wissen, was für eine Struktur man aktuell verwendet. Unsere Ameisen werden mit <strong>Ereignissen</strong> programmiert. Das nennt man dann ereignis-orientierte Programmierung. Sprich mir also nach: Womit werden die Ameisen programmiert? 
      </p>
      
      <p class="lead"><em>Mit Ereignissen, ist doch pipi einfach ...</em></p>
      
      <p>Schön das zu hören. Aber du solltest noch erfahren, was ein Ereignis überhaupt ist: Ein Ereignis ist ein Satz mit der Form: "Wenn die Ameise <...>, dann tut die Ameise <...>". Wenn die Bedingung im ersten Teil des Satzes eintritt, dann wird das Verhalten im zweiten Teil des Satzes ausgeführt.
      </p>
      
      <p>Die Bedingungen sind bei den Ameisen bereits fest vorgegeben. Für den Anfang reicht uns ein einziges Ereignis: <code>IstGeboren</code>. Der Name des Ereignis wird in Zeile 3 zwischen die Anführungszeichen geschrieben:
      </p>
      
      <p><img src="/images/01_editor2.png" class="img-thumbnail" title="Vorsicht mit der Groß- und Kleinschreibung!"></img></p>
      
      <p>Jetzt haben wir es fasst geschafft. Nun brauchen wir noch Befehle, die die Ameise ausführen kann. Befehle werden jetzt zwischen die Zeile 3 und die Zeile 5 hineingeschrieben. Auf jede Zeile kommt genau ein Befehl. Man schreibt zuerst den Namen des Befehls und hängt dann runde Klammern hinten dran. Die meisten Befehle nehmen einen Parameter, wie z.B. eine Zahl. Befehle werden eingerückt, damit man besser erkennt, zu welchem Ereignis sie gehören.
      </p>
      
      <p class="lead"><em>Können wir die Ameise endlich bewegen? Wie heißen dazu die Befehle?</em></p>
      
      <p>Der erste Befehl heißt <code>Gehe</code> und er nimmt als Parameter die Anzahl der Schritte. Der zweite Befehl heißt <code>Drehe</code>. Dieser nimmt als Parameter einen Winkel in Grad, um den sich die Ameise im Uhrzeigersinn (also nach rechts) dreht. Um nach links zu drehen nimmt man einen negativen Winkel. Wenn man also 200 Schritte gehen, sich um 90 Grad nach rechts drehen und weitere 100 Schritte gehen will, dann schreibt man:
      </p>
      
      <p><img src="/images/01_editor3.png" class="img-thumbnail" title="Rücke die Befehle mit der TAB-Taste ein."></img></p>
      
      <p>Die Befehle werden bei Geburt der Ameise der Reihenfolge nach von oben nach unten von jeder Ameise ausgeführt. Alles klar? Dann kannst du gleich mit den Aufgaben loslegen!
      </p>
    `,
    questions : [
      "Der Name eines Ameisenvolks lässt sich nach dem Erstellen nicht mehr ändern.",
      "Ameisen werden ereignis-orientiert programmiert.",
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
      
      <p>Am Ende, wenn die Ameise im Bau steht, kann sie mit dem Befehl <code>LadeZuckerAb()</code> den Zucker in den Bau geben. Dann erhält du deine Punkte dafür und die Menge wird in der Statistik angezeigt.
      </p>
      
      <p>Für Äpfel gibt es nur einen Befehl: <code>TrageApfel()</code>. Sobald die Ameise am Apfel steht, kann sie diesen Befehl ausführen. Dann fängt sie an, auf ihre Kollegen zu warten. Wenn vier Ameisen zusammenkommen, tragen sie den Apfel zurück zum Bau. Das alles steht in diesem einen Befehl. Du musst dich nur darum kümmern, dass die Kollegen zum Apfel hinfinden.
      </p>
      
      <p><img src="/images/02_apfel.png" class="img-thumbnail" title="Wie schön die Sonne sich spiegelt ..."></img></p>
      
      <p>Auch in diesem Bild sieht man: Die Ameisen stehen so perfekt auf der gleichen Stelle, dass man nicht erkennt, dass es eigentlich vier Ameisen sind. Ziemlich raffiniert, nicht?
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
