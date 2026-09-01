"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, HardHat } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const clientSteps = [
  {
    number: 1,
    title: "Create an Account",
    description: "Sign up as a Client/Owner — it's free and takes under 2 minutes.",
  },
  {
    number: 2,
    title: "Post Your Requirement",
    description: "Describe your project type, location, timeline, and the type of professional you need.",
  },
  {
    number: 3,
    title: "Receive Professional Matches",
    description: "Browse verified professional profiles filtered by profession, city, experience, and availability.",
  },
  {
    number: 4,
    title: "Connect & Hire",
    description: "Send an inquiry directly to your preferred professional and start your project.",
  },
];

const professionalSteps = [
  {
    number: 1,
    title: "Register Free",
    description: "Sign up as a Professional — choose your profession type and create your profile in minutes.",
  },
  {
    number: 2,
    title: "Complete Your Profile",
    description: "Add your experience, expertise, city, fees, project history, and availability to stand out.",
  },
  {
    number: 3,
    title: "Get Verified",
    description: "Complete our verification process to earn a Verified badge — boosting trust with potential clients.",
  },
  {
    number: 4,
    title: "Receive Leads",
    description: "Get contacted directly by clients looking for your specific expertise across India.",
  },
];

function StepBadge({ number, variant }: { number: number; variant: "navy" | "accent" }) {
  return (
    <div
      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-sm ${
        variant === "navy" ? "bg-navy text-white" : "bg-accent text-white"
      }`}
    >
      {number}
    </div>
  );
}

function ProcessColumn({
  title,
  icon: Icon,
  steps,
  ctaText,
  ctaHref,
  badgeVariant,
  delay,
}: {
  title: string;
  icon: React.ElementType;
  steps: typeof clientSteps;
  ctaText: string;
  ctaHref: string;
  badgeVariant: "navy" | "accent";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="bg-white rounded-2xl border border-border/50 p-8 shadow-soft hover:shadow-hover transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <div className="h-1 w-12 bg-accent rounded-full mt-1.5" />
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <StepBadge number={step.number} variant={badgeVariant} />
            <div>
              <h3 className="font-bold text-navy mb-1">{step.title}</h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border/50">
        <Link href={ctaHref}>
          <Button
            variant={badgeVariant === "navy" ? "secondary" : "primary"}
            fullWidth
            className="group"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProcessColumn
            title="For Clients & Owners"
            icon={Users}
            steps={clientSteps}
            ctaText="Post a Requirement"
            ctaHref="/hire-professional"
            badgeVariant="navy"
            delay={0}
          />
          <ProcessColumn
            title="For Professionals"
            icon={HardHat}
            steps={professionalSteps}
            ctaText="Join as Professional"
            ctaHref="/professional/onboarding"
            badgeVariant="accent"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}