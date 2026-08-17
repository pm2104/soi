"use client";

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
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function DashboardContent() {
  const router = useRouter();
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleEditProfile = () => {
    router.push("/professional/onboarding");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-secondary-text text-sm">Loading profile...</div>
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

  const status = statusConfig[profile.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 mb-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-light-gray shrink-0">
              {profile.photoURL ? (
                <Image
                  src={profile.photoURL}
                  alt={profile.displayName}
                  fill
                  className="object-cover"
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
                    profile.status === "approved" ? "accent" : "default"
                  }
                >
                  <StatusIcon
                    className={cn("h-3 w-3 mr-1", status.color)}
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

        {profile.status === "pending" && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Pending Approval
              </p>
              <p className="text-sm text-amber-700 mt-0.5">
                Your profile is under review. Our team will verify your
                information and approve your account shortly. You will be
                notified once approved.
              </p>
            </div>
          </div>
        )}

        {profile.status === "rejected" && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                Application Rejected
              </p>
              <p className="text-sm text-red-700 mt-0.5">
                Your profile did not meet our verification criteria. Please
                update your information and ensure all details are accurate.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
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
              <span className="text-sm text-text">{profile.email}</span>
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

        {/* Professional Info */}
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
                <p className="text-xs text-secondary-text">Type</p>
                <p className="text-sm font-medium text-text">
                  {profile.professionalType || "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-secondary-text shrink-0" />
              <div>
                <p className="text-xs text-secondary-text">Specialization</p>
                <p className="text-sm font-medium text-text">
                  {profile.specialization || "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-secondary-text shrink-0" />
              <div>
                <p className="text-xs text-secondary-text">Experience</p>
                <p className="text-sm font-medium text-text">
                  {profile.experienceYears || 0} Years
                </p>
              </div>
            </div>
            {profile.organization && (
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-secondary-text shrink-0" />
                <div>
                  <p className="text-xs text-secondary-text">Organization</p>
                  <p className="text-sm font-medium text-text">
                    {profile.organization}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Qualifications */}
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
                  <span className="text-sm text-secondary-text">—</span>
                )}
              </div>
            </div>
            {profile.certifications && profile.certifications.length > 0 && (
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

        {/* Expertise & Bio */}
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

        {/* Portfolio Photos - Full Width */}
        {profile.portfolioPhotos && profile.portfolioPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
          >
            <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-accent" />
              Work Portfolio
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {profile.portfolioPhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 group cursor-pointer"
                  onClick={() => window.open(url, "_blank")}
                >
                  <Image
                    src={url}
                    alt={`Portfolio ${idx + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}