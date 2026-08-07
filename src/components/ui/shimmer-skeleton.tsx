import { cn } from "@/lib/utils";

interface ShimmerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "image" | "text" | "badge";
}

function ShimmerSkeleton({
  className,
  variant = "default",
  ...props
}: ShimmerSkeletonProps) {
  const baseClasses = "relative overflow-hidden bg-muted/30 rounded-lg";
  
  const shimmerClasses = `
    before:absolute before:inset-0 
    before:translate-x-[-100%] 
    before:animate-[shimmer_2s_infinite] 
    before:bg-gradient-to-r 
    before:from-transparent 
    before:via-white/10 
    before:to-transparent
  `;

  const variantClasses = {
    default: "h-4 w-full",
    card: "h-full w-full",
    image: "aspect-video w-full",
    text: "h-4 w-3/4",
    badge: "h-6 w-20 rounded-full",
  };

  return (
    <div
      className={cn(baseClasses, shimmerClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

// Premium loading skeleton for portfolio cards
function PortfolioSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Image skeleton */}
      <div className="relative rounded-xl overflow-hidden border border-border/30 bg-card/50">
        <ShimmerSkeleton variant="image" className="min-h-[300px]" />
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <ShimmerSkeleton variant="badge" />
          <ShimmerSkeleton variant="badge" className="w-24" />
        </div>
      </div>
    </div>
  );
}

// Premium loading skeleton for project details - compact version
function ProjectDetailsSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ShimmerSkeleton className="h-6 w-1/2" />
          <ShimmerSkeleton variant="badge" className="w-14 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <ShimmerSkeleton className="h-3 w-3 rounded-full" />
          <ShimmerSkeleton className="h-3 w-28" />
        </div>
        <ShimmerSkeleton className="h-3 w-full" />
        <ShimmerSkeleton className="h-3 w-4/5" />
      </div>

      {/* Features */}
      <div className="space-y-2">
        <ShimmerSkeleton className="h-2.5 w-20" />
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/10">
              <ShimmerSkeleton className="h-3 w-3 rounded" />
              <ShimmerSkeleton className="h-3 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-2">
        <ShimmerSkeleton className="h-2.5 w-20" />
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerSkeleton key={i} variant="badge" className="w-14 h-5" />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-3 border-t border-border/20">
        <ShimmerSkeleton className="h-7 w-20 rounded-md" />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <ShimmerSkeleton key={i} className="h-2 w-2 rounded-full" />
          ))}
        </div>
        <ShimmerSkeleton className="h-7 w-16 rounded-md" />
      </div>
    </div>
  );
}

export { ShimmerSkeleton, PortfolioSkeleton, ProjectDetailsSkeleton };
