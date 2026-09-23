/**
 * Prüft nach dem Build, ob jedes ausführbare Inline-Skript in dist/ von der Content-Security-Policy
 * erlaubt ist (Anforderung 22.09.2026, Security-Hardening).
 *
 * Hintergrund: Astro hasht seine eigenen gebündelten Skripte selbst, `is:inline`-Blöcke aber nicht.
 * Deren Hashes stehen in astro.config.mjs unter security.csp.scriptDirective.hashes. Ändert jemand
 * einen dieser Blöcke, bricht die Seite sonst erst im Browser – dieser Check meldet es sofort.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

function htmlDateien(verzeichnis) {
  const treffer = [];
  for (const eintrag of readdirSync(verzeichnis)) {
    const pfad = join(verzeichnis, eintrag);
    if (statSync(pfad).isDirectory()) treffer.push(...htmlDateien(pfad));
    else if (eintrag.endsWith(".html")) treffer.push(pfad);
  }
  return treffer;
}

const seiten = htmlDateien(DIST);
if (!seiten.length) {
  console.error("CSP-Prüfung: keine HTML-Dateien in dist/ gefunden. Wurde gebaut?");
  process.exit(1);
}

/** ausführbare Inline-Skripte: ohne src, ohne type="application/ld+json" */
const SKRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const fehlend = new Map();

for (const seite of seiten) {
  const html = readFileSync(seite, "utf8");
  const csp = /<meta http-equiv="content-security-policy" content="([^"]+)"/i.exec(html);
  if (!csp) {
    console.error(`CSP-Prüfung: ${seite} hat kein CSP-Meta-Element.`);
    process.exit(1);
  }
  const erlaubt = csp[1];
  SKRIPT.lastIndex = 0;
  let treffer;
  while ((treffer = SKRIPT.exec(html))) {
    const attribute = treffer[1];
    if (/type="application\/ld\+json"/.test(attribute)) continue;
    const hash = "sha256-" + createHash("sha256").update(treffer[2], "utf8").digest("base64");
    if (erlaubt.includes(hash)) continue;
    if (!fehlend.has(hash)) fehlend.set(hash, { seite, vorschau: treffer[2].trim().slice(0, 70).replace(/\s+/g, " ") });
  }
}

if (fehlend.size) {
  console.error("\nCSP-Prüfung fehlgeschlagen: Inline-Skripte ohne passenden Hash.");
  console.error("Ergänze oder korrigiere die Hashes in astro.config.mjs → security.csp.scriptDirective.hashes:\n");
  for (const [hash, info] of fehlend) {
    console.error(`  "${hash}",`);
    console.error(`     ↳ ${info.seite}: ${info.vorschau}\n`);
  }
  process.exit(1);
}

console.log(`CSP-Prüfung: alle Inline-Skripte auf ${seiten.length} Seiten sind erlaubt.`);
