---
titel: "VPN im Betrieb: Wann Sie einen brauchen und wann nicht"
seoTitel: "VPN im Unternehmen: Wann es nötig ist und welche Alternativen es gibt"
beschreibung: "Ein VPN ist nötig, wenn Mitarbeitende von außerhalb auf Server, Netzlaufwerke oder Geräte im Firmennetz zugreifen müssen. Wer ausschließlich mit Cloud-Diensten arbeitet, braucht in der Regel keins."
teaser: "Was ein VPN leistet, wo die Grenzen liegen und welche Alternativen es für den sicheren Zugriff von unterwegs gibt."
standfirst: "VPN gilt vielen als Standardantwort auf jede Frage zum Homeoffice. Tatsächlich lösen sie ein sehr konkretes Problem und wenn Sie dieses Problem nicht haben, schaffen sie eher neue."
kategorie: "Homeoffice"
lesezeit: 6
datum: 2026-09-08
icon: "<rect x=\"9\" y=\"10.5\" width=\"6\" height=\"5\" rx=\"1.3\" stroke=\"#4FB8A6\" stroke-width=\"1.5\"></rect> <path d=\"M10.3 10.5V8.8a1.7 1.7 0 0 1 3.4 0v1.7\" stroke=\"#4FB8A6\" stroke-width=\"1.5\"></path> <path d=\"M2.5 13h4M17.5 13h4\" stroke=\"#F0F4F3\" stroke-width=\"1.4\" stroke-linecap=\"round\"></path> <circle cx=\"2.5\" cy=\"13\" r=\"1.2\" fill=\"#F0F4F3\"></circle> <circle cx=\"21.5\" cy=\"13\" r=\"1.2\" fill=\"#F0F4F3\"></circle>"
featured: false
reihenfolge: 7
leistungen: ["fernzugriff-vpn"]
faq:
  - frage: "Braucht mein Unternehmen ein VPN?"
    antwort: "Ein VPN ist nötig, wenn Mitarbeitende von außerhalb auf Server, Netzlaufwerke oder andere Ressourcen im Firmennetzwerk zugreifen müssen. Wer ausschließlich mit Cloud-Diensten wie Microsoft 365 arbeitet, braucht in der Regel kein VPN."
  - frage: "Macht ein VPN das Homeoffice sicher?"
    antwort: "Nur teilweise. Ein VPN verschlüsselt die Verbindung, macht aber ein infiziertes oder ungepflegtes Gerät nicht sicher. Es verbindet dieses Gerät sogar direkt mit dem Firmennetz. Voraussetzung sind deshalb verwaltete Geräte mit Verschlüsselung, aktuellen Updates und Endpoint-Schutz."
  - frage: "Was ist der Unterschied zwischen VPN und Zero Trust?"
    antwort: "Ein klassisches VPN gibt Zugriff auf das gesamte Netzwerk. Zero Trust Network Access gibt Zugriff nur auf einzelne Anwendungen und prüft bei jedem Zugriff Nutzer, Gerät und Gerätezustand. Das reduziert die Angriffsfläche erheblich."
  - frage: "Reicht Benutzername und Passwort für den VPN-Zugang?"
    antwort: "Nein. Für VPN-Zugänge sollte grundsätzlich Multi-Faktor-Authentifizierung aktiviert sein. Ein VPN, das sich allein mit Benutzername und Passwort öffnen lässt, ist bei gestohlenen Zugangsdaten wirkungslos."
cta:
  titel: "Fernzugriff sicher einrichten"
  text: "Wir prüfen, ob ein VPN für Ihren Betrieb der richtige Weg ist oder ob eine anwendungsbezogene Lösung besser passt und richten es ein."
  link: "Kostenlos beraten lassen"
---
<p>Ein VPN brauchen Sie, wenn Mitarbeitende von außerhalb auf Ressourcen zugreifen müssen, die im Firmennetzwerk liegen: einen Server, Netzlaufwerke, eine Warenwirtschaft mit lokaler Datenbank, Maschinensteuerungen oder Netzwerkdrucker. Das VPN baut dafür einen verschlüsselten Tunnel auf, durch den das entfernte Gerät so arbeitet, als stünde es im Büro.</p>

<p>Wenn Ihr Betrieb ausschließlich mit Cloud-Diensten arbeitet (Microsoft 365, webbasierte Fachanwendungen, Cloud-Ablagen) brauchen Sie in der Regel kein VPN. Diese Dienste sind bereits verschlüsselt erreichbar und sichern den Zugang über Anmeldung und Multi-Faktor-Authentifizierung.</p>

<h2>Was ein VPN leistet</h2>

<p>Drei Dinge, sauber getrennt:</p>

<ul>
<li><strong>Verschlüsselung der Verbindung</strong> zwischen Gerät und Firmennetz, sodass die Daten unterwegs nicht mitgelesen werden können.</li>
<li><strong>Zugang zu internen Ressourcen,</strong> die aus dem Internet bewusst nicht erreichbar sind.</li>
<li><strong>Eine Firmen-IP-Adresse</strong> für das entfernte Gerät, was für manche Fachanwendungen mit IP-Beschränkung relevant ist.</li>
</ul>

<h2>Was ein VPN ausdrücklich nicht leistet</h2>

<p>Hier entstehen die meisten Missverständnisse:</p>

