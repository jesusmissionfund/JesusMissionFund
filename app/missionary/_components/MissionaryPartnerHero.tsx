import Link from "next/link";
import { ArrowDown, Shield } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import {
  Container,
  Eyebrow,
  heroSpacing,
  heroTitleClass,
  leadClass,
} from "@/components/site/layout";
import { buttonClass } from "@/components/styles";
import { cn } from "cn";

export function MissionaryPartnerHero() {
  return (
    <section className={cn("bg-accent", heroSpacing)}>
      <Container>
        <Reveal immediate className="mx-auto max-w-4xl text-center">
          <Eyebrow icon={Shield} className="justify-center">
            Jesus&apos; Mission Fund
          </Eyebrow>
          <h1 className={cn(heroTitleClass, "mt-6")}>
            Called to serve? Apply for support.
          </h1>
          <p className={cn(leadClass, "mx-auto mt-7 max-w-3xl")}>
            Tell us about your ministry and the practical support that would
            help you serve.
          </p>
          <Link href="#application-process" className={cn(buttonClass, "mt-9")}>
            View application steps{" "}
            <ArrowDown aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
