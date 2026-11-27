"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import {
  FormAlert,
  FormStatus,
  SubmitButton,
  TextField,
} from "@/components/forms/fields";
import { authClient, authErrorOf } from "@/lib/auth-client";
import {
  emailSchema,
  nameSchema,
  type EmailInput,
  type NameInput,
} from "../schema";

export function NameForm({ name }: { name: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState(false);
  const form = useForm<NameInput>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name },
    mode: "onTouched",
  });

  async function onSubmit(values: NameInput) {
    setServerError("");
    setSaved(false);
    const error = await authErrorOf(
      () => authClient.updateUser(values),
      "We could not save your name. Please try again.",
    );
    if (error) return setServerError(error);
    setSaved(true);
    router.refresh();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="max-w-xl"
    >
      <FieldGroup className="gap-5">
        <TextField
          control={form.control}
          name="name"
          label="Full name"
          autoComplete="name"
        />
        <FormAlert>{serverError}</FormAlert>
        <FormStatus>{saved && "Name saved."}</FormStatus>
        <SubmitButton pending={form.formState.isSubmitting}>
          Save name
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}

export function EmailForm({ email }: { email: string }) {
  const [serverError, setServerError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const form = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
    mode: "onTouched",
  });

  async function onSubmit(values: EmailInput) {
    setServerError("");
    setSentTo("");
    if (values.email.toLowerCase() === email.toLowerCase())
      return setServerError("That's already your email address.");
    const error = await authErrorOf(
      () =>
        authClient.changeEmail({
          newEmail: values.email,
          callbackURL: "/dashboard/details",
        }),
      "We could not change your email. Please try again.",
    );
    if (error) return setServerError(error);
    setSentTo(values.email);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="max-w-xl"
    >
      <FieldGroup className="gap-5">
        <TextField
          control={form.control}
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
        />
        <FormAlert>{serverError}</FormAlert>
        <FormStatus>
          {sentTo &&
            `We've sent a link to ${sentTo}. Your email changes once you open it.`}
        </FormStatus>
        <SubmitButton pending={form.formState.isSubmitting}>
          Change email
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
