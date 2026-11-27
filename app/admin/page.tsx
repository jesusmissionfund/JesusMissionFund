import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlarmClock,
  ArrowRight,
  ClipboardList,
  FileText,
  HandHeart,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { overdueRequest, waitingRequest } from "@/lib/report-request";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "./links";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  const [
    toReview,
    missionaries,
    partners,
    admins,
    waiting,
    overdue,
    applications,
    reports,
  ] = await Promise.all([
    prisma.missionaryApplication.count({ where: { status: "SUBMITTED" } }),
    prisma.missionaryApplication.count({ where: { status: "APPROVED" } }),
    prisma.partnerProfile.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "admin" } }),
    prisma.reportRequest.count({ where: waitingRequest }),
    prisma.reportRequest.count({ where: overdueRequest() }),
    prisma.missionaryApplication.findMany({
      where: { status: "SUBMITTED" },
      orderBy: { submittedAt: "asc" },
      take: 5,
      include: { user: { select: { name: true } } },
    }),
    prisma.missionaryReport.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    }),
  ]);

  const stats = [
    {
      label: "Applications to review",
      value: toReview,
      icon: ClipboardList,
      href: "/admin/applications",
    },
    {
      label: "Approved missionaries",
      value: missionaries,
      icon: UserRound,
      href: "/admin/users?type=missionary",
    },
    {
      label: "Partners",
      value: partners,
      icon: HandHeart,
      href: "/admin/partners",
    },
    {
      label: "Report requests waiting",
      value: waiting,
      icon: FileText,
      href: "/admin/reports?tab=requests",
    },
    {
      label: "Report requests overdue",
      value: overdue,
      icon: AlarmClock,
      href: "/admin/reports?tab=requests",
    },
    {
      label: "Admin accounts",
      value: admins,
      icon: ShieldCheck,
      href: "/admin/users?type=admin",
    },
  ];

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Overview"
      subtitle="Review applications and manage the people using the platform."
      links={adminLinks}
    >
      <div className="space-y-8">
        <section
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          aria-label="Summary"
        >
          {stats.map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="border border-border bg-card p-5 transition-colors hover:border-input"
            >
              <span className="flex items-center justify-between text-sm text-muted-foreground">
                {label}
                <Icon aria-hidden="true" className="size-4 text-brand-muted" />
              </span>
              <p className="mt-4 text-3xl font-semibold text-foreground">
                {value}
              </p>
            </Link>
          ))}
        </section>

        <div className="grid gap-8 xl:grid-cols-2">
          <Panel
            eyebrow="Missionary intake"
            title="Waiting longest"
            link={{ href: "/admin/applications", label: "All applications" }}
            empty="No applications to review."
            rows={applications.map((application) => ({
              key: application.id,
              href: `/admin/applications/${application.id}`,
              title: application.user.name,
              detail: `${application.region}, ${application.country} · ${application.ministryFocus}`,
              meta:
                application.submittedAt &&
                `Submitted ${formatDate(application.submittedAt)}`,
            }))}
          />
          <Panel
            eyebrow="Reports"
            title="Latest reports"
            link={{ href: "/admin/reports", label: "All reports" }}
            empty="No reports yet."
            rows={reports.map((report) => ({
              key: report.id,
              href: `/admin/reports/${report.id}`,
              title: report.title,
              detail: report.user.name,
              meta: `Sent ${formatDate(report.createdAt)}`,
            }))}
          />
        </div>
      </div>
    </DashboardShell>
  );
}

function Panel({
  eyebrow,
  title,
  link,
  empty,
  rows,
}: {
  eyebrow: string;
  title: string;
  link: { href: string; label: string };
  empty: string;
  rows: {
    key: string;
    href: string;
    title: string;
    detail: string;
    meta: ReactNode;
  }[];
}) {
  return (
    <section className="border border-border bg-card">
      <div className="flex items-end justify-between gap-3 border-b border-border p-5 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold">{title}</h2>
        </div>
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
        >
          {link.label} <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="p-5 text-sm text-muted-foreground sm:px-6">{empty}</p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((row) => (
            <li key={row.key}>
              <Link
                href={row.href}
                className="flex flex-wrap items-center justify-between gap-2 p-5 hover:bg-muted sm:px-6"
              >
                <div>
                  <p className="font-semibold">{row.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.detail}
                  </p>
                </div>
                {row.meta && (
                  <span className="text-xs text-subtle-foreground">
                    {row.meta}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
