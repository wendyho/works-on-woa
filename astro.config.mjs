import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  build: {
    format: "file",
  },
  output: "static",
  integrations: [mdx(), sitemap(), tailwind(), pagefind()],
});
