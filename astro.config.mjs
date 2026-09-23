// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://selim-it.de",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  /**
   * Content-Security-Policy (Anforderung 22.09.2026, Security-Hardening).
   * Astro erzeugt die Hashes für alle gebündelten und inline eingebundenen Skripte/Styles selbst und
   * schreibt ein <meta http-equiv="content-security-policy"> in jede Seite. Ergänzend setzt Caddy die
   * Header, die im <meta> keine Wirkung hätten (frame-ancestors, HSTS, Referrer-Policy …).
   * style-src-attr braucht 'unsafe-inline', weil einzelne Komponenten style="--variable: …" setzen.
   * Im Dev-Server ist CSP wirkungslos; prüfbar über `npm run build` + `npm run preview`.
   */
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "frame-src 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "manifest-src 'self'",
        "media-src 'self'",
        "worker-src 'self' blob:",
      ],
      /**
       * Drei Skripte müssen synchron vor dem ersten Paint laufen und stehen deshalb als `is:inline`
       * im HTML; Astro hasht solche Blöcke nicht selbst. Die Hashes stehen darum hier.
       * `npm run csp:pruefen` (läuft automatisch nach jedem Build) meldet, sobald sich einer der
       * Skripttexte ändert und der Hash nachgezogen werden muss.
       */
      scriptDirective: {
        hashes: [
          // BaseLayout.astro: setzt die Klasse „js“ vor dem ersten Paint
          "sha256-WZRJfWvsnNCPcxzZwvyhovnZGqhZaC+8gPGPRbx6wTk=",
          // Ladescreen.astro: blendet den Ladescreen aus
          "sha256-R+BixVm1iOrIudpeB0YRF/D5Niov/d02XuesMY9oTNI=",
          // HeroStage.astro: skaliert die Hero-Bühne ohne Layout-Shift
          "sha256-oYtL1NxwDTgl1h1UbUUDmUvd1V3LloU4UQBm+fE0PkI=",
        ],
      },
      // Inline-style-Attribute (style="--variable: …") brauchen 'unsafe-inline' auf style-src-attr
      styleDirective: {
        resources: [
          { resource: "'self'", kind: "element" },
          { resource: "'unsafe-inline'", kind: "attribute" },
        ],
        hashes: [
          // Das Altcha-Widget (Spamschutz im Anfrageformular) legt zur Laufzeit ein <style>-Element an.
          // Bei einem Update von „altcha“ kann sich dieser Hash ändern; die Konsole nennt dann den neuen.
          { hash: "sha256-ZgqGuQlekW98cv0XQjYUGCLTvc3q5MkU+2SkqlFGoTM=", kind: "element" },
        ],
      },
    },
  },
  // Seiten werden beim Hover vorgeladen: der Ladescreen-Übergang bleibt dadurch kurz
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
    // Lokal: /api an das FastAPI-Backend (backend/, uvicorn --port 8000) weiterreichen. In Produktion übernimmt Caddy das Routing.
    server: {
      proxy: { "/api": process.env.API_PROXY_ZIEL ?? "http://127.0.0.1:8000" },
    },
  },
  integrations: [sitemap(), icon()],
});
