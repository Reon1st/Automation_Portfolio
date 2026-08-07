import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "video",
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

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
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square", 
    portrait: "aspect-[3/4]"
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${aspectClasses[aspectRatio]} bg-muted/20 rounded-lg overflow-hidden ${className}`}
    >
      {!isInView ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              </div>
            </div>
          )}
          
          {isError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          )}
        </>
      )}
    </div>
  );
};