"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "cn";
import { CreateAccountMenu } from "@/components/auth/CreateAccountMenu";
import { UserMenu } from "@/components/auth/UserMenu";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Partners", href: "/partner" },
  { name: "Missionaries", href: "/missionary" },
  { name: "Success stories", href: "/success-stories" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const linkClass = (href: string) =>
    cn(
      "relative inline-flex min-h-11 items-center text-[15px] font-medium tracking-[0.01em] transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-primary hover:after:scale-x-100",
      pathname === href
        ? "text-primary after:scale-x-100"
        : "text-muted-foreground",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Jesus’ Mission Fund home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/JMF_Logo-Green_NoBG.png"
            alt="Jesus’ Mission Fund"
            width={58}
            height={58}
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={linkClass(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden min-w-40 shrink-0 items-center justify-end gap-5 lg:flex">
          {session ? (
            <UserMenu user={session.user} />
          ) : (
            !isPending && (
              <>
                <Link
                  href="/signin"
                  aria-current={pathname === "/signin" ? "page" : undefined}
                  className={linkClass("/signin")}
                >
                  Sign in
                </Link>
                <CreateAccountMenu className="min-h-11 justify-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" />
              </>
            )
          )}
        </div>

        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-5 pb-6 pt-3 sm:px-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex min-h-12 items-center border-b border-border text-[15px] font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.name}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center justify-between gap-4 pt-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {session.user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
                <UserMenu user={session.user} />
              </div>
            ) : (
              !isPending && (
                <div className="flex items-center gap-5 pt-5">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-brand"
                  >
                    Sign in
                  </Link>
                  <CreateAccountMenu className="min-h-11 flex-1 justify-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
