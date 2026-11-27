import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "cn";

export const containerClass = "mx-auto w-full max-w-7xl px-6 lg:px-8";

// Clears the fixed navbar.
export const heroSpacing = "pt-32 pb-16 md:pt-40 md:pb-24";
const sectionSpacing = "py-16 md:py-24";

export const heroTitleClass =
  "text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.25rem]";
export const sectionTitleClass =
  "text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl";
export const accentWordClass = "font-serif font-normal italic text-brand";
export const leadClass =
  "text-base leading-7 text-muted-foreground md:text-lg md:leading-8";
export const bodyClass = "text-base leading-7 text-muted-foreground";

export const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover";
export const outlineButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-3 border border-input px-6 text-sm font-semibold text-brand transition-colors hover:border-brand";
export const textLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(containerClass, className)} {...props} />;
}

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn(sectionSpacing, className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  icon: Icon,
  className,
  children,
}: {
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-muted",
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-4" />}
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-2xl text-center", className)}>
      {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
      <h2 className={cn(sectionTitleClass, eyebrow && "mt-4")}>{title}</h2>
      {description && <p className={cn(bodyClass, "mt-5")}>{description}</p>}
    </div>
  );
}
