import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ArrowRight, Settings, Workflow, Mail, Palette, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { prefetchAbout } from "@/lib/routePrefetch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const mobileNavIcons: Record<string, React.ElementType> = {
    "#services": Settings,
    "#portfolio": Workflow,
    "#websites": Palette,
    "#contact": Mail
  };
  // "Projects" is the compact label for the desktop dropdown trigger — mobile
  // has room for the fuller name.
  const mobileNavLabels: Record<string, string> = {
    "#portfolio": "Automation Projects"
  };
  return <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled || isMobileMenuOpen ? "bg-background/98 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => window.scrollTo({
        top: 0,
        behavior: "smooth"
      })} className={`text-xl font-bold transition-all duration-300 hover:text-primary cursor-pointer ${isScrolled ? "text-foreground scale-95" : "text-foreground scale-100"}`}>
          Reon Martin
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {NAV_ITEMS.map(item => {
          // "Websites" is absorbed into the "Automation Projects" dropdown below
          if (item.label === "Websites") return null;
          if (item.label === "Projects") {
            return <DropdownMenu key={item.href}>
                <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors duration-300 outline-none">
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <a href="#portfolio">Automation</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#websites">Websites</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>;
          }
          return <a key={item.href} href={item.href} className="relative font-medium text-foreground hover:text-foreground transition-all duration-300 group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>;
        })}
        </nav>

        {/* About Me Button and Mobile menu */}
        <div className="flex items-center gap-3">
          <Link to="/about" onMouseEnter={prefetchAbout} onFocus={prefetchAbout} onTouchStart={prefetchAbout} className="hidden md:block group">
            <button
              className="flex items-center gap-2 pl-2 pr-4 h-10 rounded-full border border-primary/20 bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:shadow-md group-hover:shadow-primary/15"
              aria-label="About Me"
            >
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <User className="absolute w-3.5 h-3.5 text-primary-foreground transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:opacity-0" />
                <ArrowRight className="absolute w-3.5 h-3.5 text-primary-foreground translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
              </span>
              <span className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                About
              </span>
            </button>
          </Link>

          <button className="md:hidden p-2 text-foreground hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}`}>
        <div className="bg-gradient-to-b from-background via-background/98 to-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }} />
          </div>

          <nav className="container mx-auto px-6 py-6 space-y-2 relative z-10">
            {/* About Me Link - Special styling */}
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} onTouchStart={prefetchAbout} className="group flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 hover:border-primary/40 hover:from-primary/15 hover:via-accent/10 hover:to-primary/15 transition-all duration-300 touch-manipulation active:scale-[0.98]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                About Me
              </span>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </Link>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-3" />

            {/* Navigation Links */}
            {NAV_ITEMS.map((item, index) => {
            const Icon = mobileNavIcons[item.href] || Settings;
            return <a key={item.href} href={item.href} className="group flex items-center gap-3 py-3.5 px-4 rounded-xl font-medium text-foreground hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/5 hover:text-accent transition-all duration-300 active:scale-[0.98] touch-manipulation" onClick={() => setIsMobileMenuOpen(false)} style={{
              animationDelay: `${index * 50}ms`
            }}>
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                  <span className="text-sm">{mobileNavLabels[item.href] || item.label}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent/0 group-hover:bg-accent transition-all duration-300" />
                </a>;
          })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300" onClick={() => setIsMobileMenuOpen(false)} style={{
      top: "100%"
    }} />}
    </header>;
};
export default Header;