import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ApplicationStatus } from "@/app/generated/prisma/client";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { Badge } from "@/components/dashboard/Badge";
import { Tabs } from "@/components/dashboard/Tabs";
import { adminLinks } from "../links";
import { adminStatuses, type ReviewedStatus } from "./statuses";

export const metadata: Metadata = { title: "Applications" };

const tabs: { status: ApplicationStatus; label: string }[] = [
  { status: "SUBMITTED", label: "To review" },
  { status: "APPROVED", label: "Approved" },
  { status: "REJECTED", label: "Rejected" },
];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await requireAdmin();
  const { status: requested } = await searchParams;
  const status =
    tabs.find((tab) => tab.status === requested)?.status ?? "SUBMITTED";

  const applications = await prisma.missionaryApplication.findMany({
    where: { status },
    orderBy: { submittedAt: "desc" },
    include: { user: { select: { name: true, emailVerified: true } } },
  });

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Missionary applications"
      subtitle="Review submitted applications. Approved missionaries get access to their portal."
      links={adminLinks}
    >
      <div className="mb-5 border-b border-border">
        <Tabs
          label="Application status"
          current={status}
          tabs={tabs.map((tab) => ({
            id: tab.status,
            label: tab.label,
            href: `?status=${tab.status}`,
          }))}
        />
      </div>

      <section className="border border-border bg-card">
        {applications.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No applications here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {applications.map((application) => {
              const status =
                adminStatuses[application.status as ReviewedStatus];
              return (
                <li key={application.id}>
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-muted sm:px-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-semibold">
                          {application.user.name}
                        </h2>
                        <Badge tone={status.tone}>{status.label}</Badge>
                        {!application.user.emailVerified && (
                          <Badge tone="neutral">Email not verified</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {[
                          `${application.region}, ${application.country}`,
                          application.ministryFocus,
                          application.supportNeed,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs text-subtle-foreground">
                      {application.submittedAt &&
                        `Submitted ${formatDate(application.submittedAt)}`}
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
      </section>
    </DashboardShell>
  );
}
