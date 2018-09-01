
Voraussetzungen zum Betreiben des Servers:

- nodejs (>= 8 empfohlen)
- mongodb (>= 2.6 empfohlen)


Vor dem Starten des Servers erstmal sicherstellen, dass eine Datenbank zur Verfügung steht. Zugriff auf die Datenbank wird über eine mongodb-URL hergestellt. Diese in die config-sample.js eintragen und in config.js umbenennen.

Format:

mongodb://benutzer:passwort@host:port/datenbankname


Steht die DB, dann kann der Server gestartet werden. Innerhalb des Stammverzeichnis eine Kommandozeile öffnen und folgende Befehle ausführen:

npm install
npm start


Als nächstes kann man sich über /root auf den Serveradminbereich einloggen. Das Passwort entspricht dem Eintrag "managerPwd" in der config.js. Damit kann dann eine neue Kolonie und darauf ein neuer Admin angelegt werden.
