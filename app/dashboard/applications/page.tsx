import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/dashboard/Badge";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../person";
import { applicantStatuses, type SubmittedStatus } from "./statuses";

export const metadata: Metadata = { title: "My applications" };

export default async function MyApplicationsPage() {
  const { session, links } = await requirePerson();

  const applications = await prisma.missionaryApplication.findMany({
    where: { userId: session.user.id, status: { not: "DRAFT" } },
    orderBy: { submittedAt: "desc" },
    select: { id: true, status: true, submittedAt: true, reviewedAt: true },
  });

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title="My applications"
      subtitle="The missionary applications you've submitted."
      links={links}
    >
      {applications.length === 0 ? (
        <p className="border border-border bg-card p-6 text-sm text-muted-foreground">
          You haven&apos;t submitted an application yet.
        </p>
      ) : (
        <ul className="divide-y divide-border border border-border bg-card">
          {applications.map((application) => {
            const status =
              applicantStatuses[application.status as SubmittedStatus];
            return (
              <li key={application.id}>
                <Link
                  href={`/dashboard/applications/${application.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 p-5 hover:bg-muted sm:px-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold">
                      {application.submittedAt
                        ? `Submitted ${formatDate(application.submittedAt)}`
                        : "Application"}
                    </span>
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-subtle-foreground">
                    {application.reviewedAt &&
                      `Reviewed ${formatDate(application.reviewedAt)}`}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 text-brand"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardShell>
  );
}
