import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./prisma";
import { ac, roles } from "./permissions";
import { consumeRateLimit } from "./rate-limit";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true, autoSignIn: true },
  rateLimit: {
    // On in development too, so limits behave the same everywhere. Stored in the database because the
    // default memory store resets on restart and isn't shared between server instances.
    enabled: true,
    customStorage: { consume: consumeRateLimit },
    customRules: {
      // Per IP. Longer than better-auth's default (3 per 10 seconds) to slow password guessing; high enough
      // for several people signing in from one shared connection.
      "/sign-in/email": { window: 15 * 60, max: 20 },
      // The site header checks the session on every page; counting it would add a database write per page view.
      "/get-session": false,
    },
  },
  plugins: [
    // The admin plugin owns `user.role` and rejects it as client input, so roles can only be set on the
    // server (sign-up flows, scripts/create-admin.ts, admin user management). Default is the least-privileged role.
    admin({ ac, roles, defaultRole: "user", adminRoles: ["admin"] }),
    nextCookies(),
  ],
});
