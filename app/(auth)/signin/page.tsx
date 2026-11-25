import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { CreateAccountMenu } from "@/components/auth/CreateAccountMenu";
import { SignInForm } from "./_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Jesus' Mission Fund account.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-brand">
          <span className="flex size-10 items-center justify-center bg-secondary">
            <LockKeyhole aria-hidden="true" className="size-4" />
          </span>
          Jesus&apos; Mission Fund
        </Link>

        <div className="my-auto grid overflow-hidden border border-border bg-card shadow-[0_20px_70px_rgba(28,44,34,0.06)] md:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-inverse p-10 text-inverse-foreground md:flex lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">A shared mission</p>
              <p className="mt-8 max-w-sm font-serif text-4xl leading-tight lg:text-5xl">
                Faithful people. <span className="italic text-inverse-muted">Shared work.</span>
              </p>
              <p className="mt-6 max-w-sm text-sm leading-7 text-inverse-foreground/70">
                Sign in to continue your work with Jesus&apos; Mission Fund.
              </p>
            </div>
            <p className="border-t border-inverse-foreground/20 pt-5 text-xs uppercase tracking-[0.16em] text-inverse-foreground/55">
              Fueling the Gospel · Strengthening the frontline
            </p>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Sign in to your account</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Enter your details to continue.</p>

            <SignInForm />

            <p className="mt-7 text-center text-sm text-muted-foreground">
              New to Jesus&apos; Mission Fund?{" "}
              <CreateAccountMenu
                align="center"
                className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                Create an account
              </CreateAccountMenu>
            </p>
            <p className="mt-6 text-center text-xs text-subtle-foreground">
              <Link href="/" className="hover:text-brand">Return to the main site</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
