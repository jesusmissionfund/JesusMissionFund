import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { steps } from "@/app/(auth)/signup/partner/schema";
import { requirePerson } from "../person";
import { PartnershipForm } from "./_components/PartnershipForm";
import { toPartnership } from "./schema";

export const metadata: Metadata = { title: "Your partnership" };

export default async function PartnershipPage() {
  const { session, partner, links } = await requirePerson();
  const active = partner?.status === "ACTIVE";

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title={steps[1].title}
      subtitle={steps[1].description}
      links={links}
    >
      <section className="border border-border bg-card p-6 sm:p-8">
        <PartnershipForm defaultValues={toPartnership(partner)} submitLabel={active ? "Save changes" : "Continue as a partner"} />
      </section>
    </DashboardShell>
  );
}
