"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/fields";

const signinSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type SigninInput = z.infer<typeof signinSchema>;

export function SignInForm() {
  const [serverError, setServerError] = useState("");

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
    mode: "onTouched",
  });

  async function onSubmit(values: SigninInput) {
    setServerError("");
    try {
      const { error } = await authClient.signIn.email({ ...values, callbackURL: "/dashboard" });
      if (error) setServerError(error.message || "We could not sign you in. Please try again.");
    } catch {
      setServerError("The sign-in service could not be reached. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="email" label="Email address" type="email" autoComplete="email" />
        <PasswordField control={form.control} name="password" label="Password" autoComplete="current-password" />

        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox id="remember-me" checked={field.value} onCheckedChange={field.onChange} />
              <FieldLabel htmlFor="remember-me" className="font-normal text-muted-foreground">
                Keep me signed in
              </FieldLabel>
            </Field>
          )}
        />

        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>Sign in</SubmitButton>
      </FieldGroup>
    </form>
  );
}
