import { defineConfig } from "astro/config";
import aws from "astro-sst";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import pagefind from "./integrations/pagefind"
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: process.env.PRE_BUILD ? "hybrid" : "server",
  adapter: aws({
    serverRoutes: ["/api/*"]
  }),
  site: "https://www.worksonwoa.com",
  integrations: [
    sitemap(),
    // pagefind(),
    tailwind({
        applyBaseStyles: false
      }), solidJs(), auth({
        injectEndpoints: false,
      })],
  cacheDir: "./cache",
  compressHTML: true,
  build: {
    rollupOptions: {
      external: ["/pagefind/pagefind.js"]
    },
    redirects: false
  }
});