import { Shield } from "lucide-react";

import { accentWordClass } from "@/components/site/layout";
import { FeatureSection } from "./FeatureSection";

export default function PartnersSection() {
  return (
    <FeatureSection
      eyebrow="For Partners"
      icon={Shield}
      title={
        <>
          Stand behind <span className={accentWordClass}>the frontline.</span>
        </>
      }
      action={{ href: "/partner", label: "Support missionaries" }}
      image={{
        src: "/pexels-rdne-6646949.jpg",
        alt: "Partners standing together in prayer",
      }}
      className="bg-background"
    >
      <p>
        Your gift helps missionaries meet practical needs as they serve people
        in their communities.
      </p>
    </FeatureSection>
  );
}
