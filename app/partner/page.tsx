import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PartnerLanding } from "./_components/PartnerLanding";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Missionaries carry the Gospel into their communities. Partners help provide the practical support that lets them stay focused on that work.",
};

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PartnerLanding />
      <Footer />
    </main>
  );
}
