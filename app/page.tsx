import { Analytics } from "@vercel/analytics/next";

import CTASection from "@/components/home/CTASection";
import LandingHero from "@/components/home/LandingHero";
import MissionarySection from "@/components/home/MissionarySection";
import PartnersSection from "@/components/home/PartnersSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

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
