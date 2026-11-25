"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

type Decision = "APPROVED" | "REJECTED";

export async function reviewApplication(applicationId: string, decision: Decision) {
  await requireAdmin();

  // Only SUBMITTED applications can be decided, so two admins acting at once can't overwrite each other.
  const { count } = await prisma.missionaryApplication.updateMany({
    where: { id: applicationId, status: "SUBMITTED" },
    data: { status: decision, reviewedAt: new Date() },
  });

  revalidatePath("/admin", "layout");
  return count === 1 ? {} : { error: "This application has already been reviewed." };
}
