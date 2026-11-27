"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { invalidInput } from "@/lib/action-result";
import { sendEmailAfterResponse } from "@/lib/email";
import { reportRequestedEmail } from "@/lib/email-templates";
import { formatDate } from "@/lib/format";
import { approvedMissionary } from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";
import { requireAdmin } from "@/lib/session";
import { recordAudit } from "../audit";
import {
  allMissionaries,
  reportRequestSchema,
  type ReportRequestInput,
} from "./schema";

export async function requestReport(input: ReportRequestInput) {
  const { user: admin } = await requireAdmin();
  const parsed = reportRequestSchema.safeParse(input);
  if (!parsed.success) return invalidInput;
  const { recipient, title, body } = parsed.data;
  const dueDate = parsed.data.dueDate ? new Date(parsed.data.dueDate) : null;
  const toEveryone = recipient === allMissionaries;

  const missionaries = await prisma.user.findMany({
    where: { ...(!toEveryone && { id: recipient }), ...approvedMissionary },
    select: { id: true, name: true, email: true },
  });
  if (missionaries.length === 0)
    return {
      error: toEveryone
        ? "There are no approved missionaries yet."
        : "Choose an approved missionary.",
    };

  const requests = await prisma.$transaction(async (tx) => {
    const created = await tx.reportRequest.createManyAndReturn({
      data: missionaries.map(({ id }) => ({
        userId: id,
        title,
        body,
        dueDate,
      })),
      select: { id: true, user: { select: { name: true, email: true } } },
    });
    await recordAudit(
      admin,
      "REPORT_REQUESTED",
      toEveryone
        ? { id: null, name: "All approved missionaries" }
        : { id: missionaries[0].id, name: missionaries[0].name },
      title,
      tx,
    );
    return created;
  });

  const due = dueDate && formatDate(dueDate);
  for (const { id, user } of requests) {
    sendEmailAfterResponse({
      to: user.email,
      ...reportRequestedEmail(
        user.name,
        title,
        due,
        `${siteUrl}/dashboard/reports/new?request=${id}`,
      ),
    });
  }

  revalidatePath("/admin", "layout");
  revalidatePath("/dashboard", "layout");
  redirect("/admin/reports?tab=requests");
}
