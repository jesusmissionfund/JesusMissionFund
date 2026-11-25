"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function MissionaryCTA() {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Take the <span className="text-gradient">Next Step?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            If you believe this support will help you fulfill your calling more
            effectively, we invite you to apply today.
          </p>
          <Link href="/missionary/apply" className="group w-full justify-center sm:w-auto flex items-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            Apply for support
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
