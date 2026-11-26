import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

// Admins are work accounts only; missionary and partner come from records, not roles.
export const ac = createAccessControl(defaultStatements);

export const roles = {
  admin: ac.newRole(adminAc.statements),
  user: ac.newRole({ user: [], session: [] }),
};
