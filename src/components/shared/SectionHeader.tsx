import React from "react";
import { LucideIcon } from "lucide-react";
interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  titleId?: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

/**
 * Reusable section header component with consistent styling.
 * Includes optional badge, gradient title, and subtitle.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  titleId,
  subtitle,
  className = "",
  centered = true
}) => {
  return <div className={`${centered ? "text-center" : ""} mb-8 ${className}`}>
      {/* Animated Badge */}
      {badge && <div className={`inline-flex items-center gap-2 px-3 py-1.5 mb-2 rounded-full bg-primary/10 border border-primary/20 ${centered ? "mx-auto" : ""}`}>
          {badge.icon && <badge.icon className="w-3.5 h-3.5 text-primary" />}
          <span className="font-medium text-primary text-xs">{badge.text}</span>
        </div>}

      {/* Main Title with Gradient */}
      <h2 id={titleId} className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
        {title}
      </h2>

      {/* Decorative Line */}
      <div className={`w-12 md:w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full mb-4 ${centered ? "mx-auto" : ""}`} />

      {/* Subtitle */}
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
          {subtitle}
        </p>}
    </div>;
};
export default SectionHeader;