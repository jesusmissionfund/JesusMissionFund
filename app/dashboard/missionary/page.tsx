import Link from "next/link";
import { ArrowRight, ClipboardCheck, FilePlus2, MapPin } from "lucide-react";
import DashboardShell from "../../../components/dashboard/DashboardShell";

const links = [
  { label: "Overview", href: "/dashboard/missionary" },
  { label: "My profile", href: "#profile" },
  { label: "My reports", href: "#reports" },
  { label: "Submit a report", href: "/dashboard/missionary/reports/new" },
];

export default function MissionaryDashboardPage() {
  return (
    <DashboardShell role="Missionary" name="Samuel A." title="Welcome back, Samuel." subtitle="A place to keep your ministry details current and share updates with the team." links={links}>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-5">
          <section className="border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Application status</p><h2 className="mt-3 text-2xl font-semibold">Approved missionary</h2><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin aria-hidden="true" className="h-4 w-4" />Northern Ghana</p></div><span className="w-fit rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-brand">Active</span></div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">Your profile is ready. Keep your ministry information current and submit regular updates so the team can follow your work.</p>
            <Link href="#profile" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">View my profile <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </section>

          <section id="reports" className="scroll-mt-28 border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border p-5 sm:px-6"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Ministry updates</p><h2 className="mt-2 text-xl font-semibold">Recent reports</h2></div><Link href="/dashboard/missionary/reports/new" className="hidden items-center gap-2 bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground sm:inline-flex"><FilePlus2 aria-hidden="true" className="h-4 w-4" />New report</Link></div>
            <div className="divide-y divide-border">
              {[
                { period: "October 2026", status: "Submitted", date: "Nov 2, 2026" },
                { period: "September 2026", status: "Reviewed", date: "Oct 3, 2026" },
              ].map((report) => <div key={report.period} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div><p className="font-semibold">{report.period} ministry report</p><p className="mt-1 text-xs text-subtle-foreground">Submitted {report.date}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${report.status === "Reviewed" ? "bg-secondary text-brand" : "bg-warning-muted text-warning"}`}>{report.status}</span></div>)}
            </div>
            <Link href="/dashboard/missionary/reports/new" className="inline-flex items-center gap-2 p-5 text-sm font-semibold text-brand sm:px-6">View all reports <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="border border-border bg-card p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Next step</p><h2 className="mt-3 text-xl font-semibold">Share this month&apos;s update.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us what happened in the field, what changed, and where you need prayer.</p><Link href="/dashboard/missionary/reports/new" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">Submit a ministry report <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
          <section id="profile" className="scroll-mt-28 border border-border bg-card p-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center bg-secondary text-brand"><ClipboardCheck aria-hidden="true" className="h-4 w-4" /></span><h2 className="font-semibold">Profile checklist</h2></div><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li className="flex justify-between">Contact details <span className="font-medium text-brand">Complete</span></li><li className="flex justify-between">Ministry overview <span className="font-medium text-brand">Complete</span></li><li className="flex justify-between">Reference contact <span className="font-medium text-brand">Complete</span></li></ul><button type="button" className="mt-5 text-sm font-semibold text-brand">Edit profile <ArrowRight aria-hidden="true" className="inline h-4 w-4" /></button></section>
        </aside>
      </div>
      <Link href="/dashboard/missionary/reports/new" className="fixed bottom-5 right-5 z-30 inline-flex h-12 items-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg sm:hidden"><FilePlus2 aria-hidden="true" className="h-4 w-4" />New report</Link>
    </DashboardShell>
  );
}
