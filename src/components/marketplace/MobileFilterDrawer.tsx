"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, SPECIALIZATION_MAP } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MobileFilterDrawerProps {
  filters: {
    professionalType: string;
    specialization: string;
    city: string;
    experience: string;
  };
  onChange: (filters: {
    professionalType: string;
    specialization: string;
    city: string;
    experience: string;
  }) => void;
  cities: string[];
}

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Any experience" },
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

export default function MobileFilterDrawer({ filters, onChange, cities }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const specializations = filters.professionalType
    ? SPECIALIZATION_MAP[filters.professionalType as keyof typeof SPECIALIZATION_MAP] || []
    : [];

  const update = (key: string, value: string) => {
    onChange({
      ...filters,
      [key]: value,
      ...(key === "professionalType" ? { specialization: "" } : {}),
    });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)} className="w-full">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filters
        {activeCount > 0 && (
          <span className="ml-2 px-1.5 py-0.5 bg-accent text-white text-xs rounded-full">
            {activeCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-navy">Filters</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-light-gray">
                  <X className="h-5 w-5 text-secondary-text" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Professional Type</label>
                  <select
                    value={filters.professionalType}
                    onChange={(e) => update("professionalType", e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-border bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">All Types</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Specialization</label>
                  <select
                    value={filters.specialization}
                    onChange={(e) => update("specialization", e.target.value)}
                    disabled={!filters.professionalType}
                    className="w-full px-3 py-3 rounded-xl border border-border bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                  >
                    <option value="">All Specializations</option>
                    {specializations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-border bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">All Cities</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => update("experience", e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-border bg-light-gray focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button fullWidth onClick={() => setIsOpen(false)}>
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}