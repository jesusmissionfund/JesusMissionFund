"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MissionaryReportForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return <section role="status" className="max-w-3xl border border-border bg-card p-8"><CheckCircle2 aria-hidden="true" className="h-8 w-8 text-brand" /><h2 className="mt-5 text-2xl font-semibold">Your report is ready to submit.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This prototype doesn’t save reports yet. In the connected portal, the report will appear in your history and the admin review queue.</p><Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Return to dashboard<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl border border-border bg-card p-5 sm:p-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to dashboard</Link>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground/85">Report period <select required defaultValue="" className="min-h-12 border border-input bg-card px-3 font-normal"><option value="" disabled>Select a month</option>{["November 2026", "October 2026", "September 2026", "August 2026"].map((month) => <option key={month}>{month}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85">Ministry location<input required defaultValue="Northern Ghana" className="min-h-12 border border-input px-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85 sm:col-span-2">What activities did you carry out? <textarea required rows={4} placeholder="Outreach, teaching, visits, discipleship…" className="border border-input p-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85 sm:col-span-2">What changed or went well? <textarea required rows={4} placeholder="Share outcomes, testimonies, or progress…" className="border border-input p-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85 sm:col-span-2">Challenges or support needed <textarea rows={3} placeholder="What would help you in the coming month?" className="border border-input p-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85 sm:col-span-2">Plans for next month <textarea required rows={3} className="border border-input p-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-medium text-foreground/85 sm:col-span-2">Add a photo or document <input type="file" multiple accept="image/*,.pdf" className="border border-dashed border-input bg-background p-4 text-sm font-normal text-muted-foreground" /><span className="text-xs font-normal text-subtle-foreground">Optional in this preview. Uploads aren’t stored yet.</span></label>
      </div>
      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-subtle-foreground">You can review and edit before submitting in the connected version.</p><button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground">Submit report<ArrowRight aria-hidden="true" className="h-4 w-4" /></button></div>
    </form>
  );
}
