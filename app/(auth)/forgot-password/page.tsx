import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "../_components/AuthShell";
import { SignInAside } from "../_components/SignInAside";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset the password for your Jesus' Mission Fund account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell aside={<SignInAside />}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
        Password reset
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        Forgot your password?
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Enter the email address for your account and we&apos;ll send you a link
        to choose a new password.
      </p>

      <ForgotPasswordForm />

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link
          href="/signin"
          className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
