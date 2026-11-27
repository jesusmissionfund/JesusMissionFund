import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplicationAnswers } from "@/components/dashboard/ApplicationAnswers";
import { Badge } from "@/components/dashboard/Badge";
import { BackLink } from "@/components/dashboard/BackLink";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../../person";
import { applicantStatuses, type SubmittedStatus } from "../statuses";

export const metadata: Metadata = { title: "My application" };

export default async function MyApplicationPage({
  params,
}: PageProps<"/dashboard/applications/[id]">) {
  const { session, links } = await requirePerson();
  const application = await prisma.missionaryApplication.findFirst({
    where: {
      id: (await params).id,
      userId: session.user.id,
      status: { not: "DRAFT" },
    },
    // reapplyAfter is for admins only.
    omit: { reapplyAfter: true },
  });
  if (!application) notFound();
  const status = applicantStatuses[application.status as SubmittedStatus];

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title="My application"
      subtitle={
        application.submittedAt
          ? `Submitted ${formatDate(application.submittedAt)}`
          : "Missionary application"
      }
      links={links}
    >
      <div className="max-w-4xl space-y-6">
        <BackLink href="/dashboard/applications" label="My applications" />

        <section className="border border-border bg-card p-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={status.tone}>{status.label}</Badge>
            {application.reviewedAt && (
              <span className="text-xs text-subtle-foreground">
                Reviewed {formatDate(application.reviewedAt)}
              </span>
            )}
          </div>
          {application.rejectionReason && (
            <p className="mt-4 whitespace-pre-line border-l-2 border-destructive/40 pl-3 text-sm leading-6 text-muted-foreground">
              {application.rejectionReason}
            </p>
          )}
        </section>

        <ApplicationAnswers answers={application} />
      </div>
    </DashboardShell>
  );
}
