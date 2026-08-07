import { toast } from "sonner";

export const ThemeToggle = () => {
  const handleToggle = () => {
    toast("🚧 Light Theme - Work in Progress", {
      description: "Light theme is currently being designed. Dark theme provides the optimal experience for now.",
      duration: 4000,
    });
  };

  return (
    <div className="relative group">
      {/* Tech-inspired toggle container */}
      <button
        onClick={handleToggle}
        className="relative w-20 h-10 bg-gradient-to-r from-card via-secondary to-card border border-border hover:border-accent/50 rounded-xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden"
        aria-label="Toggle theme"
      >
        {/* Circuit board pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-3 w-8 h-0.5 bg-accent/30 rounded-full"></div>
          <div className="absolute top-4 left-2 w-6 h-0.5 bg-primary/20 rounded-full"></div>
          <div className="absolute bottom-2 right-3 w-8 h-0.5 bg-accent/30 rounded-full"></div>
          <div className="absolute bottom-4 right-2 w-6 h-0.5 bg-primary/20 rounded-full"></div>
          <div className="absolute top-3 left-1 w-0.5 h-4 bg-accent/20 rounded-full"></div>
          <div className="absolute top-2 right-1 w-0.5 h-5 bg-primary/15 rounded-full"></div>
        </div>
        
        {/* Scanning line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        
        {/* Main indicator */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-accent via-primary to-accent rounded-lg shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
          {/* Tech icon - terminal/code */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-3 h-0.5 bg-background rounded-full"></div>
              <div className="w-2 h-0.5 bg-background rounded-full mt-0.5 ml-0.5"></div>
              <div className="w-1 h-1 bg-background rounded-full absolute -bottom-0.5 right-0 animate-pulse"></div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-accent/30 rounded-lg animate-pulse opacity-50"></div>
        </div>
        
        {/* Status indicators */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
          <div className="w-1.5 h-1.5 bg-accent/80 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Data flow animation */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-0.5 bg-accent rounded-full opacity-60"
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Corner accent lights */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-accent/60 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-primary/60 rounded-full"></div>
      </button>
      
      {/* Status display */}
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground/70 font-mono tracking-wider">
            DARK MODE
          </span>
          <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"></div>
    </div>
  );
};