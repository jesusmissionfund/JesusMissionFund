import type { Metadata } from "next";

import { DashboardShell } from "@/app/dashboard/_components/DashboardShell";
import { requireRole } from "@/lib/session";
import { adminLinks } from "../../links";
import { CreateStaffForm } from "../_components/CreateStaffForm";

export const metadata: Metadata = { title: "Add staff member" };

export default async function NewStaffPage() {
  const session = await requireRole("admin");

  return (
    <DashboardShell role="Administrator" user={session.user} title="Add staff member" subtitle="Create an admin account for a JMF staff member. Share the temporary password with them directly." links={adminLinks}>
      <section className="border border-border bg-card p-6 sm:p-8">
        <CreateStaffForm />
      </section>
    </DashboardShell>
  );
}
