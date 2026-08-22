"use client";

import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface WhatsAppButtonProps {
  phone: string;
  name: string;
}

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length >= 10) {
    return cleaned;
  }
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned;
}

export default function WhatsAppButton({ phone, name }: WhatsAppButtonProps) {
  if (!phone) return null;

  const normalized = normalizePhone(phone);
  const message = `Hello ${name}, I found your profile on Supervisors of India (SOI) and would like to discuss a construction project with you. Are you available to connect?`;
  const url = `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block w-full lg:w-auto">
      <Button variant="primary" size="lg" fullWidth>
        <MessageCircle className="h-5 w-5 mr-2" />
        Contact on WhatsApp
      </Button>
    </a>
  );
}