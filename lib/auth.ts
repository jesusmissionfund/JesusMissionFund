import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./prisma";
import { ac, roles } from "./permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true, autoSignIn: true },
  plugins: [
    // The admin plugin owns `user.role` and rejects it as client input, so roles can only be set on the
    // server (sign-up flows, scripts/create-admin.ts, admin user management). Default is the least-privileged role.
    admin({ ac, roles, defaultRole: "partner", adminRoles: ["admin"] }),
    nextCookies(),
  ],
});
