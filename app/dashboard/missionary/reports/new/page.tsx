import { DashboardShell } from "@/app/dashboard/_components/DashboardShell";
import MissionaryReportForm from "./_components/MissionaryReportForm";
import { redirect } from "next/navigation";
import { requireMissionary } from "../../require-missionary";

const links = [
  { label: "Overview", href: "/dashboard/missionary" },
  { label: "My profile", href: "/dashboard/missionary#profile" },
  { label: "My reports", href: "/dashboard/missionary#reports" },
  { label: "Submit a report", href: "/dashboard/missionary/reports/new" },
];

export default async function NewMissionaryReportPage() {
  const { session, application } = await requireMissionary();
  if (application.status !== "APPROVED") redirect("/dashboard/missionary");

  return <DashboardShell role="Missionary" user={session.user} preview title="Monthly ministry report" subtitle="Share a clear update from your field work. Required details are marked on each field." links={links}><MissionaryReportForm /></DashboardShell>;
}
