import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-accent/30 rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/5 right-1/5 w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl animate-gradient-shift"></div>
        <div className="absolute bottom-1/5 left-1/5 w-12 h-12 bg-gradient-to-l from-secondary/10 to-primary/10 rounded-full blur-lg animate-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="text-center z-10">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary mb-4 animate-glow">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full animate-gradient-shift"></div>
        </div>
        
        <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for seems to have vanished into the digital void.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
          >
            <Home className="w-4 h-4 group-hover:animate-pulse" />
            Return Home
          </a>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:animate-float" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
