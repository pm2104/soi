"use client";

import { motion } from "framer-motion";
import { Users, HardHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";

export default function BuiltForEveryone() {
  return (
    <section className="py-20 md:py-28 bg-light-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Built for Everyone in Construction
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Whether you're looking to hire talent or showcase your expertise, 
            SOI is designed for every stakeholder in the construction ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clients Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl border border-border p-8 hover:shadow-card transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-xl bg-navy/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-navy" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Clients & Project Owners</h3>
                <p className="text-sm text-secondary-text">
                  Find, verify, and hire construction professionals
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Browse verified professional profiles",
                "Filter by city, expertise, and experience",
                "View portfolios, qualifications, and reviews",
                "Connect directly via WhatsApp",
                "Post projects and receive proposals",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary-text">
                  <span className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/hire-professional">
              <Button variant="secondary" fullWidth className="group">
                Find Professionals
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Professionals Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl border border-border p-8 hover:shadow-card transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <HardHat className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Construction Professionals</h3>
                <p className="text-sm text-secondary-text">
                  Showcase your skills and grow your client base
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-navy mb-3">
                Categories we welcome:
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat.name}
                    className="px-3 py-1.5 bg-light-gray text-secondary-text text-xs font-medium rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Create a verified professional profile",
                "Upload portfolio and certifications",
                "Get discovered by clients across India",
                "Receive direct project inquiries",
                "Build credibility with SOI approval badge",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary-text">
                  <span className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/#">
              <Button fullWidth className="group">
                Join as Professional
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}