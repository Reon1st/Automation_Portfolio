import React from "react";
import { Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  return <section id="services" aria-labelledby="services-title" className="pt-6 pb-10 px-6 md:px-8 relative overflow-hidden">
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
                <div className="relative p-5 h-full flex flex-col items-center text-center space-y-4">
                  {/* Icon & Title Section */}
                  <div className="space-y-3.5 flex flex-col items-center">
                    <div className="relative inline-flex">
                      <div className="w-11 h-11 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 ring-1 ring-primary/25 rounded-xl overflow-hidden flex items-center justify-center group-hover:ring-primary/60 group-hover:scale-105 transition-all duration-500 ease-out shadow-sm group-hover:shadow-lg group-hover:shadow-primary/25">
                        <service.icon className={service.iconFill ? "w-full h-full object-cover rounded-xl" : "h-6 w-6 rounded-md"} />
                      </div>
                      {/* Soft glow */}
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 ease-in-out" />
                    </div>

                    <h3 className="text-base font-bold text-primary leading-tight group-hover:text-primary/90 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="w-full text-left text-sm text-foreground/80 dark:text-muted-foreground leading-relaxed group-hover:text-foreground/90 dark:group-hover:text-foreground/80 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>

                  {/* Tools Section */}
                  <div className="space-y-1.5 pt-3 border-t border-border/50 w-full">
                    <div className="flex items-center justify-center gap-1.5">
                      <Layers className="h-3 w-3 text-primary" />
                      <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                        Tech Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {service.tools.map((tool, toolIndex) => <Badge key={toolIndex} variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:from-primary/20 hover:to-primary/30 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/50 transition-all duration-500 ease-out border border-primary/30 px-1.5 py-0.5 text-[10px] leading-none font-semibold">
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