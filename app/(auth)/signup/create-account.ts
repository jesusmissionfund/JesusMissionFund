import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { invalidInput } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { accountSchema, type AccountInput, type AccountResult } from "./schema";

type SignupPath = "missionary" | "partner";

// An empty draft for the chosen path is how the person's intent is kept until they fill it in.
async function startDraft(userId: string, path: SignupPath) {
  const args = { where: { userId }, create: { userId }, update: {} };
  if (path === "missionary") await prisma.missionaryApplication.upsert(args);
  else await prisma.partnerProfile.upsert(args);
}

// Deliberately not a server action, so the client can't choose what gets created.
export async function createAccount(input: AccountInput, path: SignupPath): Promise<AccountResult> {
  const parsed = accountSchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  if (await getSession()) return { error: "You're already signed in. Sign out to create a new account." };

  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() }, select: { id: true, role: true } });

  let userId = existing?.id;
  try {
    // People often come back to "create account" to resume an unfinished sign-up, so matching credentials sign
    // them in instead. The page then resumes their flow or sends them to their dashboard.
    if (!userId) {
      // createUser (admin plugin) is the only way to set a role at creation; it skips the admin-session check
      // because no request headers are passed. Rate limiting doesn't apply to server calls like this.
      ({ user: { id: userId } } = await auth.api.createUser({ body: { ...parsed.data, role: "user" } }));
    }
    await auth.api.signInEmail({ body: { email, password }, headers: await headers() });
  } catch (error) {
    if (existing && error instanceof APIError && error.status === "UNAUTHORIZED") {
      return { error: "An account with this email already exists.", existingAccount: true };
    }
    if (error instanceof APIError) return { error: error.message };
    throw error;
  }

  if (existing?.role !== "admin") await startDraft(userId, path);
  return { signedInExisting: Boolean(existing) };
}
