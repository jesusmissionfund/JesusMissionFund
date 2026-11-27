import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requirePerson } from "../person";
import { EmailForm, NameForm } from "./_components/AccountForms";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import { DetailsForm } from "./_components/DetailsForm";

export const metadata: Metadata = { title: "My details" };

export default async function DetailsPage() {
  const { session, details, links } = await requirePerson();

  return (
    <DashboardShell
      label="My dashboard"
      user={session.user}
      title="My details"
      subtitle="How can our team reach you?"
      links={links}
    >
      <section className="border border-border bg-card p-6 sm:p-8">
        <h2 className="mb-5 text-xl font-semibold">Phone and country</h2>
        <DetailsForm
          defaultValues={{
            phone: details.phone ?? "",
            country: details.country ?? "",
          }}
        />
      </section>
      <section className="mt-5 grid gap-8 border border-border bg-card p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-5 text-xl font-semibold">Name</h2>
          <NameForm name={session.user.name} />
        </div>
        <div>
          <h2 className="mb-5 text-xl font-semibold">Email</h2>
          <EmailForm email={session.user.email} />
        </div>
      </section>
      <section className="mt-5 border border-border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Password</h2>
        <ChangePasswordForm />
      </section>
    </DashboardShell>
  );
}
