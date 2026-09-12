"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProfessionalProfile } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/marketplace/WhatsAppButton";
import Badge from "@/components/ui/Badge";
import {
  MapPin,
  Briefcase,
  Award,
  Calendar,
  Building2,
  Link as LinkIcon,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfessionalProfileClientProps {
  uid: string;
}

export default function ProfessionalProfileClient({
  uid,
}: ProfessionalProfileClientProps) {
  const pathname = usePathname();

  const actualUid =
    uid === "placeholder" ? pathname.split("/").pop() || "" : uid;

  const [professional, setProfessional] =
    useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Portfolio viewer state
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [isZoomed, setIsZoomed] = useState(false);

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

  // Open portfolio viewer
  const openPhotoViewer = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsZoomed(false);
  };

  // Close portfolio viewer
  const closePhotoViewer = () => {
    setSelectedPhotoIndex(null);
    setIsZoomed(false);
  };

  // Previous image
  const showPreviousPhoto = () => {
    if (
      selectedPhotoIndex === null ||
      !professional?.portfolioPhotos?.length
    ) {
      return;
    }

    const total = professional.portfolioPhotos.length;

    setSelectedPhotoIndex((current) =>
      current === null ? null : (current - 1 + total) % total
    );

    setIsZoomed(false);
  };

  // Next image
  const showNextPhoto = () => {
    if (
      selectedPhotoIndex === null ||
      !professional?.portfolioPhotos?.length
    ) {
      return;
    }

    const total = professional.portfolioPhotos.length;

    setSelectedPhotoIndex((current) =>
      current === null ? null : (current + 1) % total
    );

    setIsZoomed(false);
  };

  // Keyboard controls + body scroll lock
  useEffect(() => {
    if (selectedPhotoIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          closePhotoViewer();
          break;

        case "ArrowLeft":
          showPreviousPhoto();
          break;

        case "ArrowRight":
          showNextPhoto();
          break;

        case "+":
        case "=":
          setIsZoomed(true);
          break;

        case "-":
          setIsZoomed(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex]);

  // Mouse wheel / trackpad navigation
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return;

      if (event.deltaY > 0) {
        showNextPhoto();
      } else {
        showPreviousPhoto();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [selectedPhotoIndex]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-secondary-text">
            Loading profile...
          </div>
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
            <h1 className="text-2xl font-bold text-navy mb-2">
              {error || "Not Found"}
            </h1>

            <Link
              href="/hire-professional"
              className="text-accent font-semibold hover:underline"
            >
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
            <Link
              href="/hire-professional"
              className="inline-flex items-center text-secondary-text hover:text-navy mb-6 transition-colors"
            >
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
                  <h1 className="text-2xl md:text-3xl font-bold text-navy">
                    {professional.displayName}
                  </h1>

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
                  <WhatsAppButton
                    phone={professional.phone}
                    name={professional.displayName}
                  />
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
                <h2 className="text-lg font-bold text-navy mb-3">
                  About
                </h2>

                <p className="text-secondary-text leading-relaxed">
                  {professional.bio || "No bio provided."}
                </p>
              </div>

              {/* Portfolio */}
              {professional.portfolioPhotos &&
                professional.portfolioPhotos.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-navy">
                          Work Portfolio
                        </h2>

                        <p className="text-sm text-secondary-text mt-1">
                          Click an image to view the portfolio
                        </p>
                      </div>

                      <span className="text-sm text-secondary-text">
                        {professional.portfolioPhotos.length}{" "}
                        {professional.portfolioPhotos.length === 1
                          ? "Photo"
                          : "Photos"}
                      </span>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {professional.portfolioPhotos.map((photo, index) => (
                        <button
                          key={`${photo}-${index}`}
                          type="button"
                          onClick={() => openPhotoViewer(index)}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                          aria-label={`View portfolio image ${index + 1}`}
                        >
                          <Image
                            src={photo}
                            alt={`${professional.displayName} portfolio ${
                              index + 1
                            }`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/35 transition-all duration-300 flex items-center justify-center">
                            <div className="h-11 w-11 rounded-full bg-white/95 text-navy flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                              <ZoomIn className="h-5 w-5" />
                            </div>
                          </div>

                          {/* Image Number */}
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/55 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {index + 1} /{" "}
                            {professional.portfolioPhotos.length}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-6">
              {/* Professional Info */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-navy mb-4">
                  Professional Information
                </h2>

                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-secondary-text">Type</dt>
                    <dd className="font-semibold text-navy">
                      {professional.professionalType || "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-secondary-text">
                      Specialization
                    </dt>
                    <dd className="font-semibold text-navy">
                      {professional.specialization || "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-secondary-text">
                      Experience
                    </dt>
                    <dd className="font-semibold text-navy">
                      {professional.experienceYears || 0} Years
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-secondary-text">City</dt>
                    <dd className="font-semibold text-navy">
                      {professional.city || "—"}
                    </dd>
                  </div>

                  {professional.organization && (
                    <div>
                      <dt className="text-sm text-secondary-text">
                        Organization
                      </dt>

                      <dd className="font-semibold text-navy">
                        {professional.organization}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Qualifications */}
              {professional.qualifications &&
                professional.qualifications.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-bold text-navy mb-3">
                      Qualifications
                    </h2>

                    <ul className="space-y-2">
                      {professional.qualifications.map((q, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-secondary-text"
                        >
                          <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Certifications */}
              {professional.certifications &&
                professional.certifications.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-bold text-navy mb-3">
                      Certifications
                    </h2>

                    <ul className="space-y-2">
                      {professional.certifications.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-secondary-text"
                        >
                          <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Areas of Expertise */}
              {professional.areasOfExpertise &&
                professional.areasOfExpertise.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-bold text-navy mb-3">
                      Areas of Expertise
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {professional.areasOfExpertise.map((area, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-light-gray text-secondary-text text-sm rounded-full font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Online Presence */}
              {(professional.linkedinUrl ||
                professional.portfolioUrl) && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-navy mb-3">
                    Online Presence
                  </h2>

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
          <WhatsAppButton
            phone={professional.phone}
            name={professional.displayName}
          />
        </div>
      </main>

      {/* Fullscreen Portfolio Viewer */}
      {selectedPhotoIndex !== null &&
        professional.portfolioPhotos &&
        professional.portfolioPhotos.length > 0 && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio image viewer"
          >
            {/* Top Controls */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-black/40 border-b border-white/10">
              <div className="text-white">
                <p className="font-semibold text-sm sm:text-base">
                  Work Portfolio
                </p>

                <p className="text-white/60 text-xs sm:text-sm">
                  {selectedPhotoIndex + 1} of{" "}
                  {professional.portfolioPhotos.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    !isZoomed
                      ? "bg-white/10 text-white/40 cursor-default"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  aria-label="Zoom out"
                  disabled={!isZoomed}
                >
                  <ZoomOut className="h-5 w-5" />
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(true)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    isZoomed
                      ? "bg-white/10 text-white/40 cursor-default"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  aria-label="Zoom in"
                  disabled={isZoomed}
                >
                  <ZoomIn className="h-5 w-5" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={closePhotoViewer}
                  className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors ml-1"
                  aria-label="Close portfolio viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Image Area */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center px-14 sm:px-20 py-4 overflow-hidden">
              {/* Previous */}
              {professional.portfolioPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={showPreviousPhoto}
                  className="absolute left-3 sm:left-6 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Image */}
              <div
                className={`relative w-full h-full flex items-center justify-center ${
                  isZoomed
                    ? "overflow-auto cursor-zoom-out"
                    : "overflow-hidden cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed((value) => !value)}
              >
                <div
                  className={`relative ${
                    isZoomed
                      ? "min-w-[1000px] min-h-[800px] w-auto h-auto"
                      : "w-full h-full"
                  }`}
                >
                  <Image
                    src={professional.portfolioPhotos[selectedPhotoIndex]}
                    alt={`${professional.displayName} portfolio ${
                      selectedPhotoIndex + 1
                    }`}
                    fill={!isZoomed}
                    width={isZoomed ? 1400 : undefined}
                    height={isZoomed ? 1000 : undefined}
                    className={`${
                      isZoomed
                        ? "w-auto h-auto min-w-[1000px] min-h-[800px] object-contain"
                        : "object-contain"
                    } select-none`}
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              {/* Next */}
              {professional.portfolioPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={showNextPhoto}
                  className="absolute right-3 sm:right-6 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {professional.portfolioPhotos.length > 1 && (
              <div className="px-4 sm:px-6 py-3 bg-black/50 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-1">
                  {professional.portfolioPhotos.map((photo, index) => (
                    <button
                      key={`thumbnail-${index}`}
                      type="button"
                      onClick={() => {
                        setSelectedPhotoIndex(index);
                        setIsZoomed(false);
                      }}
                      className={`relative flex-shrink-0 h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhotoIndex === index
                          ? "border-white opacity-100 scale-105"
                          : "border-transparent opacity-50 hover:opacity-90"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-black/50 text-white/60 text-xs">
                ← → Navigate &nbsp; • &nbsp; + − Zoom &nbsp; • &nbsp; ESC Close
              </div>
            </div>
          </div>
        )}
      <Footer />
    </>
  );
}
