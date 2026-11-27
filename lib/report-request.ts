import type { Prisma } from "@/app/generated/prisma/client";

export const waitingRequest = {
  report: null,
} satisfies Prisma.ReportRequestWhereInput;

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function overdueRequest() {
  return {
    ...waitingRequest,
    dueDate: { lt: startOfToday() },
  } satisfies Prisma.ReportRequestWhereInput;
}

export function isOverdue(request: { dueDate: Date | null }) {
  return Boolean(request.dueDate && request.dueDate < startOfToday());
}
