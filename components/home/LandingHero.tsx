"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f3] pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#587261]">
              Jesus&apos; Mission Fund
            </p>
            <h1 className="text-[2.8rem] font-semibold leading-[1.04] tracking-[-0.045em] text-[#1c2c22] sm:text-6xl lg:text-[4.4rem]">
              Behind every mission, <span className="font-serif italic font-normal text-[#366448]">a community.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#66746a] md:text-lg md:leading-8">
              We help missionaries stay focused on sharing the Gospel by bringing practical support and committed partners alongside them.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/partner" className="inline-flex items-center gap-3 bg-[#174b35] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#103a29]">
                Become a partner <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="text-sm font-semibold text-[#315b42] underline decoration-[#a8b9aa] underline-offset-4 hover:decoration-[#315b42]">
                Learn about our work
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8ede6]">
              <video
                src="/JesusMissionFund_Intro.mp4"
                muted
                playsInline
                controls
                aria-label="Introduction to Jesus' Mission Fund"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-right text-xs uppercase tracking-[0.14em] text-[#718076]">Our mission, in a few minutes</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
