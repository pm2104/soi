import { Shield } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-navy text-white py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm">
        <Shield className="h-4 w-4 text-accent shrink-0" />
        <span className="font-medium">
          SOI (SUPERVISORS OF INDIA) is a private platform and is not affiliated with, endorsed by, or associated with the Government of India or any government authority.
        </span>
      </div>
    </div>
  );
}