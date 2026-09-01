"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";

const faqItems = [
  {
    question: "Is SOI affiliated with any government body?",
    answer:
      "No. SOI (Supervisors of India) is a private platform. It is not affiliated with, endorsed by, or associated with the Government of India or any government authority.",
  },
  {
    question: "What types of construction professionals can register?",
    answer:
      "SOI welcomes Site Supervisors, Civil Engineers, Architects, Interior Designers, Project Managers, Contractors, Quantity Surveyors, MEP Engineers, and other construction professionals.",
  },
  {
    question: "How do I know a professional is verified?",
    answer:
      "Verified professionals have completed SOI's verification process and display a Verified badge on their profile. This helps clients identify professionals whose submitted details have been reviewed.",
  },
  {
    question: "What does registration include for professionals?",
    answer:
      "Professionals can create a profile, showcase their experience and expertise, add project history and availability, and become discoverable by clients looking for construction professionals.",
  },
  {
    question: "Can I contact multiple professionals at the same time?",
    answer:
      "Yes. Clients can browse relevant professionals and send inquiries to the professionals they are interested in working with.",
  },
  {
    question: "How are fees agreed between client and professional?",
    answer:
      "Fees are discussed and agreed directly between the client and professional based on the project requirements, scope of work, experience, and mutually agreed terms.",
  },
  {
    question: "Are there any fees for professionals?",
    answer:
      "Registration is free. Any applicable paid services or premium features will be clearly communicated by SOI before they are used.",
  },
  {
    question: "What types of construction projects are supported?",
    answer:
      "SOI supports a wide range of construction and built-environment projects, including residential, commercial, renovation, interior, civil, infrastructure, and other construction-related requirements.",
  },
  {
    question: "Is my contact information shared publicly?",
    answer:
      "Your contact information is not displayed publicly on your profile unless specifically intended by the platform. Clients and professionals connect through the platform according to SOI's communication and privacy policies.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            <HelpCircle className="h-4 w-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary-text">
            Everything you need to know about SOI and how the platform works.
          </p>
        </motion.div>

        <FAQAccordion items={faqItems} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-secondary-text mb-4">Still have questions?</p>
          <Link href="#contact">
            <Button variant="secondary" className="group">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}