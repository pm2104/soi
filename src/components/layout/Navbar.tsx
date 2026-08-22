"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signInWithGoogle, logout, authLoading } = useAuth();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png"
                alt="Supervisors of India"
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="block">
              <h1 className="text-lg font-extrabold text-navy leading-tight">
                SUPERVISORS OF INDIA
              </h1>
              <p className="text-[10px] font-semibold text-secondary-text tracking-widest uppercase">
                Connect • Collaborate • Construct
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-secondary-text hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {profile ? (
                  <Link href="/professional/dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/hire-professional">
                    <Button variant="secondary" size="sm">Hire Professional</Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignIn}
                  isLoading={authLoading}
                  disabled={authLoading}
                >
                  {authLoading ? "Signing in..." : "Sign In"}
                </Button>
                <Link href="/hire-professional">
                  <Button variant="secondary" size="sm">Hire Professional</Button>
                </Link>
                <JoinAsProfessionalButton variant="primary" size="sm" />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-light-gray transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-navy" />
            ) : (
              <Menu className="h-6 w-6 text-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-semibold text-secondary-text hover:text-navy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {user ? (
                  <>
                    {profile ? (
                      <Link href="/professional/dashboard" onClick={() => setIsOpen(false)}>
                        <Button fullWidth>Dashboard</Button>
                      </Link>
                    ) : (
                      <Link href="/hire-professional" onClick={() => setIsOpen(false)}>
                        <Button variant="secondary" fullWidth>Hire Professional</Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-1.5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={handleSignIn}
                      isLoading={authLoading}
                      disabled={authLoading}
                    >
                      {authLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    <Link href="/hire-professional" onClick={() => setIsOpen(false)}>
                      <Button variant="secondary" fullWidth>Hire Professional</Button>
                    </Link>
                    <JoinAsProfessionalButton fullWidth />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}