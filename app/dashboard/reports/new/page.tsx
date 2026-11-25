import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requirePerson } from "../../person";
import MissionaryReportForm from "./_components/MissionaryReportForm";

export const metadata: Metadata = { title: "Monthly ministry report" };

export default async function NewMissionaryReportPage() {
  const { session, application, links } = await requirePerson();
  if (application?.status !== "APPROVED") redirect("/dashboard");

  return (
    <DashboardShell label="My dashboard" user={session.user} preview title="Monthly ministry report" subtitle="Share a clear update from your field work. Required details are marked on each field." links={links}>
      <MissionaryReportForm />
    </DashboardShell>
  );
}
