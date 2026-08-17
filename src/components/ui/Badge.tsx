import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "premium";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-light-gray text-secondary-text",
    accent: "bg-accent/10 text-accent border border-accent/20",
    outline: "bg-transparent border border-border text-secondary-text",
    premium: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}