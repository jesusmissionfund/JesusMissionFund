"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, SelectField, SubmitButton, TextField } from "@/components/forms/fields";
import { saveMinistry } from "../actions";
import { ministryFocusOptions, ministrySchema, type MinistryInput } from "../schema";

export function MinistryStep({ defaultValues, onDone }: { defaultValues: Partial<MinistryInput>; onDone: (values: MinistryInput) => void }) {
  const [serverError, setServerError] = useState("");
  const form = useForm<MinistryInput>({
    resolver: zodResolver(ministrySchema),
    defaultValues: {
      church: defaultValues.church ?? "",
      yearsServing: defaultValues.yearsServing ?? "",
      ministryFocus: defaultValues.ministryFocus,
    },
    mode: "onTouched",
  });

  async function onSubmit(values: MinistryInput) {
    setServerError("");
    const result = await saveMinistry(values);
    if (result.error) return setServerError(result.error);
    onDone(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="church" label="Church or ministry organization" />
        <TextField control={form.control} name="yearsServing" label="Years in ministry" inputMode="numeric" />
        <SelectField control={form.control} name="ministryFocus" label="Main ministry focus" options={ministryFocusOptions} />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>Save and continue</SubmitButton>
      </FieldGroup>
    </form>
  );
}
