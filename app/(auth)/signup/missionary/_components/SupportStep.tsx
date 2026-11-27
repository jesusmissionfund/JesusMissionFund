"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import {
  FormAlert,
  SelectField,
  SubmitButton,
  TextareaField,
  TextField,
} from "@/components/forms/fields";
import { saveSupport } from "../actions";
import {
  supportNeedOptions,
  supportSchema,
  type SupportInput,
} from "../schema";

export function SupportStep({
  defaultValues,
  onDone,
}: {
  defaultValues: Partial<SupportInput>;
  onDone: (values: SupportInput) => void;
}) {
  const [serverError, setServerError] = useState("");
  const form = useForm<SupportInput>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      supportNeed: defaultValues.supportNeed,
      needDetails: defaultValues.needDetails ?? "",
      estimatedCost: defaultValues.estimatedCost ?? "",
      referenceName: defaultValues.referenceName ?? "",
      referenceContact: defaultValues.referenceContact ?? "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: SupportInput) {
    setServerError("");
    const result = await saveSupport(values);
    if (result.error) return setServerError(result.error);
    onDone(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <SelectField
          control={form.control}
          name="supportNeed"
          label="What practical support would help most?"
          options={supportNeedOptions}
        />
        <TextareaField
          control={form.control}
          name="needDetails"
          label="Describe the need and how support would help."
        />
        <TextField
          control={form.control}
          name="estimatedCost"
          label="Estimated cost (optional)"
          placeholder="Amount and currency"
        />
        <TextField
          control={form.control}
          name="referenceName"
          label="Pastor or ministry reference name"
        />
        <TextField
          control={form.control}
          name="referenceContact"
          label="Reference phone or email"
        />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Save and continue
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
