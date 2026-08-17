"use client";

import { motion } from "framer-motion";
import { Building2, HardHat, ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  type: "client" | "professional";
  index: number;
}

const content = {
  client: {
    icon: Building2,
    title: "Client / Owner",
    description:
      "Find verified construction professionals for your projects. From small renovations to large developments.",
    features: [
      "Post projects for free",
      "Compare professionals",
      "Verified reviews & ratings",
      "Secure payment protection",
    ],
    cta: "Hire Professionals",
    ctaVariant: "primary" as const,
  },
  professional: {
    icon: HardHat,
    title: "Construction Professional",
    description:
      "Showcase your expertise and connect with clients looking for your specific skills across India.",
    features: [
      "Create professional profile",
      "Get discovered by clients",
      "Receive project inquiries",
      "Build your reputation",
    ],
    cta: "Join as Professional",
    ctaVariant: "secondary" as const,
  },
};

export default function RoleCard({ type, index }: RoleCardProps) {
  const data = content[type];
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative rounded-2xl p-8 md:p-10 transition-all duration-300",
        type === "client"
          ? "bg-navy text-white shadow-card hover:shadow-hover"
          : "bg-white text-text shadow-soft hover:shadow-hover border border-border/50"
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
          type === "client" ? "bg-accent/20" : "bg-accent/10"
        )}
      >
        <Icon
          className={cn(
            "h-8 w-8",
            type === "client" ? "text-accent" : "text-accent"
          )}
        />
      </div>

      <h3
        className={cn(
          "text-2xl font-bold mb-3",
          type === "client" ? "text-white" : "text-text"
        )}
      >
        {data.title}
      </h3>
      <p
        className={cn(
          "text-base leading-relaxed mb-6",
          type === "client" ? "text-white/70" : "text-secondary-text"
        )}
      >
        {data.description}
      </p>

      <ul className="space-y-3 mb-8">
        {data.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className={cn(
                "mt-0.5 p-0.5 rounded-full",
                type === "client" ? "bg-accent/20" : "bg-accent/10"
              )}
            >
              <Check className="h-3.5 w-3.5 text-accent" />
            </div>
            <span
              className={cn(
                "text-sm",
                type === "client" ? "text-white/80" : "text-secondary-text"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {type === "client" ? (
        <Button variant="primary" fullWidth className="group">
          {data.cta}
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      ) : (
        <JoinAsProfessionalButton
          variant="secondary"
          fullWidth
          showArrow
          className="border-navy/10"
        />
      )}
    </motion.div>
  );
}