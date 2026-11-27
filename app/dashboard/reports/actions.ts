"use server";

import { revalidatePath } from "next/cache";

import { invalidInput, signedOut } from "@/lib/action-result";
import { approvedMissionary } from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { reportSchema, type ReportInput } from "./schema";

export async function submitReport(
  input: ReportInput,
  requestId: string | null,
): Promise<{ error: string } | { error?: undefined; id: string }> {
  const session = await getUserSession();
  if (!session) return signedOut;
  const parsed = reportSchema.safeParse(input);
  if (!parsed.success) return invalidInput;

  const userId = session.user.id;
  const approved = await prisma.user.count({
    where: { id: userId, ...approvedMissionary },
  });
  if (!approved)
    return { error: "Only approved missionaries can send reports." };

  if (requestId) {
    const request = await prisma.reportRequest.findFirst({
      where: { id: requestId, userId },
      select: { report: { select: { id: true } } },
    });
    if (!request) return { error: "This request no longer exists." };
    if (request.report)
      return { error: "You've already answered this request." };
  }

  const { id } = await prisma.missionaryReport.create({
    data: { ...parsed.data, userId, requestId },
    select: { id: true },
  });
  revalidatePath("/dashboard", "layout");
  revalidatePath("/admin", "layout");
  return { id };
}
