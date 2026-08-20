import React from "react";

/**
 * Minimal section divider: a single hairline fading from transparent edges to
 * a soft cyan center. Purely decorative — hidden from assistive tech.
 */
const SectionDivider: React.FC = () => (
  <div className="mx-auto max-w-5xl px-6 py-3" aria-hidden="true">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
);

export default SectionDivider;
