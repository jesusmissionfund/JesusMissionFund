import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CTASection } from "./_components/CTASection";
import { LandingHero } from "./_components/LandingHero";
import { MissionarySection } from "./_components/MissionarySection";
import { PartnersSection } from "./_components/PartnersSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LandingHero />
      <PartnersSection />
      <MissionarySection />
      <CTASection />
      <Analytics />
      <Footer />
    </main>
  );
}
