"use server";

import { revalidatePath } from "next/cache";

import { signedOut, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export async function discardDraft(
  kind: "missionary" | "partner",
): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const where = { userId: session.user.id, status: "DRAFT" as const };
  if (kind === "missionary")
    await prisma.missionaryApplication.deleteMany({ where });
  else await prisma.partnerProfile.deleteMany({ where });
  revalidatePath("/dashboard", "layout");
  return {};
}
