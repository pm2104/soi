"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Gift,
  Headphones,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Building2,
  Gift,
  Headphones,
};

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose SOI"
          subtitle="Built with trust, transparency, and the construction industry at its core."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover border border-border/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}