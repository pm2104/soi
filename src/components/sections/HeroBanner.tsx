"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="bg-navy pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-card"
        >
          <div className="aspect-[21/9] md:aspect-[21/7] relative bg-gradient-to-r from-navy-600 via-navy-400 to-accent/30">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80"
              alt="Construction site overview"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                    Trusted Nationwide
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Building India's Future Together
                  </h3>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-accent">5000+</p>
                    <p className="text-xs text-white/60">Professionals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-accent">28+</p>
                    <p className="text-xs text-white/60">States</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-accent">20+</p>
                    <p className="text-xs text-white/60">Professions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}