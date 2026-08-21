import { useState, useEffect, useRef } from "react";
import { ClipboardList, Loader2 } from "lucide-react";

interface LazyYouformProps {
  formId: string;
  className?: string;
  title?: string;
}

export const LazyYouform = ({ formId, className = "", title = "Quick qualification form" }: LazyYouformProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-lg overflow-hidden border border-border/20 bg-card min-h-[640px] relative ${className}`}
    >
      {!isInView ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[640px] text-muted-foreground">
          <ClipboardList className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm text-center px-4">Form will load when you scroll down</p>
        </div>
      ) : (
        <>
          {!isReady && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
              <p className="text-sm text-muted-foreground">Loading form...</p>
            </div>
          )}
          <iframe
            src={`https://app.youform.com/forms/${formId}`}
            title={title}
            onLoad={() => setIsReady(true)}
            className="w-full h-full min-h-[640px] border-0"
            allow="clipboard-write"
          />
        </>
      )}
    </div>
  );
};
