import type { ReactNode } from "react";

import { bodyClass, Eyebrow, Section, sectionTitleClass } from "./layout";
import { cn } from "cn";

export function CallToAction({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Section className={className}>
      <div className="border-y border-border py-12 md:flex md:items-center md:justify-between md:gap-10 md:py-16">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={cn(sectionTitleClass, "mt-4")}>{title}</h2>
          {description && (
            <p className={cn(bodyClass, "mt-5 max-w-xl")}>{description}</p>
          )}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
          {children}
        </div>
      </div>
    </Section>
  );
}
