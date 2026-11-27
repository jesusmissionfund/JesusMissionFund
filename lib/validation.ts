import { z } from "zod";

export const nameField = z
  .string()
  .trim()
  .min(1, "Please enter your full name")
  .max(120);
export const emailField = z.email("Please enter a valid email address");
export const newPasswordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128);
export const currentPasswordField = (message: string) =>
  z.string().min(1, message);

const phoneMessage = "Please enter a phone or WhatsApp number";
export const phoneField = z.string().trim().min(6, phoneMessage).max(30);
export const optionalPhoneField = z
  .string()
  .trim()
  .max(30)
  .refine((value) => value === "" || value.length >= 6, phoneMessage);
export const countryField = z
  .string()
  .trim()
  .min(1, "Please enter your country")
  .max(100);
export const optionalCountryField = z.string().trim().max(100);

export const optionalDateField = z.union([
  z.literal(""),
  z.iso.date("Please enter a valid date"),
]);

export function dateFromInput(value: string) {
  return value ? new Date(value) : null;
}
