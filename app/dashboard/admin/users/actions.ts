"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

import { auth } from "@/lib/auth";
import { isRole } from "@/lib/permissions";
import { requireRole } from "@/lib/session";
import { staffSchema, type StaffInput } from "./schema";

type ActionResult = { error?: string };

async function onOtherUser(userId: string, call: (headers: Headers) => Promise<unknown>): Promise<ActionResult> {
  const session = await requireRole("admin");
  // Stops an admin from demoting, banning or deleting themselves and losing access.
  if (session.user.id === userId) return { error: "You can't change your own account from here." };

  try {
    await call(await headers());
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  revalidatePath("/dashboard/admin", "layout");
  return {};
}

export async function setUserRole(userId: string, role: string) {
  if (!isRole(role)) return { error: "Unknown role." };
  return onOtherUser(userId, (headers) => auth.api.setRole({ body: { userId, role }, headers }));
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

export async function createStaffMember(input: StaffInput): Promise<ActionResult> {
  await requireRole("admin");
  const parsed = staffSchema.safeParse(input);
  if (!parsed.success) return { error: "Some details are missing or invalid." };

  try {
    await auth.api.createUser({ body: { ...parsed.data, role: "admin" }, headers: await headers() });
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  revalidatePath("/dashboard/admin", "layout");
  redirect("/dashboard/admin/users");
}
