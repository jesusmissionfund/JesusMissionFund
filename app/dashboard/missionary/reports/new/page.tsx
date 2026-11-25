import DashboardShell from "../../../../../components/dashboard/DashboardShell";
import MissionaryReportForm from "../../../../../components/dashboard/MissionaryReportForm";

const links = [
  { label: "Overview", href: "/dashboard/missionary" },
  { label: "My profile", href: "/dashboard/missionary#profile" },
  { label: "My reports", href: "/dashboard/missionary#reports" },
  { label: "Submit a report", href: "/dashboard/missionary/reports/new" },
];

export default function NewMissionaryReportPage() {
  return <DashboardShell role="Missionary" name="Samuel A." title="Monthly ministry report" subtitle="Share a clear update from your field work. Required details are marked on each field." links={links}><MissionaryReportForm /></DashboardShell>;
}
