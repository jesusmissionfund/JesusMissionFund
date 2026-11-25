"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/fields";
import { accountSchema, resumeParam, type AccountInput, type AccountResult } from "../schema";

const linkClass = "font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand";

export function AccountStep({
  createAccount,
  signInPrompt,
  onDone,
}: {
  createAccount: (input: AccountInput) => Promise<AccountResult>;
  signInPrompt: [question: string, link: string];
  onDone: (account: { name: string; email: string }) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [resuming, startResume] = useTransition();
  const [serverError, setServerError] = useState<AccountResult & { error: string }>();
  const form = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: AccountInput) {
    setServerError(undefined);
    const result = await createAccount(values);
    if (result.error !== undefined) return setServerError(result);
    if (!result.signedInExisting) return onDone({ name: values.name, email: values.email });
    // The page works out where an existing account left off, so re-render it rather than guessing here.
    startResume(() => router.replace(`${pathname}?${resumeParam}=1`));
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
        <FieldGroup className="gap-5">
          <TextField control={form.control} name="name" label="Full name" autoComplete="name" />
          <TextField control={form.control} name="email" label="Email address" type="email" autoComplete="email" />
          <PasswordField control={form.control} name="password" label="Password" autoComplete="new-password" />
          {serverError && (
            <FormAlert>
              {serverError.error}
              {serverError.existingAccount && (
                <>
                  {" "}
                  Would you like to{" "}
                  <Link href="/signin" className={linkClass}>
                    sign in with your existing details
                  </Link>{" "}
                  instead?
                </>
              )}
            </FormAlert>
          )}
          <SubmitButton pending={form.formState.isSubmitting || resuming}>Create account</SubmitButton>
        </FieldGroup>
      </form>
      <p className="mt-7 text-center text-sm text-muted-foreground">
        {signInPrompt[0]}{" "}
        <Link href="/signin" className={linkClass}>
          {signInPrompt[1]}
        </Link>
      </p>
    </>
  );
}
