import { useCallback, useEffect, useRef, useState } from 'react';

export interface AdvancedAnimationOptions {
  variant?: 'magnetic' | 'tilt' | 'morph' | 'liquid' | 'parallax' | 'physics';
  intensity?: number;
  duration?: number;
  easing?: string;
  trigger?: 'hover' | 'scroll' | 'click' | 'mousemove';
  threshold?: number;
}

// Advanced easing curves
export const ADVANCED_EASINGS = {
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  liquid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
};

// Magnetic hover effect
export const useMagneticHover = (options: AdvancedAnimationOptions = {}) => {
  const { intensity = 0.3, duration = 300, easing = ADVANCED_EASINGS.smooth } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;
      
      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.02)`;
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      element.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      element.removeEventListener('mousemove', handleMouseMove);
      element.style.transform = 'translate3d(0, 0, 0) scale(1)';
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, duration, easing]);

  return { ref: elementRef, isHovering };
};

// 3D Tilt Effect
export const use3DTilt = (options: AdvancedAnimationOptions = {}) => {
  const { intensity = 15, duration = 200, easing = ADVANCED_EASINGS.smooth } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
      const rotateY = ((e.clientX - centerX) / rect.width) * -intensity;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    const handleMouseEnter = () => {
      element.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, duration, easing]);

  return { ref: elementRef };
};

// Parallax scroll effect
export const useParallax = (options: AdvancedAnimationOptions = {}) => {
  const { intensity = 0.5 } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallax = scrolled * intensity;
      
      element.style.transform = `translate3d(0, ${parallax}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return { ref: elementRef };
};

// Morphing button effect
export const useMorphingButton = (options: AdvancedAnimationOptions = {}) => {
  const { duration = 400, easing = ADVANCED_EASINGS.elastic } = options;
  const elementRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseDown = () => {
      setIsPressed(true);
      element.style.transform = 'scale(0.95) translateY(2px)';
      element.style.transition = `transform 100ms ${ADVANCED_EASINGS.sharp}`;
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      element.style.transform = 'scale(1) translateY(0)';
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    const handleMouseEnter = () => {
      element.style.transform = 'scale(1.02) translateY(-1px)';
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'scale(1) translateY(0)';
      element.style.transition = `transform ${duration}ms ${easing}`;
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [duration, easing]);

  return { ref: elementRef, isPressed };
};

// Advanced scroll velocity detection
export const useScrollVelocity = (callback?: (velocity: number) => void) => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);

  useEffect(() => {
    const updateVelocity = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const timeDelta = now - lastTimestamp.current;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      if (timeDelta > 0) {
        const currentVelocity = Math.abs(scrollDelta) / timeDelta;
        setVelocity(currentVelocity);
        callback?.(currentVelocity);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = now;
      
      requestAnimationFrame(updateVelocity);
    };

    requestAnimationFrame(updateVelocity);
  }, [callback]);

  return velocity;
};

// Stagger timeline animations
export const useStaggerTimeline = (count: number, delay: number = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  const triggerAnimation = useCallback(() => {
    setIsVisible(true);
    elementRefs.current.forEach((element, index) => {
      if (element) {
        setTimeout(() => {
          element.style.transform = 'translateY(0) scale(1) rotateX(0)';
          element.style.opacity = '1';
          element.style.transition = `all 600ms ${ADVANCED_EASINGS.expo} ${index * delay}ms`;
        }, index * delay);
      }
    });
  }, [count, delay]);

  const setRef = useCallback((index: number) => (element: HTMLElement | null) => {
    elementRefs.current[index] = element;
    if (element && !isVisible) {
      element.style.transform = 'translateY(30px) scale(0.9) rotateX(-10deg)';
      element.style.opacity = '0';
    }
  }, [isVisible]);

  return { triggerAnimation, setRef, isVisible };
};