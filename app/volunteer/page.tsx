import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import IntakeForm from "../../components/forms/IntakeForm";

const sections = [
  {
    title: "Your contact details",
    fields: [
      { name: "fullName", label: "Full name", required: true },
      { name: "email", label: "Email address", type: "email" as const, required: true },
      { name: "phone", label: "Phone number", type: "tel" as const, required: true },
      { name: "location", label: "Where are you based?", required: true },
    ],
  },
  {
    title: "How you’d like to help",
    description: "This helps us match your interests and availability with current needs.",
    fields: [
      { name: "interest", label: "Area of interest", type: "select" as const, required: true, options: ["Events and outreach", "Communications and media", "Administration", "Fundraising", "Prayer support", "Other"] },
      { name: "skills", label: "Skills or experience you’d like to offer", type: "textarea" as const, required: true },
      { name: "availability", label: "Availability", type: "select" as const, required: true, options: ["A few hours each week", "A few hours each month", "For specific events", "Flexible"] },
      { name: "motivation", label: "Why would you like to volunteer with us?", type: "textarea" as const, required: true },
    ],
  },
];

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <IntakeForm
        eyebrow="Volunteer with us"
        title="Offer your time and skills."
        description="Tell us a little about yourself and how you’d like to help. The team will follow up about suitable opportunities."
        sections={sections}
        submitLabel="Send volunteer interest"
        successTitle="Thanks for offering to help."
        successMessage="In the connected version, your volunteer details will be sent to the team for review."
      />
      <Footer />
    </main>
  );
}
