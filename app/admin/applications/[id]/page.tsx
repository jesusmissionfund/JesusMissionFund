import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplicationAnswers } from "@/components/dashboard/ApplicationAnswers";
import { Badge } from "@/components/dashboard/Badge";
import { BackLink } from "@/components/dashboard/BackLink";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate, toDateInput } from "@/lib/format";
import {
  currentApplication,
  tomorrowAsDateInput,
} from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "../../links";
import { ReapplyControl } from "../_components/ReapplyControl";
import { ReviewActions } from "../_components/ReviewActions";
import { adminStatuses, type ReviewedStatus } from "../statuses";

export const metadata: Metadata = { title: "Application" };

export default async function AdminApplicationPage({
  params,
}: PageProps<"/admin/applications/[id]">) {
  const session = await requireAdmin();
  const application = await prisma.missionaryApplication.findUnique({
    where: { id: (await params).id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          emailVerified: true,
          missionaryApplications: {
            where: { status: { not: "DRAFT" } },
            orderBy: { submittedAt: "desc" },
            select: { id: true, status: true, submittedAt: true },
          },
        },
      },
    },
  });
  if (!application || application.status === "DRAFT") notFound();

  const [current] = await prisma.missionaryApplication.findMany({
    where: { userId: application.userId },
    ...currentApplication,
    select: { id: true },
  });
  const { user } = application;
  const status = adminStatuses[application.status as ReviewedStatus];
  const others = user.missionaryApplications.filter(
    ({ id }) => id !== application.id,
  );
  const minReapplyDate = tomorrowAsDateInput();

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title={user.name}
      subtitle="Missionary application"
      links={adminLinks}
    >
      <div className="max-w-4xl space-y-6">
        <BackLink
          href={`/admin/applications?status=${application.status}`}
          label="All applications"
        />

        <section className="grid gap-4 border border-border bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={status.tone}>{status.label}</Badge>
              {!user.emailVerified && (
                <Badge tone="neutral">Email not verified</Badge>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {user.email} · {application.phone} ·{" "}
              <Link
                href={`/admin/users/${application.userId}`}
                className="font-semibold text-brand"
              >
                View profile
              </Link>
            </p>
            <p className="mt-1 text-xs text-subtle-foreground">
              {application.submittedAt &&
                `Submitted ${formatDate(application.submittedAt)}`}
              {application.reviewedAt &&
                ` · Reviewed ${formatDate(application.reviewedAt)}`}
            </p>
            {application.rejectionReason && (
              <p className="mt-4 whitespace-pre-line border-l-2 border-destructive/40 pl-3 text-sm text-muted-foreground">
                {application.rejectionReason}
              </p>
            )}
          </div>
          {application.status === "SUBMITTED" && (
            <ReviewActions
              applicationId={application.id}
              applicantName={user.name}
              minReapplyDate={minReapplyDate}
            />
          )}
          {application.status === "REJECTED" &&
            current?.id === application.id && (
              <ReapplyControl
                applicationId={application.id}
                applicantName={user.name}
                minReapplyDate={minReapplyDate}
                reapplyAfter={
                  application.reapplyAfter
                    ? toDateInput(application.reapplyAfter)
                    : undefined
                }
                label={
                  application.reapplyAfter &&
                  application.reapplyAfter > new Date()
                    ? `Can apply again from ${formatDate(application.reapplyAfter)}`
                    : "Can apply again now"
                }
              />
            )}
        </section>

        <ApplicationAnswers answers={application} />

        {others.length > 0 && (
          <section className="border border-border bg-card">
            <h2 className="border-b border-border px-5 py-3 text-sm font-semibold sm:px-6">
              Other applications from {user.name}
            </h2>
            <ul className="divide-y divide-border">
              {others.map((other) => {
                const otherStatus =
                  adminStatuses[other.status as ReviewedStatus];
                return (
                  <li key={other.id}>
                    <Link
                      href={`/admin/applications/${other.id}`}
                      className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-muted sm:px-6"
                    >
                      <span>
                        {other.submittedAt
                          ? `Submitted ${formatDate(other.submittedAt)}`
                          : "Application"}
                      </span>
                      <Badge tone={otherStatus.tone}>{otherStatus.label}</Badge>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
