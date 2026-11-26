"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { recordAudit } from "../audit";

type Decision = "APPROVED" | "REJECTED";

export async function reviewApplication(
  applicationId: string,
  decision: Decision,
) {
  const { user: admin } = await requireAdmin();

  const reviewed = await prisma.$transaction(async (tx) => {
    // The status filter stops two admins overwriting each other's decision.
    const { count } = await tx.missionaryApplication.updateMany({
      where: { id: applicationId, status: "SUBMITTED" },
      data: { status: decision, reviewedAt: new Date() },
    });
    if (count === 0) return false;

    const { user } = await tx.missionaryApplication.findUniqueOrThrow({
      where: { id: applicationId },
      select: { user: { select: { id: true, name: true } } },
    });
    await recordAudit(
      admin,
      decision === "APPROVED" ? "APPLICATION_APPROVED" : "APPLICATION_REJECTED",
      user,
      undefined,
      tx,
    );
    return true;
  });

  revalidatePath("/admin", "layout");
  return reviewed
    ? {}
    : { error: "This application has already been reviewed." };
}
