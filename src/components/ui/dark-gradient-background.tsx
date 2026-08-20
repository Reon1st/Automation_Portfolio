import type React from "react";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-page dark gradient backdrop. Deep charcoal is held through the top of
 * the page (hero → projects), then descends slowly into brand cyan toward the
 * footer. A faint geometric grid adds premium texture without clutter.
 */
export function GradientBackground({ children, className = "" }: GradientBackgroundProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main gradient — charcoal held to ~45%, a subtle cyan tint introduced
          at the Websites section (~62%), then eased into a muted deep teal
          rather than a vivid cyan by the footer — keeps the accent felt
          without it reading as saturated color wash. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0B0D12 0%, #0B0D12 45%, #06232C 62%, #123540 80%, #17414C 100%)",
        }}
      />

      {/* Subtle geometric grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
