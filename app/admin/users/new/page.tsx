import type { Metadata } from "next";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/session";
import { adminLinks } from "../../links";
import { CreateAdminForm } from "../_components/CreateAdminForm";

export const metadata: Metadata = { title: "Add admin account" };

export default async function NewAdminPage() {
  const session = await requireRole("admin");

  return (
    <DashboardShell label="Admin" user={session.user} title="Add admin account" subtitle="Create an admin account for running the platform. Share the temporary password with the person who will use it." links={adminLinks}>
      <section className="border border-border bg-card p-6 sm:p-8">
        <CreateAdminForm />
      </section>
    </DashboardShell>
  );
}
