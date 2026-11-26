"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

import type { AuditAction } from "@/app/generated/prisma/client";
import type { ActionResult } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { recordAudit } from "../audit";
import { adminSchema, type AdminInput } from "./schema";

async function onOtherUser(
  userId: string,
  action: AuditAction,
  call: (headers: Headers) => Promise<unknown>,
  note?: string,
): Promise<ActionResult> {
  const { user: admin } = await requireAdmin();
  if (admin.id === userId)
    return { error: "You can't change your own account from here." };

  // Read before the call so a deleted user's name can still be logged.
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });
  if (!target) return { error: "This user no longer exists." };

  try {
    await call(await headers());
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  await recordAudit(
    admin,
    action,
    action === "USER_DELETED" ? { ...target, id: null } : target,
    note,
  );
  revalidatePath("/admin", "layout");
  return {};
}

export async function banUser(userId: string, banReason: string) {
  const reason = banReason.trim() || undefined;
  return onOtherUser(
    userId,
    "USER_BANNED",
    (headers) =>
      auth.api.banUser({ body: { userId, banReason: reason }, headers }),
    reason,
  );
}

export async function unbanUser(userId: string) {
  return onOtherUser(userId, "USER_UNBANNED", (headers) =>
    auth.api.unbanUser({ body: { userId }, headers }),
  );
}

export async function revokeUserSessions(userId: string) {
  return onOtherUser(userId, "USER_SIGNED_OUT", (headers) =>
    auth.api.revokeUserSessions({ body: { userId }, headers }),
  );
}

export async function removeUser(userId: string) {
  return onOtherUser(userId, "USER_DELETED", (headers) =>
    auth.api.removeUser({ body: { userId }, headers }),
  );
}

export async function createAdminAccount(
  input: AdminInput,
): Promise<ActionResult> {
  const { user: admin } = await requireAdmin();
  const parsed = adminSchema.safeParse(input);
  if (!parsed.success) return { error: "Some details are missing or invalid." };

  try {
    const { user } = await auth.api.createUser({
      body: { ...parsed.data, role: "admin" },
      headers: await headers(),
    });
    await recordAudit(admin, "ADMIN_CREATED", user);
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  revalidatePath("/admin", "layout");
  redirect("/admin/users");
}
