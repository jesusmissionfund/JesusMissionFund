import { Reveal } from "@/components/site/Reveal";
import { bodyClass, Section, SectionHeader } from "@/components/site/layout";
import { cn } from "cn";

const steps = [
  "Complete the online application form",
  "Provide details of your ministry and vision",
  "Share your current needs and accountability structure",
  "Submit references where required",
];

export function ApplicationProcess() {
  return (
    <Section id="application-process" className="scroll-mt-24">
      <Reveal>
        <SectionHeader
          eyebrow="Get Started"
          title="Application Process"
          description="If you are a missionary seeking support, follow these steps."
        />
      </Reveal>
      <div className="mx-auto max-w-2xl space-y-4">
        {steps.map((step, index) => (
          <Reveal
            key={step}
            from="left"
            delay={index * 0.15}
            className="flex items-center gap-5"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {index + 1}
            </span>
            <span className="font-medium text-foreground">{step}</span>
          </Reveal>
        ))}
      </div>
      <p className={cn(bodyClass, "mx-auto mt-10 max-w-xl text-center")}>
        Our team will review your application prayerfully and contact you
        regarding next steps.
      </p>
    </Section>
  );
}
