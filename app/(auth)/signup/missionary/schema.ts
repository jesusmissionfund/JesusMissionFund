import { z } from "zod";

import type {
  MissionaryApplication,
  User,
} from "@/app/generated/prisma/client";
import type { SignupStep } from "../schema";

export const ministryFocusOptions = [
  "Evangelism",
  "Discipleship",
  "Church planting",
  "Youth and children",
  "Community outreach",
  "Other",
] as const;

export const contactSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone or WhatsApp number")
    .max(30),
  country: z.string().trim().min(1, "Please enter your country").max(100),
  region: z
    .string()
    .trim()
    .min(1, "Please enter your region, town, or community")
    .max(200),
});

export const ministrySchema = z.object({
  church: z
    .string()
    .trim()
    .min(1, "Please enter your church or ministry organization")
    .max(200),
  yearsServing: z
    .string()
    .regex(/^\d{1,2}$/, "Please enter a whole number of years"),
  ministryFocus: z.enum(
    ministryFocusOptions,
    "Please choose your main ministry focus",
  ),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type MinistryInput = z.infer<typeof ministrySchema>;
export type ApplicationDraft = Partial<ContactInput & MinistryInput>;

export const steps = [
  {
    id: "account",
    title: "Create your account",
    description:
      "You'll use these details to sign in and follow your application.",
  },
  {
    id: "contact",
    title: "About you",
    description: "How can our team reach you and understand where you serve?",
  },
  {
    id: "ministry",
    title: "Your ministry",
    description: "Tell us about your calling and the people you serve.",
  },
  {
    id: "review",
    title: "Review and submit",
    description:
      "Check your details before sending your application to our team.",
  },
] as const satisfies readonly SignupStep[];

export type StepId = (typeof steps)[number]["id"];

type StoredApplication = Pick<MissionaryApplication, keyof ApplicationDraft>;

export function toApplicationDraft(
  application: StoredApplication | null,
  account: Pick<User, "phone" | "country"> | null,
): ApplicationDraft {
  return {
    phone: application?.phone ?? account?.phone ?? undefined,
    country: application?.country ?? account?.country ?? undefined,
    region: application?.region ?? undefined,
    church: application?.church ?? undefined,
    yearsServing: application?.yearsServing?.toString(),
    ministryFocus: ministryFocusOptions.find(
      (option) => option === application?.ministryFocus,
    ),
  };
}

export function resumeStep(signedIn: boolean, draft: ApplicationDraft): StepId {
  if (!signedIn) return "account";
  if (!contactSchema.safeParse(draft).success) return "contact";
  if (!ministrySchema.safeParse(draft).success) return "ministry";
  return "review";
}

type Answers = Partial<Record<keyof ApplicationDraft, string | number | null>>;

export function answerSections(answers: Answers) {
  return [
    {
      step: "contact" as const,
      title: "About you",
      rows: [
        ["Phone or WhatsApp", answers.phone],
        ["Country", answers.country],
        ["Region, town, or community", answers.region],
      ] as const,
    },
    {
      step: "ministry" as const,
      title: "Your ministry",
      rows: [
        ["Church or ministry organization", answers.church],
        ["Years in ministry", answers.yearsServing],
        ["Main ministry focus", answers.ministryFocus],
      ] as const,
    },
  ];
}
