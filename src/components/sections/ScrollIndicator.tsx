import React from "react";
import { ChevronRight } from "lucide-react";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const ScrollIndicator: React.FC = () => {
  const { scrollToElement } = useScrollToElement();

  return (
    <div className="flex justify-center pb-8 relative bg-gradient-to-b from-background/95 via-primary/[0.02] to-background/95">
      <button
        onClick={() => scrollToElement("services", { offset: -100 })}
        className="group scroll-indicator flex flex-col items-center gap-4 text-muted-foreground hover:text-accent transition-all duration-500 cursor-pointer"
        aria-label="Scroll to explore the Services section"
      >
        {/* Floating particles */}
        <div className="floating-dots" />

        {/* Main text with enhanced styling */}
        <div className="relative">
          <span className="text-sm font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-all duration-300 relative z-10">
            Scroll to explore
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-0 group-hover:opacity-30 transition-all duration-300 scale-150 rounded-lg" />
        </div>

        {/* Technical mouse design with lift animation */}
        <div
          className="relative tech-mouse w-10 h-16 p-1 transform transition-all duration-500 ease-out 
                     group-hover:border-accent group-hover:shadow-xl group-hover:shadow-accent/40 
                     group-hover:-translate-y-3 group-hover:scale-115 
                     border-2 border-muted-foreground/30 rounded-2xl 
                     bg-gradient-to-b from-background/90 to-muted/30 backdrop-blur-sm"
        >
          {/* Mouse wheel indicator with enhanced animation */}
          <div className="flex justify-center mt-2">
            <div
              className="scroll-wheel w-1.5 h-4 bg-accent/80 rounded-full relative transform transition-all duration-300
                         group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/60 group-hover:scale-110"
            >
              <div
                className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-primary rounded-full 
                           animate-pulse group-hover:animate-bounce group-hover:bg-accent transition-colors duration-300"
              />
            </div>
          </div>

          {/* Scroll arrows with flowing animation */}
          <div className="scroll-arrows flex flex-col items-center space-y-1 mt-2">
            {[...Array(3)].map((_, i) => (
              <ChevronRight
                key={i}
                className="w-2 h-2 text-accent/60 rotate-90 transition-all duration-300 
                           group-hover:text-accent group-hover:translate-y-1"
                style={{
                  animation: `flowing-down 3.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle tech accent */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent/60 transition-all duration-300" />
      </button>
    </div>
  );
};

export default ScrollIndicator;
