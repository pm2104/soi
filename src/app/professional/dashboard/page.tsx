"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Award,
  Clock,
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

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && profile && !profile.profileCompleted) {
      router.replace("/professional/onboarding");
    }
  }, [user, profile, loading, router]);

  // DEBUG LOGS
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

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleEditProfile = () => {
    router.push("/professional/onboarding");
  };

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
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <span className="text-sm font-medium">Redirecting...</span>
          </div>
        </motion.div>
      </div>
    );
  }

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
    statusConfig[
      profile.status as keyof typeof statusConfig
    ] || statusConfig.pending;

  const StatusIcon = status.icon;

  // IMPORTANT:
  // Profile photo comes from Firestore profile.photoURL
  // Google photo is only the fallback.
  const profileImage =
    profile.photoURL || user.photoURL || "";

  // Portfolio images saved by ProfessionalForm
  const portfolioPhotos = profile.portfolioPhotos || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* PAGE HEADER */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text mb-4">
              Hello {profile.displayName || "Professional"}
            </h1>

            <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto">
              Welcome back. Manage your profile and track your status.
            </p>
          </div>

          {/* PROFILE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mb-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">

              <div className="flex items-center gap-4">

                {/* PROFILE IMAGE */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-light-gray shrink-0">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={profile.displayName || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy/5">
                      <User className="h-8 w-8 text-navy/30" />
                    </div>
                  )}

                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-text">
                    {profile.displayName}
                  </h2>

                  <p className="text-sm text-secondary-text">
                    {profile.professionalType || "Professional"}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">

                    <Badge
                      variant={
                        profile.status === "approved"
                          ? "accent"
                          : "default"
                      }
                    >
                      <StatusIcon
                        className={cn(
                          "h-3 w-3 mr-1",
                          status.color
                        )}
                      />

                      {status.label}
                    </Badge>

                    {profile.profileCompleted && (
                      <Badge variant="accent">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Profile Complete
                      </Badge>
                    )}

                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 w-full md:w-auto">

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleEditProfile}
                  className="flex-1 md:flex-none"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex-1 md:flex-none"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>

              </div>
            </div>

            {/* STATUS */}
            {profile.status === "pending" && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />

                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Pending Approval
                  </p>

                  <p className="text-sm text-amber-700 mt-0.5">
                    Your profile is under review. Our team will verify
                    your information and approve your account shortly.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* INFORMATION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
            >
              <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Contact Information
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-secondary-text shrink-0" />

                  <span className="text-sm text-text">
                    {profile.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-secondary-text shrink-0" />

                  <span className="text-sm text-text">
                    {profile.phone || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-secondary-text shrink-0" />

                  <span className="text-sm text-text">
                    {profile.city || "—"}
                  </span>
                </div>

                {profile.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-4 w-4 text-secondary-text shrink-0" />

                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}

                {profile.portfolioUrl && (
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-4 w-4 text-secondary-text shrink-0" />

                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      Portfolio / Website
                    </a>
                  </div>
                )}

              </div>
            </motion.div>

            {/* PROFESSIONAL DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
            >
              <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                Professional Details
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-secondary-text shrink-0" />

                  <div>
                    <p className="text-xs text-secondary-text">
                      Type
                    </p>

                    <p className="text-sm font-medium text-text">
                      {profile.professionalType || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-secondary-text shrink-0" />

                  <div>
                    <p className="text-xs text-secondary-text">
                      Specialization
                    </p>

                    <p className="text-sm font-medium text-text">
                      {profile.specialization || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-secondary-text shrink-0" />

                  <div>
                    <p className="text-xs text-secondary-text">
                      Experience
                    </p>

                    <p className="text-sm font-medium text-text">
                      {profile.experienceYears || 0} Years
                    </p>
                  </div>
                </div>

                {profile.organization && (
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-secondary-text shrink-0" />

                    <div>
                      <p className="text-xs text-secondary-text">
                        Organization
                      </p>

                      <p className="text-sm font-medium text-text">
                        {profile.organization}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>

            {/* QUALIFICATIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
            >
              <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Qualifications & Certifications
              </h3>

              <div className="space-y-4">

                <div>
                  <p className="text-xs text-secondary-text mb-2">
                    Qualifications
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {profile.qualifications?.length ? (
                      profile.qualifications.map((q) => (
                        <span
                          key={q}
                          className="px-3 py-1.5 bg-navy/5 text-navy text-sm font-medium rounded-xl"
                        >
                          {q}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-secondary-text">
                        —
                      </span>
                    )}

                  </div>
                </div>

                {profile.certifications &&
                  profile.certifications.length > 0 && (
                    <div>
                      <p className="text-xs text-secondary-text mb-2">
                        Certifications
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {profile.certifications.map((c) => (
                          <span
                            key={c}
                            className="px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-xl"
                          >
                            {c}
                          </span>
                        ))}

                      </div>
                    </div>
                  )}

              </div>
            </motion.div>

            {/* EXPERTISE + BIO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
            >
              <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                Expertise & Bio
              </h3>

              {profile.areasOfExpertise &&
                profile.areasOfExpertise.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs text-secondary-text mb-2">
                      Areas of Expertise
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {profile.areasOfExpertise.map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1.5 bg-light-gray text-secondary-text text-sm font-medium rounded-xl"
                        >
                          {area}
                        </span>
                      ))}

                    </div>
                  </div>
                )}

              <div>
                <p className="text-xs text-secondary-text mb-2">
                  Professional Bio
                </p>

                <p className="text-sm text-text leading-relaxed">
                  {profile.bio || "—"}
                </p>
              </div>
            </motion.div>

          </div>

          {/* ===================================================== */}
          {/* PORTFOLIO PHOTOS */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mt-6"
          >
            <div className="flex items-center justify-between mb-5">

              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-accent" />
                Work Portfolio
              </h3>

              <span className="text-xs text-secondary-text">
                {portfolioPhotos.length}{" "}
                {portfolioPhotos.length === 1 ? "photo" : "photos"}
              </span>

            </div>

            {portfolioPhotos.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {portfolioPhotos.map((url: string, index: number) => (
                  <motion.div
                    key={`${url}-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-light-gray border border-border/50 group"
                  >
                    <img
                      src={url}
                      alt={`Portfolio work ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}

              </div>

            ) : (

              <div className="flex flex-col items-center justify-center py-12 rounded-2xl border-2 border-dashed border-border bg-light-gray/30">

                <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-3">
                  <ImageIcon className="h-6 w-6 text-secondary-text" />
                </div>

                <p className="text-sm font-medium text-text">
                  No portfolio photos yet
                </p>

                <p className="text-xs text-secondary-text mt-1">
                  Add your work photos from Edit Profile.
                </p>

              </div>

            )}

          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}