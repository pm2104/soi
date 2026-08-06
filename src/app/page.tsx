import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HeroBanner from "@/components/sections/HeroBanner";
import CategoryGrid from "@/components/sections/CategoryGrid";
import LaunchSection from "@/components/sections/LaunchSection";
import MembershipSection from "@/components/sections/MembershipSection";
import HowItWorks from "@/components/sections/HowItWorks";
import RolesSection from "@/components/sections/RolesSection";
import ProfessionalsSection from "@/components/sections/ProfessionalsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <HeroBanner />
      <CategoryGrid />
      <LaunchSection />
      <HowItWorks />
      <RolesSection />
      <ProfessionalsSection />
      <MembershipSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}