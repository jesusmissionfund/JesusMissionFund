import { Heart } from "lucide-react";

import { accentWordClass } from "@/components/site/layout";
import { FeatureSection } from "./FeatureSection";

export default function MissionarySection() {
  return (
    <FeatureSection
      eyebrow="For Missionaries"
      icon={Heart}
      title={
        <>
          Focus on <span className={accentWordClass}>the call.</span>
        </>
      }
      action={{ href: "/missionary", label: "Apply for support" }}
      image={{ src: "/img3.jpg", alt: "Missionary discipling believers" }}
      imageFirst
      className="bg-muted/30"
    >
      <p className="text-lg">
        Are you winning souls and discipling believers for Christ?
      </p>
      <p>
        If God has called you to the field but you need support to stay fully
        focused on the mission, we want to stand with you. Our Missionary
        Support Program exists to empower you to do more for the Kingdom.
      </p>
    </FeatureSection>
  );
}
