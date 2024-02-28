import { defineConfig } from "astro/config";
import aws from "astro-sst";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import pagefind from "astro-pagefind"
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: aws(),
  renderers: ['auth-astro'],
  site: "https://www.worksonwoa.com",
  integrations: [
    // sitemap(), 
    pagefind(),
 tailwind({
    applyBaseStyles: false
  }), solidJs(), auth({
    injectEndpoints: false,
  })],
  cacheDir: "./cache",
  compressHTML: true,
  build: {
    rollupOptions: {
      external: ["/_pagefind/pagefind.js"]
    }
  }
});