"use client";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-0 py-2 text-secondary text-xs font-bold uppercase tracking-[0.18em] mb-5">
              <Shield className="w-4 h-4 mr-2" />
              For Partners
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-[1.08] tracking-tight">
              Stand behind{" "}
              <span className="font-serif italic font-normal">
                the frontline.
              </span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Your gift helps missionaries meet practical needs as they serve
              people in their communities.
            </p>

            <Link
              href="/partner"
              className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Support missionaries
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <Image
                src="/pexels-rdne-6646949.jpg"
                alt="Partners standing together in prayer"
                width={800}
                height={600}
                className="w-full h-full object-cover aspect-4/3"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
