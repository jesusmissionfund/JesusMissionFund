import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "./auth";

// Cached per request so a page and its helpers share one session lookup.
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export const homeFor = (role: string | null | undefined) => (role === "admin" ? "/admin" : "/dashboard");

// Call one of these in every protected page and server action. Layout-level checks are not enough in Next.js:
// layouts don't re-run on client navigation and pages render in parallel with them.
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/signin");
  if (session.user.role !== "user") redirect("/admin");
  return session;
}

// A 404 rather than a redirect, signed out included, so the admin area isn't revealed to anyone else.
export async function requireAdmin() {
  const session = await getSession();
  if (session?.user.role !== "admin") notFound();
  return session;
}

// For server actions on a person's own data: admin work accounts never hold missionary or partner records.
export async function getUserSession() {
  const session = await getSession();
  return session?.user.role === "user" ? session : null;
}
