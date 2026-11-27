import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ApplicationProcess } from "./_components/ApplicationProcess";
import { MissionaryCTA } from "./_components/MissionaryCTA";
import { MissionaryPartnerHero } from "./_components/MissionaryPartnerHero";
import { SupportIncludes } from "./_components/SupportIncludes";
import { WhoWeSupport } from "./_components/WhoWeSupport";

export const metadata: Metadata = {
  title: "Missionaries",
  description:
    "Tell us about your ministry and the practical support that would help you serve.",
};

export default function MissionaryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <MissionaryPartnerHero />
      <WhoWeSupport />
      <SupportIncludes />
      <ApplicationProcess />
      <MissionaryCTA />
      <Footer />
    </main>
  );
}
