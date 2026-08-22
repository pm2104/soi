"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProfessionalProfile } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioGallery from "@/components/marketplace/PortfolioGallery";
import WhatsAppButton from "@/components/marketplace/WhatsAppButton";
import Badge from "@/components/ui/Badge";
import { MapPin, Briefcase, Award, Calendar, Building2, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfessionalProfileClientProps {
  uid: string;
}

export default function ProfessionalProfileClient({ uid }: ProfessionalProfileClientProps) {
  const pathname = usePathname();
  const actualUid = uid === "placeholder" ? pathname.split("/").pop() || "" : uid;

  const [professional, setProfessional] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!actualUid || actualUid === "placeholder") {
        setLoading(false);
        setError("Invalid profile ID");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "professionals", actualUid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Professional not found");
          setProfessional(null);
          return;
        }

        const data = docSnap.data() as ProfessionalProfile;

        if (data.status !== "approved") {
          setError("This profile is not publicly available");
          setProfessional(null);
          return;
        }

        setProfessional(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        setProfessional(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [actualUid]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-secondary-text">Loading profile...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !professional) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy mb-2">{error || "Not Found"}</h1>
            <Link href="/hire-professional" className="text-accent font-semibold hover:underline">
              Back to Professionals
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-20 lg:pb-0">
        {/* Header */}
        <section className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/hire-professional" className="inline-flex items-center text-secondary-text hover:text-navy mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to professionals
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-light-gray flex-shrink-0">
                {professional.photoURL ? (
                  <Image
                    src={professional.photoURL}
                    alt={professional.displayName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-accent/10 text-accent text-2xl font-bold">
                    {professional.displayName?.charAt(0) || "P"}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy">{professional.displayName}</h1>
                  <Badge variant="accent">SOI Approved</Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-secondary-text mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {professional.professionalType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {professional.specialization}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {professional.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {professional.experienceYears} Years
                  </span>
                  {professional.organization && (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {professional.organization}
                    </span>
                  )}
                </div>

                <div className="hidden lg:block">
                  <WhatsAppButton phone={professional.phone} name={professional.displayName} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-navy mb-3">About</h2>
                <p className="text-secondary-text leading-relaxed">{professional.bio || "No bio provided."}</p>
              </div>

              {/* Portfolio */}
              {professional.portfolioPhotos && professional.portfolioPhotos.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">Work Portfolio</h2>
                  <PortfolioGallery photos={professional.portfolioPhotos} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Professional Info */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-navy mb-4">Professional Information</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-secondary-text">Type</dt>
                    <dd className="font-semibold text-navy">{professional.professionalType || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-secondary-text">Specialization</dt>
                    <dd className="font-semibold text-navy">{professional.specialization || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-secondary-text">Experience</dt>
                    <dd className="font-semibold text-navy">{professional.experienceYears || 0} Years</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-secondary-text">City</dt>
                    <dd className="font-semibold text-navy">{professional.city || "—"}</dd>
                  </div>
                  {professional.organization && (
                    <div>
                      <dt className="text-sm text-secondary-text">Organization</dt>
                      <dd className="font-semibold text-navy">{professional.organization}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Qualifications */}
              {professional.qualifications && professional.qualifications.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-3">Qualifications</h2>
                  <ul className="space-y-2">
                    {professional.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-secondary-text">
                        <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {professional.certifications && professional.certifications.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-3">Certifications</h2>
                  <ul className="space-y-2">
                    {professional.certifications.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-secondary-text">
                        <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Expertise */}
              {professional.areasOfExpertise && professional.areasOfExpertise.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-3">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {professional.areasOfExpertise.map((area, i) => (
                      <span key={i} className="px-3 py-1 bg-light-gray text-secondary-text text-sm rounded-full font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Online Presence */}
              {(professional.linkedinUrl || professional.portfolioUrl) && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-3">Online Presence</h2>
                  <div className="space-y-2">
                    {professional.linkedinUrl && (
                      <a
                        href={professional.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {professional.portfolioUrl && (
                      <a
                        href={professional.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        Portfolio Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-40">
          <WhatsAppButton phone={professional.phone} name={professional.displayName} />
        </div>
      </main>
      <Footer />
    </>
  );
}