---
titel: "Die 3-2-1-Regel: Wie Sie Firmendaten wirklich sicher sichern"
seoTitel: "3-2-1-Regel Backup: Datensicherung richtig aufbauen"
beschreibung: "Die 3-2-1-Regel verlangt drei Kopien Ihrer Daten auf zwei verschiedenen Medien, davon eine an einem anderen Ort. Warum eine externe Festplatte nicht reicht und wie oft Sie die Wiederherstellung testen sollten."
teaser: "Warum eine externe Festplatte nicht reicht, was die 3-2-1-Regel bedeutet und wie oft Sie die Wiederherstellung testen sollten."
standfirst: "Fast jeder Betrieb sichert irgendwie. Die entscheidende Frage ist nicht, ob gesichert wird, sondern ob sich die Daten im Ernstfall auch zurückholen lassen."
kategorie: "Datensicherung"
lesezeit: 7
datum: 2026-09-08
icon: "<path d=\"M6 19a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.9-1A4.5 4.5 0 0 1 18 19H6Z\" stroke=\"#F0F4F3\" stroke-width=\"1.4\"></path> <path d=\"M12 13.5v3.5M10.4 15.2L12 13.5l1.6 1.7\" stroke=\"#4FB8A6\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>"
featured: false
reihenfolge: 3
leistungen: ["datensicherung","server-betreuung"]
faq:
  - frage: "Was ist die 3-2-1-Regel bei der Datensicherung?"
    antwort: "Die 3-2-1-Regel verlangt drei Kopien der Daten, gespeichert auf zwei unterschiedlichen Medientypen, wovon eine Kopie an einem anderen physischen Ort liegt. Sie ist der etablierte Mindeststandard für Datensicherung in Unternehmen."
  - frage: "Reicht eine externe Festplatte als Backup?"
    antwort: "Nein. Eine dauerhaft am Server angeschlossene externe Festplatte wird bei einem Ransomware-Angriff mitverschlüsselt und schützt auch nicht vor Feuer oder Diebstahl. Nötig ist zusätzlich eine Kopie außer Haus, idealerweise unveränderlich gespeichert."
  - frage: "Wie oft sollte man ein Backup testen?"
    antwort: "Empfohlen ist eine stichprobenhafte Wiederherstellung einmal pro Quartal und ein vollständiger Test mit Zeitmessung einmal im Jahr. Ergebnisse sollten dokumentiert werden, da die DSGVO eine regelmäßige Überprüfung der Wirksamkeit verlangt."
  - frage: "Sichert Microsoft 365 meine Daten automatisch?"
    antwort: "Nicht im Sinne einer Datensicherung. Microsoft sorgt für die Verfügbarkeit der Plattform, übernimmt aber keine langfristige Wiederherstellung gelöschter Inhalte. Für Exchange, SharePoint und OneDrive ist eine eigene Sicherung erforderlich."
  - frage: "Was bedeutet 3-2-1-1-0?"
    antwort: "Eine Erweiterung der 3-2-1-Regel. Die zusätzliche Eins steht für eine unveränderliche Kopie, die auch von Administratoren nicht gelöscht werden kann. Die Null steht für null Fehler bei der Wiederherstellung, nachgewiesen durch regelmäßige Tests."
cta:
  titel: "Datensicherung prüfen lassen"
  text: "Wir sehen uns Ihr bestehendes Sicherungskonzept an, testen die Wiederherstellung und sagen Ihnen, wo die Lücken sind."
  link: "Kostenlos beraten lassen"
---
<p>Die 3-2-1-Regel ist der etablierte Mindeststandard für Datensicherung: <strong>drei</strong> Kopien Ihrer Daten, gespeichert auf <strong>zwei</strong> unterschiedlichen Medientypen, davon <strong>eine</strong> Kopie an einem anderen physischen Ort. Wer diese Regel einhält, übersteht die drei häufigsten Verlustszenarien: Hardwaredefekt, versehentliches Löschen und Verschlüsselung durch Schadsoftware.</p>

