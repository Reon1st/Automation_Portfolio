import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProcessStep {
  label: string;
  caption: string;
  images?: string[];
  optional?: boolean;
}

interface ProcessWalkthroughProps {
  title: string;
  steps: ProcessStep[];
  onImageClick: (imageIndex: number) => void;
  stepVisuals?: Record<string, React.ReactNode>;
}

const ProcessWalkthrough: React.FC<ProcessWalkthroughProps> = ({ title, steps, onImageClick, stepVisuals }) => {
  const visibleSteps = steps.filter((step) => (step.images && step.images.length > 0) || !step.optional);
  const [active, setActive] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const current = visibleSteps[active];

  useEffect(() => {
    setSubIndex(0);
  }, [active]);

  if (!current) return null;

  const currentImages = current.images ?? [];
  const currentImage = currentImages[subIndex];
  const customVisual = stepVisuals?.[current.label];

  // global index of this step's Nth image, for zoom-modal navigation across all steps
  const imageIndexOf = (stepIdx: number, imgIdx: number) =>
    visibleSteps.slice(0, stepIdx).reduce((count, s) => count + (s.images?.length ?? 0), 0) + imgIdx;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {visibleSteps.map((step, i) => (
          <div className="contents" key={step.label}>
            <button
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 flex-shrink-0 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                active === i ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`flex items-center justify-center h-6 w-6 rounded-full border text-[11px] font-semibold transition-all duration-300 ${
                  active === i ? "border-primary bg-primary/15" : "border-border/50"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-[11px] font-medium whitespace-nowrap">{step.label}</span>
            </button>
            {i < visibleSteps.length - 1 && <div className="w-4 h-px bg-border/40 flex-shrink-0" aria-hidden />}
          </div>
        ))}
      </div>

      {currentImage && (
        <div className="relative rounded-lg border border-border/50 overflow-hidden bg-muted/10">
          <button onClick={() => onImageClick(imageIndexOf(active, subIndex))} className="block w-full">
            <img
              src={currentImage}
              alt={`${title} — ${current.label}`}
              className="w-full h-auto max-h-[380px] object-contain"
              loading="lazy"
            />
          </button>

          {currentImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSubIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/85 backdrop-blur-md border border-border/50 shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSubIndex((prev) => (prev + 1) % currentImages.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/85 backdrop-blur-md border border-border/50 shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 right-2 text-[11px] font-medium bg-background/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-border/50">
                {subIndex + 1} / {currentImages.length}
              </div>
            </>
          )}
        </div>
      )}

      {customVisual}

      {!currentImage && !customVisual && (
        <div className="rounded-lg border border-border/50 overflow-hidden bg-muted/10 min-h-[180px] flex items-center justify-center p-6">
          <span className="text-sm text-muted-foreground text-center">Screenshot coming soon</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">{current.caption}</p>
    </div>
  );
};

export default ProcessWalkthrough;
