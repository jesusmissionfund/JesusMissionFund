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

export const supportNeedOptions = [
  "Transportation",
  "Outreach or discipleship materials",
  "Audio or visual equipment",
  "Communication tools",
  "Family or livelihood support",
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
  community: z
    .string()
    .trim()
    .min(1, "Please tell us who you serve and what your ministry does")
    .max(2000),
  impact: z
    .string()
    .trim()
    .min(1, "Please share an example of your ministry's impact")
    .max(2000),
});

export const supportSchema = z.object({
  supportNeed: z.enum(
    supportNeedOptions,
    "Please choose the support that would help most",
  ),
  needDetails: z
    .string()
    .trim()
    .min(1, "Please describe the need and how support would help")
    .max(2000),
  estimatedCost: z.string().trim().max(100).optional(),
  referenceName: z
    .string()
    .trim()
    .min(1, "Please enter a pastor or ministry reference")
    .max(120),
  referenceContact: z
    .string()
    .trim()
    .min(1, "Please enter your reference's phone or email")
    .max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type MinistryInput = z.infer<typeof ministrySchema>;
export type SupportInput = z.infer<typeof supportSchema>;
export type ApplicationDraft = Partial<
  ContactInput & MinistryInput & SupportInput
>;

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
    id: "support",
    title: "Support and references",
    description:
      "Help us understand your current needs and who can speak to your work.",
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
    community: application?.community ?? undefined,
    impact: application?.impact ?? undefined,
    supportNeed: supportNeedOptions.find(
      (option) => option === application?.supportNeed,
    ),
    needDetails: application?.needDetails ?? undefined,
    estimatedCost: application?.estimatedCost ?? undefined,
    referenceName: application?.referenceName ?? undefined,
    referenceContact: application?.referenceContact ?? undefined,
  };
}

// What someone asks for can change, so a new application copies only these from the previous one.
const carriedOverFields = [
  "phone",
  "country",
  "region",
  "church",
  "yearsServing",
  "ministryFocus",
  "referenceName",
  "referenceContact",
] as const;

type CarriedOverField = (typeof carriedOverFields)[number];

export function carriedOver<
  T extends Partial<Record<CarriedOverField, unknown>>,
>(previous: T) {
  return Object.fromEntries(
    carriedOverFields.map((field) => [field, previous[field]]),
  ) as Pick<T, CarriedOverField>;
}

export function resumeStep(signedIn: boolean, draft: ApplicationDraft): StepId {
  if (!signedIn) return "account";
  if (!contactSchema.safeParse(draft).success) return "contact";
  if (!ministrySchema.safeParse(draft).success) return "ministry";
  if (!supportSchema.safeParse(draft).success) return "support";
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
        [
          "Who do you serve, and what does your ministry do?",
          answers.community,
        ],
        [
          "Share one example of how your ministry is making a difference.",
          answers.impact,
        ],
      ] as const,
    },
    {
      step: "support" as const,
      title: "Support and references",
      rows: [
        ["What practical support would help most?", answers.supportNeed],
        ["Describe the need and how support would help.", answers.needDetails],
        ["Estimated cost", answers.estimatedCost],
        ["Pastor or ministry reference name", answers.referenceName],
        ["Reference phone or email", answers.referenceContact],
      ] as const,
    },
  ];
}
