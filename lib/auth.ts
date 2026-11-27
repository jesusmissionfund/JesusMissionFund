import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./prisma";
import { ac, roles } from "./permissions";
import { consumeRateLimit } from "./rate-limit";
import { sendEmailAfterResponse } from "./email";
import { passwordResetEmail, verificationEmail } from "./email-templates";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) =>
      sendEmailAfterResponse({
        to: user.email,
        ...passwordResetEmail(user.name, url),
      }),
  },
  user: {
    // Sends a link to the new address; the email only changes once it's opened.
    changeEmail: { enabled: true },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) =>
      sendEmailAfterResponse({
        to: user.email,
        ...verificationEmail(user.name, url),
      }),
  },
  rateLimit: {
    // Stored in the database: the memory store isn't shared between server instances.
    enabled: true,
    customStorage: { consume: consumeRateLimit },
    customRules: {
      "/sign-in/email": { window: 15 * 60, max: 20 },
      "/request-password-reset": { window: 15 * 60, max: 10 },
      "/send-verification-email": { window: 15 * 60, max: 5 },
      "/change-password": { window: 15 * 60, max: 10 },
      "/change-email": { window: 15 * 60, max: 5 },
      // Checked on every page view; counting it would write to the database each time.
      "/get-session": false,
    },
  },
  plugins: [
    // The admin plugin rejects `role` as client input; set it only on the server.
    admin({ ac, roles, defaultRole: "user", adminRoles: ["admin"] }),
    nextCookies(),
  ],
});
