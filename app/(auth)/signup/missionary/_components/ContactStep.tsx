"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, SubmitButton, TextField } from "@/components/forms/fields";
import { saveContact } from "../actions";
import { contactSchema, type ContactInput } from "../schema";

export function ContactStep({ defaultValues, onDone }: { defaultValues: Partial<ContactInput>; onDone: (values: ContactInput) => void }) {
  const [serverError, setServerError] = useState("");
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: defaultValues.phone ?? "",
      country: defaultValues.country ?? "",
      region: defaultValues.region ?? "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactInput) {
    setServerError("");
    const result = await saveContact(values);
    if (result.error) return setServerError(result.error);
    onDone(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="phone" label="Phone or WhatsApp number" type="tel" autoComplete="tel" />
        <TextField control={form.control} name="country" label="Country" autoComplete="country-name" />
        <TextField control={form.control} name="region" label="Region, town, or community" autoComplete="address-level2" />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>Save and continue</SubmitButton>
      </FieldGroup>
    </form>
  );
}
