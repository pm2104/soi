"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Hammer, ChevronRight } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Search,
  Hammer,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How SOI Works"
          subtitle="Get started in three simple steps. No complicated processes, just results."
        />

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || UserPlus;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover border border-border/50 transition-all duration-300 text-center">
                    {/* Step Number */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center">
                        <span className="text-2xl font-extrabold text-white">
                          {step.step}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-text mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Mobile */}
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="flex justify-center my-4 lg:hidden">
                      <ChevronRight className="h-6 w-6 text-accent rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}