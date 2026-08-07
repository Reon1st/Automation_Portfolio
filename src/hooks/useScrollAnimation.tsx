import { useEffect, useRef, useState } from 'react';

type AnimationVariant = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'scaleGlow' | 'cascade' | 'blur';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: number;
  variant?: AnimationVariant;
  duration?: number;
  easing?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    stagger = 0,
    variant = 'fade',
    duration = 600,
    easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasAnimatedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Ensure initial hidden state without flash (JS-enabled only)
    element.classList.add('sa-init', 'will-animate');
    element.setAttribute('data-animation-variant', variant);

    // Apply animation styles based on variant
    const animationStyles = getAnimationStyles(variant);
    Object.assign(element.style, {
      transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
      transitionDelay: stagger > 0 ? `${stagger}ms` : '0ms',
      ...animationStyles.initial
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimatedRef.current)) {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          if (stagger > 0) {
            timeoutRef.current = window.setTimeout(() => {
              applyAnimationState(element, variant, 'animate');
              setIsVisible(true);
              setHasAnimated(true);
              hasAnimatedRef.current = true;
              if (triggerOnce) observer.unobserve(element);
            }, stagger);
          } else {
            applyAnimationState(element, variant, 'animate');
            setIsVisible(true);
            setHasAnimated(true);
            hasAnimatedRef.current = true;
            if (triggerOnce) observer.unobserve(element);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          // Reset for re-entrance
          applyAnimationState(element, variant, 'reset');
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      try { observer.unobserve(element); } catch { /* noop */ }
    };
  }, [threshold, rootMargin, triggerOnce, stagger]);

  return { ref: elementRef, isVisible, hasAnimated };
};

// Animation variant configurations
const getAnimationStyles = (variant: AnimationVariant) => {
  const styles = {
    fade: {
      initial: { opacity: '0' },
      animate: { opacity: '1', transform: 'none' }
    },
    slideUp: {
      initial: { opacity: '0', transform: 'translateY(40px)' },
      animate: { opacity: '1', transform: 'translateY(0)' }
    },
    slideLeft: {
      initial: { opacity: '0', transform: 'translateX(-40px)' },
      animate: { opacity: '1', transform: 'translateX(0)' }
    },
    slideRight: {
      initial: { opacity: '0', transform: 'translateX(40px)' },
      animate: { opacity: '1', transform: 'translateX(0)' }
    },
    scale: {
      initial: { opacity: '0', transform: 'scale(0.9)' },
      animate: { opacity: '1', transform: 'scale(1)' }
    },
    scaleGlow: {
      initial: { opacity: '0', transform: 'scale(0.9)', filter: 'blur(8px)' },
      animate: { opacity: '1', transform: 'scale(1)', filter: 'blur(0px)' }
    },
    cascade: {
      initial: { opacity: '0', transform: 'translateY(60px)' },
      animate: { opacity: '1', transform: 'translateY(0)' }
    },
    blur: {
      initial: { opacity: '0', filter: 'blur(10px)', transform: 'scale(1.05)' },
      animate: { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' }
    }
  };
  
  return styles[variant] || styles.fade;
};

const applyAnimationState = (element: HTMLElement, variant: AnimationVariant, state: 'reset' | 'animate') => {
  const styles = getAnimationStyles(variant);
  
  if (state === 'animate') {
    element.classList.add('sa-in');
    element.classList.remove('sa-init');
    Object.assign(element.style, styles.animate);
  } else {
    element.classList.remove('sa-in');
    element.classList.add('sa-init');
    Object.assign(element.style, styles.initial);
  }
};

// Hook for staggered children animations
export const useStaggeredChildren = (childCount: number, staggerDelay: number = 100) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial hidden state for children to avoid flash
    const children = Array.from(container.children) as HTMLElement[];
    const easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    const duration = 600; // ms
    children.forEach((child) => {
      if (!(child instanceof HTMLElement)) return;
      child.classList.add('sa-child-init', 'will-animate');
      child.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      child.style.transitionDelay = '0ms';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          children.forEach((child, index) => {
            if (!(child instanceof HTMLElement)) return;
            child.style.transitionDelay = `${index * staggerDelay}ms`;
            child.classList.add('sa-in');
            child.classList.remove('sa-child-init');
          });
        } else {
          // Optional reset when out of view
          children.forEach((child) => {
            if (!(child instanceof HTMLElement)) return;
            child.classList.remove('sa-in');
            child.classList.add('sa-child-init');
          });
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(container);

    return () => {
      try { observer.unobserve(container); } catch { /* noop */ }
    };
  }, [childCount, staggerDelay]);

  return { ref: containerRef, isVisible };
};