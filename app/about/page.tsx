import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Globe, Handshake, Heart, Target, Users } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Reveal } from "@/components/site/Reveal";
import {
  bodyClass,
  Container,
  Eyebrow,
  heroSpacing,
  heroTitleClass,
  leadClass,
  Section,
  SectionHeader,
  sectionTitleClass,
} from "@/components/site/layout";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "For over a decade, we've been connecting generous hearts with dedicated missionaries, creating lasting change in communities around the world.",
};

const values = [
  {
    icon: Heart,
    title: "Faith",
    description:
      "We are rooted in an unshakable faith in Jesus Christ as our Lord and Savior, and we seek to honor Him in every aspect of our mission and operations.",
  },
  {
    icon: Target,
    title: "Sacrificial Love",
    description:
      "We are committed to demonstrating the selfless love of Christ in all that we do, prioritizing the needs of missionaries and the communities they serve above our own.",
  },
  {
    icon: Handshake,
    title: "Enduring Hope",
    description:
      "We operate with a steadfast hope in the promises of God, trusting that He will fulfil His purposes through the work of this Fund and the missionaries we support.",
  },
  {
    icon: Globe,
    title: "Christ-Centered Leadership",
    description:
      "We are committed to leading with integrity, humility, and accountability, following the example of Jesus Christ.",
  },
];

const team = [
  {
    name: "Richard Densu",
    role: "Founder & Board Chair",
    image: "/mrrichard.jpeg",
  },
  {
    name: "Patience Densu",
    role: "Executive Director",
    image: "/madpat.jpeg",
  },
  {
    name: "Yaw Prempeh",
    role: "Finance Director",
    image: "/mryaw.jpeg",
  },
  {
    name: "Francis Ackon",
    role: "IT Director",
    image: "/mrkon1.jpeg",
  },
  {
    name: "Priscilla Bediako",
    role: "Regulatory & Compliance, Secretary",
    image: "/madpriscilla.jpeg",
  },
  {
    name: "Gyaba Gabriel",
    role: "Logistics Director",
    image: "/mrgabriel.jpeg",
  },
];

const splitGrid = "grid items-center gap-12 lg:grid-cols-2 lg:gap-16";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className={cn("bg-accent", heroSpacing)}>
        <Container>
          <Reveal immediate className="mx-auto max-w-3xl text-center">
            <Eyebrow icon={Users} className="justify-center">
              Our Story
            </Eyebrow>
            <h1 className={cn(heroTitleClass, "mt-6")}>
              About Jesus&apos; Mission Fund
            </h1>
            <p className={cn(leadClass, "mt-7")}>
              For over a decade, we&apos;ve been connecting generous hearts with
              dedicated missionaries, creating lasting change in communities
              around the world.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section containerClassName={splitGrid}>
        <Reveal from="left">
          <Eyebrow icon={Handshake}>Our Mission</Eyebrow>
          <h2 className={cn(sectionTitleClass, "mt-4")}>Our Mission</h2>
          <div className={cn(bodyClass, "mt-5 space-y-6")}>
            <p>
              We are committed to providing financial, material, and logistical
              support to missionaries, enabling them to carry out their work
              efficiently and sustainably. JMF exists to bridge the gap between
              those who want to give and those who serve on the front lines of
              global missions.
            </p>
            <p>
              Soul-winning is spiritual warfare, and missionaries stand on the
              front lines for the Gospel. They were never meant to fight alone.
              Through Jesus&apos; Mission Fund, your giving goes where you
              cannot, speaking for Christ in lives and nations beyond your
              reach.
            </p>
          </div>
        </Reveal>
        <Reveal from="right" className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/img4.jpg"
            alt="Missionaries gathered in prayer"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </Section>

      <Section className="bg-accent" containerClassName={splitGrid}>
        <Reveal
          from="left"
          className="relative order-2 aspect-[4/3] overflow-hidden lg:order-1"
        >
          <Image
            src="/about-vision.jpg"
            alt="Global vision for the Gospel"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal from="right" className="order-1 lg:order-2">
          <Eyebrow icon={Eye}>Our Vision</Eyebrow>
          <h2 className={cn(sectionTitleClass, "mt-4")}>
            A World Reached for Christ
          </h2>
          <div className={cn(bodyClass, "mt-5 space-y-6")}>
            <p>
              We envision a world where every missionary called to the harvest
              is fully equipped, sustainably supported, and never hindered by
              lack. A world where the Gospel reaches every corner through
              empowered laborers and faithful partners.
            </p>
            <p>
              Kingdom impact is not limited by geography—it is multiplied
              through obedience. When you give, you send missionaries to
              unreached areas, fund evangelism and discipleship efforts, and
              strengthen families who have answered the call.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            title="Our Core Values"
            description="These principles guide everything we do and every relationship we build."
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              delay={index * 0.1}
              className="border border-border bg-card p-6 text-center transition-colors hover:border-input"
            >
              <span className="mx-auto mb-4 flex size-14 items-center justify-center bg-primary/10">
                <Icon aria-hidden="true" className="size-7 text-primary" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <Reveal>
          <SectionHeader
            title="Meet Our Team"
            description="Dedicated individuals committed to serving missionaries and donors alike."
          />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 0.1}
              className="group overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
