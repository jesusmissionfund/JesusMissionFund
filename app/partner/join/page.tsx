import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import IntakeForm from "../../../components/forms/IntakeForm";

const sections = [
  {
    title: "Your contact details",
    fields: [
      { name: "fullName", label: "Full name", required: true },
      { name: "email", label: "Email address", type: "email" as const, required: true },
      { name: "phone", label: "Phone or WhatsApp number", type: "tel" as const, required: true },
      { name: "country", label: "Country", required: true },
    ],
  },
  {
    title: "Your partnership",
    description: "Share how you hope to stand with missionaries. You can complete your gift through mobile money after submitting.",
    fields: [
      { name: "frequency", label: "How often would you like to give?", type: "select" as const, required: true, options: ["Weekly", "Monthly", "I’d like to decide later"] },
      { name: "amount", label: "Preferred amount (optional)", type: "select" as const, options: ["GH₵5", "GH₵10", "GH₵50", "GH₵100", "GH₵500", "Custom amount", "I’d like to decide later"] },
      { name: "supportInterest", label: "What would you like to support?", type: "select" as const, required: true, options: ["Wherever the need is greatest", "Evangelism and outreach", "Discipleship resources", "Transportation", "Media and equipment", "Other"] },
      { name: "message", label: "Anything else you’d like us to know? (optional)", type: "textarea" as const },
    ],
  },
];

export default function PartnerJoinPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3]">
      <Navbar />
      <IntakeForm
        eyebrow="Giving partner registration"
        title="Stand with missionaries over time."
        description="Share your contact details and giving preference. You’ll be able to complete your recurring gift using the mobile money steps."
        sections={sections}
        submitLabel="Continue as a partner"
        successTitle="You’re ready to partner with us."
        successMessage="In the connected version, the team will receive your details. You can continue to the mobile money instructions to complete your gift."
        nextHref="/partner#mobile-money"
        nextLabel="View mobile money steps"
      />
      <Footer />
    </main>
  );
}
