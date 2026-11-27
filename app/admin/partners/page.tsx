import type { Metadata } from "next";
import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  Pagination,
  pageNumber,
  pageSize,
} from "@/components/dashboard/Pagination";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { PartnerPreferences } from "../_components/PartnerPreferences";
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
                <Link
                  href={`/admin/users/${partner.userId}`}
                  className="font-semibold hover:text-brand"
                >
                  {partner.user.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[partner.user.email, partner.user.phone]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <PartnerPreferences partner={partner} />
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
