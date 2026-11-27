"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import {
  FormAlert,
  SubmitButton,
  TextareaField,
  TextField,
} from "@/components/forms/fields";
import { submitReport } from "../../actions";
import { reportSchema, type ReportInput } from "../../schema";

export function ReportForm({
  requestId,
  defaultTitle,
}: {
  requestId: string | null;
  defaultTitle: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const form = useForm<ReportInput>({
    resolver: zodResolver(reportSchema),
    defaultValues: { title: defaultTitle, body: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: ReportInput) {
    setServerError("");
    const result = await submitReport(values, requestId);
    if (result.error !== undefined) return setServerError(result.error);
    router.push(`/dashboard/reports/${result.id}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <TextField control={form.control} name="title" label="Title" />
        <TextareaField
          control={form.control}
          name="body"
          label="Report"
          rows={14}
        />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Send report
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
