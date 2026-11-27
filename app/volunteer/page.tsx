import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { VolunteerForm } from "./_components/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer with us",
  description:
    "Tell us a little about yourself and how you’d like to help. The team will follow up about suitable opportunities.",
};

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen px-5 pb-20 pt-32 sm:px-8 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4"
          >
            Jesus&apos; Mission Fund
          </Link>
          <div className="mt-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
              Volunteer with us
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">
              Offer your time and skills.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Tell us a little about yourself and how you’d like to help. The
              team will follow up about suitable opportunities.
            </p>
          </div>
          <VolunteerForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
