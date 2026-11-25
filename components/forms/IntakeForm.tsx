"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type IntakeField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  wide?: boolean;
  min?: number;
};

export type IntakeSection = { title: string; description?: string; fields: IntakeField[] };

export default function IntakeForm({
  eyebrow,
  title,
  description,
  sections,
  submitLabel,
  successTitle,
  successMessage,
  nextHref,
  nextLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: IntakeSection[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-32 sm:px-8 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4">Jesus&apos; Mission Fund</Link>
        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
        </div>

        {submitted ? (
          <section role="status" className="mt-10 border border-input bg-card p-7 sm:p-10">
            <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-brand" />
            <h2 className="mt-5 text-2xl font-semibold text-foreground">{successTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{successMessage}</p>
            {nextHref && nextLabel && <Link href={nextHref} className="mt-7 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">{nextLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
            <p className="mt-5 text-xs text-subtle-foreground">Prototype preview: this form is not yet connected to a database.</p>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {sections.map((section, index) => (
              <fieldset key={section.title} className="border border-border bg-card p-6 sm:p-8">
                <legend className="sr-only">{section.title}</legend>
                <div className="mb-6 border-b border-border pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted/70">Step {index + 1}</p>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">{section.title}</h2>
                  {section.description && <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.description}</p>}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <label key={field.name} className={`grid gap-2 text-sm font-medium text-foreground/85 ${field.wide || field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                      <span>{field.label}{field.required && <span aria-hidden="true" className="text-destructive"> *</span>}</span>
                      {field.type === "textarea" ? (
                        <textarea name={field.name} required={field.required} placeholder={field.placeholder} rows={4} maxLength={1500} className="border border-input bg-card p-3 font-normal text-foreground placeholder:text-subtle-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10" />
                      ) : field.type === "select" ? (
                        <select name={field.name} required={field.required} defaultValue="" className="min-h-12 border border-input bg-card px-3 font-normal text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10">
                          <option value="" disabled>Select an option</option>{field.options?.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      ) : (
                        <input name={field.name} type={field.type ?? "text"} required={field.required} placeholder={field.placeholder} min={field.min} maxLength={field.type === "number" ? undefined : 200} className="min-h-12 border border-input bg-card px-3 font-normal text-foreground placeholder:text-subtle-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10" />
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <label className="flex items-start gap-3 px-1 text-sm leading-6 text-muted-foreground">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-primary" />
              I confirm these details are accurate and agree that Jesus&apos; Mission Fund may contact me about this submission.
            </label>
            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-subtle-foreground">Prototype preview: your information will not be saved yet.</p>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">{submitLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
