import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requirePerson } from "../person";
import { DetailsForm } from "./_components/DetailsForm";

export const metadata: Metadata = { title: "My details" };

export default async function DetailsPage() {
  const { session, details, links } = await requirePerson();

  return (
    <DashboardShell label="My dashboard" user={session.user} title="My details" subtitle="How can our team reach you?" links={links}>
      <section className="border border-border bg-card p-6 sm:p-8">
        <dl className="mb-6 grid max-w-xl gap-3 border-b border-border pb-6 text-sm sm:grid-cols-2">
          <div><dt className="text-subtle-foreground">Full name</dt><dd className="mt-1 font-medium">{session.user.name}</dd></div>
          <div><dt className="text-subtle-foreground">Email address</dt><dd className="mt-1 font-medium">{session.user.email}</dd></div>
        </dl>
        <DetailsForm defaultValues={{ phone: details.phone ?? "", country: details.country ?? "" }} />
      </section>
    </DashboardShell>
  );
}
