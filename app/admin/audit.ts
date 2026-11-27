import type { AuditAction, Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type Actor = { id: string; email: string };
type Target = { id: string | null; name: string };

export const auditLabels: Record<AuditAction, string> = {
  APPLICATION_APPROVED: "Approved application",
  APPLICATION_REJECTED: "Rejected application",
  APPLICATION_REAPPLY_CHANGED: "Changed when they can apply again",
  REPORT_REQUESTED: "Requested a report",
  USER_BANNED: "Banned",
  USER_UNBANNED: "Unbanned",
  USER_SIGNED_OUT: "Signed out everywhere",
  USER_DELETED: "Deleted account",
  ADMIN_CREATED: "Created admin account",
};

export function recordAudit(
  actor: Actor,
  action: AuditAction,
  target: Target,
  note?: string,
  db: Prisma.TransactionClient = prisma,
) {
  return db.auditLog.create({
    data: {
      action,
      actorId: actor.id,
      actorEmail: actor.email,
      targetId: target.id,
      targetName: target.name,
      note: note || null,
    },
  });
}
