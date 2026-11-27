"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/app/generated/prisma/client";
import { invalidInput, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import {
  canStartApplication,
  currentApplication,
} from "@/lib/missionary-application";
import { createAccount } from "../create-account";
import type { AccountInput } from "../schema";
import {
  carriedOver,
  contactSchema,
  ministrySchema,
  resumeStep,
  supportSchema,
  toApplicationDraft,
  type ContactInput,
  type MinistryInput,
  type SupportInput,
} from "./schema";

const signedOut = { error: "Please sign in to continue your application." };
const alreadySubmitted = {
  error: "Your application has already been submitted.",
};

export async function createMissionaryAccount(input: AccountInput) {
  return createAccount(input, "missionary");
}

type DraftData = Partial<
  Omit<
    ContactInput & MinistryInput & SupportInput,
    "yearsServing" | "estimatedCost"
  > & { yearsServing: number; estimatedCost: string | null }
>;

const isOpenApplicationConflict = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2002";

async function saveDraft(data: DraftData): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const userId = session.user.id;
  const [current] = await prisma.missionaryApplication.findMany({
    where: { userId },
    ...currentApplication,
  });
  if (current?.status === "DRAFT")
    await prisma.missionaryApplication.update({
      where: { id: current.id },
      data,
    });
  else if (canStartApplication(current)) {
    try {
      await prisma.missionaryApplication.create({
        data: { ...(current && carriedOver(current)), ...data, userId },
      });
    } catch (error) {
      if (!isOpenApplicationConflict(error)) throw error;
      const { count } = await prisma.missionaryApplication.updateMany({
        where: { userId, status: "DRAFT" },
        data,
      });
      if (count === 0) return alreadySubmitted;
    }
  } else return alreadySubmitted;
  revalidatePath("/dashboard", "layout");
  return {};
}

export async function saveContact(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  return parsed.success ? saveDraft(parsed.data) : invalidInput;
}

export async function saveMinistry(
  input: MinistryInput,
): Promise<ActionResult> {
  const parsed = ministrySchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  return saveDraft({
    ...parsed.data,
    yearsServing: Number(parsed.data.yearsServing),
  });
}

export async function saveSupport(input: SupportInput): Promise<ActionResult> {
  const parsed = supportSchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  return saveDraft({
    ...parsed.data,
    estimatedCost: parsed.data.estimatedCost || null,
  });
}

export async function submitApplication(): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const userId = session.user.id;
  const { emailVerified } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { emailVerified: true },
  });
  if (!emailVerified)
    return { error: "Please verify your email before submitting." };

  const application = await prisma.missionaryApplication.findFirst({
    where: { userId, status: "DRAFT" },
    orderBy: { createdAt: "desc" },
  });
  const complete =
    application &&
    resumeStep(true, toApplicationDraft(application, null)) === "review";
  if (!complete)
    return { error: "Please complete every step before submitting." };

  const submitted = await prisma.$transaction(async (tx) => {
    // Filtering on DRAFT stops a double submit overwriting submittedAt.
    const { count } = await tx.missionaryApplication.updateMany({
      where: { id: application.id, status: "DRAFT" },
      data: { status: "SUBMITTED", submittedAt: new Date() },
    });
    if (count === 1) {
      await tx.user.update({
        where: { id: userId },
        data: { phone: application.phone, country: application.country },
      });
    }
    return count === 1;
  });
  if (!submitted) return alreadySubmitted;
  revalidatePath("/dashboard", "layout");
  return {};
}
