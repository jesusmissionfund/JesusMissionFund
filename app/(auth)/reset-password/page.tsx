import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/lib/auth";

import { AuthShell } from "../_components/AuthShell";
import { SignInAside } from "../_components/SignInAside";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
};

// Mirrors better-auth's own token check; recheck it when upgrading better-auth.
async function isUsableResetToken(token: string) {
  const { internalAdapter } = await auth.$context;
  const verification = await internalAdapter.findVerificationValue(
    `reset-password:${token}`,
  );
  return Boolean(verification && verification.expiresAt > new Date());
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const params = await searchParams;
  const token =
    !params.error && params.token && (await isUsableResetToken(params.token))
      ? params.token
      : undefined;

  return (
    <AuthShell aside={<SignInAside />}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
        Password reset
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {token ? "Choose a new password" : "This link isn't valid"}
      </h1>

      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            It may be incomplete, expired or already used. Request a new one to
            continue.
          </p>
          <Link
            href="/forgot-password"
            className="mt-8 inline-flex h-12 w-full items-center justify-center bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Send a new link
          </Link>
        </>
      )}
    </AuthShell>
  );
}
