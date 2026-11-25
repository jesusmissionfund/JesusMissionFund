"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/fields";
import { FieldGroup } from "@/components/ui/field";
import { createStaffMember } from "../actions";
import { staffSchema, type StaffInput } from "../schema";

export function CreateStaffForm() {
  const [serverError, setServerError] = useState("");
  const form = useForm<StaffInput>({
    resolver: zodResolver(staffSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: StaffInput) {
    setServerError("");
    const result = await createStaffMember(values);
    if (result?.error) setServerError(result.error);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="max-w-md">
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="name" label="Full name" autoComplete="off" />
        <TextField control={form.control} name="email" label="Email address" type="email" autoComplete="off" />
        <PasswordField control={form.control} name="password" label="Temporary password" autoComplete="new-password" />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>Create staff account</SubmitButton>
      </FieldGroup>
    </form>
  );
}
