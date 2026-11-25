import type { Prisma } from "@/app/generated/prisma/client";

// Missionary and partner come from a user's records, not the role, so the users list filters on those.
export const userKinds = {
  missionary: { label: "Missionary", where: { missionaryApplication: { status: { not: "DRAFT" } } } },
  partner: { label: "Partner", where: { partnerProfile: { status: "ACTIVE" } } },
  admin: { label: "Admin", where: { role: "admin" } },
} satisfies Record<string, { label: string; where: Prisma.UserWhereInput }>;

type UserKind = keyof typeof userKinds;

export function isUserKind(value: unknown): value is UserKind {
  return typeof value === "string" && Object.hasOwn(userKinds, value);
}

type UserRecords = {
  role: string | null;
  missionaryApplication: { status: string } | null;
  partnerProfile: { status: string } | null;
};

export function kindsOf(user: UserRecords): UserKind[] {
  if (user.role === "admin") return ["admin"];
  return [
    ...(user.missionaryApplication && user.missionaryApplication.status !== "DRAFT" ? (["missionary"] as const) : []),
    ...(user.partnerProfile?.status === "ACTIVE" ? (["partner"] as const) : []),
  ];
}
