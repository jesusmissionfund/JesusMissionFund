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
import { requestReport } from "../../actions";
import {
  allMissionaries,
  reportRequestSchema,
  type ReportRequestInput,
} from "../../schema";

export function RequestReportForm({
  missionaries,
  defaultRecipient,
  today,
}: {
  missionaries: { id: string; name: string }[];
  defaultRecipient: string;
  today: string;
}) {
  const [serverError, setServerError] = useState("");
  const form = useForm<ReportRequestInput>({
    resolver: zodResolver(reportRequestSchema),
    defaultValues: {
      recipient: defaultRecipient,
      title: "",
      body: "",
      dueDate: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: ReportRequestInput) {
    setServerError("");
    const result = await requestReport(values);
    if (result?.error) setServerError(result.error);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl"
    >
      <FieldGroup className="gap-5">
        <SelectField
          control={form.control}
          name="recipient"
          label="Ask"
          options={[
            { value: allMissionaries, label: "All approved missionaries" },
            ...missionaries.map(({ id, name }) => ({ value: id, label: name })),
          ]}
        />
        <TextField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Report for May 2026"
        />
        <TextareaField
          control={form.control}
          name="body"
          label="What would you like in the report?"
          rows={10}
        />
        <TextField
          control={form.control}
          name="dueDate"
          label="Due date (optional)"
          type="date"
          min={today}
        />
        <FormAlert>{serverError}</FormAlert>
        <SubmitButton pending={form.formState.isSubmitting}>
          Send request
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
