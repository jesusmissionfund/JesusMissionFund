import { CheckCircle } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeader } from "@/components/site/layout";

const criteria = [
  "Are actively engaged in evangelism and discipleship",
  "Have a clear calling and ministry focus",
  "Demonstrate spiritual maturity and accountability",
  "Show measurable or consistent Kingdom impact",
  "Require support to sustain or expand their mission work",
];

export default function WhoWeSupport() {
  return (
    <Section className="bg-muted/30">
      <Reveal>
        <SectionHeader
          eyebrow="Eligibility"
          title="Who We Support"
          description="This program is designed for missionaries who meet the following criteria."
        />
      </Reveal>
      <div className="mx-auto max-w-3xl space-y-4">
        {criteria.map((item, index) => (
          <Reveal
            key={item}
            from="left"
            delay={index * 0.1}
            className="flex items-start gap-4 border border-border bg-card p-5"
          >
            <CheckCircle
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-primary"
            />
            <span className="font-medium text-foreground">{item}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
