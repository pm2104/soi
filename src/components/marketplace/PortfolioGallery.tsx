"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface PortfolioGalleryProps {
  photos: string[];
}

export default function PortfolioGallery({ photos }: PortfolioGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((url, idx) => (
          <button
            key={idx}
            onClick={() => setLightbox(idx)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-light-gray group"
          >
            <Image
              src={url}
              alt={`Portfolio ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div className="relative w-full max-w-5xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={photos[lightbox]}
                alt={`Portfolio ${lightbox + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === lightbox ? "w-8 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}