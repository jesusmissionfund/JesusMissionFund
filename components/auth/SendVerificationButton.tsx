"use client";

import { useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export function SendVerificationButton({
  email,
  callbackURL,
}: {
  email: string;
  callbackURL: string;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ sent?: boolean; error?: string }>({});

  function send() {
    startTransition(async () => {
      try {
        const { error } = await authClient.sendVerificationEmail({
          email,
          callbackURL,
        });
        setResult(
          error
            ? { error: error.message || "We could not send the email." }
            : { sent: true },
        );
      } catch {
        setResult({ error: "The service could not be reached. Try again." });
      }
    });
  }

  if (result.sent)
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Sent to {email}. Check your inbox.
      </p>
    );

  return (
    <div className="flex flex-wrap items-center gap-3">
      {result.error && (
        <p role="alert" className="text-sm text-destructive">
          {result.error}
        </p>
      )}
      <button
        type="button"
        onClick={send}
        disabled={pending}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand disabled:cursor-wait disabled:opacity-65"
      >
        {pending ? "Sending…" : "Send link"}
        {!pending && <ArrowRight aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );
}
