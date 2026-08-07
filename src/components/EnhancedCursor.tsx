import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  cursorType: 'default' | 'link' | 'button' | 'text' | 'image';
}

const EnhancedCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    cursorType: 'default'
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && trailRef.current) {
      const { x, y } = mousePosition.current;
      
      // Main cursor with smooth following
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      
      // Trail with delayed following for smooth effect
      const currentTrailTransform = trailRef.current.style.transform;
      const trailMatch = currentTrailTransform.match(/translate3d\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px, 0\)/);
      
      let trailX = x;
      let trailY = y;
      
      if (trailMatch) {
        const currentX = parseFloat(trailMatch[1]);
        const currentY = parseFloat(trailMatch[2]);
        trailX = currentX + (x - currentX) * 0.1;
        trailY = currentY + (y - currentY) * 0.1;
      }
      
      trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
    }
    
    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setCursorState(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let cursorType: CursorState['cursorType'] = 'default';
      
      if (target.tagName === 'A' || target.closest('a')) {
        cursorType = 'link';
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-pointer')) {
        cursorType = 'button';
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        cursorType = 'text';
      } else if (target.tagName === 'IMG' || target.closest('[data-cursor="image"]')) {
        cursorType = 'image';
      }

      setCursorState(prev => ({ ...prev, isHovering: true, cursorType }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isHovering: false, cursorType: 'default' }));
    };

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor], .cursor-pointer');
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCursorPosition]);

  const getCursorClasses = () => {
    const baseClasses = "fixed pointer-events-none z-50 rounded-full transition-all duration-300 ease-out mix-blend-difference";
    
    switch (cursorState.cursorType) {
      case 'link':
        return `${baseClasses} w-8 h-8 bg-primary scale-125`;
      case 'button':
        return `${baseClasses} w-10 h-10 bg-accent scale-110 border-2 border-primary`;
      case 'text':
        return `${baseClasses} w-6 h-6 bg-secondary scale-90`;
      case 'image':
        return `${baseClasses} w-12 h-12 bg-gradient-to-r from-primary to-accent scale-125 opacity-80`;
      default:
        return `${baseClasses} w-4 h-4 bg-foreground ${cursorState.isHovering ? 'scale-150' : 'scale-100'}`;
    }
  };

  const getTrailClasses = () => {
    const baseClasses = "fixed pointer-events-none z-40 rounded-full transition-all duration-500 ease-out";
    const hoverScale = cursorState.isHovering ? 'scale-75' : 'scale-50';
    
    return `${baseClasses} w-8 h-8 bg-foreground opacity-20 ${hoverScale}`;
  };

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        /* Particle trail effect */
        @keyframes cursor-trail {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        .cursor-trail-particle {
          animation: cursor-trail 0.6s ease-out forwards;
        }
      `}</style>
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={getCursorClasses()}
        style={{
          left: '-50%',
          top: '-50%',
        }}
      />
      
      {/* Cursor trail */}
      <div
        ref={trailRef}
        className={getTrailClasses()}
        style={{
          left: '-50%',
          top: '-50%',
        }}
      />
    </>
  );
};

export default EnhancedCursor;