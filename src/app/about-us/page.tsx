import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import WhySOI from "@/components/sections/WhySOI";
import BuiltForEveryone from "@/components/sections/BuiltForEveryone";
import JoinNetworkCTA from "@/components/sections/JoinNetworkCTA";

export const metadata: Metadata = {
  title: "About Us | Supervisors of India",
  description:
    "Learn about Supervisors of India (SOI) — India's premier marketplace connecting verified construction professionals with clients. Built for trust, quality, and pan-India reach.",
  keywords: [
    "about supervisors of india",
    "construction marketplace india",
    "hire construction professionals",
    "verified site supervisors",
    "civil engineers india",
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <WhySOI />
        <BuiltForEveryone />
        <JoinNetworkCTA />
      </main>
      <Footer />
    </>
  );
}