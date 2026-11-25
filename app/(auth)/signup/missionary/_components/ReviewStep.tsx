"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormAlert, SubmitButton } from "@/components/forms/fields";
import { submitApplication } from "../actions";
import type { ApplicationDraft, StepId } from "../schema";

type Section = { step: StepId; title: string; rows: [string, string | undefined][] };

export function ReviewStep({
  account,
  draft,
  onEdit,
}: {
  account: { name: string; email: string };
  draft: ApplicationDraft;
  onEdit: (step: StepId) => void;
}) {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");

  const sections: Section[] = [
    { step: "contact", title: "About you", rows: [["Full name", account.name], ["Email address", account.email], ["Phone or WhatsApp", draft.phone], ["Country", draft.country], ["Region, town, or community", draft.region]] },
    { step: "ministry", title: "Your ministry", rows: [["Church or ministry organization", draft.church], ["Years in ministry", draft.yearsServing], ["Main ministry focus", draft.ministryFocus]] },
  ];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!confirmed) return setServerError("Please confirm your details before submitting.");
    setServerError("");
    setPending(true);
    const result = await submitApplication();
    if (result.error) {
      setPending(false);
      return setServerError(result.error);
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
      {sections.map((section) => (
        <section key={section.step} className="border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
            <button type="button" onClick={() => onEdit(section.step)} className="text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
              Edit
            </button>
          </div>
          <dl className="divide-y divide-border">
            {section.rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[0.9fr_1.1fr]">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <Field orientation="horizontal" className="items-start">
        <Checkbox id="confirm" checked={confirmed} onCheckedChange={setConfirmed} className="mt-0.5" />
        <FieldLabel htmlFor="confirm" className="font-normal leading-6 text-muted-foreground">
          I confirm these details are accurate and agree that Jesus&apos; Mission Fund may contact me about this submission.
        </FieldLabel>
      </Field>

      <FormAlert>{serverError}</FormAlert>
      <SubmitButton pending={pending}>Submit application</SubmitButton>
    </form>
  );
}
