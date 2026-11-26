import type { Prisma } from "@/app/generated/prisma/client";

export const userKinds = {
  missionary: {
    label: "Missionary",
    where: {
      missionaryApplications: { some: { status: { not: "DRAFT" } } },
    },
  },
  partner: {
    label: "Partner",
    where: { partnerProfile: { status: "ACTIVE" } },
  },
  admin: { label: "Admin", where: { role: "admin" } },
} satisfies Record<string, { label: string; where: Prisma.UserWhereInput }>;

type UserKind = keyof typeof userKinds;

export function isUserKind(value: unknown): value is UserKind {
  return typeof value === "string" && Object.hasOwn(userKinds, value);
}

type UserRecords = {
  role: string | null;
  missionaryApplications: { status: string }[];
  partnerProfile: { status: string } | null;
};

export function kindsOf(user: UserRecords): UserKind[] {
  if (user.role === "admin") return ["admin"];
  return [
    ...(user.missionaryApplications.some(({ status }) => status !== "DRAFT")
      ? (["missionary"] as const)
      : []),
    ...(user.partnerProfile?.status === "ACTIVE" ? (["partner"] as const) : []),
  ];
}
