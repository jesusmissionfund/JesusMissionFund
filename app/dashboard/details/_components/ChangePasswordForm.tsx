"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FieldGroup } from "@/components/ui/field";
import {
  FormAlert,
  PasswordField,
  SubmitButton,
} from "@/components/forms/fields";
import { authClient } from "@/lib/auth-client";
import { newPasswordSchema } from "@/app/(auth)/signup/schema";

const changePasswordSchema = newPasswordSchema.safeExtend({
  currentPassword: z.string().min(1, "Enter your current password"),
});

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

const emptyValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

export function ChangePasswordForm() {
  const [serverError, setServerError] = useState("");
  const [changed, setChanged] = useState(false);
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: emptyValues,
    mode: "onTouched",
  });

  async function onSubmit({ currentPassword, password }: ChangePasswordInput) {
    setServerError("");
    setChanged(false);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword: password,
        revokeOtherSessions: true,
      });
      if (error)
        return setServerError(
          error.message ||
            "We could not change your password. Please try again.",
        );
      form.reset(emptyValues);
      setChanged(true);
    } catch {
      setServerError(
        "The service could not be reached. Please try again in a moment.",
      );
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="mt-5 max-w-xl"
    >
      <FieldGroup className="gap-5">
        <PasswordField
          control={form.control}
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
        />
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
        {changed && (
          <p role="status" className="text-sm text-muted-foreground">
            Password changed. Your other devices have been signed out.
          </p>
        )}
        <SubmitButton pending={form.formState.isSubmitting}>
          Change password
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
