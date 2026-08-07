import React from 'react';
import { useAvailabilityStatus } from '@/hooks/useAvailabilityStatus';

interface AvailabilityIndicatorProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const AvailabilityIndicator: React.FC<AvailabilityIndicatorProps> = ({
  className = "",
  variant = 'default'
}) => {
  const isAvailable = useAvailabilityStatus();

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative">
          <div className={`w-3 h-3 rounded-full shadow-lg ${
            isAvailable
              ? 'bg-emerald-500'
              : 'bg-red-500'
          }`}></div>
          <div className={`absolute inset-0 w-3 h-3 rounded-full opacity-75 ${
            isAvailable
              ? 'bg-emerald-500 animate-ping'
              : 'bg-red-500 animate-ping'
          }`}></div>
        </div>
        <span className="text-sm font-semibold">
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`w-2 h-2 rounded-full ${
          isAvailable
            ? 'bg-green-500 animate-pulse'
            : 'bg-red-500'
        }`}
      ></div>
      <span className="text-sm text-muted-foreground">
        {isAvailable ? 'Available for new projects' : 'Currently unavailable'}
      </span>
    </div>
  );
};

export default AvailabilityIndicator;
