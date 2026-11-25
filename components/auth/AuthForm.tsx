"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

export default function AuthForm({ mode, showDashboardPreviews = false }: { mode: AuthMode; showDashboardPreviews?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password, callbackURL: "/" })
        : await authClient.signIn.email({ email, password, callbackURL: "/" });

      if (result.error) {
        setError(result.error.message || "We could not complete your request. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("The sign-in service could not be reached. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#244b36]">
          <span className="flex h-10 w-10 items-center justify-center bg-[#e8eee5]">
            <LockKeyhole aria-hidden="true" className="h-4 w-4" />
          </span>
          Jesus&apos; Mission Fund
        </Link>

        <div className="my-auto grid overflow-hidden border border-[#dfe5dc] bg-white shadow-[0_20px_70px_rgba(28,44,34,0.06)] md:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-[#173c2c] p-10 text-white md:flex lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c4d3bc]">A shared mission</p>
              <h1 className="mt-8 max-w-sm font-serif text-4xl leading-tight lg:text-5xl">
                Faithful people. <span className="italic text-[#c4d3bc]">Shared work.</span>
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
                Sign in to continue, or create an account to take your next step with Jesus&apos; Mission Fund.
              </p>
            </div>
            <p className="border-t border-white/20 pt-5 text-xs uppercase tracking-[0.16em] text-white/55">
              Fueling the Gospel · Strengthening the frontline
            </p>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#587261]">
              {isSignUp ? "Join the community" : "Welcome back"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1c2c22]">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#66746a]">
              {isSignUp
                ? "Create an account to stay connected with the mission."
                : "Enter your details to continue."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isSignUp && (
                <div>
                  <label htmlFor="auth-name" className="mb-2 block text-sm font-medium text-[#34483a]">Full name</label>
                  <input
                    id="auth-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-12 w-full border border-[#d5ddd3] bg-white px-4 text-sm text-[#1c2c22] outline-none transition focus:border-[#315b42] focus:ring-2 focus:ring-[#315b42]/10"
                  />
                </div>
              )}
              <div>
                <label htmlFor="auth-email" className="mb-2 block text-sm font-medium text-[#34483a]">Email address</label>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full border border-[#d5ddd3] bg-white px-4 text-sm text-[#1c2c22] outline-none transition focus:border-[#315b42] focus:ring-2 focus:ring-[#315b42]/10"
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="mb-2 block text-sm font-medium text-[#34483a]">Password</label>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full border border-[#d5ddd3] bg-white px-4 text-sm text-[#1c2c22] outline-none transition focus:border-[#315b42] focus:ring-2 focus:ring-[#315b42]/10"
                />
              </div>

              {error && <p role="alert" className="border-l-2 border-[#a04437] bg-[#fbf3f0] px-4 py-3 text-sm text-[#84392f]">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-3 bg-[#174b35] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#103a29] disabled:cursor-wait disabled:opacity-65"
              >
                {isSubmitting ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
                {!isSubmitting && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#66746a]">
              {isSignUp ? "Already have an account?" : "New to Jesus’ Mission Fund?"}{" "}
              <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-semibold text-[#315b42] underline decoration-[#b8cdaa] underline-offset-4 hover:decoration-[#315b42]">
                {isSignUp ? "Sign in" : "Create an account"}
              </Link>
            </p>
            <p className="mt-6 text-center text-xs text-[#879188]">
              <Link href="/" className="hover:text-[#315b42]">Return to the main site</Link>
            </p>
            {showDashboardPreviews && (
              <div className="mt-7 border-t border-[#e8ece6] pt-5">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.13em] text-[#879188]">Preview the portal layouts</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <Link href="/dashboard/missionary" className="border border-[#dfe5dc] px-3 py-3 text-center text-xs font-semibold text-[#315b42] hover:bg-[#f5f7f3]">Missionary dashboard demo</Link>
                  <Link href="/dashboard/admin" className="border border-[#dfe5dc] px-3 py-3 text-center text-xs font-semibold text-[#315b42] hover:bg-[#f5f7f3]">Admin dashboard demo</Link>
                  <Link href="/dashboard/partner" className="border border-[#dfe5dc] px-3 py-3 text-center text-xs font-semibold text-[#315b42] hover:bg-[#f5f7f3]">Partner dashboard demo</Link>
                </div>
                <p className="mt-2 text-center text-[11px] text-[#879188]">Sample data only · sign-in is not connected yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
