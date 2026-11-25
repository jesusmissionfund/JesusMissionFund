import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "cn";
import { AuthShell } from "../../_components/AuthShell";
import type { SignupStep } from "../schema";

export function SignupShell({
  label,
  steps,
  current,
  resumed = false,
  children,
}: {
  label: string;
  steps: readonly SignupStep[];
  current: number;
  resumed?: boolean;
  children: ReactNode;
}) {
  const { title, description } = steps[current];

  return (
    <AuthShell
      aside={
        <>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">
              {label}
            </p>
            <ol className="mt-10 space-y-5">
              {steps.map(({ id, title: stepTitle }, index) => (
                <li
                  key={id}
                  aria-current={index === current ? "step" : undefined}
                  className="flex items-center gap-4"
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center border text-xs font-semibold",
                      index < current &&
                        "border-inverse-muted bg-inverse-muted text-inverse",
                      index === current &&
                        "border-inverse-foreground text-inverse-foreground",
                      index > current &&
                        "border-inverse-foreground/30 text-inverse-foreground/50",
                    )}
                  >
                    {index < current ? (
                      <Check aria-hidden="true" className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      index === current
                        ? "font-semibold text-inverse-foreground"
                        : "text-inverse-foreground/65",
                    )}
                  >
                    {stepTitle}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="border-t border-inverse-foreground/20 pt-5 text-sm leading-6 text-inverse-foreground/65">
            Your progress is saved after each step. Sign in any time to continue
            where you stopped.
          </p>
        </>
      }
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
        Step {current + 1} of {steps.length}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {resumed && (
        <p
          role="status"
          className="mt-6 border-l-2 border-brand bg-secondary px-4 py-3 text-sm text-secondary-foreground"
        >
          Welcome back. You&apos;re signed in, so you can continue where you
          left off.
        </p>
      )}
      {children}
    </AuthShell>
  );
}
