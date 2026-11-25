import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import type { Role } from "./permissions";

// Cached per request so a page and its helpers share one session lookup.
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

// Call this in every protected page and server action. Layout-level checks are not enough in Next.js:
// layouts don't re-run on client navigation and pages render in parallel with them.
export async function requireRole(role: Role) {
  const session = await getSession();
  if (!session) redirect("/signin");
  if (session.user.role !== role) redirect("/dashboard");
  return session;
}
