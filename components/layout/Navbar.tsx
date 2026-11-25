"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const linkClass = (href: string) =>
    cn(
      "relative inline-flex min-h-11 items-center text-[15px] font-medium tracking-[0.01em] transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#315b42] after:transition-transform hover:text-[#174b35] hover:after:scale-x-100",
      pathname === href
        ? "text-[#174b35] after:scale-x-100"
        : "text-[#52645a]",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dfe5dc] bg-[#f8f8f3]/95 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Jesus’ Mission Fund home" className="flex shrink-0 items-center">
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
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <Link href="/sign-in" aria-current={pathname === "/sign-in" ? "page" : undefined} className={linkClass("/sign-in")}>
            Sign in
          </Link>
          <Link href="/sign-up" className="inline-flex min-h-11 items-center justify-center bg-[#174b35] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#103a29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315b42] focus-visible:ring-offset-2">
            Create account
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center text-[#174b35] transition-colors hover:bg-[#e8eee5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315b42] lg:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-[#dfe5dc] bg-[#f8f8f3] px-5 pb-6 pt-3 sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex min-h-12 items-center border-b border-[#e7ebe3] text-[15px] font-medium transition-colors hover:text-[#174b35]",
                  pathname === link.href ? "text-[#174b35]" : "text-[#52645a]",
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-5 pt-5">
              <Link href="/sign-in" onClick={() => setIsMenuOpen(false)} className="inline-flex min-h-11 items-center text-[15px] font-medium text-[#315b42]">
                Sign in
              </Link>
              <Link href="/sign-up" onClick={() => setIsMenuOpen(false)} className="inline-flex min-h-11 flex-1 items-center justify-center bg-[#174b35] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#103a29]">
                Create account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
