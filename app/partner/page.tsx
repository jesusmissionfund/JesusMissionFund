import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import PartnerLanding from "../../components/partners/PartnerLanding";

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PartnerLanding />
      <Footer />
    </main>
  );
}
