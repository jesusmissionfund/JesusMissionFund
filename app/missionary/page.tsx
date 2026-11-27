import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ApplicationProcess from "@/components/missionary/ApplicationProcess";
import MissionaryCTA from "@/components/missionary/MissionaryCTA";
import MissionaryPartnerHero from "@/components/missionary/MissionaryPartnerHero";
import SupportIncludes from "@/components/missionary/SupportIncludes";
import WhoWeSupport from "@/components/missionary/WhoWeSupport";

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
