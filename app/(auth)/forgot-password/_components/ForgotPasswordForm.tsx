"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { FormAlert, SubmitButton, TextField } from "@/components/forms/fields";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  async function onSubmit({ email }: ForgotPasswordInput) {
    setServerError("");
    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      if (error)
        setServerError(
          error.message || "We could not send the email. Please try again.",
        );
      else setSentTo(email);
    } catch {
      setServerError(
        "The service could not be reached. Please try again in a moment.",
      );
    }
  }

  // Same message either way, so the form can't be used to find accounts.
  if (sentTo) {
    return (
      <p
        role="status"
        className="mt-8 border-l-2 border-brand bg-muted px-4 py-3 text-sm leading-6 text-foreground"
      >
        If there is an account for {sentTo}, we&apos;ve sent it a link to reset
        the password. The link is valid for one hour. Check your spam folder if
        it doesn&apos;t arrive.
      </p>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <TextField
          control={form.control}
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
        />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Send reset link
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
