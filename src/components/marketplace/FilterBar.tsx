"use client";

import { CATEGORIES, SPECIALIZATION_MAP } from "@/lib/constants";

interface FilterBarProps {
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

export default function FilterBar({ filters, onChange, cities }: FilterBarProps) {
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

  return (
    <div className="flex items-center gap-2">
      <select
        value={filters.professionalType}
        onChange={(e) => update("professionalType", e.target.value)}
        className="px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        <option value="">All Types</option>
        {CATEGORIES.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.specialization}
        onChange={(e) => update("specialization", e.target.value)}
        disabled={!filters.professionalType}
        className="px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
      >
        <option value="">All Specializations</option>
        {specializations.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.city}
        onChange={(e) => update("city", e.target.value)}
        className="px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        <option value="">All Cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.experience}
        onChange={(e) => update("experience", e.target.value)}
        className="px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        {EXPERIENCE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}