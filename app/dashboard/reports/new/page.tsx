import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportRequestNote } from "@/components/dashboard/Report";
import { prisma } from "@/lib/prisma";
import { requirePerson } from "../../person";
import { ReportForm } from "./_components/ReportForm";

export const metadata: Metadata = { title: "New report" };

export default async function NewReportPage({
  searchParams,
}: PageProps<"/dashboard/reports/new">) {
  const { session, application, links } = await requirePerson();
  if (application?.status !== "APPROVED") redirect("/dashboard");

  const { request: requestId } = await searchParams;
  const request =
    typeof requestId === "string"
      ? await prisma.reportRequest.findFirst({
          where: { id: requestId, userId: session.user.id },
          include: { report: { select: { id: true } } },
        })
      : null;
  if (requestId && !request) notFound();
  if (request?.report) redirect(`/dashboard/reports/${request.report.id}`);

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title="New report"
      subtitle="Share an update from your field work."
      links={links}
    >
      <div className="max-w-3xl space-y-6">
        {request && <ReportRequestNote request={request} />}
        <section className="border border-border bg-card p-6 sm:p-8">
          <ReportForm
            requestId={request?.id ?? null}
            defaultTitle={request?.title ?? ""}
          />
        </section>
      </div>
    </DashboardShell>
  );
}
