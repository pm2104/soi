"use client";

import { motion } from "framer-motion";
import {
  HardHat,
  Building2,
  PenTool,
  Sofa,
  ClipboardList,
  Calculator,
  Zap,
  MessageSquare,
  Box,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  HardHat,
  Building2,
  PenTool,
  Sofa,
  ClipboardList,
  Calculator,
  Zap,
  MessageSquare,
  Box,
  MoreHorizontal,
};

interface CategoryCardProps {
  name: string;
  icon: string;
  description: string;
  index: number;
}

export default function CategoryCard({
  name,
  icon,
  description,
  index,
}: CategoryCardProps) {
  const Icon = iconMap[icon] || HardHat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "group relative bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-hover",
        "border border-border/50 cursor-pointer transition-all duration-300"
      )}
    >
      <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy/5 group-hover:bg-accent/10 transition-colors duration-300">
        <Icon className="h-7 w-7 text-navy group-hover:text-accent transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-bold text-text mb-1">{name}</h3>
      <p className="text-sm text-secondary-text">{description}</p>
    </motion.div>
  );
}