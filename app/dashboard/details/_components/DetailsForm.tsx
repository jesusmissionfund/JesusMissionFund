"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormAlert, SubmitButton, TextField } from "@/components/forms/fields";
import { saveDetails } from "../actions";
import { detailsSchema, type DetailsInput } from "../schema";

export function DetailsForm({ defaultValues }: { defaultValues: DetailsInput }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const form = useForm<DetailsInput>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
    mode: "onTouched",
  });

  async function onSubmit(values: DetailsInput) {
    setServerError("");
    const result = await saveDetails(values);
    if (result.error) return setServerError(result.error);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="max-w-xl">
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="phone" label="Phone or WhatsApp number" type="tel" autoComplete="tel" />
        <TextField control={form.control} name="country" label="Country" autoComplete="country-name" />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>Save changes</SubmitButton>
      </FieldGroup>
    </form>
  );
}
