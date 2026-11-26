import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "./auth";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export const homeFor = (role: string | null | undefined) =>
  role === "admin" ? "/admin" : "/dashboard";

// Guard every page and server action; layout checks alone aren't enough in Next.js.
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/signin");
  if (session.user.role !== "user") redirect("/admin");
  return session;
}

// 404, not a redirect, so the admin area isn't revealed.
export async function requireAdmin() {
  const session = await getSession();
  if (session?.user.role !== "admin") notFound();
  return session;
}

export async function getUserSession() {
  const session = await getSession();
  return session?.user.role === "user" ? session : null;
}
