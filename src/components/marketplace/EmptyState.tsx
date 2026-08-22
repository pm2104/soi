import { HardHat } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-light-gray mb-4">
        <HardHat className="h-8 w-8 text-secondary-text" />
      </div>
      <h3 className="text-xl font-bold text-navy mb-2">Professionals are joining SOI</h3>
      <p className="text-secondary-text max-w-md mx-auto">
        We're currently onboarding approved professionals. Please check back soon.
      </p>
    </div>
  );
}