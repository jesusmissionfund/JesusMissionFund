import { z } from "zod";

import {
  emailField,
  nameField,
  optionalCountryField,
  optionalPhoneField,
} from "@/lib/validation";

export const detailsSchema = z.object({
  phone: optionalPhoneField,
  country: optionalCountryField,
});

export type DetailsInput = z.infer<typeof detailsSchema>;

export const nameSchema = z.object({ name: nameField });
export type NameInput = z.infer<typeof nameSchema>;

export const emailSchema = z.object({ email: emailField });
export type EmailInput = z.infer<typeof emailSchema>;
