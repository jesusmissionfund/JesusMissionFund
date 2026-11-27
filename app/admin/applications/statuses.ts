import type { ApplicationStatus } from "@/app/generated/prisma/client";

export const adminStatuses = {
  SUBMITTED: { label: "To review", tone: "warning" },
  APPROVED: { label: "Approved", tone: "success" },
  REJECTED: { label: "Rejected", tone: "danger" },
} as const satisfies Partial<Record<ApplicationStatus, object>>;

export type ReviewedStatus = keyof typeof adminStatuses;
