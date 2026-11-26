import { headers } from "next/headers";
import { APIError, getIP } from "better-auth/api";

import { invalidInput } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getSession } from "@/lib/session";
import { accountSchema, type AccountInput, type AccountResult } from "./schema";

type SignupPath = "missionary" | "partner";

const attemptWindow = 15 * 60;

// Server calls skip better-auth's rate limiter, so it's applied here.
async function tooManyAttempts(email: string) {
  const requestHeaders = await headers();
  const ip = getIP(requestHeaders, auth.options) ?? "unknown";
  for (const [key, max] of [
    [`signup-ip:${ip}`, 10],
    [`signup-email:${email}`, 5],
  ] as const) {
    const { allowed, retryAfter } = await consumeRateLimit(key, {
      window: attemptWindow,
      max,
    });
    if (allowed) continue;
    const minutes = Math.ceil((retryAfter ?? attemptWindow) / 60);
    return {
      error: `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }
  return null;
}

async function startDraft(userId: string, path: SignupPath) {
  const args = { where: { userId }, create: { userId }, update: {} };
  if (path === "missionary") await prisma.missionaryApplication.upsert(args);
  else await prisma.partnerProfile.upsert(args);
}

// Not a server action, so the client can't choose what gets created.
export async function createAccount(
  input: AccountInput,
  path: SignupPath,
): Promise<AccountResult> {
  const parsed = accountSchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  if (await getSession())
    return {
      error: "You're already signed in. Sign out to create a new account.",
    };

  const { email, password } = parsed.data;
  const limited = await tooManyAttempts(email.toLowerCase());
  if (limited) return limited;

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true, role: true },
  });

  let userId = existing?.id;
  try {
    // Matching credentials sign in, so an unfinished sign-up can be resumed.
    if (!userId) {
      // With no headers passed, createUser sets the role without needing an admin session.
      ({
        user: { id: userId },
      } = await auth.api.createUser({
        body: { ...parsed.data, role: "user" },
      }));
    }
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
    if (!existing)
      await auth.api.sendVerificationEmail({
        body: { email, callbackURL: "/dashboard" },
      });
  } catch (error) {
    if (
      existing &&
      error instanceof APIError &&
      error.status === "UNAUTHORIZED"
    ) {
      return {
        error: "An account with this email already exists.",
        existingAccount: true,
      };
    }
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }

  if (existing?.role !== "admin") await startDraft(userId, path);
  return { signedInExisting: Boolean(existing) };
}
