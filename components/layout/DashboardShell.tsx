import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { UserMenu, type MenuUser } from "@/components/auth/UserMenu";
import { logoSrc } from "@/lib/site";

type DashboardLink = { label: string; href: string };

export function DashboardShell({
  label,
  user,
  title,
  subtitle,
  links,
  children,
}: {
  label: "Admin" | "My dashboard";
  user: MenuUser;
  title: string;
  subtitle: string;
  links: DashboardLink[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card px-5 py-6 lg:flex">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Image src={logoSrc} alt="" width={40} height={40} />
          <span>Jesus&apos; Mission Fund</span>
        </Link>
        <div className="mt-10 border-y border-border py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-subtle-foreground">
            {label}
          </p>
          <p className="mt-2 truncate text-sm font-semibold">{user.name}</p>
        </div>
        <nav aria-label={label} className="mt-5 grid gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center justify-between px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
              <ChevronRight
                aria-hidden="true"
                className="size-4 text-subtle-foreground"
              />
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-auto inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to website
        </Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold">{user.name}</p>
            </div>
            <UserMenu user={user} />
          </div>
          <nav
            aria-label="Dashboard sections"
            className="flex gap-1 overflow-x-auto border-t border-border px-5 py-2 lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {subtitle}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
