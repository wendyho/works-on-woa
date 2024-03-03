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
      const site = new AstroSite(stack, "site", {
      
        runtime: "nodejs20.x",
        customDomain: "staging.worksonwoa.com",
        nodejs: {
          install: [
            "@biscuit-auth/biscuit-wasm"
          ]
        },
        environment: {
          AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID!,
          AUTH_TRUST_HOST: "true",
          AUTH_SECRET: process.env.AUTH_SECRET!,
          AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET!,
          AUTH0_ISSUER_BASE: process.env.AUTH0_ISSUER_BASE!,
          AUTH_API_URL: process.env.AUTH_API_URL!,
          IS_STAGING: "true",
          NODE_OPTIONS: "--experimental-wasm-modules",
          SPIRE_WEBSITES_ID: process.env.SPIRE_WEBSITES_ID!,
          PUBLIC_KEY_URL: process.env.PUBLIC_KEY_URL!
      }});
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
