import React from "react";
import { MapPin, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LinkedInIcon } from "@/components/UpdatedSocialIcons";
import { GitHubIcon, XIcon } from "@/components/PlatformIcons";
import AvailabilityIndicator from "@/components/AvailabilityIndicator";
import EnhancedAvailabilityIndicator from "@/components/EnhancedAvailabilityIndicator";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import profileImage from "@/assets/profile-4k.jpg";
import iphoneOutline from "@/assets/iphone-outline.png";
import { SITE_CONFIG, SOCIAL_LINKS, ANIMATION_PRESETS } from "@/lib/constants";
const HeroSection: React.FC = () => {
  const {
    scrollToElement
  } = useScrollToElement();
  const heroAnimation = useScrollAnimation(ANIMATION_PRESETS.hero);
  const heroElements = useStaggeredChildren(ANIMATION_PRESETS.stagger.hero.count, ANIMATION_PRESETS.stagger.hero.delay);

  const profileVisual = (
    <div className="relative group">
      {/* Outer glow ring */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

      {/* Secondary decorative ring */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 rounded-full opacity-40 group-hover:opacity-60 transition-all duration-500" />

      <Avatar className="relative h-52 w-52 lg:h-64 lg:w-64 ring-[3px] ring-border/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out group-hover:ring-primary/30">
        <AvatarImage src={profileImage} alt="Reon - Professional AI Automation Specialist in Philippines, expert in Zapier, Make.com, and GoHighLevel workflow automation" fetchPriority="high" className="object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.02]" loading="eager" />
        <AvatarFallback className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-secondary to-muted text-secondary-foreground">
          RM
        </AvatarFallback>
      </Avatar>

      <EnhancedAvailabilityIndicator variant="premium" className="absolute -bottom-2 -right-2 shadow-xl transition-all duration-300 hover:scale-105" />
    </div>
  );

  return <section ref={heroAnimation.ref as React.RefObject<HTMLElement>} className="pt-20 pb-4 px-6 relative overflow-hidden will-animate">


      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Content */}
          <div ref={heroElements.ref as React.RefObject<HTMLDivElement>} className="space-y-6 will-animate">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-center lg:text-left will-animate">
                {SITE_CONFIG.name}
              </h1>

              {/* Profile photo + availability badge — mobile only, sits right under the name. Desktop keeps its own copy in the right column below. */}
              <div className="flex justify-center py-2 lg:hidden will-animate">
                {profileVisual}
              </div>

              <div className="text-center lg:text-left will-animate">
                <h2 className="text-lg lg:text-xl text-primary font-semibold">
                  {SITE_CONFIG.title}
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{SITE_CONFIG.location}</span>
                </div>
              </div>

              <div className="space-y-3 will-animate">
                <p className="text-base leading-relaxed max-w-2xl text-foreground">
                  I build AI-powered systems that help service businesses capture more leads,
                  automate operations, and cut repetitive work — without ripping out the tools you already run on.
                </p>
                <p className="text-sm leading-relaxed max-w-2xl text-muted-foreground">
                  I build AI support agents, smart booking systems, CRM automation, live dashboards, and
                  conversion-focused websites — each one{" "}
                  <span className="text-primary font-medium">scoped to what the business actually needs</span>.
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground/80 pt-1">
                  {["AI Systems", "CRM Automation", "Websites", "AI Agents", "Business Automation"].map((tag, i, arr) => (
                    <React.Fragment key={tag}>
                      <span className="font-medium">{tag}</span>
                      {i < arr.length - 1 && <span className="text-primary/50">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl border border-primary/20 backdrop-blur-sm will-animate">
                <AvailabilityIndicator />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{SITE_CONFIG.responseTime}</span>
                </div>
              </div>

              <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 will-animate">
                <Button
                  onClick={() => scrollToElement("contact")}
                  className="h-9 px-3 sm:h-10 sm:px-4 text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <span className="sm:hidden">Book a Call</span>
                  <span className="hidden sm:inline">Book a Free Discovery Call</span>
                </Button>
                <button
                  onClick={() => scrollToElement("portfolio")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium whitespace-nowrap"
                >
                  See the systems
                  <Zap className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 will-animate">
              <Button variant="outline" size="sm" asChild className="border-primary/40 hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-lift">
                <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-primary/40 hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-lift">
                <a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-primary/40 hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-lift">
                <a href={SOCIAL_LINKS.x.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <XIcon className="h-4 w-4" />
                  X (Twitter)
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Image (desktop only; mobile shows its own copy under the name/title/location above) */}
          <div className="hidden lg:flex lg:justify-end will-animate">
            {profileVisual}
          </div>
        </div>

        {/* Integrated Scroll Indicator */}
        <div className="flex justify-center pt-4 pb-0">
          {/* Mobile: phone tap/swipe indicator */}
          <div className="lg:hidden">
            <button onClick={() => scrollToElement("services", {
            offset: -100
          })} className="group scroll-indicator flex flex-col items-center gap-4 text-muted-foreground hover:text-accent active:text-accent transition-all duration-500 cursor-pointer" aria-label="Scroll to explore the Services section">
              <span className="text-sm font-medium tracking-wide opacity-70 group-active:opacity-100 transition-all duration-300">
                Swipe to explore
              </span>
              <div className="relative w-7 h-12 transform transition-all duration-700 ease-[cubic-bezier(0.5,0.1,0.5,1)] group-active:-translate-y-1 group-active:scale-105">
                <img src={iphoneOutline} alt="" className="w-full h-full object-contain" />

                {/* Tap/swipe-down gesture dot, riding inside the phone's screen area */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-tap-swipe bg-[#0d9ece]" />
              </div>
            </button>
          </div>

          {/* Desktop: mouse scroll-wheel indicator */}
          <div className="hidden lg:flex">
            <button onClick={() => scrollToElement("services", {
            offset: -100
          })} className="group scroll-indicator flex flex-col items-center gap-4 text-muted-foreground hover:text-accent transition-all duration-500 cursor-pointer" aria-label="Scroll to explore the Services section">
              <span className="text-sm font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-all duration-300">
                Scroll to explore
              </span>
              <div className="relative w-7 h-12 transform transition-all duration-700 ease-[cubic-bezier(0.5,0.1,0.5,1)] group-hover:-translate-y-2 group-hover:scale-105 rounded-full bg-background/50 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-primary/10 border-2 border-muted-foreground/30">
                {/* Scroll wheel indicator */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2.5 rounded-full bg-muted-foreground/30 overflow-hidden">
                  <div className="w-full h-1.5 rounded-full animate-scroll-bounce bg-[#0d9ece]" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;