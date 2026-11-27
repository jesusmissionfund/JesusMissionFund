import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/site/Reveal";
import {
  bodyClass,
  buttonClass,
  Eyebrow,
  Section,
  sectionTitleClass,
} from "@/components/site/layout";
import { cn } from "cn";

export function FeatureSection({
  eyebrow,
  icon,
  title,
  children,
  action,
  image,
  imageFirst = false,
  className,
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: ReactNode;
  children: ReactNode;
  action: { href: string; label: string };
  image: { src: string; alt: string };
  imageFirst?: boolean;
  className?: string;
}) {
  return (
    <Section
      className={className}
      containerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal
        from={imageFirst ? "right" : "left"}
        className={cn(imageFirst && "lg:order-2")}
      >
        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        <h2 className={cn(sectionTitleClass, "mt-4")}>{title}</h2>
        <div className={cn(bodyClass, "mt-5 space-y-4")}>{children}</div>
        <Link href={action.href} className={cn(buttonClass, "mt-8")}>
          {action.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Reveal>
      <Reveal
        from={imageFirst ? "left" : "right"}
        className={cn(imageFirst && "lg:order-1")}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] w-full object-cover"
        />
      </Reveal>
    </Section>
  );
}
