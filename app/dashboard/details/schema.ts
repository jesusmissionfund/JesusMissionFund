import { z } from "zod";

export const detailsSchema = z.object({
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((value) => value === "" || value.length >= 6, "Please enter a phone or WhatsApp number"),
  country: z.string().trim().max(100),
});

export type DetailsInput = z.infer<typeof detailsSchema>;
