import type {
  MissionaryApplication,
  Prisma,
} from "@/app/generated/prisma/client";

// Postgres sorts enums in declaration order, so an open application (at most one) comes before any rejected one.
export const currentApplication = {
  orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  take: 1,
} satisfies Prisma.MissionaryApplicationFindManyArgs;

export function canStartApplication(
  current: Pick<MissionaryApplication, "status" | "reapplyAfter"> | undefined,
) {
  if (!current) return true;
  return (
    current.status === "REJECTED" &&
    (!current.reapplyAfter || current.reapplyAfter <= new Date())
  );
}

export function tomorrowAsDateInput() {
  return new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
}
