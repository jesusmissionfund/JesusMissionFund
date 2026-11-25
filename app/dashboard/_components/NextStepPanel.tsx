import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { DiscardDraftButton } from "./DiscardDraftButton";

export function NextStepPanel({
  label,
  steps,
  current,
  href,
  action,
  discard,
}: {
  label: string;
  steps: readonly { title: string; description: string }[];
  current: number;
  href: string;
  action: string;
  discard: { kind: "missionary" | "partner"; what: string };
}) {
  const { title, description } = steps[current];

  return (
    <section className="bg-inverse p-6 text-inverse-foreground sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">
        {label} · Step {current + 1} of {steps.length}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-inverse-foreground/75">{description}</p>

      <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {steps.map((step, index) => (
          <li key={step.title} aria-current={index === current ? "step" : undefined} className="flex items-center gap-2.5 text-sm">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center border text-xs font-semibold",
                index < current && "border-inverse-muted bg-inverse-muted text-inverse",
                index === current && "border-inverse-foreground",
                index > current && "border-inverse-foreground/30 text-inverse-foreground/50",
              )}
            >
              {index < current ? <Check aria-hidden="true" className="size-3.5" /> : index + 1}
            </span>
            <span className={index === current ? "font-semibold" : "text-inverse-foreground/65"}>{step.title}</span>
          </li>
        ))}
      </ol>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link
          href={href}
          className="inline-flex min-h-12 items-center gap-3 bg-inverse-foreground px-6 text-sm font-semibold text-inverse transition-colors hover:bg-inverse-muted"
        >
          {action}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <DiscardDraftButton {...discard} className="text-inverse-foreground/70 hover:text-inverse-foreground" />
      </div>
    </section>
  );
}
