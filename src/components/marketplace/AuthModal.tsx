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

export default function AuthModal({ isOpen, onClose, redirectPath }: AuthModalProps) {
  const router = useRouter();
  const { user, signInWithGoogle, authLoading } = useAuth();

  // Auto-close modal and redirect when auth succeeds
  useEffect(() => {
    if (isOpen && user) {
      const redirect = sessionStorage.getItem("auth_redirect");
      sessionStorage.removeItem("auth_redirect");

      if (redirect && redirect !== window.location.pathname) {
        router.push(redirect);
      } else {
        onClose();
      }
    }
  }, [user, isOpen, router, onClose]);

  const handleSignIn = useCallback(async () => {
    if (redirectPath) {
      sessionStorage.setItem("auth_redirect", redirectPath);
    }
    await signInWithGoogle();
  }, [signInWithGoogle, redirectPath]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-card p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-navy">
                Sign in to explore professionals
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-light-gray transition-colors"
              >
                <X className="h-5 w-5 text-secondary-text" />
              </button>
            </div>
            <p className="text-secondary-text mb-6">
              Sign in with Google to explore approved SOI professionals and connect with the right professional for your project.
            </p>
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
        </>
      )}
    </AnimatePresence>
  );
}