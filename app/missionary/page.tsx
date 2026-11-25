import Footer from '../../components/layout/Footer';
import MissionaryCTA from '../../components/missionary/MissionaryCTA';
import Navbar from '../../components/layout/Navbar';
import ApplicationProcess from '../../components/missionary/ApplicationProcess';
import SupportIncludes from '../../components/missionary/SupportIncludes';
import WhoWeSupport from '../../components/missionary/WhoWeSupport';
import MissionaryPartnerHero from '../../components/missionary/MissionaryPartnerHero';

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
