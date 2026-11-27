import type {
  MissionaryApplication,
  Prisma,
} from "@/app/generated/prisma/client";
import { toDateInput } from "@/lib/format";

// Postgres sorts enums in declaration order, so an open application (at most one) comes before any rejected one.
export const currentApplication = {
  orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  take: 1,
} satisfies Prisma.MissionaryApplicationFindManyArgs;

export const approvedMissionary = {
  missionaryApplications: { some: { status: "APPROVED" } },
} satisfies Prisma.UserWhereInput;

export const reachableMissionary = {
  ...approvedMissionary,
  banned: false,
} satisfies Prisma.UserWhereInput;

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
  return toDateInput(new Date(Date.now() + 86_400_000));
}
