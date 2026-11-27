import { z } from "zod";

import { emailField, nameField, newPasswordField } from "@/lib/validation";

export const accountSchema = z.object({
  name: nameField,
  email: emailField,
  password: newPasswordField,
});

export type AccountInput = z.infer<typeof accountSchema>;

export const newPasswordSchema = z
  .object({
    password: newPasswordField,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "The passwords don't match",
    path: ["confirmPassword"],
  });

export type NewPasswordInput = z.infer<typeof newPasswordSchema>;

export type AccountResult =
  | { error: string; existingAccount?: boolean }
  | { error?: undefined; signedInExisting: boolean };

export const resumeParam = "continue";

export type SignupStep = { id: string; title: string; description: string };
