import { Shield } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-navy text-white py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm">
        <Shield className="h-4 w-4 text-accent shrink-0" />
        <span className="font-medium">
          SOI (Supervisors of India) is a private platform and is not affiliated with the Government of India.
        </span>
      </div>
    </div>
  );
}