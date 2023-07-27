import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "static",
  integrations: [pagefind(), sitemap(), tailwind(), solidJs()],
  cacheDir: "./cache",
  compressHTML: true,
  build: {
    rollupOptions: {
      external: ["/_pagefind/pagefind.js"],
    },
  },
});
