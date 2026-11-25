import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

// Every page under /dashboard is for a person (role "user"); admin work accounts are sent on to /admin.
export const requirePerson = cache(async () => {
  const session = await requireUser();
  const { missionaryApplication: application, partnerProfile: partner, ...details } = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      phone: true,
      country: true,
      missionaryApplication: true,
      partnerProfile: true,
    },
  });

  const links = [
    { label: "Overview", href: "/dashboard" },
    ...(application?.status === "APPROVED" ? [{ label: "Submit a report", href: "/dashboard/reports/new" }] : []),
    ...(partner?.status === "ACTIVE" ? [{ label: "Partnership", href: "/dashboard/partnership" }] : []),
    { label: "My details", href: "/dashboard/details" },
  ];

  return { session, details, application, partner, links };
});
