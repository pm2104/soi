"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  redirectPath,
}: AuthModalProps) {
  const router = useRouter();
  const { user, signInWithGoogle, authLoading } = useAuth();

  // Redirect after successful authentication
  useEffect(() => {
    if (!isOpen || !user) return;

    const redirect =
      sessionStorage.getItem("auth_redirect") || redirectPath;

    sessionStorage.removeItem("auth_redirect");

    onClose();

    if (redirect && redirect !== window.location.pathname) {
      router.push(redirect);
    }
  }, [user, isOpen, redirectPath, router, onClose]);

  const handleSignIn = useCallback(async () => {
    try {
      if (redirectPath) {
        sessionStorage.setItem("auth_redirect", redirectPath);
      }

      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed:", error);

      sessionStorage.removeItem("auth_redirect");
    }
  }, [signInWithGoogle, redirectPath]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-card p-5 sm:p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <h2 className="text-xl font-bold text-navy leading-tight">
                  Sign in to explore professionals
                </h2>

                <button
                  onClick={onClose}
                  className="shrink-0 p-2 rounded-lg hover:bg-light-gray transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-secondary-text" />
                </button>
              </div>

              {/* Description */}
              <p className="text-secondary-text leading-relaxed mb-6">
                Sign in with Google to explore approved SOI professionals and
                connect with the right professional for your project.
              </p>

              {/* Google Sign In */}
              <Button
                onClick={handleSignIn}
                isLoading={authLoading}
                disabled={authLoading}
                fullWidth
                size="lg"
              >
                {authLoading ? "Signing in..." : "Continue with Google"}
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}