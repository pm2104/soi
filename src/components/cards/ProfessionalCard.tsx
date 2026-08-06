"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Award } from "lucide-react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProfessionalCardProps {
  name: string;
  role: string;
  city: string;
  experience: string;
  avatar: string;
  premium: boolean;
  index: number;
}

export default function ProfessionalCard({
  name,
  role,
  city,
  experience,
  avatar,
  premium,
  index,
}: ProfessionalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-hover border border-border/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-light-gray">
            <Image
              src={avatar}
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          {premium && (
            <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-lg">
              <Award className="h-3 w-3" />
            </div>
          )}
        </div>
        {premium && <Badge variant="premium">Premium</Badge>}
      </div>

      <h3 className="text-lg font-bold text-text mb-1">{name}</h3>
      <p className="text-sm font-medium text-accent mb-3">{role}</p>

      <div className="flex items-center gap-4 text-xs text-secondary-text mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{city}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-amber-500" />
          <span>{experience}</span>
        </div>
      </div>

      <Button variant="ghost" size="sm" fullWidth className="mt-2">
        View Profile
      </Button>
    </motion.div>
  );
}