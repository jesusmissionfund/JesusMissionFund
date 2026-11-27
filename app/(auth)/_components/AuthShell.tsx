import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoSrc } from "@/lib/site";

export function AuthShell({
  aside,
  children,
}: {
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-brand"
        >
          <Image src={logoSrc} alt="" width={44} height={44} priority />
          Jesus&apos; Mission Fund
        </Link>

        <div className="my-8 grid overflow-hidden border border-border bg-card shadow-xl shadow-foreground/5 md:my-auto md:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-inverse p-10 text-inverse-foreground md:flex lg:p-14">
            {aside}
          </div>
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
