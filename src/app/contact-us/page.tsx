import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Supervisors of India",
  description:
    "Get in touch with Supervisors of India. Have questions about joining SOI or posting a project? Our team is ready to assist you.",
  keywords: [
    "contact supervisors of india",
    "contact SOI",
    "construction support india",
    "hire professional help",
    "SOI customer service",
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}