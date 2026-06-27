import { ReactNode } from "react";
import Title from "./Title";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * A standard page header component featuring an upscale Title and description.
 */
export default function PageHeader({
  title,
  description,
  className = "mb-8",
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-2.5 text-center max-w-2xl mx-auto ${className}`}>
      <Title>{title}</Title>
      {description && (
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
