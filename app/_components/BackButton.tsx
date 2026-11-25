"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      // A page opened straight in a new tab has no history to return to.
      onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
      className="inline-flex min-h-12 items-center gap-3 border border-input bg-card px-6 text-sm font-semibold text-brand transition-colors hover:bg-accent"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Go back
    </button>
  );
}
