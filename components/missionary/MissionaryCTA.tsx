import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { buttonClass, Section, SectionHeader } from "@/components/site/layout";

export default function MissionaryCTA() {
  return (
    <Section>
      <Reveal className="text-center">
        <SectionHeader
          title="Ready to Take the Next Step?"
          description="If you believe this support will help you fulfill your calling more effectively, we invite you to apply today."
          className="mb-10"
        />
        <Link href="/signup/missionary" className={buttonClass}>
          Apply for support
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
