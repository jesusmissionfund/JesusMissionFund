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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

const signinSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninInput = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

 async function onSubmit(values: SigninInput) {
     await authClient.signIn.email({
          email:values.email,
          password: values.password,
    
          callbackURL:"/dashboard",
          fetchOptions: {
            onError: ({error}) =>{
    
             console.log("Enter valid input");
            }
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
            {/* Logo */}
            <p className="text-2xl font-bold">Jesus Mission Fund</p>

            {/* Message */}
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                Together for the Mission
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Supporting those who carry the Gospel to the nations.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/80">
                Join a community committed to supporting missionaries,
                empowering outreach, and helping advance God&apos;s mission.
              </p>
            </div>

            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Jesus Mission Fund
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="px-0">
              {/* Mobile Logo */}
              <p className="mb-8 text-2xl font-bold text-[#2F5D50] lg:hidden">
                Jesus Mission Fund
              </p>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#2F5D50]">
                Welcome Back
              </p>

              <CardTitle className="mt-2 text-3xl font-bold">
                Sign in to your account
              </CardTitle>

              <CardDescription className="text-sm leading-6">
                Continue supporting the mission and stay connected with Jesus
                Mission Fund.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form id="sign-in" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
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
                        <div className="flex items-center justify-between">
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-[#2F5D50] hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Remember */}
                  <Field orientation="horizontal">
                    <Checkbox id="remember" />
                    <FieldLabel
                      htmlFor="remember"
                      className="font-normal text-muted-foreground"
                    >
                      Remember me
                    </FieldLabel>
                  </Field>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="group w-full bg-[#2F5D50] hover:bg-[#244A40]"
                    size="lg"
                  >
                    Sign In
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </FieldGroup>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              {/* Google */}
              <Button type="button" variant="outline" size="lg" className="w-full">
                <span className="font-bold">G</span>
                Continue with Google
              </Button>

              {/* Sign Up */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#2F5D50] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}