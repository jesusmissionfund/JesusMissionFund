import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import IntakeForm from "../../../components/forms/IntakeForm";

const sections = [
  {
    title: "About you",
    description: "How can our team reach you and understand where you serve?",
    fields: [
      { name: "fullName", label: "Full name", required: true },
      { name: "email", label: "Email address", type: "email" as const, required: true },
      { name: "phone", label: "Phone or WhatsApp number", type: "tel" as const, required: true },
      { name: "country", label: "Country", required: true },
      { name: "region", label: "Region, town, or community", required: true },
      { name: "church", label: "Church or ministry organization", required: true },
    ],
  },
  {
    title: "Your ministry",
    description: "Tell us about your calling and the people you serve.",
    fields: [
      { name: "yearsServing", label: "Years in ministry", type: "number" as const, min: 0, required: true },
      { name: "ministryFocus", label: "Main ministry focus", type: "select" as const, required: true, options: ["Evangelism", "Discipleship", "Church planting", "Youth and children", "Community outreach", "Other"] },
      { name: "community", label: "Who do you serve, and what does your ministry do?", type: "textarea" as const, required: true },
      { name: "impact", label: "Share one example of how your ministry is making a difference.", type: "textarea" as const, required: true },
    ],
  },
  {
    title: "Support and references",
    description: "Help us understand your current needs and who can speak to your work.",
    fields: [
      { name: "supportNeed", label: "What practical support would help most?", type: "select" as const, required: true, options: ["Transportation", "Outreach or discipleship materials", "Audio or visual equipment", "Communication tools", "Family or livelihood support", "Other"] },
      { name: "needDetails", label: "Describe the need and how support would help.", type: "textarea" as const, required: true },
      { name: "estimatedCost", label: "Estimated cost (optional)", placeholder: "Amount and currency" },
      { name: "referenceName", label: "Pastor or ministry reference name", required: true },
      { name: "referenceContact", label: "Reference phone or email", required: true },
    ],
  },
];

export default function MissionaryApplicationPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3]">
      <Navbar />
      <IntakeForm
        eyebrow="Missionary application"
        title="Tell us about your calling and your work."
        description="Share a little about your ministry and the practical support you are seeking. Our team will review your application and follow up."
        sections={sections}
        submitLabel="Submit application"
        successTitle="Your application is ready for review."
        successMessage="In the connected version, the team will review your application and contact you with the decision. Approved missionaries will be invited to sign in to their portal."
      />
      <Footer />
    </main>
  );
}
