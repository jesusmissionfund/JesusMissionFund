"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Shield } from "lucide-react";

export default function MissionaryPartnerHero() {
  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-accent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 text-secondary text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Jesus&apos; Mission Fund
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Called to serve? Apply for support.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Tell us about your ministry and the practical support that would
            help you serve.
          </p>
          <Link
            href="#application-process"
            className="mt-8 inline-flex items-center gap-3 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            View application steps{" "}
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
