"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, SelectField, SubmitButton, TextareaField } from "@/components/forms/fields";
import { savePartnership } from "../actions";
import { amountOptions, frequencyOptions, partnershipSchema, supportInterestOptions, type PartnershipInput } from "../schema";

export function PartnershipForm({ defaultValues, submitLabel }: { defaultValues: Partial<PartnershipInput>; submitLabel: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const form = useForm<PartnershipInput>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { ...defaultValues, message: defaultValues.message ?? "" },
    mode: "onTouched",
  });

  async function onSubmit(values: PartnershipInput) {
    setServerError("");
    const result = await savePartnership(values);
    if (result.error) return setServerError(result.error);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="max-w-xl">
      <FieldGroup className="gap-5">
        <SelectField control={form.control} name="frequency" label="How often would you like to give?" options={frequencyOptions} />
        <SelectField control={form.control} name="amount" label="Preferred amount (optional)" options={amountOptions} />
        <SelectField control={form.control} name="supportInterest" label="What would you like to support?" options={supportInterestOptions} />
        <TextareaField control={form.control} name="message" label="Anything else you’d like us to know? (optional)" maxLength={1500} />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>{submitLabel}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
