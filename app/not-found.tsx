import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";

import { buttonClass } from "@/components/site/layout";
import { BackButton } from "./_components/BackButton";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-6 text-center">
      <div>
        <p className="text-8xl font-semibold tracking-tight text-primary">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BackButton />
          <Link href="/" className={buttonClass}>
            <Home aria-hidden="true" className="size-4" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
