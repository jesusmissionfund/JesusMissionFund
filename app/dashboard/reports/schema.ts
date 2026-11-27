import { z } from "zod";

export const reportSchema = z.object({
  title: z.string().trim().min(1, "Please give your report a title").max(200),
  body: z.string().trim().min(1, "Please write your report").max(20000),
});

export type ReportInput = z.infer<typeof reportSchema>;
