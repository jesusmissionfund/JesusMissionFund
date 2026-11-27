import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import {
  accentWordClass,
  buttonClass,
  Container,
  Eyebrow,
  heroSpacing,
  heroTitleClass,
  leadClass,
  textLinkClass,
} from "@/components/site/layout";
import { cn } from "cn";

export default function LandingHero() {
  return (
    <section className={cn("bg-background", heroSpacing)}>
      <Container className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <Reveal immediate className="max-w-xl">
          <Eyebrow>Jesus&apos; Mission Fund</Eyebrow>
          <h1 className={cn(heroTitleClass, "mt-6")}>
            Behind every mission,{" "}
            <span className={accentWordClass}>a community.</span>
          </h1>
          <p className={cn(leadClass, "mt-7 max-w-md")}>
            We help missionaries stay focused on sharing the Gospel by bringing
            practical support and committed partners alongside them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/partner" className={buttonClass}>
              Become a partner{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/about" className={textLinkClass}>
              Learn about our work
            </Link>
          </div>
        </Reveal>

        <Reveal immediate delay={0.12}>
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
            <video
              src="/JesusMissionFund_Intro.mp4"
              muted
              playsInline
              controls
              aria-label="Introduction to Jesus' Mission Fund"
              preload="metadata"
              className="size-full bg-secondary object-cover"
            />
          </div>
          <p className="mt-3 text-right text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Our mission, in a few minutes
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
