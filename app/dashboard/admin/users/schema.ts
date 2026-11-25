import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name").max(120),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export type StaffInput = z.infer<typeof staffSchema>;
