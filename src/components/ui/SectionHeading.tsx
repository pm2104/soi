"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4",
          light ? "text-white" : "text-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/70" : "text-secondary-text"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}