import React from "react";

interface FloatingElementsProps {
  variant?: "default" | "footer" | "minimal";
  className?: string;
}

/**
 * Reusable subtle background scan lines for sections.
 * Provides consistent ambient depth across the site.
 */
const FloatingElements: React.FC<FloatingElementsProps> = ({
  variant = "default",
  className = "",
}) => {
  if (variant === "minimal") {
    return (
      <div className={`pointer-events-none ${className}`}>
        <div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`pointer-events-none ${className}`}>
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/6 to-transparent animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/6 to-transparent animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "3s" }}
        />
      </div>
    );
  }

  // Default variant - subtle scan lines
  return (
    <div className={`pointer-events-none ${className}`}>
      <div
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/6 to-transparent animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />
    </div>
  );
};

export default FloatingElements;
