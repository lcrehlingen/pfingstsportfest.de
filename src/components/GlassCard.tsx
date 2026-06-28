import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * A standard layout container incorporating our trademark glassmorphism styling
 * (blurred semi-transparent background, subtle borders, and optional hover translations).
 */
export default function GlassCard({
  children,
  className = "",
  hoverable = true,
}: GlassCardProps) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden backdrop-blur-md transition-all duration-300 ${
        hoverable
          ? "hover:shadow-2xl hover:border-white/20 transform hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/8"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
