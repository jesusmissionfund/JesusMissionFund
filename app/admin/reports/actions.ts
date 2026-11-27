"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { invalidInput, type ActionResult } from "@/lib/action-result";
import { sendEmailAfterResponse } from "@/lib/email";
import {
  reportReminderEmail,
  reportRequestedEmail,
} from "@/lib/email-templates";
import { formatDate } from "@/lib/format";
import { reachableMissionary } from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { waitingRequest } from "@/lib/report-request";
import { siteUrl } from "@/lib/site";
import { requireAdmin } from "@/lib/session";
import { dateFromInput } from "@/lib/validation";
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
  const dueDate = dateFromInput(parsed.data.dueDate);
  const toEveryone = recipient === allMissionaries;

  const missionaries = await prisma.user.findMany({
    where: { ...(!toEveryone && { id: recipient }), ...reachableMissionary },
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

async function findWaitingRequest(id: string) {
  return prisma.reportRequest.findFirst({
    where: { id, ...waitingRequest },
    select: {
      id: true,
      title: true,
      dueDate: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });
}

const alreadyAnswered = {
  error: "This request has been answered or withdrawn.",
};

export async function withdrawReportRequest(id: string): Promise<ActionResult> {
  const { user: admin } = await requireAdmin();
  const request = await findWaitingRequest(id);
  if (!request) return alreadyAnswered;

  await prisma.$transaction(async (tx) => {
    await tx.reportRequest.delete({ where: { id } });
    await recordAudit(
      admin,
      "REPORT_REQUEST_WITHDRAWN",
      { id: request.user.id, name: request.user.name },
      request.title,
      tx,
    );
  });
  revalidatePath("/admin", "layout");
  revalidatePath("/dashboard", "layout");
  return {};
}

export async function remindReportRequest(id: string): Promise<ActionResult> {
  const { user: admin } = await requireAdmin();
  const request = await findWaitingRequest(id);
  if (!request) return alreadyAnswered;

  await prisma.$transaction(async (tx) => {
    await tx.reportRequest.update({
      where: { id },
      data: { remindedAt: new Date() },
    });
    await recordAudit(
      admin,
      "REPORT_REMINDER_SENT",
      { id: request.user.id, name: request.user.name },
      request.title,
      tx,
    );
  });
  sendEmailAfterResponse({
    to: request.user.email,
    ...reportReminderEmail(
      request.user.name,
      request.title,
      request.dueDate && formatDate(request.dueDate),
      `${siteUrl}/dashboard/reports/new?request=${id}`,
    ),
  });
  revalidatePath("/admin", "layout");
  return {};
}
