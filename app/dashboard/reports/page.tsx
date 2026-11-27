import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../person";

export const metadata: Metadata = { title: "Reports" };

export default async function ReportsPage() {
  const { session, application, openRequests, links } = await requirePerson();
  if (application?.status !== "APPROVED") redirect("/dashboard");

  const reports = await prisma.missionaryReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true, requestId: true },
  });

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title="Reports"
      subtitle="Updates from your field work, and reports Jesus' Mission Fund has asked for."
      links={links}
    >
      <div className="space-y-6">
        <Link
          href="/dashboard/reports/new"
          className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus aria-hidden="true" className="size-4" />
          New report
        </Link>

        {openRequests.length > 0 && (
          <section className="border border-border bg-card">
            <h2 className="border-b border-border p-5 text-xl font-semibold sm:px-6">
              Requested
            </h2>
            <ul className="divide-y divide-border">
              {openRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6"
                >
                  <div>
                    <p className="font-medium">{request.title}</p>
                    {request.dueDate && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Due {formatDate(request.dueDate)}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/dashboard/reports/new?request=${request.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
                  >
                    Respond <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border border-border bg-card">
          <h2 className="border-b border-border p-5 text-xl font-semibold sm:px-6">
            Sent
          </h2>
          {reports.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground sm:px-6">
              You haven&apos;t sent a report yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {reports.map((report) => (
                <li key={report.id}>
                  <Link
                    href={`/dashboard/reports/${report.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 p-5 hover:bg-muted sm:px-6"
                  >
                    <span className="font-medium">{report.title}</span>
                    <span className="text-xs text-subtle-foreground">
                      {report.requestId && "Requested · "}
                      {formatDate(report.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
