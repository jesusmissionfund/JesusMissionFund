import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge } from "@/components/dashboard/Badge";
import { Tabs } from "@/components/dashboard/Tabs";
import {
  Pagination,
  pageNumber,
  pageSize,
} from "@/components/dashboard/Pagination";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { cn } from "cn";
import { adminLinks } from "../links";

export const metadata: Metadata = { title: "Reports" };

const tabs = [
  { id: "reports", label: "Reports" },
  { id: "requests", label: "Requests" },
] as const;

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

  const [rows, total] =
    tab === "reports"
      ? await Promise.all([
          prisma.missionaryReport
            .findMany({
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
            .then((reports) =>
              reports.map((report) => ({
                key: report.id,
                href: `/admin/reports/${report.id}`,
                title: report.title,
                name: report.user.name,
                meta: `Sent ${formatDate(report.createdAt)}`,
                badge: report.requestId
                  ? { tone: "info" as const, label: "Requested" }
                  : null,
              })),
            ),
          prisma.missionaryReport.count(),
        ])
      : await Promise.all([
          prisma.reportRequest
            .findMany({
              orderBy: { createdAt: "desc" },
              ...range,
              select: {
                id: true,
                title: true,
                createdAt: true,
                dueDate: true,
                user: { select: { name: true } },
                report: { select: { id: true } },
              },
            })
            .then((requests) =>
              requests.map((request) => ({
                key: request.id,
                href: request.report
                  ? `/admin/reports/${request.report.id}`
                  : null,
                title: request.title,
                name: request.user.name,
                meta: [
                  `Requested ${formatDate(request.createdAt)}`,
                  request.dueDate && `Due ${formatDate(request.dueDate)}`,
                ]
                  .filter(Boolean)
                  .join(" · "),
                badge: request.report
                  ? { tone: "success" as const, label: "Answered" }
                  : { tone: "warning" as const, label: "Waiting" },
              })),
            ),
          prisma.reportRequest.count(),
        ]);
  const pages = Math.max(1, Math.ceil(total / pageSize));

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
          className="mb-2 inline-flex h-10 items-center gap-2 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus aria-hidden="true" className="size-4" />
          Request a report
        </Link>
      </div>

      <section className="border border-border bg-card">
        {rows.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            {tab === "reports" ? "No reports yet." : "No requests yet."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((row) => {
              const content = (
                <>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold">{row.title}</span>
                      {row.badge && (
                        <Badge tone={row.badge.tone}>{row.badge.label}</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.name}
                    </p>
                  </div>
                  <span className="text-xs text-subtle-foreground">
                    {row.meta}
                  </span>
                </>
              );
              const className =
                "flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6";
              return (
                <li key={row.key}>
                  {row.href ? (
                    <Link
                      href={row.href}
                      className={cn(className, "hover:bg-muted")}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </li>
              );
            })}
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
