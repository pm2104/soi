"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Award,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Edit3,
  ShieldCheck,
  Star,
  Phone,
  Building2,
  Link as LinkIcon,
  Loader2,
  HardHat,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();

  const { user, profile, loading, logout } = useAuth();

  // =========================================================
  // PORTFOLIO VIEWER STATE
  // =========================================================

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<
    number | null
  >(null);

  const [isZoomed, setIsZoomed] = useState(false);

  // =========================================================
  // AUTH REDIRECT
  // =========================================================

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // =========================================================
  // PROFILE COMPLETION REDIRECT
  // =========================================================

  useEffect(() => {
    if (!loading && user && profile && !profile.profileCompleted) {
      router.replace("/professional/onboarding");
    }
  }, [user, profile, loading, router]);

  // =========================================================
  // DEBUG LOG
  // =========================================================

  useEffect(() => {
    if (profile) {
      console.log("========== PROFESSIONAL DASHBOARD ==========");
      console.log("Profile:", profile);
      console.log("Profile Photo:", profile.photoURL);
      console.log("User Photo:", user?.photoURL);
      console.log("Portfolio Photos:", profile.portfolioPhotos);
      console.log("============================================");
    }
  }, [profile, user]);

  // =========================================================
  // SAFE PORTFOLIO DATA
  // =========================================================

  const portfolioPhotos = profile?.portfolioPhotos || [];

  // =========================================================
  // KEYBOARD CONTROLS
  // =========================================================

  useEffect(() => {
    if (selectedPhotoIndex === null || portfolioPhotos.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhotoIndex(null);
        setIsZoomed(false);
        return;
      }

      if (event.key === "ArrowLeft") {
        setSelectedPhotoIndex((current) => {
          if (current === null) return null;

          return current === 0
            ? portfolioPhotos.length - 1
            : current - 1;
        });

        setIsZoomed(false);
      }

      if (event.key === "ArrowRight") {
        setSelectedPhotoIndex((current) => {
          if (current === null) return null;

          return current === portfolioPhotos.length - 1
            ? 0
            : current + 1;
        });

        setIsZoomed(false);
      }

      if (event.key === "+" || event.key === "=") {
        setIsZoomed(true);
      }

      if (event.key === "-") {
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex, portfolioPhotos.length]);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN VIEWER IS OPEN
  // =========================================================

  useEffect(() => {
    if (selectedPhotoIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex]);

  // =========================================================
  // MOUSE WHEEL / TRACKPAD PHOTO NAVIGATION
  // =========================================================

  useEffect(() => {
    if (selectedPhotoIndex === null || portfolioPhotos.length <= 1) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaY) < 10 &&
        Math.abs(event.deltaX) < 10
      ) {
        return;
      }

      event.preventDefault();

      if (event.deltaY > 0 || event.deltaX > 0) {
        setSelectedPhotoIndex((current) => {
          if (current === null) return null;

          return current === portfolioPhotos.length - 1
            ? 0
            : current + 1;
        });
      } else {
        setSelectedPhotoIndex((current) => {
          if (current === null) return null;

          return current === 0
            ? portfolioPhotos.length - 1
            : current - 1;
        });
      }

      setIsZoomed(false);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [selectedPhotoIndex, portfolioPhotos.length]);

  // =========================================================
  // PORTFOLIO VIEWER FUNCTIONS
  // =========================================================

  const openPhotoViewer = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsZoomed(false);
  };

  const closePhotoViewer = () => {
    setSelectedPhotoIndex(null);
    setIsZoomed(false);
  };

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? portfolioPhotos.length - 1
        : current - 1;
    });

    setIsZoomed(false);
  };

  const showNextPhoto = () => {
    setSelectedPhotoIndex((current) => {
      if (current === null) return null;

      return current === portfolioPhotos.length - 1
        ? 0
        : current + 1;
    });

    setIsZoomed(false);
  };

  // =========================================================
  // AUTH HANDLERS
  // =========================================================

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleEditProfile = () => {
    router.push("/professional/onboarding");
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="bg-navy p-3 rounded-2xl">
            <HardHat className="h-8 w-8 text-accent" />
          </div>

          <div className="flex items-center gap-2 text-secondary-text">
            <Loader2 className="h-4 w-4 animate-spin" />

            <span className="text-sm font-medium">
              Loading...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // REDIRECTING
  // =========================================================

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="bg-navy p-3 rounded-2xl">
            <HardHat className="h-8 w-8 text-accent" />
          </div>

          <div className="flex items-center gap-2 text-secondary-text">
            <Loader2 className="h-4 w-4 animate-spin" />

            <span className="text-sm font-medium">
              Redirecting...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // STATUS
  // =========================================================

  const statusConfig = {
    pending: {
      label: "Pending Approval",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: AlertCircle,
    },

    approved: {
      label: "Approved",
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
      icon: CheckCircle2,
    },

    rejected: {
      label: "Rejected",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      icon: AlertCircle,
    },

    suspended: {
      label: "Suspended",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      icon: AlertCircle,
    },
  };

  const status =
    statusConfig[profile.status] || statusConfig.pending;

  const StatusIcon = status.icon;

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const profileImage =
    profile.photoURL || user.photoURL || "";

  // =========================================================
  // SELECTED PHOTO
  // =========================================================

  const selectedPhoto =
    selectedPhotoIndex !== null
      ? portfolioPhotos[selectedPhotoIndex]
      : null;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* =====================================================
              HEADER
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-accent mb-2">
                  PROFESSIONAL DASHBOARD
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-text">
                  Welcome, {profile.displayName}
                </h1>

                <p className="text-secondary-text mt-2">
                  Manage your professional profile and portfolio.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleEditProfile}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              PROFILE OVERVIEW
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
          >
            <div className="flex flex-col lg:flex-row gap-8">

              {/* PROFILE PHOTO */}

              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-light-gray border border-border">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={profile.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-secondary-text" />
                      </div>
                    )}
                  </div>

                  {profile.status === "approved" && (
                    <div className="absolute -bottom-3 -right-3 bg-accent text-white rounded-full p-2.5 shadow-lg">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* PROFILE INFORMATION */}

              <div className="flex-1 min-w-0">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-text">
                      {profile.displayName}
                    </h2>

                  <Badge
                    variant={
                      profile.status === "approved"
                        ? "accent"
                        : "default"
                    }
                  >
                    {status.label}
                  </Badge>
                  </div>

                  <p className="text-lg text-accent font-semibold mt-2">
                    {profile.professionalType}
                  </p>

                  {profile.specialization && (
                    <p className="text-sm text-secondary-text mt-1">
                      {profile.specialization}
                    </p>
                  )}
                </div>

                {/* STATUS */}

                <div
                  className={cn(
                    "mt-5 rounded-xl border px-4 py-3 flex items-start gap-3",
                    status.bg,
                    status.border
                  )}
                >
                  <StatusIcon
                    className={cn(
                      "h-5 w-5 mt-0.5 flex-shrink-0",
                      status.color
                    )}
                  />

                  <div>
                    <p className={cn("font-semibold", status.color)}>
                      {status.label}
                    </p>

                    <p className="text-sm text-secondary-text mt-1">
                      {profile.status === "approved"
                        ? "Your professional profile is live and visible to clients."
                        : profile.status === "rejected"
                        ? "Your profile requires changes before it can be approved."
                        : profile.status === "suspended"
                        ? "Your profile is currently suspended. Please contact support."
                        : "Your profile is currently under review by our team."}
                    </p>
                  </div>
                </div>

                {/* BASIC DETAILS */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                  {/* EMAIL */}

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-secondary-text">
                        Email
                      </p>

                      <p className="text-sm font-medium text-text truncate">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}

                  {profile.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>

                      <div>
                        <p className="text-xs text-secondary-text">
                          Phone
                        </p>

                        <p className="text-sm font-medium text-text">
                          {profile.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CITY */}

                  {profile.city && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>

                      <div>
                        <p className="text-xs text-secondary-text">
                          Location
                        </p>

                        <p className="text-sm font-medium text-text">
                          {profile.city}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* EXPERIENCE */}

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-accent" />
                    </div>

                    <div>
                      <p className="text-xs text-secondary-text">
                        Experience
                      </p>

                      <p className="text-sm font-medium text-text">
                        {profile.experienceYears}{" "}
                        {profile.experienceYears === 1
                          ? "Year"
                          : "Years"}
                      </p>
                    </div>
                  </div>

                  {/* ORGANIZATION */}

                  {profile.organization && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-accent" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-secondary-text">
                          Organization
                        </p>

                        <p className="text-sm font-medium text-text truncate">
                          {profile.organization}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* LINKEDIN */}

                  {profile.linkedinUrl && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center">
                        <LinkIcon className="h-5 w-5 text-accent" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-secondary-text">
                          LinkedIn
                        </p>

                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-accent hover:underline truncate block"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              ABOUT ME
          ====================================================== */}

          {profile.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mt-6"
            >
              <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-accent" />
                About Me
              </h3>

              <p className="text-secondary-text leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </motion.div>
          )}

          {/* =====================================================
              PROFESSIONAL INFORMATION
          ====================================================== */}

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* SPECIALIZATION */}

            {profile.specialization && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
              >
                <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
                  <Award className="h-5 w-5 text-accent" />
                  Specialization
                </h3>

                <span className="inline-flex px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                  {profile.specialization}
                </span>
              </motion.div>
            )}

            {/* AREAS OF EXPERTISE */}

            {profile.areasOfExpertise &&
              profile.areasOfExpertise.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
                >
                  <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
                    <Star className="h-5 w-5 text-accent" />
                    Areas of Expertise
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {profile.areasOfExpertise.map(
                      (item: string, index: number) => (
                        <span
                          key={`${item}-${index}`}
                          className="px-3 py-2 rounded-lg bg-light-gray text-text text-sm font-medium"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
              )}
          </div>

          {/* =====================================================
              QUALIFICATIONS & CERTIFICATIONS
          ====================================================== */}

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* QUALIFICATIONS */}

            {profile.qualifications &&
              profile.qualifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
                >
                  <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    Qualifications
                  </h3>

                  <div className="space-y-3">
                    {profile.qualifications.map(
                      (item: string, index: number) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                          </div>

                          <p className="text-sm text-text pt-1">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}

            {/* CERTIFICATIONS */}

            {profile.certifications &&
              profile.certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45,
                  }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
                >
                  <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    Certifications
                  </h3>

                  <div className="space-y-3">
                    {profile.certifications.map(
                      (item: string, index: number) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Award className="h-4 w-4 text-accent" />
                          </div>

                          <p className="text-sm text-text pt-1">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
          </div>

          {/* =====================================================
              LINKS
          ====================================================== */}

          {(profile.linkedinUrl || profile.portfolioUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.48,
              }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mt-6"
            >
              <h3 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
                <LinkIcon className="h-5 w-5 text-accent" />
                Professional Links
              </h3>

              <div className="flex flex-wrap gap-3">

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-light-gray text-text hover:bg-accent/10 hover:text-accent transition-colors text-sm font-medium"
                  >
                    <LinkIcon className="h-4 w-4" />
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {profile.portfolioUrl && (
                  <a
                    href={profile.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-light-gray text-text hover:bg-accent/10 hover:text-accent transition-colors text-sm font-medium"
                  >
                    <Briefcase className="h-4 w-4" />
                    Portfolio Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* =====================================================
              WORK PORTFOLIO
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mt-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-accent" />
                Work Portfolio
              </h3>

              <span className="text-xs text-secondary-text">
                {portfolioPhotos.length}{" "}
                {portfolioPhotos.length === 1
                  ? "photo"
                  : "photos"}
              </span>
            </div>

            {portfolioPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolioPhotos.map(
                  (url: string, index: number) => (
                    <motion.button
                      key={`${url}-${index}`}
                      type="button"
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      onClick={() => openPhotoViewer(index)}
                      className="relative aspect-square rounded-2xl overflow-hidden bg-light-gray border border-border/50 group cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <img
                        src={url}
                        alt={`Portfolio work ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* HOVER OVERLAY */}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 rounded-full p-3 shadow-lg">
                          <ZoomIn className="h-5 w-5 text-navy" />
                        </div>
                      </div>

                      {/* PHOTO NUMBER */}

                      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {index + 1}
                      </div>
                    </motion.button>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-light-gray/50 py-12 px-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4">
                  <ImageIcon className="h-7 w-7 text-secondary-text" />
                </div>

                <h4 className="font-semibold text-text">
                  No portfolio photos yet
                </h4>

                <p className="text-sm text-secondary-text mt-2 max-w-md mx-auto">
                  Add photos of your previous construction
                  projects, completed work, site supervision, or
                  professional achievements to showcase your
                  experience.
                </p>

                <Button
                  variant="outline"
                  onClick={handleEditProfile}
                  className="mt-5"
                >
                  Add Portfolio Photos
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* =========================================================
          FULLSCREEN PORTFOLIO VIEWER
      ========================================================= */}

      <AnimatePresence>
        {selectedPhotoIndex !== null && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
          >
            {/* TOP BAR */}

            <div className="absolute top-0 left-0 right-0 z-30 px-4 md:px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-3 text-white">
                <ImageIcon className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Portfolio {selectedPhotoIndex + 1} /{" "}
                  {portfolioPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">

                {/* ZOOM BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setIsZoomed((current) => !current)
                  }
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label={
                    isZoomed ? "Zoom out" : "Zoom in"
                  }
                  title={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <ZoomOut className="h-5 w-5" />
                  ) : (
                    <ZoomIn className="h-5 w-5" />
                  )}
                </button>

                {/* CLOSE BUTTON */}

                <button
                  type="button"
                  onClick={closePhotoViewer}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close photo viewer"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PREVIOUS */}

            {portfolioPhotos.length > 1 && (
              <button
                type="button"
                onClick={showPreviousPhoto}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Previous photo"
                title="Previous photo"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            )}

            {/* NEXT */}

            {portfolioPhotos.length > 1 && (
              <button
                type="button"
                onClick={showNextPhoto}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Next photo"
                title="Next photo"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            )}

            {/* MAIN IMAGE */}

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center px-16 md:px-24 pt-20 pb-28",
                isZoomed
                  ? "overflow-auto"
                  : "overflow-hidden"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedPhoto}-${selectedPhotoIndex}`}
                  src={selectedPhoto}
                  alt={`Portfolio work ${
                    selectedPhotoIndex + 1
                  }`}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.5 : 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  onDoubleClick={() =>
                    setIsZoomed((current) => !current)
                  }
                  className={cn(
                    "max-w-full max-h-full object-contain rounded-lg select-none transition-transform duration-300",
                    isZoomed
                      ? "cursor-zoom-out"
                      : "cursor-zoom-in"
                  )}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* THUMBNAILS */}

            {portfolioPhotos.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-4 px-4">
                <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto max-w-full">
                  {portfolioPhotos.map(
                    (url: string, index: number) => (
                      <button
                        key={`${url}-thumbnail-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedPhotoIndex(index);
                          setIsZoomed(false);
                        }}
                        className={cn(
                          "relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all",
                          selectedPhotoIndex === index
                            ? "border-accent scale-110 shadow-lg"
                            : "border-white/20 hover:border-white/70 opacity-70 hover:opacity-100"
                        )}
                        aria-label={`Open portfolio photo ${
                          index + 1
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Portfolio thumbnail ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* DESKTOP HELP */}

            <div className="hidden md:block absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs whitespace-nowrap">
              ← → Navigate &nbsp; • &nbsp; Scroll to browse
              &nbsp; • &nbsp; Esc to close &nbsp; • &nbsp; Double-click
              to zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}