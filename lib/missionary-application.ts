import type { MissionaryApplication } from "@/app/generated/prisma/client";

// Each attempt is its own application and rejected ones are kept as history; the newest is the current one.
export const latestApplication = {
  orderBy: { createdAt: "desc" },
  take: 1,
} as const;

export function canStartApplication(
  latest: Pick<MissionaryApplication, "status" | "reapplyAfter"> | undefined,
) {
  if (!latest) return true;
  return (
    latest.status === "REJECTED" &&
    (!latest.reapplyAfter || latest.reapplyAfter <= new Date())
  );
}

export function tomorrowAsDateInput() {
  return new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
}
