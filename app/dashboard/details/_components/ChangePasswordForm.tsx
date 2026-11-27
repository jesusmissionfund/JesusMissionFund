"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FieldGroup } from "@/components/ui/field";
import {
  FormAlert,
  FormStatus,
  PasswordField,
  SubmitButton,
} from "@/components/forms/fields";
import { authClient, authErrorOf } from "@/lib/auth-client";
import { currentPasswordField } from "@/lib/validation";
import { newPasswordSchema } from "@/app/(auth)/signup/schema";

const changePasswordSchema = newPasswordSchema.safeExtend({
  currentPassword: currentPasswordField("Enter your current password"),
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
    const error = await authErrorOf(
      () =>
        authClient.changePassword({
          currentPassword,
          newPassword: password,
          revokeOtherSessions: true,
        }),
      "We could not change your password. Please try again.",
    );
    if (error) return setServerError(error);
    form.reset(emptyValues);
    setChanged(true);
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
        <FormStatus>
          {changed &&
            "Password changed. Your other devices have been signed out."}
        </FormStatus>
        <SubmitButton pending={form.formState.isSubmitting}>
          Change password
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
