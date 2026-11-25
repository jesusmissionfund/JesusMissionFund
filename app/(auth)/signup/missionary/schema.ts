import { z } from "zod";

export const ministryFocusOptions = [
  "Evangelism",
  "Discipleship",
  "Church planting",
  "Youth and children",
  "Community outreach",
  "Other",
] as const;

export const accountSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export const contactSchema = z.object({
  phone: z.string().trim().min(6, "Please enter a phone or WhatsApp number").max(30),
  country: z.string().trim().min(1, "Please enter your country").max(100),
  region: z.string().trim().min(1, "Please enter your region, town, or community").max(200),
});

export const ministrySchema = z.object({
  church: z.string().trim().min(1, "Please enter your church or ministry organization").max(200),
  yearsServing: z.string().regex(/^\d{1,2}$/, "Please enter a whole number of years"),
  ministryFocus: z.enum(ministryFocusOptions, "Please choose your main ministry focus"),
});

export type AccountInput = z.infer<typeof accountSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type MinistryInput = z.infer<typeof ministrySchema>;
export type ApplicationDraft = Partial<ContactInput & MinistryInput>;

export const steps = [
  { id: "account", title: "Create your account", description: "You'll use these details to sign in and follow your application." },
  { id: "contact", title: "About you", description: "How can our team reach you and understand where you serve?" },
  { id: "ministry", title: "Your ministry", description: "Tell us about your calling and the people you serve." },
  { id: "review", title: "Review and submit", description: "Check your details before sending your application to our team." },
] as const;

export type StepId = (typeof steps)[number]["id"];

// The resume point is derived from which fields are already saved, so no step number is stored.
export function resumeStep(signedIn: boolean, draft: ApplicationDraft): StepId {
  if (!signedIn) return "account";
  if (!contactSchema.safeParse(draft).success) return "contact";
  if (!ministrySchema.safeParse(draft).success) return "ministry";
  return "review";
}
