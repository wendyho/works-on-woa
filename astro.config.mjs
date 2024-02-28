import { defineConfig } from "astro/config";
import aws from "astro-sst";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import pagefind from "astro-pagefind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  renderers: ['@astrojs/node', 'auth-astro'],
  site: "https://www.worksonwoa.com",
  integrations: [sitemap(), pagefind(), tailwind({
    applyBaseStyles: false
  }), solidJs()],
  cacheDir: "./cache",
  compressHTML: true,
  build: {
    rollupOptions: {
      external: ["/_pagefind/pagefind.js"]
    }
  }
});