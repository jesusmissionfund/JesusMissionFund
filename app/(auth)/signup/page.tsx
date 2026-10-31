"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";


const signupSchema = z
  .object({
    name: z.string().min(1, "Please enter your full name"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, {
      error: "You must accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpInput = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: undefined,
    },
    mode: "onChange",
  });


  async function onSubmit(values: SignUpInput) {
     await authClient.signUp.email({
      name:values.name,
      email:values.email,
      password: values.password,
      role: "missionary",


      callbackURL:"/dashboard",
      fetchOptions: {
       onError: ({ error }) => {
          toast.add({
            type: "error",
            title: "Sign Up Failed",
            description: error.message,
          });
          console.log("Enter valid input");
        },
      }
    })
}

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Missionary Image */}
        <section className="relative hidden overflow-hidden bg-[#2F5D50] lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/missionary.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-[#173B32]/75" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 text-white">
            <p className="text-2xl font-bold">Jesus Mission Fund</p>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                Join the Movement
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Your support can help carry the mission forward.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/80">
                Become part of a growing community supporting missionaries and
                advancing the Gospel in communities around the world.
              </p>
            </div>

            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Jesus Mission Fund
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="px-0">
              {/* Mobile Logo */}
              <p className="mb-8 text-2xl font-bold text-[#2F5D50] lg:hidden">
                Jesus Mission Fund
              </p>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#2F5D50]">
                Join the Mission
              </p>

              <CardTitle className="mt-2 text-3xl font-bold">
                Create your account
              </CardTitle>

              <CardDescription>
                Create an account and become part of the Jesus Mission Fund
                community.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* Name */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Full name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Your full name"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Email */}
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email address</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Password */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pr-11"
                            aria-invalid={fieldState.invalid}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </Button>
                        </div>
                        <FieldDescription>
                          Use at least 8 characters with a mix of letters and
                          numbers.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Confirm Password */}
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="confirmPassword">
                          Confirm password
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pr-11"
                            aria-invalid={fieldState.invalid}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </Button>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Terms */}
                  <Controller
                    name="terms"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id="terms"
                          checked={field.value === true}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel
                          htmlFor="terms"
                          className="font-normal text-sm leading-5 text-muted-foreground"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="font-medium text-[#2F5D50] hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="font-medium text-[#2F5D50] hover:underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </FieldLabel>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full bg-[#2F5D50] hover:bg-[#244A40]"
                  >
                    Create Account
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </FieldGroup>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-[#2F5D50] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
