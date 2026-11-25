"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/fields";
import { createMissionaryAccount } from "../actions";
import { accountSchema, type AccountInput } from "../schema";

export function AccountStep({ onDone }: { onDone: (account: { name: string; email: string }) => void }) {
  const [serverError, setServerError] = useState("");
  const form = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: AccountInput) {
    setServerError("");
    const result = await createMissionaryAccount(values);
    if (result.error) return setServerError(result.error);
    onDone({ name: values.name, email: values.email });
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
        <FieldGroup className="gap-5">
          <TextField control={form.control} name="name" label="Full name" autoComplete="name" />
          <TextField control={form.control} name="email" label="Email address" type="email" autoComplete="email" />
          <PasswordField control={form.control} name="password" label="Password" autoComplete="new-password" />
          <FormAlert>{serverError}</FormAlert>
          <SubmitButton pending={form.formState.isSubmitting}>Create account</SubmitButton>
        </FieldGroup>
      </form>
      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already started an application?{" "}
        <Link href="/signin" className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
          Sign in to continue
        </Link>
      </p>
    </>
  );
}
