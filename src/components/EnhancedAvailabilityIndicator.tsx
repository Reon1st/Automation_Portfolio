import React, { useState, useEffect } from 'react';
import { isInClassNow } from '@/lib/classStatus';
import { useMagneticHover } from '@/hooks/useAdvancedAnimations';

interface EnhancedAvailabilityIndicatorProps {
  className?: string;
  variant?: 'default' | 'compact' | 'premium';
}

const EnhancedAvailabilityIndicator: React.FC<EnhancedAvailabilityIndicatorProps> = ({
  className = "",
  variant = 'default'
}) => {
  const [isAvailable, setIsAvailable] = useState(() => !isInClassNow());
  const { ref: magneticRef, isHovering } = useMagneticHover({
    intensity: 0.2,
    duration: 200
  });

  useEffect(() => {
    const id = setInterval(() => setIsAvailable(!isInClassNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (variant === 'premium') {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-md border border-border/30 shadow-lg transition-all duration-500 ease-out hover:shadow-xl hover:border-border/50 ${className}`}>
        <div className="relative flex-shrink-0">
          <div className={`w-4 h-4 rounded-full shadow-md transition-all duration-500 ${isAvailable ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40' : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/40'}`}></div>
          <div className={`absolute inset-0 w-4 h-4 rounded-full transition-opacity duration-1000 ${isAvailable ? 'bg-emerald-400/40 shadow-[0_0_12px_4px_rgba(52,211,153,0.3)]' : 'bg-red-400/40 shadow-[0_0_12px_4px_rgba(248,113,113,0.3)]'}`}></div>
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-semibold transition-colors duration-300 ${isAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 transition-all duration-300 ${className}`}>
        <div className="relative">
          <div className={`w-3 h-3 rounded-full shadow-md transition-all duration-500 ${isAvailable ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30' : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30'}`}></div>
          <div className={`absolute inset-0 w-3 h-3 rounded-full transition-opacity duration-700 ${isAvailable ? 'bg-emerald-400/30 shadow-[0_0_8px_2px_rgba(52,211,153,0.25)]' : 'bg-red-400/30 shadow-[0_0_8px_2px_rgba(248,113,113,0.25)]'}`}></div>
        </div>
        <span className={`text-sm font-medium transition-colors duration-300 ${isAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 transition-all duration-300 ${className}`}>
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-500 ${isAvailable ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/20' : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/20'}`}></div>
        <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full transition-opacity duration-700 ${isAvailable ? 'shadow-[0_0_6px_2px_rgba(52,211,153,0.2)]' : 'shadow-[0_0_6px_2px_rgba(248,113,113,0.2)]'}`}></div>
      </div>
      <span className="text-sm text-muted-foreground transition-colors duration-300">
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
};

export default EnhancedAvailabilityIndicator;
