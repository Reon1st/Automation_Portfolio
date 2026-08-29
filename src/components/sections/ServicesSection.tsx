import React, { useState } from "react";
import { Layers, ArrowUpRight, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { services, Service } from "@/data/services";
import { countByPlatform, targetProjectFor } from "@/data/automationsRegistry";
import { ANIMATION_PRESETS } from "@/lib/constants";

// Renders the number/badge that leads each card. A "count" metric resolves its number
// from the registry: 0 → "In Development" pill, >0 → the live number.
const MetricFace: React.FC<{ service: Service }> = ({ service }) => {
  const m = service.metric;
  if (m.kind === "foundation") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-primary">
        {m.badge}
      </span>
    );
  }
  const count = countByPlatform(m.platform);
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-amber-400">
        <Wrench className="h-3 w-3" /> In Development
      </span>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-extrabold leading-none text-primary">{count}</span>
      <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">{m.unit}</span>
    </div>
  );
};

// The inner card content, shared by all three card wrappers (anchor / open-build / reveal-note).
const CardBody: React.FC<{ service: Service; noteOpen: boolean }> = ({ service, noteOpen }) => {
  const m = service.metric;
  const count = m.kind === "count" ? countByPlatform(m.platform) : 0;
  const isLiveNumber = m.kind === "count" && count > 0;
  const isDev = m.kind === "count" && count === 0;

  return (
    <>
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg animate-gradient-shift" />
      <div className="absolute inset-[2px] bg-gradient-to-br from-card/95 to-card/80 rounded-lg" />

      <div className="relative p-5 h-full flex flex-col items-center text-center space-y-3.5">
        {/* Icon + title */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative inline-flex">
            <div className="w-11 h-11 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 ring-1 ring-primary/25 rounded-xl overflow-hidden flex items-center justify-center group-hover:ring-primary/60 group-hover:scale-105 transition-all duration-500 ease-out shadow-sm group-hover:shadow-lg group-hover:shadow-primary/25">
              <service.icon className={service.iconFill ? "w-full h-full object-cover rounded-xl" : "h-6 w-6 rounded-md"} />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 ease-in-out" />
          </div>
          <h3 className="text-base font-bold text-primary leading-tight">{service.title}</h3>
        </div>

        {/* Metric face — the focal point that replaces the old paragraph */}
        <div className="min-h-[3.25rem] flex items-center justify-center">
          <MetricFace service={service} />
        </div>

        {/* Short description (clamped so the card doesn't grow taller than before) */}
        <p className="w-full text-left text-[0.8rem] text-foreground/75 dark:text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
          {service.description}
        </p>

        {/* Dev note reveal — expands inline, adds no page-level space when closed */}
        {isDev && (
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-out ${noteOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="text-left text-[0.75rem] text-amber-300/90 leading-relaxed border-t border-amber-400/20 pt-2">
              {(m as Extract<Service["metric"], { kind: "count" }>).devNote}
            </p>
          </div>
        )}

        {/* Tools */}
        <div className="space-y-1.5 pt-3 border-t border-border/50 w-full mt-auto">
          <div className="flex items-center justify-center gap-1.5">
            <Layers className="h-3 w-3 text-primary" />
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Tech Stack</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {service.tools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 text-[10px] leading-none font-semibold"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Affordance line — only where clicking does something */}
        {isLiveNumber && (
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary/90 group-hover:text-primary transition-colors">
            View the build <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
        {isDev && (
          <span className="text-[0.7rem] font-medium text-muted-foreground/70">
            {noteOpen ? "Hide" : "What's coming"}
          </span>
        )}
      </div>
    </>
  );
};

const cardShell =
  "service-card relative border-2 border-primary/30 bg-card/40 backdrop-blur-xl hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-700 overflow-hidden h-full";

const ServicesSection: React.FC = () => {
  const headerAnimation = useScrollAnimation({
    ...ANIMATION_PRESETS.default,
    threshold: 0.4,
    rootMargin: "0px 0px -35% 0px",
  });
  const serviceCards = useStaggeredChildren(ANIMATION_PRESETS.stagger.services.count, ANIMATION_PRESETS.stagger.services.delay);
  const [openNote, setOpenNote] = useState<string | null>(null);

  const openBuild = (platform: Parameters<typeof targetProjectFor>[0]) => {
    const target = targetProjectFor(platform);
    if (target) window.location.hash = `case-${target}`;
  };

  return (
    <section id="services" aria-labelledby="services-title" className="pt-6 pb-10 px-6 md:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}>
          <SectionHeader
            badge={{ text: "4 Core Services" }}
            title="Services & Expertise"
            titleId="services-title"
            subtitle="From full AI systems to the CRM and workflow builds that keep your business moving"
          />
        </div>

        <ul ref={serviceCards.ref as React.RefObject<HTMLUListElement>} role="list" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {services.map((service) => {
            const m = service.metric;
            const noteOpen = openNote === service.title;

            // Foundation card → plain anchor to the automation projects it powers.
            if (m.kind === "foundation") {
              return (
                <li key={service.title} className="list-none group">
                  <a href="#portfolio" className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" aria-label={`${service.title} — see the automation projects it powers`}>
                    <Card className={`${cardShell} hover:scale-[1.01] cursor-pointer`}>
                      <CardBody service={service} noteOpen={false} />
                    </Card>
                  </a>
                </li>
              );
            }

            const count = countByPlatform(m.platform);
            const isLiveNumber = count > 0;
            const handle = () => (isLiveNumber ? openBuild(m.platform) : setOpenNote(noteOpen ? null : service.title));

            return (
              <li key={service.title} className="list-none group">
                <Card
                  role="button"
                  tabIndex={0}
                  aria-label={isLiveNumber ? `View the ${service.title} build` : `${service.title} — in development`}
                  aria-expanded={isLiveNumber ? undefined : noteOpen}
                  onClick={handle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handle();
                    }
                  }}
                  className={`${cardShell} hover:scale-[1.01] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
                >
                  <CardBody service={service} noteOpen={noteOpen} />
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
