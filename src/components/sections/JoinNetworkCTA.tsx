"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function JoinNetworkCTA() {
  return (
    <>
      {/* Join the SOI Network */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[425px] flex items-center justify-center py-16 md:py-20">
            <div className="text-center max-w-4xl mx-auto w-full">

              {/* Building Icon */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-5"
              >
                <Building2
                  className="w-11 h-11 text-accent"
                  strokeWidth={2.3}
                />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-[26px] md:text-[28px] leading-tight font-extrabold text-navy mb-4"
              >
                Join the SOI Network
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="
                  text-[17px]
                  md:text-[18px]
                  leading-[1.55]
                  text-slate-500
                  max-w-[780px]
                  mx-auto
                "
              >
                Whether you are a construction professional looking to grow your
                career, or a project owner
                <br className="hidden md:block" />
                {" "}searching for trusted talent — SOI is your platform.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  gap-3
                  mt-8
                "
              >
                {/* Contact Us */}
              <Link href="/contact-us" className="inline-block">
                <Button
                  size="lg"
                  className="min-w-[155px] bg-navy text-white hover:bg-navy/90"
                >
                  Contact Us
                </Button>
              </Link>

                {/* How It Works */}
                <Link
                  href="/how-it-works"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="
                      w-full
                      sm:w-[178px]
                      h-[54px]
                      rounded-[10px]
                      text-[17px]
                      font-bold
                      border-2
                      border-navy
                      text-navy
                      bg-white
                      hover:bg-navy
                      hover:text-white
                      transition-colors
                    "
                  >
                    How It Works
                  </Button>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="relative bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[158px] flex items-center justify-center py-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                text-center
                text-[16px]
                md:text-[18px]
                leading-[1.55]
                text-slate-500
                max-w-[900px]
                mx-auto
              "
            >
              <strong className="text-navy font-extrabold">
                Important Disclaimer:
              </strong>{" "}
              SOI (Supervisors of India) is a private platform and is not
              affiliated with, endorsed by,
              <br className="hidden lg:block" />
              {" "}or associated with the Government of India or any government
              authority.
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}