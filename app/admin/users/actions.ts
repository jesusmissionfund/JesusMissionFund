"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

import type { ActionResult } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/session";
import { adminSchema, type AdminInput } from "./schema";

async function onOtherUser(userId: string, call: (headers: Headers) => Promise<unknown>): Promise<ActionResult> {
  const session = await requireRole("admin");
  // Stops an admin from banning or deleting themselves and losing access.
  if (session.user.id === userId) return { error: "You can't change your own account from here." };

  try {
    await call(await headers());
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  revalidatePath("/admin", "layout");
  return {};
}

export async function banUser(userId: string, banReason: string) {
  return onOtherUser(userId, (headers) =>
    auth.api.banUser({ body: { userId, banReason: banReason.trim() || undefined }, headers }),
  );
}

export async function unbanUser(userId: string) {
  return onOtherUser(userId, (headers) => auth.api.unbanUser({ body: { userId }, headers }));
}

export async function revokeUserSessions(userId: string) {
  return onOtherUser(userId, (headers) => auth.api.revokeUserSessions({ body: { userId }, headers }));
}

export async function removeUser(userId: string) {
  return onOtherUser(userId, (headers) => auth.api.removeUser({ body: { userId }, headers }));
}

export async function createAdminAccount(input: AdminInput): Promise<ActionResult> {
  await requireRole("admin");
  const parsed = adminSchema.safeParse(input);
  if (!parsed.success) return { error: "Some details are missing or invalid." };

  try {
    await auth.api.createUser({ body: { ...parsed.data, role: "admin" }, headers: await headers() });
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  revalidatePath("/admin", "layout");
  redirect("/admin/users");
}
