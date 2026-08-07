import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "@/components/shared/FloatingElements";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { services } from "@/data/services";
import { ANIMATION_PRESETS } from "@/lib/constants";
const ServicesSection: React.FC = () => {
  const headerAnimation = useScrollAnimation({
    ...ANIMATION_PRESETS.default,
    threshold: 0.4,
    rootMargin: "0px 0px -35% 0px",
  });
  const serviceCards = useStaggeredChildren(ANIMATION_PRESETS.stagger.services.count, ANIMATION_PRESETS.stagger.services.delay);
  return <section id="services" aria-labelledby="services-title" className="pt-6 pb-10 px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-background/95 via-background to-background/95">
      {/* Layered depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.04)_0%,transparent_50%)]" />
      {/* Smooth transition gradients */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <FloatingElements variant="default" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}>
          <SectionHeader badge={{
          text: "4 Core Services"
        }} title="Services & Expertise" titleId="services-title" subtitle="From full AI systems to the CRM and workflow builds that keep your business moving" />
        </div>

        {/* Services Grid */}
        <ul ref={serviceCards.ref as React.RefObject<HTMLUListElement>} role="list" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {services.map((service, index) => <li key={index} className="list-none group">
              <Card className="service-card relative border-2 border-primary/30 bg-card/40 backdrop-blur-xl hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-700 overflow-hidden h-full">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg animate-gradient-shift" />
                <div className="absolute inset-[2px] bg-gradient-to-br from-card/95 to-card/80 rounded-lg" />

                {/* Content */}
                <div className="relative p-5 h-full flex flex-col space-y-4">
                  {/* Icon & Title Section */}
                  <div className="space-y-3">
                    <div className="relative inline-block">
                      <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl flex items-center justify-center group-hover:border-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      {/* Pulsing background orb */}
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 ease-in-out" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-primary leading-tight group-hover:text-primary/90 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/80 dark:text-muted-foreground leading-relaxed group-hover:text-foreground/90 dark:group-hover:text-foreground/80 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>

                  {/* Tools Section */}
                  <div className="space-y-2 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                        Tech Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tools.map((tool, toolIndex) => <Badge key={toolIndex} variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:from-primary/20 hover:to-primary/30 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/50 transition-all duration-500 ease-out border border-primary/30 px-2 py-0.5 text-xs font-semibold">
                          {tool}
                        </Badge>)}
                    </div>
                  </div>
                </div>
              </Card>
            </li>)}
        </ul>
      </div>
    </section>;
};
export default ServicesSection;