"use client";

import { useRouter } from "next/navigation";

import { AccountStep } from "../../_components/AccountStep";
import { SignupShell } from "../../_components/SignupShell";
import { createPartnerAccount } from "../actions";
import { steps } from "../schema";

export function PartnerSignupFlow() {
  const router = useRouter();

  return (
    <SignupShell label="Giving partner registration" steps={steps} current={0}>
      <AccountStep
        createAccount={createPartnerAccount}
        signInPrompt={["Already have an account?", "Sign in"]}
        onDone={() => router.push("/dashboard")}
      />
    </SignupShell>
  );
}
