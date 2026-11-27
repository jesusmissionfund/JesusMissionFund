"use client";

import { useState } from "react";
import Link from "next/link";

import { AccountStep } from "../../_components/AccountStep";
import { SignupShell } from "../../_components/SignupShell";
import { createMissionaryAccount } from "../actions";
import { steps, type ApplicationDraft, type StepId } from "../schema";
import { ContactStep } from "./ContactStep";
import { MinistryStep } from "./MinistryStep";
import { ReviewStep } from "./ReviewStep";
import { SupportStep } from "./SupportStep";

type Account = { name: string; email: string; emailVerified: boolean };

export function MissionarySignupFlow({
  initialAccount,
  initialDraft,
  initialStep,
  resumed,
}: {
  initialAccount: Account | null;
  initialDraft: ApplicationDraft;
  initialStep: StepId;
  resumed: boolean;
}) {
  const [step, setStep] = useState<StepId>(initialStep);
  const [account, setAccount] = useState(initialAccount);
  const [draft, setDraft] = useState(initialDraft);
  const [editing, setEditing] = useState(false);

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
    <SignupShell
      label="Missionary application"
      steps={steps}
      current={steps.findIndex(({ id }) => id === step)}
      resumed={resumed && step === initialStep}
    >
      {step === "account" && (
        <AccountStep
          createAccount={createMissionaryAccount}
          signInPrompt={[
            "Already started an application?",
            "Sign in to continue",
          ]}
          onDone={(created) => {
            setAccount({ ...created, emailVerified: false });
            setStep("contact");
          }}
        />
      )}
      {step === "contact" && (
        <ContactStep
          defaultValues={draft}
          onDone={(values) => saved(values, "ministry")}
        />
      )}
      {step === "ministry" && (
        <MinistryStep
          defaultValues={draft}
          onDone={(values) => saved(values, "support")}
        />
      )}
      {step === "support" && (
        <SupportStep
          defaultValues={draft}
          onDone={(values) => saved(values, "review")}
        />
      )}
      {step === "review" && account && (
        <ReviewStep account={account} draft={draft} onEdit={edit} />
      )}
      {step !== "account" && (
        <p className="mt-7 text-center text-sm">
          <Link
            href="/dashboard"
            className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
          >
            Finish later
          </Link>
        </p>
      )}
    </SignupShell>
  );
}
