"use server";

import { revalidatePath } from "next/cache";

import { invalidInput, signedOut, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { partnershipSchema, type PartnershipInput } from "./schema";

export async function savePartnership(input: PartnershipInput): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;
  const parsed = partnershipSchema.safeParse(input);
  if (!parsed.success) return invalidInput;

  const { amount, message, ...rest } = parsed.data;
  const data = { ...rest, amount: amount ?? null, message: message || null, status: "ACTIVE" as const };
  const userId = session.user.id;
  await prisma.partnerProfile.upsert({ where: { userId }, create: { userId, ...data }, update: data });
  revalidatePath("/dashboard", "layout");
  return {};
}
