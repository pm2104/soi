
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

interface JoinAsProfessionalButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function JoinAsProfessionalButton({
  variant = "outline",
  size = "lg",
  fullWidth = false,
  showArrow = false,
  className,
}: JoinAsProfessionalButtonProps) {
  const router = useRouter();

  const {
    user,
    profile,
    authLoading,
    authError,
    signInWithGoogle,
    clearAuthError,
  } = useAuth();

  const handleClick = useCallback(async () => {
    clearAuthError();

    // ==========================================
    // ALREADY SIGNED IN
    // ==========================================
    if (user) {
      if (profile?.profileCompleted) {
        router.push("/professional/dashboard");
      } else {
        router.push("/professional/onboarding");
      }

      return;
    }

    // ==========================================
    // NOT SIGNED IN — AUTHENTICATE FIRST
    // ==========================================
    const existingProfile = await signInWithGoogle();

    // ==========================================
    // RETURNING PROFESSIONAL
    // ==========================================
    if (existingProfile) {
      if (existingProfile.profileCompleted) {
        router.push("/professional/dashboard");
      } else {
        router.push("/professional/onboarding");
      }

      return;
    }

    // ==========================================
    // BRAND-NEW PROFESSIONAL
    // ==========================================
    const firebaseAuth = getAuth();
    const firebaseUser = firebaseAuth.currentUser;

    if (firebaseUser) {
      const profileRef = doc(
        db,
        "professionals",
        firebaseUser.uid
      );

      const initialProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",

        phone: "",
        professionalType: "",
        specialization: "",
        experienceYears: 0,
        city: "",
        organization: "",

        qualifications: [],
        certifications: [],
        areasOfExpertise: [],

        bio: "",
        linkedinUrl: "",
        portfolioUrl: "",
        portfolioPhotos: [],

        profileCompleted: false,
        status: "pending" as const,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(profileRef, initialProfile);

      router.push("/professional/onboarding");
    }
  }, [
    user,
    profile,
    router,
    signInWithGoogle,
    clearAuthError,
  ]);

  return (
    <div
      className={cn(
        "w-full sm:w-auto",
        fullWidth && "sm:w-full"
      )}
    >
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        isLoading={authLoading}
        onClick={handleClick}
        disabled={authLoading}
        className={cn(
          "group w-full sm:w-auto justify-center",
          fullWidth && "sm:w-full",
          className
        )}
      >
        {authLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Join as Professional

            {showArrow && (
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            )}
          </>
        )}
      </Button>

      <AnimatePresence>
        {authError && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            className="text-sm text-red-400 mt-2 text-center"
          >
            {authError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}