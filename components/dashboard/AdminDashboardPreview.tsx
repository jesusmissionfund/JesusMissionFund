"use client";

import { useState } from "react";
import { ArrowRight, Check, Clock3, FileText, Users } from "lucide-react";

type ReviewStatus = "Pending" | "Approved" | "Declined" | "Needs information" | "Reviewed";

const initialApplications = [
  { id: "JMF-1042", name: "Samuel A.", field: "Northern Ghana", focus: "Evangelism", submitted: "Today", status: "Pending" as ReviewStatus },
  { id: "JMF-1041", name: "Grace M.", field: "Central Region", focus: "Discipleship", submitted: "Yesterday", status: "Pending" as ReviewStatus },
  { id: "JMF-1038", name: "Peter K.", field: "Eastern Region", focus: "Youth outreach", submitted: "Oct 28", status: "Needs information" as ReviewStatus },
];

const initialReports = [
  { id: "RPT-2207", name: "Samuel A.", period: "October 2026", field: "Northern Ghana", status: "Pending" as ReviewStatus },
  { id: "RPT-2204", name: "Grace M.", period: "October 2026", field: "Central Region", status: "Pending" as ReviewStatus },
];

function Status({ children }: { children: ReviewStatus }) {
  const styles: Record<ReviewStatus, string> = {
    Pending: "bg-warning-muted text-warning",
    Approved: "bg-secondary text-brand",
    Declined: "bg-destructive-muted text-destructive",
    "Needs information": "bg-info-muted text-info",
    Reviewed: "bg-secondary text-brand",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[children]}`}>{children}</span>;
}

export default function AdminDashboardPreview() {
  const [applications, setApplications] = useState(initialApplications);
  const [reports, setReports] = useState(initialReports);
  const pendingCount = applications.filter((item) => item.status === "Pending").length;
  const pendingReports = reports.filter((item) => item.status === "Pending").length;

  function updateApplication(id: string, status: ReviewStatus) {
    setApplications((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Dashboard summary">
        {[
          { label: "Applications to review", value: String(pendingCount), icon: Users },
          { label: "Reports to review", value: String(pendingReports), icon: FileText },
          { label: "Active missionaries", value: "18", icon: Users },
          { label: "New partner interests", value: "7", icon: Clock3 },
        ].map(({ label, value, icon: Icon }) => <article key={label} className="border border-border bg-card p-5"><span className="flex items-center justify-between text-sm text-muted-foreground">{label}<Icon aria-hidden="true" className="h-4 w-4 text-brand-muted" /></span><p className="mt-4 text-3xl font-semibold text-foreground">{value}</p></article>)}
      </section>

      <section id="applications" className="scroll-mt-28 border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:px-6"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Missionary intake</p><h2 className="mt-2 text-xl font-semibold">Applications</h2></div><button type="button" className="w-fit text-sm font-semibold text-brand">View all <ArrowRight aria-hidden="true" className="inline h-4 w-4" /></button></div>
        <div className="divide-y divide-border">
          {applications.map((item) => <article key={item.id} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold">{item.name}</h3><Status>{item.status}</Status><span className="text-xs text-subtle-foreground">{item.id}</span></div><p className="mt-2 text-sm text-muted-foreground">{item.field} · {item.focus} · submitted {item.submitted}</p><details className="mt-3"><summary className="w-fit cursor-pointer text-xs font-semibold text-brand">Review application details</summary><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Sample preview: ministry overview, current practical need, estimated cost, and reference details appear here for administrator review.</p><div className="mt-3 flex flex-wrap gap-2"><button onClick={() => updateApplication(item.id, "Approved")} type="button" className="inline-flex items-center gap-2 bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Check aria-hidden="true" className="h-3.5 w-3.5" />Approve</button><button onClick={() => updateApplication(item.id, "Needs information")} type="button" className="border border-input px-3 py-2 text-xs font-semibold text-muted-foreground">Request information</button><button onClick={() => updateApplication(item.id, "Declined")} type="button" className="border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive">Decline</button></div></details></div><span className="hidden text-xs text-subtle-foreground sm:block">Updated recently</span></article>)}
        </div>
      </section>

      <section id="reports" className="scroll-mt-28 border border-border bg-card">
        <div className="border-b border-border p-5 sm:px-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Field updates</p><h2 className="mt-2 text-xl font-semibold">Missionary reports</h2></div>
        <div className="divide-y divide-border">{reports.map((report) => <article key={report.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold">{report.name}</h3><Status>{report.status}</Status></div><p className="mt-2 text-sm text-muted-foreground">{report.field} · {report.period} · {report.id}</p></div><button type="button" onClick={() => setReports((items) => items.map((item) => item.id === report.id ? { ...item, status: "Reviewed" } : item))} className="w-fit border border-input px-4 py-2 text-xs font-semibold text-brand">Mark reviewed</button></article>)}</div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section id="volunteers" className="scroll-mt-28 border border-border bg-card p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Community</p><h2 className="mt-2 text-xl font-semibold">Volunteer applications</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Review volunteer skills, availability, and areas of interest. Sample queue: 4 new submissions.</p><button type="button" className="mt-4 text-sm font-semibold text-brand">Open volunteer queue <ArrowRight aria-hidden="true" className="inline h-4 w-4" /></button></section>
        <section id="partners" className="scroll-mt-28 border border-border bg-card p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Giving community</p><h2 className="mt-2 text-xl font-semibold">Partner registrations</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">View partner contact preferences and follow up on recurring giving. Sample queue: 7 new interests.</p><button type="button" className="mt-4 text-sm font-semibold text-brand">Open partner queue <ArrowRight aria-hidden="true" className="inline h-4 w-4" /></button></section>
      </div>
    </div>
  );
}
