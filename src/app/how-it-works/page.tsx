import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HowItWorksHero from "@/components/sections/HowItWorksHero";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import HowItWorksCTA from "@/components/sections/HowItWorksCTA";

export const metadata: Metadata = {
  title: "How It Works | Supervisors of India",
  description:
    "Learn how SOI works for clients and construction professionals. Simple, transparent, and built for India's construction industry.",
  keywords: [
    "how it works",
    "hire construction professionals",
    "join as professional",
    "SOI process",
    "construction marketplace india",
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <HowItWorksHero />
        <ProcessSection />
        <FAQSection />
        <HowItWorksCTA />
      </main>
      <Footer />
    </>
  );
}