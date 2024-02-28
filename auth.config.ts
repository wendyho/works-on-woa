// auth.config.ts
import {defineConfig} from 'auth-astro';
import Auth0Provider from "@auth/core/providers/auth0"

const {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER_BASE } = import.meta.env

const isDev = import.meta.env.DEV
const WEBSITE_URL = import.meta.env.SITE

export default defineConfig({
    providers: [
        {
          id: "spire",
          name: "spire",
          type: "oauth" as any,
          clientId: AUTH0_CLIENT_ID,
          clientSecret: AUTH0_CLIENT_SECRET,
          checks: ["pkce", "state"],
          authorization: {
            url: `${AUTH0_ISSUER_BASE}/authorize`,
            params: {
              scope: "openid email offline_access profile",
              client_id: AUTH0_CLIENT_ID,
              response_type: "code",
            },
          },
          issuer: AUTH0_ISSUER_BASE,
          jwks_endpoint: AUTH0_ISSUER_BASE + ".well-known/jwks.json",
          client: {
            token_endpoint_auth_method: "client_secret_post",
          },
          token: {
            url: `${AUTH0_ISSUER_BASE}/oauth/token`,
            params: {
              scope: "openid email profile",
              response_type: "code",
              redirect_uri: (isDev ? "http://localhost:4321" : WEBSITE_URL) + "/api/auth/callback/spire",
              client_id: AUTH0_CLIENT_ID,
            },
          },
          profile: (profile: any) => {
            return {
              id: profile.sub,
              email: profile.email,
            };
          },
        },
        Auth0Provider({
            clientId: AUTH0_CLIENT_ID,
            clientSecret: AUTH0_CLIENT_SECRET,
            issuer: AUTH0_ISSUER_BASE
        }),
  ],
});
