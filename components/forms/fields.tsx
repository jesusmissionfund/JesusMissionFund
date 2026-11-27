"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

const controlClass =
  "h-12 w-full border border-input bg-card px-4 text-sm text-foreground outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/10 aria-invalid:border-destructive";

type FieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FieldProps<T> & Omit<ComponentProps<"input">, "name">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="text-foreground/85">
            {label}
          </FieldLabel>
          <Input
            {...inputProps}
            {...field}
            value={field.value ?? ""}
            id={name}
            aria-invalid={fieldState.invalid}
            className={controlClass}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FieldProps<T> & {
  options: readonly (string | { value: string; label: string })[];
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="text-foreground/85">
            {label}
          </FieldLabel>
          <select
            {...field}
            value={field.value ?? ""}
            id={name}
            aria-invalid={fieldState.invalid}
            className={controlClass}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) =>
              typeof option === "string" ? (
                <option key={option}>{option}</option>
              ) : (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ),
            )}
          </select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  ...textareaProps
}: FieldProps<T> & Omit<ComponentProps<"textarea">, "name">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="text-foreground/85">
            {label}
          </FieldLabel>
          <textarea
            rows={4}
            {...textareaProps}
            {...field}
            value={field.value ?? ""}
            id={name}
            aria-invalid={fieldState.invalid}
            className={cn(controlClass, "h-auto py-3")}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  autoComplete,
}: FieldProps<T> & { autoComplete: "current-password" | "new-password" }) {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="text-foreground/85">
            {label}
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={visible ? "text" : "password"}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              className={cn(controlClass, "pr-12")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setVisible((shown) => !shown)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {visible ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="border-l-2 border-destructive bg-destructive-muted px-4 py-3 text-sm text-destructive"
    >
      {children}
    </p>
  );
}

export function FormStatus({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="status" className="text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full gap-3 bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:cursor-wait disabled:opacity-65"
    >
      {pending ? "Please wait…" : children}
      {!pending && <ArrowRight aria-hidden="true" className="size-4" />}
    </Button>
  );
}
