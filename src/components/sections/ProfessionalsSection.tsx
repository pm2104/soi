"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import ProfessionalCard from "@/components/cards/ProfessionalCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface Professional {
  uid: string;
  displayName?: string;
  professionalType?: string;
  city?: string;
  experienceYears?: number;
  photoURL?: string;
  status?: string;
  profileCompleted?: boolean;
}

export default function ProfessionalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionalsRef = collection(db, "professionals");

        // Only request professionals that Firestore allows
        // the public to read.
        const professionalsQuery = query(
          professionalsRef,
          where("status", "==", "approved"),
          where("profileCompleted", "==", true)
        );

        const snapshot = await getDocs(professionalsQuery);

        const data: Professional[] = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...(doc.data() as Omit<Professional, "uid">),
        }));

        setProfessionals(data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
        setProfessionals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;

    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="professionals"
      className="py-20 md:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <SectionHeading
              title="Meet Our Professionals"
              subtitle="Discover top-rated construction experts verified and ready for your next project"
              align="left"
              className="mb-0"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl bg-white border border-border shadow-soft hover:shadow-hover transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-navy" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl bg-white border border-border shadow-soft hover:shadow-hover transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-navy" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[280px] rounded-2xl bg-white border border-border/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Professionals */}
        {!loading && professionals.length > 0 && (
          <div
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {professionals.map((professional, index) => (
              <div
                key={professional.uid}
                className="snap-start shrink-0 w-[280px] lg:w-auto"
              >
                <ProfessionalCard
                  name={
                    professional.displayName ||
                    "Professional"
                  }
                  role={
                    professional.professionalType ||
                    "Professional"
                  }
                  city={professional.city || "—"}
                  experience={`${professional.experienceYears ?? 0} Years`}
                  avatar={professional.photoURL || ""}
                  premium={true}
                  verified={
                    professional.status === "approved"
                  }
                  index={index}
                />
              </div>
            ))}
          </div>
        )}

        {/* No professionals */}
        {!loading && professionals.length === 0 && (
          <div className="text-center py-16">
            <p className="text-secondary-text">
              No verified professionals available at the moment.
            </p>
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="text-center mt-12"
        >
          
          <Link href="/hire-professional">
            <Button size="lg" className="group">
              View All Professionals
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}