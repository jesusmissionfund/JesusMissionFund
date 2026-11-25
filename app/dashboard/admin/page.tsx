import DashboardShell from "../../../components/dashboard/DashboardShell";
import AdminDashboardPreview from "../../../components/dashboard/AdminDashboardPreview";

const links = [
  { label: "Overview", href: "/dashboard/admin" },
  { label: "Applications", href: "/dashboard/admin#applications" },
  { label: "Reports", href: "/dashboard/admin#reports" },
  { label: "Volunteers", href: "/dashboard/admin#volunteers" },
  { label: "Partners", href: "/dashboard/admin#partners" },
];

export default function AdminDashboardPage() {
  return <DashboardShell role="Administrator" name="Admin User" title="Good morning." subtitle="Review applications, follow ministry updates, and keep community registrations moving." links={links}><AdminDashboardPreview /></DashboardShell>;
}
