import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; alt: string; title?: string }>;
  initialIndex: number;
}

export const ImageZoomModal = ({ isOpen, onClose, images, initialIndex }: ImageZoomModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageRefs = useRef<Record<number, HTMLImageElement>>({});

  // Update current index when initialIndex changes (when modal reopens)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Preload images function
  const preloadImage = (index: number) => {
    if (index < 0 || index >= images.length || loadedImages[index]) return;

    const img = new Image();
    imageRefs.current[index] = img;
    
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    img.onload = () => {
      setLoadedImages(prev => ({ ...prev, [index]: true }));
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    };
    
    img.onerror = () => {
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    };
    
    img.src = images[index].src;
  };

  // Preload adjacent images
  const preloadAdjacentImages = (centerIndex: number) => {
    const indicesToPreload = [
      centerIndex - 1,
      centerIndex,
      centerIndex + 1
    ].filter(index => index >= 0 && index < images.length);
    
    indicesToPreload.forEach(preloadImage);
  };

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setIsTransitioning(false);
    
    if (isOpen) {
      preloadAdjacentImages(initialIndex);
    }
  }, [initialIndex, isOpen]);

  // Preload when currentIndex changes
  useEffect(() => {
    if (isOpen) {
      preloadAdjacentImages(currentIndex);
    }
  }, [currentIndex, isOpen]);

  const currentImage = images[currentIndex];

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      handleReset();
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      handleReset();
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  // Download functionality removed to protect portfolio images

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'r':
        handleRotate();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-black/95 border-none overflow-hidden data-[state=open]:animate-[fade-in_0.4s_ease-out,scale-in_0.3s_ease-out] data-[state=closed]:animate-[fade-out_0.3s_ease-in,scale-out_0.2s_ease-in]">
        <DialogTitle className="sr-only">{currentImage.title ?? currentImage.alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Zoomable image viewer, image {currentIndex + 1} of {images.length}
        </DialogDescription>
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center flex-wrap gap-2 animate-[fade-in_0.5s_ease-out_0.2s_both]">
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary" size="sm" onClick={handleZoomOut} disabled={scale <= 0.5} className="transition-all duration-300 hover:scale-110 hover:bg-white/20">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleZoomIn} disabled={scale >= 3} className="transition-all duration-300 hover:scale-110 hover:bg-white/20">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleRotate} className="transition-all duration-300 hover:scale-110 hover:bg-white/20 active:rotate-90">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleReset} className="transition-all duration-300 hover:scale-105 hover:bg-white/20">
              Reset
            </Button>
          </div>
          
          <div className="text-white/80 text-sm bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
          
          <Button variant="secondary" size="sm" onClick={onClose} className="transition-all duration-300 hover:scale-110 hover:bg-red-500/20 hover:text-red-400">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:-translate-x-1"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:translate-x-1"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Container */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden cursor-move relative select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Loading State */}
          {loadingStates[currentIndex] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 text-white/60 animate-spin" />
                <span className="text-white/60 text-sm">Loading image...</span>
              </div>
            </div>
          )}
          
          {/* Main Image with Protection */}
          <div 
            className="relative animate-[scale-in_0.4s_ease-out]" 
            onDragStart={(e) => e.preventDefault()}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`w-auto h-auto max-w-[92vw] max-h-[85vh] select-none pointer-events-none ${
                isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
              } ${loadingStates[currentIndex] ? 'opacity-0' : ''}`}
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease-out',
                objectFit: 'contain'
              }}
              draggable={false}
              onLoad={() => {
                setLoadedImages(prev => ({ ...prev, [currentIndex]: true }));
                setLoadingStates(prev => ({ ...prev, [currentIndex]: false }));
              }}
            />
            {/* Transparent overlay to prevent saving */}
            <div className="absolute inset-0" />
          </div>
        </div>

        {/* Image Title */}
        {currentImage.title && (
          <div className="absolute bottom-4 left-4 right-4 text-center animate-[fade-in_0.5s_ease-out_0.3s_both]">
            <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full inline-block border border-white/10 shadow-lg">
              {currentImage.title}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help - Hidden on mobile */}
        <div className="absolute bottom-4 right-4 text-white/60 text-xs bg-black/50 px-3 py-2 rounded hidden sm:block">
          ←→ Navigate • +/- Zoom • R Rotate • ESC Close
        </div>
      </DialogContent>
    </Dialog>
  );
};