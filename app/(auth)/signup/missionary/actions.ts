"use server";

import { invalidInput, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { createAccount } from "../create-account";
import type { AccountInput } from "../schema";
import { contactSchema, ministrySchema, type ContactInput, type MinistryInput } from "./schema";

const signedOut = { error: "Please sign in to continue your application." };
const alreadySubmitted = { error: "Your application has already been submitted." };

export async function createMissionaryAccount(input: AccountInput) {
  return createAccount(input, "missionary");
}

type DraftData = Partial<ContactInput & Omit<MinistryInput, "yearsServing"> & { yearsServing: number }>;

async function saveDraft(data: DraftData): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const userId = session.user.id;
  const existing = await prisma.missionaryApplication.findUnique({ where: { userId }, select: { status: true } });
  if (existing && existing.status !== "DRAFT") return alreadySubmitted;

  await prisma.missionaryApplication.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
  return {};
}

export async function saveContact(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  return parsed.success ? saveDraft(parsed.data) : invalidInput;
}

export async function saveMinistry(input: MinistryInput): Promise<ActionResult> {
  const parsed = ministrySchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  return saveDraft({ ...parsed.data, yearsServing: Number(parsed.data.yearsServing) });
}

export async function submitApplication(): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const userId = session.user.id;
  const application = await prisma.missionaryApplication.findUnique({ where: { userId } });
  const complete =
    application &&
    contactSchema.safeParse(application).success &&
    ministrySchema.safeParse({ ...application, yearsServing: String(application.yearsServing) }).success;
  if (!complete) return { error: "Please complete every step before submitting." };

  const submitted = await prisma.$transaction(async (tx) => {
    // Filtering on DRAFT makes a double submit a no-op instead of overwriting submittedAt.
    const { count } = await tx.missionaryApplication.updateMany({
      where: { userId, status: "DRAFT" },
      data: { status: "SUBMITTED", submittedAt: new Date() },
    });
    if (count === 1) {
      await tx.user.update({ where: { id: userId }, data: { phone: application.phone, country: application.country } });
    }
    return count === 1;
  });
  return submitted ? {} : alreadySubmitted;
}
