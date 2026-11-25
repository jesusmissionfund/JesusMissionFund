import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export type AccountInput = z.infer<typeof accountSchema>;

export type AccountResult =
  | { error: string; existingAccount?: boolean }
  | { error?: undefined; signedInExisting: boolean };

export const resumeParam = "continue";

export type SignupStep = { id: string; title: string; description: string };
