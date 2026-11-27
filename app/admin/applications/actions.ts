"use server";

import { revalidatePath } from "next/cache";

import { sendEmailAfterResponse } from "@/lib/email";
import {
  applicationApprovedEmail,
  applicationRejectedEmail,
} from "@/lib/email-templates";
import { formatDate } from "@/lib/format";
import { currentApplication } from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";
import { requireAdmin } from "@/lib/session";
import { dateFromInput, optionalDateField } from "@/lib/validation";
import { recordAudit } from "../audit";

type Decision =
  | { status: "APPROVED" }
  | { status: "REJECTED"; reason: string; reapplyAfter?: string };

export async function reviewApplication(
  applicationId: string,
  decision: Decision,
) {
  const { user: admin } = await requireAdmin();
  const reason =
    decision.status === "REJECTED"
      ? decision.reason.trim().slice(0, 1000)
      : null;
  if (decision.status === "REJECTED" && !reason)
    return { error: "Give a reason for the rejection." };
  const reapplyAfter = parseDate(
    decision.status === "REJECTED" ? decision.reapplyAfter : undefined,
  );
  if (reapplyAfter === undefined)
    return { error: "Choose a valid date for reapplying." };

  const reviewed = await prisma.$transaction(async (tx) => {
    // The status filter stops two admins overwriting each other's decision.
    const { count } = await tx.missionaryApplication.updateMany({
      where: { id: applicationId, status: "SUBMITTED" },
      data: {
        status: decision.status,
        reviewedAt: new Date(),
        rejectionReason: reason,
        reapplyAfter,
      },
    });
    if (count === 0) return null;

    const { user } = await tx.missionaryApplication.findUniqueOrThrow({
      where: { id: applicationId },
      select: { user: { select: { id: true, name: true, email: true } } },
    });
    await recordAudit(
      admin,
      decision.status === "APPROVED"
        ? "APPLICATION_APPROVED"
        : "APPLICATION_REJECTED",
      { id: user.id, name: user.name },
      reason && reapplyAfter
        ? `${reason} · Can apply again from ${formatDate(reapplyAfter)}`
        : (reason ?? undefined),
      tx,
    );
    return user;
  });

  revalidatePath("/admin", "layout");
  if (reviewed) {
    const dashboardUrl = `${siteUrl}/dashboard`;
    sendEmailAfterResponse({
      to: reviewed.email,
      ...(reason
        ? applicationRejectedEmail(reviewed.name, reason, dashboardUrl)
        : applicationApprovedEmail(reviewed.name, dashboardUrl)),
    });
  }
  return reviewed
    ? {}
    : { error: "This application has already been reviewed." };
}

function parseDate(value: string | undefined) {
  const parsed = optionalDateField.safeParse(value ?? "");
  return parsed.success ? dateFromInput(parsed.data) : undefined;
}

export async function setReapplyAfter(
  applicationId: string,
  value: string | undefined,
) {
  const { user: admin } = await requireAdmin();
  const reapplyAfter = parseDate(value);
  if (reapplyAfter === undefined)
    return { error: "Choose a valid date for reapplying." };

  const changed = await prisma.$transaction(async (tx) => {
    const application = await tx.missionaryApplication.findUnique({
      where: { id: applicationId },
      select: {
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            missionaryApplications: {
              ...currentApplication,
              select: { id: true },
            },
          },
        },
      },
    });
    if (
      application?.status !== "REJECTED" ||
      application.user.missionaryApplications[0]?.id !== applicationId
    )
      return false;

    await tx.missionaryApplication.update({
      where: { id: applicationId },
      data: { reapplyAfter },
    });
    await recordAudit(
      admin,
      "APPLICATION_REAPPLY_CHANGED",
      { id: application.user.id, name: application.user.name },
      reapplyAfter
        ? `Can apply again from ${formatDate(reapplyAfter)}`
        : "Can apply again now",
      tx,
    );
    return true;
  });

  revalidatePath("/admin", "layout");
  return changed
    ? {}
    : {
        error:
          "They've started a new application since, so this can't be changed.",
      };
}
