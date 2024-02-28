import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "works-on-woa",
      region: "us-east-1",
      profile: "works-on-woa"
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, "site", {nodejs: {
        // esbuild: {
        //   external: ['/_pagefind/pagefind.js'] // Ensures PageFind is excluded from the code bundle.
        // }
      },});
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
