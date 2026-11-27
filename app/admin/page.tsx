import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  HandHeart,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "./links";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  const [toReview, missionaries, partners, admins, latest] = await Promise.all([
    prisma.missionaryApplication.count({ where: { status: "SUBMITTED" } }),
    prisma.missionaryApplication.count({ where: { status: "APPROVED" } }),
    prisma.partnerProfile.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "admin" } }),
    prisma.missionaryApplication.findMany({
      where: { status: "SUBMITTED" },
      orderBy: { submittedAt: "asc" },
      take: 5,
      include: { user: { select: { name: true } } },
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
      href: "/admin/applications?status=APPROVED",
    },
    {
      label: "Partners",
      value: partners,
      icon: HandHeart,
      href: "/admin/partners",
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
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
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

        <section className="border border-border bg-card">
          <div className="flex items-end justify-between gap-3 border-b border-border p-5 sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
                Missionary intake
              </p>
              <h2 className="mt-2 text-xl font-semibold">Waiting longest</h2>
            </div>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              All applications{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {latest.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground sm:px-6">
              No applications to review.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {latest.map((application) => (
                <li
                  key={application.id}
                  className="flex flex-wrap items-center justify-between gap-2 p-5 sm:px-6"
                >
                  <div>
                    <p className="font-semibold">{application.user.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {application.region}, {application.country} ·{" "}
                      {application.ministryFocus}
                    </p>
                  </div>
                  {application.submittedAt && (
                    <span className="text-xs text-subtle-foreground">
                      Submitted {formatDate(application.submittedAt)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
