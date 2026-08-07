import React from 'react';

const AutomationFlowAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Strategic Data Processing Indicators */}
      <div className="absolute top-1/2 left-8 w-1 h-8 bg-gradient-to-b from-primary/20 to-transparent animate-pulse" style={{ animationDelay: '0.8s', animationDuration: '6s' }} />
      <div className="absolute top-1/3 right-12 w-6 h-1 bg-gradient-to-r from-accent/20 to-transparent animate-pulse" style={{ animationDelay: '1.2s', animationDuration: '8s' }} />

      {/* Automation Flow Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Curved Connection Lines */}
        <path 
          d="M 100 150 Q 300 100 500 200 T 900 180" 
          stroke="url(#flowGradient1)" 
          strokeWidth="1" 
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <path 
          d="M 200 300 Q 400 250 600 350 T 1000 320" 
          stroke="url(#flowGradient2)" 
          strokeWidth="1" 
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '8s', animationDelay: '1s' }}
        />
        <path 
          d="M 50 500 Q 250 450 450 550 T 850 520" 
          stroke="url(#flowGradient1)" 
          strokeWidth="1" 
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        
        {/* Data Flow Particles */}
        <circle r="2" fill="hsl(var(--primary))">
          <animateMotion dur="8s" repeatCount="indefinite">
            <path d="M 100 150 Q 300 100 500 200 T 900 180" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" />
        </circle>
        
        <circle r="1.5" fill="hsl(var(--accent))">
          <animateMotion dur="10s" repeatCount="indefinite" begin="2s">
            <path d="M 200 300 Q 400 250 600 350 T 1000 320" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="10s" repeatCount="indefinite" begin="2s" />
        </circle>
        
        <circle r="2.5" fill="hsl(var(--primary))">
          <animateMotion dur="12s" repeatCount="indefinite" begin="4s">
            <path d="M 50 500 Q 250 450 450 550 T 850 520" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="12s" repeatCount="indefinite" begin="4s" />
        </circle>
      </svg>
    </div>
  );
};

export default AutomationFlowAnimation;
