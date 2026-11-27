import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Badge } from "@/components/dashboard/Badge";
import { BackLink } from "@/components/dashboard/BackLink";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { isOverdue, waitingRequest } from "@/lib/report-request";
import { requireAdmin } from "@/lib/session";
import { PartnerPreferences } from "../../_components/PartnerPreferences";
import {
  adminStatuses,
  type ReviewedStatus,
} from "../../applications/statuses";
import { adminLinks } from "../../links";
import { RequestActions } from "../../reports/_components/RequestActions";
import { UserActions } from "../_components/UserActions";
import { kindsOf, userKinds } from "../kinds";

export const metadata: Metadata = { title: "Person" };

export default async function AdminUserPage({
  params,
}: PageProps<"/admin/users/[id]">) {
  const session = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: (await params).id },
    include: {
      missionaryApplications: {
        where: { status: { not: "DRAFT" } },
        orderBy: { submittedAt: "desc" },
        select: { id: true, status: true, submittedAt: true },
      },
      partnerProfile: true,
      reports: {
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, createdAt: true },
      },
      reportRequests: {
        where: waitingRequest,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, dueDate: true, remindedAt: true },
      },
    },
  });
  if (!user) notFound();
  const kinds = kindsOf(user);

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title={user.name}
      subtitle={`Joined ${formatDate(user.createdAt)}`}
      links={adminLinks}
    >
      <div className="max-w-4xl space-y-6">
        <BackLink href="/admin/users" label="All users" />

        <section className="flex flex-wrap items-start justify-between gap-4 border border-border bg-card p-5 sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {kinds.map((kind) => (
                <Badge key={kind} tone="neutral">
                  {userKinds[kind].label}
                </Badge>
              ))}
              {user.banned && <Badge tone="danger">Banned</Badge>}
              {!user.emailVerified && (
                <Badge tone="neutral">Email not verified</Badge>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {[user.email, user.phone, user.country]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {user.banReason && (
              <p className="mt-2 text-sm text-muted-foreground">
                Ban reason: {user.banReason}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {kinds.includes("missionary") && (
              <Link
                href={`/admin/reports/request?to=${user.id}`}
                className="text-sm font-semibold text-brand"
              >
                Request a report
              </Link>
            )}
            {user.id !== session.user.id && <UserActions user={user} />}
          </div>
        </section>

        {user.missionaryApplications.length > 0 && (
          <List title="Applications">
            {user.missionaryApplications.map((application) => {
              const status =
                adminStatuses[application.status as ReviewedStatus];
              return (
                <Row
                  key={application.id}
                  href={`/admin/applications/${application.id}`}
                  title={
                    application.submittedAt
                      ? `Submitted ${formatDate(application.submittedAt)}`
                      : "Application"
                  }
                  aside={<Badge tone={status.tone}>{status.label}</Badge>}
                />
              );
            })}
          </List>
        )}

        {user.reportRequests.length > 0 && (
          <List title="Report requests waiting">
            {user.reportRequests.map((request) => (
              <li
                key={request.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm sm:px-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{request.title}</span>
                    {isOverdue(request) && <Badge tone="danger">Overdue</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-subtle-foreground">
                    {[
                      request.dueDate && `Due ${formatDate(request.dueDate)}`,
                      request.remindedAt &&
                        `Reminded ${formatDate(request.remindedAt)}`,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "No due date"}
                  </p>
                </div>
                <RequestActions
                  requestId={request.id}
                  missionaryName={user.name}
                />
              </li>
            ))}
          </List>
        )}

        {user.reports.length > 0 && (
          <List title="Reports">
            {user.reports.map((report) => (
              <Row
                key={report.id}
                href={`/admin/reports/${report.id}`}
                title={report.title}
                aside={
                  <span className="text-xs text-subtle-foreground">
                    Sent {formatDate(report.createdAt)}
                  </span>
                }
              />
            ))}
          </List>
        )}

        {user.partnerProfile?.status === "ACTIVE" && (
          <section className="border border-border bg-card p-5 sm:px-6">
            <h2 className="text-sm font-semibold">Partnership</h2>
            <PartnerPreferences partner={user.partnerProfile} />
          </section>
        )}
      </div>
    </DashboardShell>
  );
}

function List({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-border bg-card">
      <h2 className="border-b border-border px-5 py-3 text-sm font-semibold sm:px-6">
        {title}
      </h2>
      <ul className="divide-y divide-border">{children}</ul>
    </section>
  );
}

function Row({
  href,
  title,
  aside,
}: {
  href: string;
  title: string;
  aside: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-muted sm:px-6"
      >
        <span>{title}</span>
        {aside}
      </Link>
    </li>
  );
}
