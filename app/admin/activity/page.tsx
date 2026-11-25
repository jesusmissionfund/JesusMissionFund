import type { Metadata } from "next";
import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDateTime } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { auditLabels } from "../audit";
import { adminLinks } from "../links";

export const metadata: Metadata = { title: "Activity" };

const pageSize = 50;

export default async function ActivityPage({
  searchParams,
}: PageProps<"/admin/activity">) {
  const session = await requireAdmin();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(String(pageParam ?? "1"), 10) || 1);

  const [entries, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.auditLog.count(),
  ]);
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Activity"
      subtitle="Who did what in the admin area, newest first."
      links={adminLinks}
    >
      <section className="border border-border bg-card">
        {entries.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            Nothing recorded yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  What
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-3 font-semibold md:table-cell"
                >
                  By
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  When
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-5 py-3">
                    <span className="font-semibold">
                      {auditLabels[entry.action]}
                    </span>
                    : {entry.targetName}
                    {entry.note && (
                      <span className="block text-muted-foreground">
                        {entry.note}
                      </span>
                    )}
                    <span className="block text-muted-foreground md:hidden">
                      by {entry.actorEmail}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 text-muted-foreground md:table-cell">
                    {entry.actorEmail}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">
                    {formatDateTime(entry.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {pages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-5 flex items-center justify-between text-sm"
        >
          <span className="text-muted-foreground">
            Page {page} of {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="border border-input bg-card px-3 py-2 font-semibold text-brand hover:bg-muted"
              >
                Previous
              </Link>
            )}
            {page < pages && (
              <Link
                href={`?page=${page + 1}`}
                className="border border-input bg-card px-3 py-2 font-semibold text-brand hover:bg-muted"
              >
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </DashboardShell>
  );
}
