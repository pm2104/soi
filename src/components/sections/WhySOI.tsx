"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Building2, MapPin, Award } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every professional on SOI undergoes identity verification and background checks. We review qualifications, experience, and portfolio before approval.",
  },
  {
    icon: Building2,
    title: "Construction Focused",
    description:
      "Built exclusively for the construction industry. No generic freelancers — only specialists who understand sites, structures, and standards.",
  },
  {
    icon: MapPin,
    title: "PAN India Network",
    description:
      "From metro cities to tier-2 towns, our network spans all 28 states and UTs. Find local expertise or pan-India project support with ease.",
  },
  {
    icon: Award,
    title: "Quality & Accountability",
    description:
      "We maintain strict quality standards. Professionals are rated, reviewed, and held accountable — so you hire with complete confidence.",
  },
];

export default function WhySOI() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Why We Built SOI
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            India's construction sector deserves a platform that understands its 
            unique challenges. We built SOI to bridge the trust gap between 
            clients and construction professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}