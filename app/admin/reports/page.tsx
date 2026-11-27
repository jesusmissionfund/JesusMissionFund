import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge } from "@/components/dashboard/Badge";
import {
  Pagination,
  pageNumber,
  pageSize,
} from "@/components/dashboard/Pagination";
import { Tabs } from "@/components/dashboard/Tabs";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { isOverdue } from "@/lib/report-request";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "../links";
import { RequestActions } from "./_components/RequestActions";
import { smallButtonClass } from "@/components/styles";

export const metadata: Metadata = { title: "Reports" };

const tabs = [
  { id: "reports", label: "Reports" },
  { id: "requests", label: "Requests" },
] as const;

const rowClass =
  "flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6";

export default async function AdminReportsPage({
  searchParams,
}: PageProps<"/admin/reports">) {
  const session = await requireAdmin();
  const { tab: requested, page: pageParam } = await searchParams;
  const tab = tabs.find(({ id }) => id === requested)?.id ?? "reports";
  const page = pageNumber(
    typeof pageParam === "string" ? pageParam : undefined,
  );
  const range = { skip: (page - 1) * pageSize, take: pageSize };

  const [reports, requests, total] = await Promise.all([
    tab === "reports"
      ? prisma.missionaryReport.findMany({
          orderBy: { createdAt: "desc" },
          ...range,
          select: {
            id: true,
            title: true,
            createdAt: true,
            requestId: true,
            user: { select: { name: true } },
          },
        })
      : [],
    tab === "requests"
      ? prisma.reportRequest.findMany({
          orderBy: { createdAt: "desc" },
          ...range,
          select: {
            id: true,
            title: true,
            createdAt: true,
            dueDate: true,
            remindedAt: true,
            user: { select: { id: true, name: true } },
            report: { select: { id: true } },
          },
        })
      : [],
    tab === "reports"
      ? prisma.missionaryReport.count()
      : prisma.reportRequest.count(),
  ]);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const empty =
    tab === "reports" ? reports.length === 0 : requests.length === 0;

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Reports"
      subtitle="Reports from missionaries, and the reports you've asked for."
      links={adminLinks}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border">
        <Tabs
          label="Report lists"
          current={tab}
          tabs={tabs.map(({ id, label }) => ({
            id,
            label,
            href: `?tab=${id}`,
          }))}
        />
        <Link
          href="/admin/reports/request"
          className={`${smallButtonClass} mb-2`}
        >
          <Plus aria-hidden="true" className="size-4" />
          Request a report
        </Link>
      </div>

      <section className="border border-border bg-card">
        {empty ? (
          <p className="p-6 text-sm text-muted-foreground">
            {tab === "reports" ? "No reports yet." : "No requests yet."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {reports.map((report) => (
              <li key={report.id}>
                <Link
                  href={`/admin/reports/${report.id}`}
                  className={`${rowClass} hover:bg-muted`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold">{report.title}</span>
                      {report.requestId && <Badge tone="info">Requested</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {report.user.name}
                    </p>
                  </div>
                  <span className="text-xs text-subtle-foreground">
                    Sent {formatDate(report.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
            {requests.map((request) => (
              <li key={request.id} className={rowClass}>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    {request.report ? (
                      <Link
                        href={`/admin/reports/${request.report.id}`}
                        className="font-semibold hover:text-brand"
                      >
                        {request.title}
                      </Link>
                    ) : (
                      <span className="font-semibold">{request.title}</span>
                    )}
                    {request.report ? (
                      <Badge tone="success">Answered</Badge>
                    ) : isOverdue(request) ? (
                      <Badge tone="danger">Overdue</Badge>
                    ) : (
                      <Badge tone="warning">Waiting</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <Link
                      href={`/admin/users/${request.user.id}`}
                      className="hover:text-brand"
                    >
                      {request.user.name}
                    </Link>
                  </p>
                  <p className="mt-1 text-xs text-subtle-foreground">
                    {[
                      `Requested ${formatDate(request.createdAt)}`,
                      request.dueDate && `Due ${formatDate(request.dueDate)}`,
                      request.remindedAt &&
                        `Reminded ${formatDate(request.remindedAt)}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                {!request.report && (
                  <RequestActions
                    requestId={request.id}
                    missionaryName={request.user.name}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <Pagination
        page={page}
        pages={pages}
        total={total}
        noun={tab}
        params={{ tab }}
      />
    </DashboardShell>
  );
}
