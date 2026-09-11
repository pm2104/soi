"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v2h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-5 text-accent font-bold text-sm uppercase tracking-widest mb-6"
        >
          <span className="h-[2px] w-20 bg-accent" />
          <span>About SOI</span>
          <span className="h-[2px] w-20 bg-accent" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-10"
        >
          <span className="text-white">About </span>
          <span className="text-accent">
            Supervisors of India
          </span>
        </motion.h1>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-white/80">
          
          {/* Paragraph 1 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed mb-7"
          >
            <strong className="text-white font-extrabold">
              SUPERVISORS OF INDIA (SOI)
            </strong>{" "}
            is India's dedicated construction professional platform,
            connecting trusted individuals and organizations across every
            stage of the construction lifecycle.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed mb-7"
          >
            At SOI, we believe supervision is not a job title—it is a
            responsibility. Anyone who plans, designs, manages, coordinates,
            executes, inspects, or ensures the successful delivery of a
            construction project is a Supervisor.
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed mb-7"
          >
            From residential, commercial, industrial, and infrastructure
            projects to interiors, renovation, and specialised engineering
            works, SOI brings together the professionals who build the nation
            with quality, safety, accountability, and excellence.
          </motion.p>

          {/* Closing Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-accent font-bold italic leading-relaxed"
          >
            Because every successful project is built under responsible
            supervision.
          </motion.p>

        </div>
      </div>
    </section>
  );
}