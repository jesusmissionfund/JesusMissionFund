import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  Container,
  Eyebrow,
  heroSpacing,
  textLinkClass,
} from "@/components/site/layout";
import { cn } from "cn";
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
      <Container className={cn("min-h-screen max-w-4xl", heroSpacing)}>
        <Link href="/" className={textLinkClass}>
          Jesus&apos; Mission Fund
        </Link>
        <div className="mt-8 max-w-2xl">
          <Eyebrow>Volunteer with us</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">
            Offer your time and skills.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Tell us a little about yourself and how you’d like to help. The team
            will follow up about suitable opportunities.
          </p>
        </div>
        <VolunteerForm />
      </Container>
      <Footer />
    </main>
  );
}
