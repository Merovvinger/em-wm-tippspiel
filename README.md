# em-wm-tippspiel
Fussball EM &amp; WM Tippspiel für den privaten Gebrauch.
Teilnehmer können ihre Tipps für die Spiele der Gruppenphase abgeben und diese im Nachhinein, aber nur bis 15 min vor Spielbeginn, anpassen.
Nach der Gruppenphase können die Tipps für das Achtelfinale, Viertelfinale usw. abgegeben werden.
Auch hier können die abgegebenen Tipps bis 15 min vor Spielbeginn angepasst werden.

To Do:
1. NoSQL-Setup und integration
2. Authentication
3. Styling / UX & UI
4. EInfaches importieren des jeweiligen SPielplans
5. Auswertung
6. Tabelle der Tippgebenden
7.  uva......

## Projektstruktur

/em-wm-tippspiel

/public

    .. index.html

    .. styles.css

    .. script.js
    ../images
        ../flags
            .. germany.png (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.
            .. deutschland.png (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.
            .. schweiz.pgn (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.
            .. switzerland.png (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.
            .. scotland.png (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.
            .. schottland.png (Source: https://www.freeflagicons.com/ - Details / Credits siehe unten unter Credits.

games.json

server.js

package.json

tips.json


## Funktionen

Teilnehmer können Tipps für die Spiele der Gruppenphase abgeben.
Ein Tipp besteht aus zwei Eingabefeldern für die Tore der beiden Teams.
Teilnehmer können ihren bestehenden Tipp für ein Spiel ändern.

## API-Endpunkte

GET /tips: Holt alle abgegebenen Tipps.

POST /submit-tip: Gibt einen Tipp für ein Spiel ab oder aktualisiert einen bestehenden Tipp.

GET /games: Holt die Spiele aus der games.json-Datei.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen findest du in der LICENSE-Datei.

## Credits
Alle Flaggen-Bilder kommen von "https://www.freeflagicons.com/" und dürfen nur für nicht kommerziellen Einsatz verwendet werden. Sollten die Bilder verändert werden, muss dies explizit erwähnt werden. AUch die weitere Nutzung muss ein entsprechender Verweis auf die Webseite des originalen Herstellers gemacht werden.

## Autoren

merovvinger - https://github.com/Merovvinger

alphaPhantm - https://github.com/alphaPhantm

???

