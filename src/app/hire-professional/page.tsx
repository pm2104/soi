"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { ProfessionalProfile } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfessionalCard from "@/components/marketplace/ProfessionalCard";
import AuthModal from "@/components/marketplace/AuthModal";
import FilterBar from "@/components/marketplace/FilterBar";
import MobileFilterDrawer from "@/components/marketplace/MobileFilterDrawer";
import ProfessionalSkeleton from "@/components/marketplace/ProfessionalSkeleton";
import EmptyState from "@/components/marketplace/EmptyState";
import Button from "@/components/ui/Button";

export default function HireProfessionalPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    professionalType: "",
    specialization: "",
    city: "",
    experience: "",
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState<string | undefined>(undefined);

  // Fetch professionals
  useEffect(() => {
    async function fetchProfessionals() {
      setLoading(true);
      try {
        let q;
        if (user) {
          q = query(
            collection(db, "professionals"),
            where("status", "==", "approved"),
            where("profileCompleted", "==", true)
          );
        } else {
          q = query(
            collection(db, "professionals"),
            where("status", "==", "approved"),
            where("profileCompleted", "==", true),
            limit(3)
          );
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        })) as ProfessionalProfile[];

        setProfessionals(data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, [user]);

  // Filter logic
  const filteredProfessionals = useMemo(() => {
    let result = professionals;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.displayName?.toLowerCase().includes(q) ||
          p.professionalType?.toLowerCase().includes(q) ||
          p.specialization?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q) ||
          p.organization?.toLowerCase().includes(q) ||
          p.areasOfExpertise?.some((a) => a.toLowerCase().includes(q))
      );
    }

    if (filters.professionalType) {
      result = result.filter((p) => p.professionalType === filters.professionalType);
    }

    if (filters.specialization) {
      result = result.filter((p) => p.specialization === filters.specialization);
    }

    if (filters.city) {
      result = result.filter((p) => p.city === filters.city);
    }

    if (filters.experience) {
      result = result.filter((p) => {
        const years = p.experienceYears || 0;
        switch (filters.experience) {
          case "0-2":
            return years >= 0 && years <= 2;
          case "3-5":
            return years >= 3 && years <= 5;
          case "6-10":
            return years >= 6 && years <= 10;
          case "10+":
            return years > 10;
          default:
            return true;
        }
      });
    }

    return result;
  }, [professionals, searchQuery, filters]);

  const handleViewMore = useCallback(() => {
    if (!user) {
      setAuthRedirect("/hire-professional");
      setIsAuthModalOpen(true);
    }
  }, [user]);

  const handleViewProfile = useCallback(
    (uid: string) => {
      if (!user) {
        setAuthRedirect(`/professional/${uid}`);
        setIsAuthModalOpen(true);
      } else {
        router.push(`/professional/${uid}`);
      }
    },
    [user, router]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setFilters({
      professionalType: "",
      specialization: "",
      city: "",
      experience: "",
    });
  }, []);

  const cities = useMemo(() => {
    const allCities = professionals.map((p) => p.city).filter(Boolean);
    return Array.from(new Set(allCities)).sort();
  }, [professionals]);

  const hasActiveFilters =
    searchQuery || Object.values(filters).some(Boolean);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold mb-4"
            >
              Find the Right Professional for Your Project
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              SOI helps clients discover approved construction professionals. Browse verified profiles and connect with experts for your next project.
            </motion.p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-16 md:top-20 z-40 bg-white border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-text" />
                <input
                  type="text"
                  placeholder="Search by name, expertise, specialization or city"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div className="hidden md:block">
                <FilterBar filters={filters} onChange={setFilters} cities={cities} />
              </div>
              <div className="md:hidden w-full">
                <MobileFilterDrawer filters={filters} onChange={setFilters} cities={cities} />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent font-semibold whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {user && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy">Find a Professional</h2>
                <p className="text-secondary-text">
                  {filteredProfessionals.length} approved professional
                  {filteredProfessionals.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <ProfessionalSkeleton key={i} />
                ))}
              </div>
            ) : filteredProfessionals.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfessionals.map((professional) => (
                    <ProfessionalCard
                      key={professional.uid}
                      professional={professional}
                      onViewProfile={() => handleViewProfile(professional.uid)}
                    />
                  ))}
                </div>

                {!user && professionals.length >= 3 && (
                  <div className="mt-12 text-center">
                    <Button onClick={handleViewMore} size="lg">
                      View More Professionals
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectPath={authRedirect}
      />
    </>
  );
}