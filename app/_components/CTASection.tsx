import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CallToAction } from "@/components/site/CallToAction";
import { buttonClass, outlineButtonClass } from "@/components/styles";

export function CTASection() {
  return (
    <CallToAction
      eyebrow="Take part"
      title="The work moves forward together."
      description="Your support helps missionaries give their time and attention to the communities they serve."
      className="bg-background"
    >
      <Link href="/partner" className={buttonClass}>
        Partner with us <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
      <Link href="/volunteer" className={outlineButtonClass}>
        Volunteer
      </Link>
    </CallToAction>
  );
}
