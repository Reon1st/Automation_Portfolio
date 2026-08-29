import React, { useState } from "react";
import { ArrowUpRight, Wrench, ChevronDown, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { services, Service } from "@/data/services";
import { countByPlatform, projectsForPlatform } from "@/data/automationsRegistry";
import { flagshipProjects, webShowcaseProjects } from "@/data/flagshipProjects";
import { ANIMATION_PRESETS } from "@/lib/constants";

// Renders the number/badge that leads each card: 0 → "In Development" pill, >0 → the live number.
const MetricFace: React.FC<{ service: Service }> = ({ service }) => {
  const count = countByPlatform(service.metric.platform);
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-amber-400">
        <Wrench className="h-3 w-3" /> In Development
      </span>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-4xl font-extrabold tabular-nums tracking-tight leading-none text-primary">{count}</span>
      <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">{service.metric.unit}</span>
    </div>
  );
};

// The inner card content, shared by every card.
const CardBody: React.FC<{ service: Service; noteOpen: boolean }> = ({ service, noteOpen }) => {
  const count = countByPlatform(service.metric.platform);
  const isLiveNumber = count > 0;
  const isDev = count === 0;

  return (
    <>
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

        {/* Short description — kept brief enough to read in full, not a truncated fragment */}
        <p className="w-full text-left text-sm text-foreground/85 leading-relaxed line-clamp-3 flex-grow">
          {service.description}
        </p>

        {/* Dev note reveal — expands inline, adds no page-level space when closed */}
        {isDev && (
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-out ${noteOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="text-left text-[0.75rem] text-amber-300/90 leading-relaxed">{service.metric.devNote}</p>
          </div>
        )}

        {/* Footer: the action leads, then tools trail as a quiet signal — no eyebrow label */}
        <div className="w-full mt-auto pt-3 border-t border-border/40 space-y-2.5">
          {isLiveNumber && (
            <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-primary group-hover:gap-1.5 transition-all">
              View the builds <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
          {isDev && (
            <span className="inline-flex items-center gap-1 text-[0.72rem] font-medium text-muted-foreground/80">
              {noteOpen ? "Hide" : "What's coming"}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${noteOpen ? "rotate-180" : ""}`} />
            </span>
          )}
          <div className="flex flex-wrap justify-center gap-1">
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-border/40 bg-muted/20 px-1.5 py-0.5 text-[0.62rem] font-medium text-muted-foreground/70"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const cardShell =
  "service-card relative border-2 border-primary/30 bg-card/40 backdrop-blur-xl hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-700 overflow-hidden h-full";

// Looks a project up in whichever array its registry entry says it lives in — flagship
// (automation) projects and website projects have different id spaces and different shapes.
const findProject = (projectId: string, source: "automation" | "website") =>
  source === "automation"
    ? flagshipProjects.find((p) => p.id === projectId)
    : webShowcaseProjects.find((p) => p.id === projectId);

// Some flagship projects (support-triage, invoice-automation, client-onboarding) store their
// real images under step-by-step `process` captions instead of a top-level `screenshots` array —
// fall back to the first process image so every project gets a real thumbnail, not a placeholder.
const findThumbnail = (project: NonNullable<ReturnType<typeof findProject>>) =>
  project.media.screenshots?.[0] ?? project.media.process?.find((step) => step.images?.length)?.images?.[0];

// The one real "so what" line under the description — a website project's own authored highlight,
// or an automation project's first real client-facing benefit. Never invented, always pulled from
// data that already exists on the project.
const findProofLine = (project: NonNullable<ReturnType<typeof findProject>>) =>
  ("highlight" in project && project.highlight) || project.clientGets?.[0];

// The single click behavior for every live-number card, always — never a direct open, even with
// one project behind it. That means adding a second project behind any platform later needs zero
// changes here: the list this dialog scrolls just grows from one row to two. Each row shows the
// registry's own category + one-liner, not the project's generic tagline, so builds stay
// distinct from each other instead of reading as repeats of the same pitch.
const ProjectPicker: React.FC<{ service: Service | null; onClose: () => void }> = ({ service, onClose }) => {
  const groups = service ? projectsForPlatform(service.metric.platform) : [];

  const openProject = (projectId: string, source: "automation" | "website") => {
    window.location.hash = source === "automation" ? `flagship-${projectId}` : `case-${projectId}`;
    onClose();
  };

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent data-lenis-prevent className="max-w-xl p-0 overflow-hidden bg-background border-border/50">
        <div className="p-5 border-b border-border/50">
          <DialogTitle className="text-base font-bold">{service?.title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {groups.length} real {groups.length === 1 ? "build" : "builds"}
            {service?.metric.platform === "claude-code" && ", every one built with Claude Code"} — pick one to see it in full.
          </DialogDescription>
        </div>
        <div className="wf-scrollbar max-h-[70vh] overflow-y-auto p-3 space-y-2">
          {groups.map(({ projectId, source, category, oneLiner }) => {
            const project = findProject(projectId, source);
            if (!project) return null;
            const thumb = findThumbnail(project);
            const proof = findProofLine(project);
            return (
              <button
                key={projectId}
                onClick={() => openProject(projectId, source)}
                className="w-full flex items-start gap-4 p-3.5 rounded-xl text-left hover:bg-primary/5 border border-border/30 hover:border-primary/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <div className="w-28 aspect-[16/10] flex-shrink-0 rounded-lg overflow-hidden bg-muted/20 border border-border/40 flex items-center justify-center">
                  {thumb ? (
                    <img src={thumb} alt="" className="w-full h-full object-cover" draggable={false} />
                  ) : (
                    <ZoomIn className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
                <div className="min-w-0 flex-grow space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm">{project.title}</span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-wide text-primary/80 bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">
                      {category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{oneLiner}</p>
                  {proof && <p className="text-[0.72rem] text-foreground/70 leading-snug italic">{proof}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ServicesSection: React.FC = () => {
  const headerAnimation = useScrollAnimation({
    ...ANIMATION_PRESETS.default,
    threshold: 0.4,
    rootMargin: "0px 0px -35% 0px",
  });
  const serviceCards = useStaggeredChildren(ANIMATION_PRESETS.stagger.services.count, ANIMATION_PRESETS.stagger.services.delay);
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [pickerService, setPickerService] = useState<Service | null>(null);

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
            const noteOpen = openNote === service.title;
            const count = countByPlatform(service.metric.platform);
            const isLiveNumber = count > 0;
            const handle = () => (isLiveNumber ? setPickerService(service) : setOpenNote(noteOpen ? null : service.title));

            return (
              <li key={service.title} className="list-none group">
                <Card
                  role="button"
                  tabIndex={0}
                  aria-label={isLiveNumber ? `View the ${service.title} builds` : `${service.title} — in development`}
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

      <ProjectPicker service={pickerService} onClose={() => setPickerService(null)} />
    </section>
  );
};

export default ServicesSection;
