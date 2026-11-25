"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const signinSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type SigninInput = z.infer<typeof signinSchema>;

const inputClass =
  "h-12 rounded-none border-input bg-card px-4 text-sm text-foreground focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/10";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
    mode: "onTouched",
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SigninInput) {
    setServerError("");
    try {
      const { error } = await authClient.signIn.email({ ...values, callbackURL: "/dashboard" });
      if (error) setServerError(error.message || "We could not sign you in. Please try again.");
    } catch {
      setServerError("The sign-in service could not be reached. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="text-foreground/85">Email address</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password" className="text-foreground/85">Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  className={`${inputClass} pr-12`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-none text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox id="remember-me" checked={field.value} onCheckedChange={field.onChange} />
              <FieldLabel htmlFor="remember-me" className="font-normal text-muted-foreground">
                Keep me signed in
              </FieldLabel>
            </Field>
          )}
        />

        {serverError && (
          <p role="alert" className="border-l-2 border-destructive bg-destructive-muted px-4 py-3 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full gap-3 rounded-none bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:cursor-wait disabled:opacity-65"
        >
          {isSubmitting ? "Please wait…" : "Sign in"}
          {!isSubmitting && <ArrowRight aria-hidden="true" className="size-4" />}
        </Button>
      </FieldGroup>
    </form>
  );
}
