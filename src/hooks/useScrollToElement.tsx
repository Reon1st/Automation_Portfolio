import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: 'smooth' | 'instant';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  offset?: number;
}

export const useScrollToElement = () => {
  const scrollToElement = useCallback((
    elementId: string, 
    options: ScrollOptions = {}
  ) => {
    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      offset = 0
    } = options;

    // First, check if element exists
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with ID '${elementId}' not found`);
      return false;
    }

    try {
      // Use instant behavior so Lenis handles the easing
      element.scrollIntoView({
        behavior: 'instant',
        block,
        inline
      });

      // Apply offset if specified
      if (offset !== 0) {
        setTimeout(() => {
          window.scrollBy({
            top: offset,
            behavior: 'smooth'
          });
        }, behavior === 'smooth' ? 300 : 0);
      }

      return true;

    } catch (error) {
      console.error('Error scrolling to element:', error);
      
      // Method 2: Final fallback - basic scroll
      try {
        const elementPosition = element.offsetTop + offset;
        window.scrollTo(0, elementPosition);
        return true;
      } catch (fallbackError) {
        console.error('Fallback scroll also failed:', fallbackError);
        return false;
      }
    }
  }, []);

  return { scrollToElement };
};