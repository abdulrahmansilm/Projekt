# Prompt für Claude Code — Selim-IT Website bauen

Baue die Selim-IT-Website vollständig gemäß der Spezifikation in `docs/`:

- `docs/ANFORDERUNGEN.md` — Seitenstruktur, Navigation, Sektionsreihenfolge jeder Seite (Startseite + 11 Leistungsseiten + Wissen-Bereich), Kontaktformular-Flow, Tech-Stack, Deployment.
- `docs/DESIGNSYSTEM.md` — verbindliche Komponenten-Bibliothek, Farben, Typografie, Spacing, Shadow-/Radius-Strategie und die Animationsregeln (inkl. dem globalen Hover-Glanz auf allen „Anfragen“/„Beratung anfragen“-Buttons und dem seitenweiten Ladescreen — beide gelten für die gesamte Seite, nicht nur einzelne Sektionen).
- `docs/BRANCHE.md` — branchen-/leistungsspezifische Inhalte je Seite (Hero-Texte, Zeitstrahl-Schritte, Preise, Branchenlisten).
- `docs/BARRIEREFREIHEIT.md` — Barrierefreiheits-Anforderungen.

**Wichtig — Skill `emil-design-eng` aktiv nutzen:** Unter `.claude/skills/emil-design-eng` liegt ein Skill mit den Animations-/Design-Engineering-Prinzipien von Emil Kowalski. Lies und wende diesen Skill für **jede** Animation/Transition aktiv an (Easing-Kurven, Timing, wann überhaupt animiert wird, `transform`/`opacity`-only, etc.) — nicht nur das, was bereits als Zusammenfassung in `docs/DESIGNSYSTEM.md` → „Animationen" steht, sondern den vollen Skill selbst als Leitplanke für jede Implementierungsentscheidung rund um Bewegung/Übergänge auf der gesamten Seite.

## Referenz-Snippets

Der Ordner `referenz/` enthält für jede Sektion das fertige HTML/CSS/JS mit dem exakten Ziel-Markup, den echten Texten und dem genauen Verhalten — sauber nach Seite sortiert:

```
referenz/
  global/                            (seitenübergreifend, einmal für alle Seiten)
    footer.html
    cta-kontaktformular.html
    zeitstrahl-template.html
    button-hover-glanz.html          (verbindlich auf allen CTA-Buttons)
    ladescreen.html                  (verbindlich, initialer Seitenaufruf + Seitenübergang)
    hero-hintergrund.html            (gemeinsamer Hintergrund hinter JEDER Hero-Sektion, seitenübergreifend)
  startseite/          hero, vorteile, leistungen, faq, starke-partner, wissen-teaser, how-we-work-praxisbeispiel
  it-betreuung/        hero, problem-loesung-trustbar, faq, pricing
  server-betreuung/    hero, problem-loesung-trustbar, faq, pricing
  vpn/                 problem-loesung-trustbar, einsatzszenarien, faq, hero
  hardware-beschaffung/ problem-loesung-trustbar, ausstattung, faq, hero
  m365/                problem-loesung-trustbar, teams, tools, faq, hero
  email-sicherheit/    problem-loesung-trustbar, faq, hero
  datensicherung/      problem-loesung-trustbar, kreislauf, faq, hero
  ki-telefonassistent/ problem-loesung-trustbar, kostenvergleich, rechnen-sie-selbst, branchen, faq, pricing, hero
  whatsapp-chatbot/    problem-loesung-trustbar, wie-konversation-ablaeuft, faq, pricing, hero
  prozessautomatisierung/ typische-anwendungsfaelle-trustbar, faq, hero
  webseiten/           problem-loesung-trustbar, besondere-sektion-ebenen, faq, pricing, hero
  wissen/              uebersicht, blog-<slug>.html × 12
```

Übernimm aus den Referenz-Dateien Struktur, Inhalte und Verhalten 1:1, übersetze sie aber in echte Astro-Komponenten/TypeScript statt sie als statisches HTML zu kopieren.

Jede Hero-Sektion nutzt zusätzlich `referenz/global/hero-hintergrund.html` als gemeinsamen Hintergrund hinter dem jeweiligen seitenspezifischen Hero-Visual.

## Bekannte offene Punkte

1. **Ebenen-Stapel-Bug (`webseiten/besondere-sektion-ebenen.html`):** Unterhalb von 1080px Breite überlappt das Erklärungs-Panel den Kartenstapel (siehe `docs/DESIGNSYSTEM.md` → Komponente 22j für die genaue Ursache). Behebe das bei der Umsetzung so, dass sich die `margin-bottom`-Logik auf `.stage-wrap` an der tatsächlichen Panel-Höhe orientiert statt an einem festen Negativwert — auf allen Breakpoints inkl. Mobile.
2. **Wissen-Teaser-Artikelauswahl:** Auf jeder Leistungsseite ist noch offen, welche der 12 Wissen-Artikel im Teaser verlinkt werden (siehe die einzelnen Abschnitte in `docs/ANFORDERUNGEN.md`).

Alle 12 Seiten haben jetzt ihre Hero-, Content- und FAQ-Referenzen vollständig — die Referenzstruktur ist bereit für die Umsetzung.
