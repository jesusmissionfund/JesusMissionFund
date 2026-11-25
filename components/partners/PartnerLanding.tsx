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
    <section className="bg-[#f8f8f3] px-6 pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-xl"><p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#587261]">Partnership · Jesus&apos; Mission Fund</p><h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#1c2c22] sm:text-6xl lg:text-[4.35rem]">The mission needs those who <span className="font-serif italic font-normal text-[#366448]">go</span> and those who <span className="font-serif italic font-normal text-[#366448]">send.</span></h1><p className="mt-7 max-w-lg text-base leading-7 text-[#66746a] md:text-lg md:leading-8">Missionaries carry the Gospel into their communities. Partners help provide the practical support that lets them stay focused on that work.</p><div className="mt-9 flex flex-wrap items-center gap-5"><a href="#give" className="inline-flex items-center gap-3 bg-[#174b35] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#103a29]">Choose how to give <ArrowRight className="h-4 w-4" /></a><Link href="#impact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#315b42] underline decoration-[#a8b9aa] underline-offset-4 hover:decoration-[#315b42]">See what partnership supports <ArrowDown className="h-4 w-4" /></Link></div></div>
        <div className="relative pl-0 sm:pl-6"><div className="relative aspect-[4/3] overflow-hidden bg-[#e6e9e0]"><Image src="/pexels-rdne-6646949.jpg" alt="Volunteers organizing practical support" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div></div>
      </div>
    </section>
    <section id="give" className="scroll-mt-24 bg-white px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div id="mobile-money" className="scroll-mt-24"><MomoWalkthrough /></div>
      </div>
    </section>
    <section id="impact" className="scroll-mt-24 bg-[#f8f8f3] px-6 py-16 md:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20"><div className="relative min-h-[320px] overflow-hidden bg-[#e6e9e0] sm:min-h-[460px]"><Image src="/img5.jpg" alt="Missionary preparing materials for ministry" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div><div className="self-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#587261]">Where support goes</p><h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#1c2c22] md:text-4xl">Practical help for the work of the Gospel.</h2><p className="mt-5 max-w-xl text-base leading-7 text-[#66746a]">Partnership helps provide for needs that keep missionaries present and equipped in the communities they serve.</p><ul className="mt-8 divide-y divide-[#dfe5dc] border-y border-[#dfe5dc]">{supportAreas.map(({ icon: Icon, title, description }, index) => <li key={title} className="grid grid-cols-[38px_1fr] gap-4 py-4"><span className="pt-1 text-xs font-semibold text-[#8ca38e]">0{index + 1}</span><div className="flex gap-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#315b42]" /><div><h3 className="text-sm font-semibold text-[#1c2c22]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#66746a]">{description}</p></div></div></li>)}</ul></div></div></section>
  </>;
}
