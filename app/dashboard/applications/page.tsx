import type { Metadata } from "next";

import { answerSections } from "@/app/(auth)/signup/missionary/schema";
import type { ApplicationStatus } from "@/app/generated/prisma/client";
import { Badge } from "@/components/dashboard/Badge";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../person";

export const metadata: Metadata = { title: "My applications" };

const statuses = {
  SUBMITTED: { label: "Under review", tone: "warning" },
  APPROVED: { label: "Approved", tone: "success" },
  REJECTED: { label: "Not approved", tone: "danger" },
} as const satisfies Partial<Record<ApplicationStatus, object>>;

export default async function MyApplicationsPage() {
  const { session, links } = await requirePerson();

  const applications = await prisma.missionaryApplication.findMany({
    where: { userId: session.user.id, status: { not: "DRAFT" } },
    orderBy: { createdAt: "desc" },
    // reapplyAfter is for admins only.
    omit: { reapplyAfter: true },
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
        <ul className="space-y-5">
          {applications.map((application) => {
            const status =
              statuses[application.status as keyof typeof statuses];
            return (
              <li
                key={application.id}
                className="border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold">
                    {application.submittedAt
                      ? `Submitted ${formatDate(application.submittedAt)}`
                      : "Application"}
                  </h2>
                  <Badge tone={status.tone}>{status.label}</Badge>
                </div>
                {application.reviewedAt && (
                  <p className="mt-1 text-xs text-subtle-foreground">
                    Reviewed {formatDate(application.reviewedAt)}
                  </p>
                )}
                {application.rejectionReason && (
                  <p className="mt-4 whitespace-pre-line border-l-2 border-destructive/40 pl-3 text-sm leading-6 text-muted-foreground">
                    {application.rejectionReason}
                  </p>
                )}
                <details className="mt-5 border-t border-border pt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-brand">
                    Your answers
                  </summary>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {answerSections(application).map((section) => (
                      <section key={section.step}>
                        <h3 className="text-sm font-semibold">
                          {section.title}
                        </h3>
                        <dl className="mt-2 space-y-2 text-sm">
                          {section.rows.map(([label, value]) => (
                            <div key={label}>
                              <dt className="text-subtle-foreground">
                                {label}
                              </dt>
                              <dd>{value ?? "—"}</dd>
                            </div>
                          ))}
                        </dl>
                      </section>
                    ))}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardShell>
  );
}
