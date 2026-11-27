import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { toDateInput } from "@/lib/format";
import { reachableMissionary } from "@/lib/missionary-application";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { adminLinks } from "../../links";
import { allMissionaries } from "../schema";
import { RequestReportForm } from "./_components/RequestReportForm";

export const metadata: Metadata = { title: "Request a report" };

export default async function RequestReportPage({
  searchParams,
}: PageProps<"/admin/reports/request">) {
  const session = await requireAdmin();
  const { to } = await searchParams;

  const missionaries = await prisma.user.findMany({
    where: reachableMissionary,
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  const defaultRecipient =
    typeof to === "string" && missionaries.some(({ id }) => id === to)
      ? to
      : allMissionaries;

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Request a report"
      subtitle="Ask one missionary, or every approved missionary, for a report. Each one gets an email."
      links={adminLinks}
    >
      <section className="border border-border bg-card p-6 sm:p-8">
        <RequestReportForm
          missionaries={missionaries}
          defaultRecipient={defaultRecipient}
          today={toDateInput(new Date())}
        />
      </section>
    </DashboardShell>
  );
}
