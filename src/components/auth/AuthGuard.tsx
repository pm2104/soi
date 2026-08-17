"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, HardHat } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function AuthGuard({ children, requireProfile = true }: AuthGuardProps) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (requireProfile && profile && !profile.profileCompleted) {
      router.replace("/professional/onboarding");
      return;
    }
  }, [user, profile, loading, router, requireProfile]);

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

  if (!user || (requireProfile && profile && !profile.profileCompleted)) {
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

  return <>{children}</>;
}