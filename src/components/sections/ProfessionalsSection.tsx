"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PROFESSIONALS } from "@/lib/constants";
import ProfessionalCard from "@/components/cards/ProfessionalCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function ProfessionalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="professionals" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <SectionHeading
              title="Meet Our Professionals"
              subtitle="Discover top-rated construction experts verified and ready for your next project"
              align="left"
              className="mb-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl bg-white border border-border shadow-soft hover:shadow-hover transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-navy" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl bg-white border border-border shadow-soft hover:shadow-hover transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-navy" />
            </button>
          </div>
        </div>

        {/* Mobile Carousel / Desktop Grid */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROFESSIONALS.map((professional, index) => (
            <div key={professional.name} className="snap-start shrink-0 w-[280px] lg:w-auto">
              <ProfessionalCard {...professional} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="group">
            View All Professionals
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}