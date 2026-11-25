import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

// Roles are only "user" and "admin". Admin accounts are JMF work accounts for running the platform, never a
// person taking part; missionary and partner come from a user's records, not the role, so one person can be both.
// Shared by server (lib/auth.ts) and client (lib/auth-client.ts). Add app permissions here as resources
// are built, e.g. `report: ["review"]`, then grant them per role below.
export const ac = createAccessControl(defaultStatements);

export const roles = {
  admin: ac.newRole(adminAc.statements),
  user: ac.newRole({ user: [], session: [] }),
};
