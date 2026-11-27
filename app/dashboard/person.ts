import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { currentApplication } from "@/lib/missionary-application";

export const requirePerson = cache(async () => {
  const session = await requireUser();
  const {
    missionaryApplications: [application = null],
    partnerProfile: partner,
    _count,
    ...details
  } = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      emailVerified: true,
      phone: true,
      country: true,
      missionaryApplications: currentApplication,
      partnerProfile: true,
      _count: {
        select: {
          missionaryApplications: { where: { status: { not: "DRAFT" } } },
        },
      },
    },
  });

  const links = [
    { label: "Overview", href: "/dashboard" },
    ...(application?.status === "APPROVED"
      ? [{ label: "Submit a report", href: "/dashboard/reports/new" }]
      : []),
    ...(_count.missionaryApplications > 0
      ? [{ label: "My applications", href: "/dashboard/applications" }]
      : []),
    ...(partner?.status === "ACTIVE"
      ? [{ label: "Partnership", href: "/dashboard/partnership" }]
      : []),
    { label: "My details", href: "/dashboard/details" },
  ];

  return { session, details, application, partner, links };
});
