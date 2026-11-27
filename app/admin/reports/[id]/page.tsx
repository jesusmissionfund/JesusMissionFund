import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/dashboard/BackLink";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportBody, ReportRequestNote } from "@/components/dashboard/Report";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "../../links";

export const metadata: Metadata = { title: "Report" };

export default async function AdminReportPage({
  params,
}: PageProps<"/admin/reports/[id]">) {
  const session = await requireAdmin();
  const report = await prisma.missionaryReport.findUnique({
    where: { id: (await params).id },
    include: {
      request: true,
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
  });
  if (!report) notFound();

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title={report.title}
      subtitle={`From ${report.user.name} · Sent ${formatDate(report.createdAt)}`}
      links={adminLinks}
    >
      <div className="max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BackLink href="/admin/reports" label="All reports" />
          <Link
            href={`/admin/reports/request?to=${report.user.id}`}
            className="text-sm font-semibold text-brand"
          >
            Request a report from {report.user.name}
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          {[report.user.email, report.user.phone].filter(Boolean).join(" · ")}
        </p>
        {report.request && <ReportRequestNote request={report.request} />}
        <ReportBody>{report.body}</ReportBody>
      </div>
    </DashboardShell>
  );
}
