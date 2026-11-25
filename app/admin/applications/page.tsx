import type { Metadata } from "next";
import Link from "next/link";

import type { ApplicationStatus } from "@/app/generated/prisma/client";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Badge } from "../_components/Badge";
import { adminLinks } from "../links";
import { ReviewActions } from "./_components/ReviewActions";

export const metadata: Metadata = { title: "Applications" };

const tabs: { status: ApplicationStatus; label: string }[] = [
  { status: "SUBMITTED", label: "To review" },
  { status: "APPROVED", label: "Approved" },
  { status: "REJECTED", label: "Rejected" },
];

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const session = await requireAdmin();
  const { status: requested } = await searchParams;
  const status = tabs.find((tab) => tab.status === requested)?.status ?? "SUBMITTED";

  const applications = await prisma.missionaryApplication.findMany({
    where: { status },
    orderBy: { submittedAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <DashboardShell label="Admin" user={session.user} title="Missionary applications" subtitle="Review submitted applications. Approved missionaries get access to their portal." links={adminLinks}>
      <nav aria-label="Application status" className="mb-5 flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.status}
            href={`?status=${tab.status}`}
            aria-current={tab.status === status ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium",
              tab.status === status ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <section className="border border-border bg-card">
        {applications.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No applications here.</p>
        ) : (
          <ul className="divide-y divide-border">
            {applications.map((application) => (
              <li key={application.id} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:px-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold">{application.user.name}</h2>
                    {application.status === "SUBMITTED" && <Badge tone="warning">To review</Badge>}
                    {application.status === "APPROVED" && <Badge tone="success">Approved</Badge>}
                    {application.status === "REJECTED" && <Badge tone="danger">Rejected</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{application.user.email} · {application.phone}</p>
                  <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    <div><dt className="inline text-muted-foreground">Location: </dt><dd className="inline">{application.region}, {application.country}</dd></div>
                    <div><dt className="inline text-muted-foreground">Church: </dt><dd className="inline">{application.church}</dd></div>
                    <div><dt className="inline text-muted-foreground">Focus: </dt><dd className="inline">{application.ministryFocus}</dd></div>
                    <div><dt className="inline text-muted-foreground">Years in ministry: </dt><dd className="inline">{application.yearsServing}</dd></div>
                  </dl>
                  <p className="mt-3 text-xs text-subtle-foreground">
                    {application.submittedAt && `Submitted ${formatDate(application.submittedAt)}`}
                    {application.reviewedAt && ` · Reviewed ${formatDate(application.reviewedAt)}`}
                  </p>
                </div>
                {application.status === "SUBMITTED" && (
                  <ReviewActions applicationId={application.id} applicantName={application.user.name} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </DashboardShell>
  );
}
