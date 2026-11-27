import { BookOpen, Heart, Shield, Star, Users } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeader } from "@/components/site/layout";

const items = [
  { icon: Heart, text: "Financial assistance for ministry activities" },
  { icon: BookOpen, text: "Outreach and evangelism resources" },
  { icon: Users, text: "Discipleship materials" },
  { icon: Shield, text: "Strategic guidance and accountability partnership" },
  { icon: Star, text: "Prayer covering and ministry encouragement" },
];

export function SupportIncludes() {
  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="Depending on need, availability & alignment"
          title="What Our Support May Include"
          description={
            <>
              Our goal is not just to fund activity—but to{" "}
              <strong className="text-foreground">strengthen calling</strong>.
            </>
          }
        />
      </Reveal>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, text }, index) => (
          <Reveal
            key={text}
            delay={index * 0.1}
            className="border border-border bg-card p-7 text-center"
          >
            <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-secondary">
              <Icon aria-hidden="true" className="size-6 text-primary" />
            </span>
            <p className="font-medium leading-relaxed text-foreground">
              {text}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
