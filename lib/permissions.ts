import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

// Shared by server (lib/auth.ts) and client (lib/auth-client.ts). Add app permissions here as resources
// are built, e.g. `report: ["review"]`, then grant them per role below.
export const ac = createAccessControl(defaultStatements);

export const roles = {
  admin: ac.newRole(adminAc.statements),
  missionary: ac.newRole({ user: [], session: [] }),
  partner: ac.newRole({ user: [], session: [] }),
};

export type Role = keyof typeof roles;

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && Object.hasOwn(roles, value);
}
