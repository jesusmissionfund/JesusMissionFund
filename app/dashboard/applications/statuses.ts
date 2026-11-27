import type { ApplicationStatus } from "@/app/generated/prisma/client";

export const applicantStatuses = {
  SUBMITTED: { label: "Under review", tone: "warning" },
  APPROVED: { label: "Approved", tone: "success" },
  REJECTED: { label: "Not approved", tone: "danger" },
} as const satisfies Partial<Record<ApplicationStatus, object>>;

export type SubmittedStatus = keyof typeof applicantStatuses;
