import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#f8f8f3] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl border-y border-[#dfe5dc] py-12 md:flex md:items-center md:justify-between md:gap-10 md:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#587261]">Take part</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1c2c22] md:text-5xl">The work moves forward together.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#66746a]">
            Your support helps missionaries give their time and attention to the communities they serve.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
          <Link href="/partner" className="inline-flex items-center gap-3 bg-[#174b35] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#103a29]">
            Partner with us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/volunteer" className="inline-flex items-center border border-[#b8c4b9] px-6 py-4 text-sm font-semibold text-[#315b42] transition-colors hover:border-[#315b42]">
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
