import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SuccessStoriesContent } from "./_components/SuccessStoriesContent";

export const metadata: Metadata = {
  title: "Success stories",
  description:
    "See how practical support is helping missionaries serve communities in Ghana and Kenya.",
};

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SuccessStoriesContent />
      <Footer />
    </main>
  );
}
