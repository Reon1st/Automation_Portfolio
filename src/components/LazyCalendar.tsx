import { useState, useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Calendar, Loader2 } from "lucide-react";

interface LazyCalendarProps {
  calLink: string;
  className?: string;
  title?: string;
}

export const LazyCalendar = ({ calLink, className = "", title = "Schedule a consultation" }: LazyCalendarProps) => {
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
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    (async () => {
      const cal = await getCalApi();
      // month_view: calendar grid + the selected day's time slots beside it.
      // column_view is a different Cal layout (one column per day, like a
      // week grid) — not what we want here.
      cal("ui", { theme: "dark", layout: "month_view", hideEventTypeDetails: false });
      // linkReady fires once Cal's booking page has actually rendered inside
      // the iframe — a real signal, not just "the embed script loaded".
      cal("on", { action: "linkReady", callback: () => setIsReady(true) });
    })();
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex-1 rounded-lg overflow-hidden border border-border/20 bg-card min-h-[760px] lg:min-h-[700px] relative ${className}`}
    >
      {!isInView ? (
        // Placeholder while not in view
        <div className="flex flex-col items-center justify-center h-full min-h-[760px] lg:min-h-[700px] text-muted-foreground">
          <Calendar className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm text-center px-4">Calendar will load when you scroll down</p>
        </div>
      ) : (
        <>
          {!isReady && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
              <p className="text-sm text-muted-foreground">Loading calendar...</p>
            </div>
          )}
          <Cal
            calLink={calLink}
            config={{ layout: "month_view", theme: "dark" }}
            style={{ width: "100%" }}
            aria-label={title}
          />
        </>
      )}
    </div>
  );
};
