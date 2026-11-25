import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, CarFront, Church, Home, Megaphone } from "lucide-react";
import MomoWalkthrough from "./MomoWalkthrough";

const supportAreas = [
  { icon: Megaphone, title: "Evangelism", description: "Resources for local outreach and sharing the Gospel." },
  { icon: BookOpen, title: "Discipleship", description: "Materials that help new believers grow in faith." },
  { icon: CarFront, title: "Getting there", description: "Transportation for mission work and community visits." },
  { icon: Home, title: "Family support", description: "Practical support for missionaries and their families." },
  { icon: Church, title: "Church planting", description: "Support for strategic church planting initiatives." },
];

export default function PartnerLanding() {
  return <>
    <section className="bg-background px-6 pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-xl"><p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">Partnership · Jesus&apos; Mission Fund</p><h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.35rem]">The mission needs those who <span className="font-serif italic font-normal text-brand">go</span> and those who <span className="font-serif italic font-normal text-brand">send.</span></h1><p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground md:text-lg md:leading-8">Missionaries carry the Gospel into their communities. Partners help provide the practical support that lets them stay focused on that work.</p><div className="mt-9 flex flex-wrap items-center gap-5"><a href="#give" className="inline-flex items-center gap-3 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">Choose how to give <ArrowRight className="h-4 w-4" /></a><Link href="#impact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">See what partnership supports <ArrowDown className="h-4 w-4" /></Link></div></div>
        <div className="relative pl-0 sm:pl-6"><div className="relative aspect-[4/3] overflow-hidden bg-secondary"><Image src="/pexels-rdne-6646949.jpg" alt="Volunteers organizing practical support" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div></div>
      </div>
    </section>
    <section id="give" className="scroll-mt-24 bg-card px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div id="mobile-money" className="scroll-mt-24"><MomoWalkthrough /></div>
      </div>
    </section>
    <section id="impact" className="scroll-mt-24 bg-background px-6 py-16 md:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20"><div className="relative min-h-[320px] overflow-hidden bg-secondary sm:min-h-[460px]"><Image src="/img5.jpg" alt="Missionary preparing materials for ministry" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div><div className="self-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">Where support goes</p><h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">Practical help for the work of the Gospel.</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Partnership helps provide for needs that keep missionaries present and equipped in the communities they serve.</p><ul className="mt-8 divide-y divide-border border-y border-border">{supportAreas.map(({ icon: Icon, title, description }, index) => <li key={title} className="grid grid-cols-[38px_1fr] gap-4 py-4"><span className="pt-1 text-xs font-semibold text-brand-muted/70">0{index + 1}</span><div className="flex gap-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><div><h3 className="text-sm font-semibold text-foreground">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></div></li>)}</ul></div></div></section>
  </>;
}
