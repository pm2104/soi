"use client";

import { motion } from "framer-motion";
import { Rocket, TrendingUp, MapPin, Users, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { STATS } from "@/lib/constants";

export default function LaunchSection() {
  return (
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="accent" className="mb-6">
              <Rocket className="h-3 w-3 mr-1" />
              Live Now
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            SOI is Officially Launched
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Join India's fastest growing construction professional network.
            Be among the first to experience the future of construction hiring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg">Register Now</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
            >
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl md:text-4xl font-extrabold text-accent">
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-accent">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Early Bird Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 md:p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
             Early Bird Offer — Free 6-Month Priority Listing
          </h3>
          <p className="text-white/90 max-w-xl mx-auto">
            The first 100 professionals in each profession category per state get 2 months of free Premium membership — automatically on registration. No payment needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}