<p>Die Regel ist alt und wird trotzdem regelmäßig gebrochen, meist an derselben Stelle: bei der Kopie an einem anderen Ort.</p>

## Was die drei Zahlen bedeuten
<h3>Drei Kopien</h3>

<p>Gemeint sind die Originaldaten plus zwei Sicherungen. Nicht zwei Sicherungen desselben Datenstands, die morgens und abends auf dieselbe Platte laufen, sondern zwei voneinander unabhängige Kopien. Der Grund ist schlichte Wahrscheinlichkeit: Dass ein Speichermedium ausfällt, ist normal. Dass zwei gleichzeitig ausfallen, ist selten.</p>

<h3>Zwei verschiedene Medientypen</h3>

<p>Etwa eine Sicherung auf einem NAS im Haus und eine in der Cloud. Oder Festplatte und Bandlaufwerk. Der Sinn: Unterschiedliche Technologien fallen aus unterschiedlichen Gründen aus. Zwei baugleiche Festplatten aus derselben Charge haben eine unangenehme Neigung, ungefähr gleichzeitig ihren Dienst einzustellen.</p>

<h3>Eine Kopie außer Haus</h3>

<p>Der Punkt, an dem es in der Praxis scheitert. Eine Sicherung im selben Serverraum wie das Original schützt nicht gegen Feuer, Wasserschaden, Einbruch und auch nicht gegen Ransomware, wenn das Sicherungsmedium dauerhaft verbunden ist.</p>

<div class="keypoint">
<p><strong>Der häufigste Fehler in kleinen Betrieben:</strong> eine externe Festplatte, die permanent am Server hängt. Verschlüsselt Ransomware den Server, verschlüsselt sie die Platte gleich mit. Eine dauerhaft verbundene Sicherung ist im Ransomware-Fall keine Sicherung.</p>
</div>

## Warum die Regel um eine Null erweitert wurde
<p>In den letzten Jahren hat sich eine Erweiterung durchgesetzt: <strong>3-2-1-1-0</strong>. Die zusätzliche Eins steht für eine Kopie, die unveränderlich ist, also nachträglich nicht überschrieben oder gelöscht werden kann, auch nicht von jemandem mit Administratorrechten. Fachbegriff: Immutable Backup oder Air-Gap.</p>

<p>Der Hintergrund ist unangenehm konkret: Moderne Ransomware sucht gezielt nach Sicherungen und löscht sie, bevor sie die eigentlichen Daten verschlüsselt. Wer den Angreifer aussperren will, braucht eine Kopie, die technisch nicht löschbar ist.</p>

<p>Die Null steht für <strong>null Fehler bei der Wiederherstellung</strong>, geprüft durch regelmäßige Tests. Und das ist der Punkt, an dem die meisten Sicherungskonzepte in der Praxis auffliegen.</p>

## Der Test, den fast niemand macht
<p>Eine Sicherung, die noch nie zurückgespielt wurde, ist eine Vermutung. Typische Fehler, die erst beim Test auffallen:</p>

<ul>
<li>Der Sicherungsjob läuft seit Monaten mit Fehler durch, gemeldet wird das an eine E-Mail-Adresse, die niemand liest.</li>
<li>Gesichert werden nur die Dateiablagen, nicht aber die Datenbank der Warenwirtschaft, die liegt woanders.</li>
<li>Die Sicherung ist vollständig, aber die Wiederherstellung würde vier Tage dauern. Für den Betrieb ist das ein Totalausfall.</li>
<li>Das Wiederherstellungspasswort kennt nur der Mitarbeiter, der seit einem Jahr nicht mehr im Haus ist.</li>
</ul>

<p>Sinnvoller Rhythmus: einmal im Quartal eine echte Wiederherstellung, mindestens stichprobenhaft. Einmal im Jahr ein vollständiger Test mit Zeitmessung. Beides schriftlich festhalten, im Schadensfall ist das gegenüber Versicherung und Aufsichtsbehörden Gold wert.</p>

