"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-white/80">
              Start Your Journey Today
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Build Something{" "}
            <span className="text-accent">Amazing?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Join thousands of construction professionals and clients who are
            already transforming India's building landscape through SOI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Talk to Sales
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/40">
            No credit card required. Free forever for basic access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}