<p><strong>Ein VPN macht ein infiziertes Gerät nicht sauber.</strong> Im Gegenteil, es verbindet ein möglicherweise kompromittiertes Notebook direkt mit dem Firmennetz. Ohne Endpoint-Schutz und Geräteverwaltung wird das VPN dann zur Einladung.</p>

<p><strong>Ein VPN ersetzt keine Zugriffsrechte.</strong> Wer im Tunnel ist, ist im Netz. Ob er auf die Personalordner zugreifen darf, entscheidet die Rechtevergabe, nicht das VPN.</p>

<p><strong>Ein VPN schützt keine Cloud-Dienste.</strong> Microsoft 365 wird nicht sicherer, weil der Zugriff durch einen Tunnel läuft. Dort schützen Multi-Faktor-Authentifizierung und bedingter Zugriff.</p>

<div class="keypoint">
<p><strong>Die wichtigste Regel:</strong> Ein VPN ist nur so sicher wie das Gerät an seinem Ende. Ein privates Notebook ohne Verschlüsselung, ohne aktuelle Updates und mit installierter Software unbekannter Herkunft gehört nicht in einen Tunnel ins Firmennetz.</p>
</div>

<h2>Die drei üblichen Varianten</h2>

<div class="tabelle-scroll" tabindex="0" role="region" aria-label="Tabelle"><table>
<tr><th scope="col">Variante</th><th scope="col">Wofür</th><th scope="col">Anmerkung</th></tr>
<tr><td>Client-to-Site</td><td>Einzelne Mitarbeitende von unterwegs oder aus dem Homeoffice</td><td>Der Standardfall; Software auf jedem Gerät</td></tr>
<tr><td>Site-to-Site</td><td>Dauerhafte Verbindung zwischen zwei Standorten</td><td>Läuft auf den Routern, nicht auf den Geräten</td></tr>
<tr><td>Zero Trust / ZTNA</td><td>Zugriff auf einzelne Anwendungen statt aufs ganze Netz</td><td>Der modernere Ansatz, siehe unten</td></tr>
</table></div>

<h2>Die Alternative: Zugriff auf Anwendungen statt aufs Netzwerk</h2>

<p>Der konzeptionelle Nachteil klassischer VPN: Wer drin ist, ist im ganzen Netz. Ein übernommenes Konto oder ein infiziertes Gerät hat damit denselben Bewegungsspielraum wie ein Rechner im Büro.</p>

<p>Neuere Ansätze (häufig als Zero Trust Network Access bezeichnet) drehen das um: Nicht das Netzwerk wird freigegeben, sondern einzelne Anwendungen. Geprüft wird bei jedem Zugriff, wer zugreift, mit welchem Gerät und in welchem Zustand dieses Gerät ist. Ein nicht verwaltetes Privatgerät bekommt dann eben keinen Zugang zur Buchhaltung, auch wenn Benutzername und Passwort stimmen.</p>

<p>Für Betriebe mit wenigen internen Anwendungen ist das oft die sinnvollere Lösung, weniger Angriffsfläche und für die Nutzer meist bequemer, weil kein Tunnel manuell aufgebaut werden muss.</p>

<h2>Wenn Sie ein VPN einrichten: worauf es ankommt</h2>

<ol>
<li><strong>Multi-Faktor-Authentifizierung</strong> für den VPN-Zugang. Ein VPN, das mit Benutzername und Passwort allein aufgeht, ist ein offenes Tor mit Vorhang.</li>
<li><strong>Nur verwaltete Geräte zulassen.</strong> Firmengeräte mit Verschlüsselung, aktuellem Betriebssystem und Endpoint-Schutz: keine privaten Rechner.</li>
<li><strong>Split Tunneling bewusst entscheiden.</strong> Soll der gesamte Internetverkehr durch die Firma laufen oder nur der Zugriff auf interne Ressourcen? Ersteres bringt mehr Kontrolle, kostet aber Bandbreite und Geschwindigkeit.</li>
<li><strong>Zugänge regelmäßig aufräumen.</strong> Ausgeschiedene Mitarbeitende und alte Testzugänge gehören sofort deaktiviert. In der Praxis ist genau das die häufigste Lücke.</li>
<li><strong>Protokollierung aktivieren.</strong> Wer war wann verbunden? Im Ernstfall die entscheidende Frage.</li>
</ol>

<h2>Die Entscheidungshilfe in vier Fragen</h2>

<p>Beantworten Sie diese vier Fragen, und die Antwort ergibt sich meist von selbst:</p>

<ol>
<li>Gibt es Anwendungen oder Daten, die ausschließlich auf einem Server im Haus liegen?</li>
<li>Müssen Mitarbeitende von außerhalb darauf zugreifen?</li>
<li>Sind die Geräte, mit denen zugegriffen wird, Firmengeräte unter Ihrer Verwaltung?</li>
<li>Gibt es mehr als eine Handvoll interner Anwendungen?</li>
</ol>

<p>Zweimal Ja bei den ersten beiden Fragen: Sie brauchen einen gesicherten Fernzugriff. Ein Nein bei Frage drei sollte zuerst gelöst werden: Geräteverwaltung vor Fernzugriff. Ein Nein bei Frage vier spricht dafür, statt eines klassischen VPN einen anwendungsbezogenen Zugriff zu prüfen.</p>
