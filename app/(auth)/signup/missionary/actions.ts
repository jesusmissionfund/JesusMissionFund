"use server";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
  accountSchema,
  contactSchema,
  ministrySchema,
  type AccountInput,
  type ContactInput,
  type MinistryInput,
} from "./schema";

type ActionResult = { error: string } | { error?: undefined };

const invalidInput = { error: "Some details are missing or invalid. Please check the form and try again." };

export async function createMissionaryAccount(input: AccountInput): Promise<ActionResult> {
  const parsed = accountSchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  if (await getSession()) return { error: "You're already signed in. Sign out to create a new account." };

  try {
    // createUser (admin plugin) is the only way to set a role at creation; it skips the admin-session check
    // because no request headers are passed. Rate limiting doesn't apply to server calls like this.
    await auth.api.createUser({ body: { ...parsed.data, role: "missionary" } });
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }
  return {};
}

type DraftData = Partial<ContactInput & Omit<MinistryInput, "yearsServing"> & { yearsServing: number }>;

async function saveDraft(data: DraftData): Promise<ActionResult> {
  const session = await getSession();
  if (session?.user.role !== "missionary") return { error: "Please sign in to continue your application." };

  const userId = session.user.id;
  const existing = await prisma.missionaryApplication.findUnique({ where: { userId }, select: { status: true } });
  if (existing && existing.status !== "DRAFT") return { error: "Your application has already been submitted." };

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
  const session = await getSession();
  if (session?.user.role !== "missionary") return { error: "Please sign in to continue your application." };

  const application = await prisma.missionaryApplication.findUnique({ where: { userId: session.user.id } });
  const complete =
    application &&
    contactSchema.safeParse(application).success &&
    ministrySchema.safeParse({ ...application, yearsServing: String(application.yearsServing) }).success;
  if (!complete) return { error: "Please complete every step before submitting." };

  // Filtering on DRAFT makes a double submit a no-op instead of overwriting submittedAt.
  const { count } = await prisma.missionaryApplication.updateMany({
    where: { userId: session.user.id, status: "DRAFT" },
    data: { status: "SUBMITTED", submittedAt: new Date() },
  });
  return count === 1 ? {} : { error: "Your application has already been submitted." };
}
