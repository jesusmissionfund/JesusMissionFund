"use server";

import type { MissionaryApplication } from "@/app/generated/prisma/client";
import { invalidInput, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import {
  canStartApplication,
  latestApplication,
} from "@/lib/missionary-application";
import { createAccount } from "../create-account";
import type { AccountInput } from "../schema";
import {
  contactSchema,
  ministrySchema,
  type ContactInput,
  type MinistryInput,
} from "./schema";

const signedOut = { error: "Please sign in to continue your application." };
const alreadySubmitted = {
  error: "Your application has already been submitted.",
};

export async function createMissionaryAccount(input: AccountInput) {
  return createAccount(input, "missionary");
}

type DraftData = Partial<
  ContactInput & Omit<MinistryInput, "yearsServing"> & { yearsServing: number }
>;

function answersOf({
  phone,
  country,
  region,
  church,
  yearsServing,
  ministryFocus,
}: MissionaryApplication) {
  return { phone, country, region, church, yearsServing, ministryFocus };
}

async function saveDraft(data: DraftData): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;

  const userId = session.user.id;
  const [latest] = await prisma.missionaryApplication.findMany({
    where: { userId },
    ...latestApplication,
  });
  if (latest?.status === "DRAFT")
    await prisma.missionaryApplication.update({
      where: { id: latest.id },
      data,
    });
  else if (canStartApplication(latest))
    await prisma.missionaryApplication.create({
      data: { ...(latest && answersOf(latest)), ...data, userId },
    });
  else return alreadySubmitted;
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
    contactSchema.safeParse(application).success &&
    ministrySchema.safeParse({
      ...application,
      yearsServing: String(application.yearsServing),
    }).success;
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
  return submitted ? {} : alreadySubmitted;
}
