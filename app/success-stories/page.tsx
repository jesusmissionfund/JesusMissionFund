import type { Metadata } from "next";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import SuccessStoriesContent from "../../components/stories/SuccessStoriesContent";

export const metadata: Metadata = {
  title: "Success Stories | Jesus’ Mission Fund",
  description:
    "See how practical support is helping missionaries serve communities in Ghana and Kenya.",
};

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3]">
      <Navbar />
      <SuccessStoriesContent />
      <Footer />
    </main>
  );
}
