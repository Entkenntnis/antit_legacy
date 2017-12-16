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
      
      <p><img src="/images/01_overview.png" title="Wenn dir ein Ameisenvolk nicht gefällt, kannst du es wieder löschen."></img></p>
      
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