## Zwei Kennzahlen, die Sie festlegen sollten
<div class="tabelle-scroll" tabindex="0" role="region" aria-label="Tabelle"><table>
<tr><th scope="col">Kennzahl</th><th scope="col">Was sie bedeutet</th><th scope="col">Beispiel</th></tr>
<tr><td>RPO (Recovery Point Objective)</td><td>Wie viel Datenverlust ist maximal verkraftbar?</td><td>4 Stunden = Sicherung mindestens alle 4 Stunden</td></tr>
<tr><td>RTO (Recovery Time Objective)</td><td>Wie lange darf die Wiederherstellung dauern?</td><td>8 Stunden = Betrieb muss am selben Tag weiterlaufen</td></tr>
</table></div>

<p>Diese beiden Zahlen bestimmen fast alles Weitere: wie oft gesichert wird, welche Technik nötig ist und was das Ganze kostet. Sie sollten von der Geschäftsführung kommen, nicht von der IT, es ist eine betriebswirtschaftliche Entscheidung, keine technische.</p>

## Was in der Praxis funktioniert
<p>Ein bewährter Aufbau für einen mittelständischen Betrieb:</p>

<ol>
<li><strong>Original</strong> auf dem Server oder in Microsoft 365.</li>
<li><strong>Lokale Sicherung</strong> auf ein NAS im Haus, mehrmals täglich. Schnell wiederherstellbar bei versehentlichem Löschen, dem mit Abstand häufigsten Fall.</li>
<li><strong>Cloud-Sicherung</strong> in ein deutsches Rechenzentrum, täglich, mit Unveränderlichkeit für einen definierten Zeitraum. Deckt Feuer, Diebstahl und Ransomware ab.</li>
</ol>

<p>Wichtig für Microsoft-365-Nutzer: Microsoft sichert Ihre Daten nicht in dem Sinne, wie viele es annehmen. Der Konzern sorgt für die Verfügbarkeit der Plattform, nicht für die Wiederherstellung eines Postfachs, das vor acht Monaten gelöscht wurde. Eine eigene Sicherung von Exchange, SharePoint und OneDrive ist deshalb kein Luxus, sondern gehört dazu.</p>

## Was der Gesetzgeber verlangt
<p>Die DSGVO fordert in Artikel 32 ausdrücklich die Fähigkeit, „die Verfügbarkeit der personenbezogenen Daten und den Zugang zu ihnen bei einem physischen oder technischen Zwischenfall rasch wiederherzustellen“. Ebenso verlangt sie ein Verfahren zur regelmäßigen Überprüfung der Wirksamkeit, also genau die Wiederherstellungstests.</p>

<p>Für Betriebe im Anwendungsbereich von NIS-2 kommt Backup-Management als eine der zehn Pflichtmaßnahmen hinzu. Und die handelsrechtlichen Aufbewahrungsfristen von sechs beziehungsweise zehn Jahren gelten für digitale Unterlagen genauso wie für Papier.</p>

## Fünf Fragen für die eigene Standortbestimmung
<ol>
<li>Wissen Sie ohne nachzusehen, ob die Sicherung letzte Nacht durchgelaufen ist?</li>
<li>Liegt eine Kopie außer Haus, die nicht dauerhaft mit dem Netzwerk verbunden ist?</li>
<li>Wann wurde zuletzt eine Wiederherstellung getestet und von wem?</li>
<li>Sind Microsoft 365 und Fachanwendungen mit im Sicherungsumfang?</li>
<li>Weiß mehr als eine Person, wie die Wiederherstellung abläuft?</li>
</ol>

<p>Fünf mal Ja: Sie sind gut aufgestellt. Zwei oder mehr Nein: Es gibt Handlungsbedarf, und zwar bevor etwas passiert, nicht danach.</p>
