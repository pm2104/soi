import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import ProfessionalForm from "@/components/professional/ProfessionalForm";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Complete Your Profile | Supervisors of India",
  description:
    "Set up your professional profile on SOI to start connecting with clients.",
};

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Complete Your Profile"
            subtitle="Tell us about your expertise so clients can find and trust you."
            className="mb-12"
          />
          <AuthGuard requireProfile={false}>
            <ProfessionalForm />
          </AuthGuard>
        </div>
      </main>
      <Footer />
    </>
  );
}