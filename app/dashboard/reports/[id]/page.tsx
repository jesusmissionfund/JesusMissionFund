import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/dashboard/BackLink";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportBody, ReportRequestNote } from "@/components/dashboard/Report";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../../person";

export const metadata: Metadata = { title: "Report" };

export default async function ReportPage({
  params,
}: PageProps<"/dashboard/reports/[id]">) {
  const { session, links } = await requirePerson();
  const report = await prisma.missionaryReport.findFirst({
    where: { id: (await params).id, userId: session.user.id },
    include: { request: true },
  });
  if (!report) notFound();

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title={report.title}
      subtitle={`Sent ${formatDate(report.createdAt)}`}
      links={links}
    >
      <div className="max-w-3xl space-y-6">
        <BackLink href="/dashboard/reports" label="All reports" />
        {report.request && <ReportRequestNote request={report.request} />}
        <ReportBody>{report.body}</ReportBody>
      </div>
    </DashboardShell>
  );
}
