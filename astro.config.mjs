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
