"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
  const { user, profile, authLoading, authError, signInWithGoogle, clearAuthError } = useAuth();

  const handleClick = useCallback(async () => {
    clearAuthError();

    if (user) {
      if (profile?.profileCompleted) {
        router.push("/professional/dashboard");
      } else {
        router.push("/professional/onboarding");
      }
      return;
    }

    const newProfile = await signInWithGoogle();
    if (newProfile) {
      if (newProfile.profileCompleted) {
        router.push("/professional/dashboard");
      } else {
        router.push("/professional/onboarding");
      }
    }
  }, [user, profile, router, signInWithGoogle, clearAuthError]);

  return (
    <div className={cn(fullWidth && "w-full")}>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        isLoading={authLoading}
        onClick={handleClick}
        disabled={authLoading}
        className={cn("group", className)}
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm text-red-400 mt-2 text-center"
          >
            {authError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}