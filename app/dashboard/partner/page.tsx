import Link from "next/link";
import { ArrowRight, CalendarDays, HeartHandshake, ReceiptText } from "lucide-react";
import DashboardShell from "../../../components/dashboard/DashboardShell";

const links = [
  { label: "Overview", href: "/dashboard/partner" },
  { label: "Giving history", href: "#giving-history" },
  { label: "My details", href: "#details" },
];

export default function PartnerDashboardPage() {
  return (
    <DashboardShell role="Giving partner" name="Alex D." title="Thank you for standing with the mission." subtitle="A future partner portal can keep your giving preferences, receipts, and updates together." links={links}>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <section className="border border-border bg-card p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Partner status</p><h2 className="mt-3 text-2xl font-semibold">Giving partner</h2><p className="mt-2 text-sm text-muted-foreground">Together, we help practical support reach missionaries.</p></div><HeartHandshake aria-hidden="true" className="h-6 w-6 text-brand" /></div><div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-[0.12em] text-subtle-foreground">Preferred frequency</p><p className="mt-2 font-semibold">Monthly</p></div><div><p className="text-xs uppercase tracking-[0.12em] text-subtle-foreground">Giving method</p><p className="mt-2 font-semibold">Mobile money</p></div></div></section>
          <section id="giving-history" className="scroll-mt-28 border border-border bg-card">
            <div className="border-b border-border p-5 sm:px-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Your activity</p><h2 className="mt-2 text-xl font-semibold">Giving history</h2></div>
            <div className="divide-y divide-border">{[{ date: "Oct 12, 2026", amount: "GH₵100", reference: "•••• 4812" }, { date: "Sep 12, 2026", amount: "GH₵100", reference: "•••• 3490" }, { date: "Aug 12, 2026", amount: "GH₵100", reference: "•••• 2264" }].map((gift) => <div key={gift.reference} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center bg-accent text-brand"><ReceiptText aria-hidden="true" className="h-4 w-4" /></span><div><p className="text-sm font-semibold">{gift.amount} · Monthly gift</p><p className="mt-1 text-xs text-subtle-foreground">{gift.date} · Ref {gift.reference}</p></div></div><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-brand">Recorded</span></div>)}</div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="border border-border bg-card p-6"><span className="flex h-10 w-10 items-center justify-center bg-secondary text-brand"><CalendarDays aria-hidden="true" className="h-5 w-5" /></span><h2 className="mt-4 text-xl font-semibold">Continue your monthly support.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the mobile money menu to make or manage your recurring gift. The team can help with questions.</p><Link href="/partner#mobile-money" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">View giving steps <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
          <section id="details" className="scroll-mt-28 border border-border bg-card p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">Profile</p><h2 className="mt-2 text-xl font-semibold">Your details</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-subtle-foreground">Email</dt><dd>alex@example.com</dd></div><div className="flex justify-between gap-4"><dt className="text-subtle-foreground">Phone</dt><dd>+233 ••• •• 0182</dd></div></dl><button type="button" className="mt-5 text-sm font-semibold text-brand">Edit details <ArrowRight aria-hidden="true" className="inline h-4 w-4" /></button></section>
        </aside>
      </div>
    </DashboardShell>
  );
}
