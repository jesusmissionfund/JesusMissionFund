import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  Pagination,
  pageNumber,
  pageSize,
} from "@/components/dashboard/Pagination";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "../links";

export const metadata: Metadata = { title: "Partners" };

const where = { status: "ACTIVE" } as const;

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireAdmin();
  const page = pageNumber((await searchParams).page);

  const [partners, total] = await Promise.all([
    prisma.partnerProfile.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { user: { select: { name: true, email: true, phone: true } } },
    }),
    prisma.partnerProfile.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Partners"
      subtitle="How each partner would like to give, and what they'd like to support."
      links={adminLinks}
    >
      <section className="border border-border bg-card">
        {partners.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No partners yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {partners.map((partner) => (
              <li key={partner.id} className="p-5 sm:px-6">
                <h2 className="font-semibold">{partner.user.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[partner.user.email, partner.user.phone]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
                  {[
                    ["Frequency", partner.frequency],
                    ["Amount", partner.amount],
                    ["Support", partner.supportInterest],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="inline text-muted-foreground">
                        {label}:{" "}
                      </dt>
                      <dd className="inline">{value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
                {partner.message && (
                  <p className="mt-3 whitespace-pre-line border-l-2 border-border pl-3 text-sm text-muted-foreground">
                    {partner.message}
                  </p>
                )}
                <p className="mt-3 text-xs text-subtle-foreground">
                  Updated {formatDate(partner.updatedAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Pagination
        page={page}
        pages={pages}
        total={total}
        noun="partners"
        params={{}}
      />
    </DashboardShell>
  );
}
