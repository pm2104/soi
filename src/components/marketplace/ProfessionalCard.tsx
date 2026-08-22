"use client";

import { motion } from "framer-motion";
import { MapPin, Award, Calendar } from "lucide-react";
import { ProfessionalProfile } from "@/lib/auth-context";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface ProfessionalCardProps {
  professional: ProfessionalProfile;
  onViewProfile: () => void;
}

export default function ProfessionalCard({ professional, onViewProfile }: ProfessionalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-card transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-light-gray flex-shrink-0">
            {professional.photoURL ? (
              <Image
                src={professional.photoURL}
                alt={professional.displayName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-accent/10 text-accent font-bold text-lg">
                {professional.displayName?.charAt(0) || "P"}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-navy truncate">{professional.displayName}</h3>
              <Badge variant="accent" className="text-xs whitespace-nowrap">SOI Approved</Badge>
            </div>
            <p className="text-sm text-secondary-text">{professional.professionalType}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-secondary-text mb-4">
          <span className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5" />
            {professional.specialization}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {professional.city}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {professional.experienceYears} Years
          </span>
        </div>

        <p className="text-sm text-secondary-text line-clamp-2 mb-4">
          {professional.bio || "No bio provided."}
        </p>

        <Button onClick={onViewProfile} variant="secondary" fullWidth size="sm">
          View Profile
        </Button>
      </div>
    </motion.div>
  );
}