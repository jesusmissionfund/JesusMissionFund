"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import {
  FormAlert,
  PasswordField,
  SubmitButton,
} from "@/components/forms/fields";
import { accountSchema } from "@/app/(auth)/signup/schema";

const resetPasswordSchema = z
  .object({
    password: accountSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "The passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  async function onSubmit({ password }: ResetPasswordInput) {
    setServerError("");
    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      if (error)
        setServerError(
          error.message ||
            "We could not change your password. Please try again.",
        );
      else setDone(true);
    } catch {
      setServerError(
        "The service could not be reached. Please try again in a moment.",
      );
    }
  }

  if (done) {
    return (
      <>
        <p
          role="status"
          className="mt-3 text-sm leading-6 text-muted-foreground"
        >
          Your password has been changed and you&apos;ve been signed out
          everywhere. Sign in with your new password.
        </p>
        <Link
          href="/signin"
          className="mt-8 inline-flex h-12 w-full items-center justify-center bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Sign in
        </Link>
      </>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <PasswordField
          control={form.control}
          name="password"
          label="New password"
          autoComplete="new-password"
        />
        <PasswordField
          control={form.control}
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
        />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Change password
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
