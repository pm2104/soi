"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MembershipCardProps {
  name: string;
  badge: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  index: number;
}

export default function MembershipCard({
  name,
  badge,
  price,
  description,
  features,
  cta,
  highlighted,
  index,
}: MembershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        "relative rounded-2xl p-8 transition-all duration-300",
        highlighted
          ? "bg-navy text-white shadow-card hover:shadow-hover scale-105 z-10"
          : "bg-white text-text shadow-soft hover:shadow-hover border border-border/50"
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge variant="accent">Most Popular</Badge>
        </div>
      )}

      <div className="mb-6">
        <Badge
          variant={highlighted ? "outline" : "default"}
          className={highlighted ? "border-white/20 text-white/70" : ""}
        >
          {badge}
        </Badge>
      </div>

      <h3
        className={cn(
          "text-2xl font-bold mb-2",
          highlighted ? "text-white" : "text-text"
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          "text-sm mb-6",
          highlighted ? "text-white/60" : "text-secondary-text"
        )}
      >
        {description}
      </p>

      <div className="mb-6">
        <span
          className={cn(
            "text-4xl font-extrabold",
            highlighted ? "text-white" : "text-text"
          )}
        >
          {price}
        </span>
        {price !== "Custom" && (
          <span
            className={cn(
              "text-sm ml-1",
              highlighted ? "text-white/50" : "text-secondary-text"
            )}
          >
            /forever
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className={cn(
                "mt-0.5 p-0.5 rounded-full",
                highlighted ? "bg-accent/20" : "bg-accent/10"
              )}
            >
              <Check
                className={cn(
                  "h-3.5 w-3.5",
                  highlighted ? "text-accent" : "text-accent"
                )}
              />
            </div>
            <span
              className={cn(
                "text-sm",
                highlighted ? "text-white/80" : "text-secondary-text"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "primary" : "secondary"}
        fullWidth
        className={!highlighted ? "border-navy/10" : ""}
      >
        {cta}
      </Button>
    </motion.div>
  );
}