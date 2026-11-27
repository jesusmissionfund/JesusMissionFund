"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authClient, authErrorOf } from "@/lib/auth-client";
import { currentPasswordField, emailField } from "@/lib/validation";
import {
  FormAlert,
  PasswordField,
  SubmitButton,
  TextField,
} from "@/components/forms/fields";

const signinSchema = z.object({
  email: emailField,
  password: currentPasswordField("Password is required"),
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
    setServerError(
      await authErrorOf(
        () => authClient.signIn.email({ ...values, callbackURL: "/dashboard" }),
        "We could not sign you in. Please try again.",
      ),
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
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-4">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel
                  htmlFor="remember-me"
                  className="font-normal text-muted-foreground"
                >
                  Keep me signed in
                </FieldLabel>
              </Field>
            )}
          />
          <Link
            href="/forgot-password"
            className="shrink-0 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
          >
            Forgot password?
          </Link>
        </div>

        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Sign in
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
