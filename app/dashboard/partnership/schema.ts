import { z } from "zod";

import type { PartnerProfile } from "@/app/generated/prisma/client";

export const frequencyOptions = [
  "Weekly",
  "Monthly",
  "I’d like to decide later",
] as const;
export const amountOptions = [
  "GH₵5",
  "GH₵10",
  "GH₵50",
  "GH₵100",
  "GH₵500",
  "I’d like to decide later",
] as const;
export const supportInterestOptions = [
  "Wherever the need is greatest",
  "Evangelism and outreach",
  "Discipleship resources",
  "Transportation",
  "Media and equipment",
  "Other",
] as const;

export const partnershipSchema = z.object({
  frequency: z.enum(
    frequencyOptions,
    "Please choose how often you'd like to give",
  ),
  amount: z.enum(amountOptions).optional(),
  supportInterest: z.enum(
    supportInterestOptions,
    "Please choose what you'd like to support",
  ),
  message: z.string().trim().max(1500).optional(),
});

export type PartnershipInput = z.infer<typeof partnershipSchema>;

export function toPartnership(
  profile: Pick<PartnerProfile, keyof PartnershipInput> | null,
): Partial<PartnershipInput> {
  const pick = <T extends string>(
    options: readonly T[],
    value: string | null | undefined,
  ) => options.find((option) => option === value);
  return {
    frequency: pick(frequencyOptions, profile?.frequency),
    amount: pick(amountOptions, profile?.amount),
    supportInterest: pick(supportInterestOptions, profile?.supportInterest),
    message: profile?.message ?? undefined,
  };
}
