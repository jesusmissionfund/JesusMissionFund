import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CarFront,
  Church,
  Home,
  Megaphone,
} from "lucide-react";
import {
  accentWordClass,
  bodyClass,
  Container,
  Eyebrow,
  heroSpacing,
  heroTitleClass,
  leadClass,
  Section,
  sectionTitleClass,
} from "@/components/site/layout";
import { buttonClass, textLinkClass } from "@/components/styles";
import { cn } from "cn";
import { CallToAction } from "@/components/site/CallToAction";
import { MomoWalkthrough } from "./MomoWalkthrough";

const supportAreas = [
  {
    icon: Megaphone,
    title: "Evangelism",
    description: "Resources for local outreach and sharing the Gospel.",
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    description: "Materials that help new believers grow in faith.",
  },
  {
    icon: CarFront,
    title: "Getting there",
    description: "Transportation for mission work and community visits.",
  },
  {
    icon: Home,
    title: "Family support",
    description: "Practical support for missionaries and their families.",
  },
  {
    icon: Church,
    title: "Church planting",
    description: "Support for strategic church planting initiatives.",
  },
];

export function PartnerLanding() {
  return (
    <>
      <section className={cn("bg-background", heroSpacing)}>
        <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>Partnership · Jesus&apos; Mission Fund</Eyebrow>
            <h1 className={cn(heroTitleClass, "mt-6")}>
              The mission needs those who{" "}
              <span className={accentWordClass}>go</span> and those who{" "}
              <span className={accentWordClass}>send.</span>
            </h1>
            <p className={cn(leadClass, "mt-7 max-w-lg")}>
              Missionaries carry the Gospel into their communities. Partners
              help provide the practical support that lets them stay focused on
              that work.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="#give" className={buttonClass}>
                Choose how to give{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="#impact" className={textLinkClass}>
                See what partnership supports{" "}
                <ArrowDown aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="sm:pl-6">
            <div className="relative aspect-4/3 overflow-hidden bg-secondary">
              <Image
                src="/pexels-rdne-6646949.jpg"
                alt="Volunteers organizing practical support"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
      <Section id="give" className="scroll-mt-24 bg-card">
        <div id="mobile-money" className="scroll-mt-24">
          <MomoWalkthrough />
        </div>
      </Section>
      <Section
        id="impact"
        className="scroll-mt-24 bg-background"
        containerClassName="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20"
      >
        <div className="relative min-h-80 overflow-hidden bg-secondary sm:min-h-115">
          <Image
            src="/img3.jpg"
            alt="Missionary preparing materials for ministry"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <Eyebrow>Where support goes</Eyebrow>
          <h2 className={cn(sectionTitleClass, "mt-4 max-w-xl")}>
            Practical help for the work of the Gospel.
          </h2>
          <p className={cn(bodyClass, "mt-5 max-w-xl")}>
            Partnership helps provide for needs that keep missionaries present
            and equipped in the communities they serve.
          </p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {supportAreas.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className="grid grid-cols-[38px_1fr] gap-4 py-4">
                <span className="pt-1 text-xs font-semibold text-brand-muted/70">
                  0{index + 1}
                </span>
                <div className="flex gap-3">
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <CallToAction
        eyebrow="Partnership"
        title="Give to and stand with missionaries."
        className="bg-background"
      >
        <Link href="/signup/partner" className={buttonClass}>
          Become a partner <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </CallToAction>
    </>
  );
}
