import { z } from "zod";

export const allMissionaries = "all";

export const reportRequestSchema = z.object({
  recipient: z.string().min(1, "Please choose who to ask"),
  title: z.string().trim().min(1, "Please give the request a title").max(200),
  body: z
    .string()
    .trim()
    .min(1, "Please say what you'd like in the report")
    .max(20000),
  dueDate: z.union([z.literal(""), z.iso.date("Please enter a valid date")]),
});

export type ReportRequestInput = z.infer<typeof reportRequestSchema>;
