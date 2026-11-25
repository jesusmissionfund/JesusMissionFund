"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { AuthShell } from "../../../_components/AuthShell";
import { steps, type ApplicationDraft, type StepId } from "../schema";
import { AccountStep } from "./AccountStep";
import { ContactStep } from "./ContactStep";
import { MinistryStep } from "./MinistryStep";
import { ReviewStep } from "./ReviewStep";

type Account = { name: string; email: string };

export function MissionarySignupFlow({
  initialAccount,
  initialDraft,
  initialStep,
}: {
  initialAccount: Account | null;
  initialDraft: ApplicationDraft;
  initialStep: StepId;
}) {
  const [step, setStep] = useState<StepId>(initialStep);
  const [account, setAccount] = useState(initialAccount);
  const [draft, setDraft] = useState(initialDraft);
  const [editing, setEditing] = useState(false);

  const current = steps.findIndex(({ id }) => id === step);
  const { title, description } = steps[current];

  function saved(values: ApplicationDraft, next: StepId) {
    setDraft((previous) => ({ ...previous, ...values }));
    setStep(editing ? "review" : next);
    setEditing(false);
  }

  function edit(target: StepId) {
    setEditing(true);
    setStep(target);
  }

  return (
    <AuthShell
      aside={
        <>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">Missionary application</p>
            <ol className="mt-10 space-y-5">
              {steps.map(({ id, title: stepTitle }, index) => (
                <li key={id} aria-current={index === current ? "step" : undefined} className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center border text-xs font-semibold",
                      index < current && "border-inverse-muted bg-inverse-muted text-inverse",
                      index === current && "border-inverse-foreground text-inverse-foreground",
                      index > current && "border-inverse-foreground/30 text-inverse-foreground/50",
                    )}
                  >
                    {index < current ? <Check aria-hidden="true" className="size-4" /> : index + 1}
                  </span>
                  <span className={cn("text-sm", index === current ? "font-semibold text-inverse-foreground" : "text-inverse-foreground/65")}>
                    {stepTitle}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="border-t border-inverse-foreground/20 pt-5 text-sm leading-6 text-inverse-foreground/65">
            Your progress is saved after each step. Sign in any time to continue where you stopped.
          </p>
        </>
      }
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
        Step {current + 1} of {steps.length}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>

      {step === "account" && (
        <AccountStep
          onDone={(created) => {
            setAccount(created);
            setStep("contact");
          }}
        />
      )}
      {step === "contact" && <ContactStep defaultValues={draft} onDone={(values) => saved(values, "ministry")} />}
      {step === "ministry" && <MinistryStep defaultValues={draft} onDone={(values) => saved(values, "review")} />}
      {step === "review" && account && <ReviewStep account={account} draft={draft} onEdit={edit} />}
    </AuthShell>
  );
}
