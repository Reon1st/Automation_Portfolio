import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import WorkflowEngine from "./WorkflowEngine";
import { WebShowcaseProject } from "@/data/flagshipProjects";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  BookOpen,
  ZoomIn,
  AlertCircle,
  Cog,
  CheckCircle,
  TrendingUp,
  FlaskConical,
  Gauge,
  Workflow,
} from "lucide-react";

interface WebProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WebShowcaseProject | null;
  onPrevious?: () => void;
  onNext?: () => void;
}

const shortenUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const SectionLabel: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
    <Icon className="h-3.5 w-3.5 text-primary" /> {children}
  </div>
);


export const WebProjectModal: React.FC<WebProjectModalProps> = ({ isOpen, onClose, project, onPrevious, onNext }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [roiOpen, setRoiOpen] = useState(false);
  const [flowZoom, setFlowZoom] = useState<{ src: string; alt: string } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveImage(0);
      setRoiOpen(false);
      setScrollProgress(0);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [isOpen, project?.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setScrollProgress(max > 0 ? el.scrollTop / max : 0);
  };

  if (!project) return null;

  const screenshots = project.media.screenshots ?? [];
  const hasChallenge = !!project.bottleneck && !!project.system;
  const flows = project.flows;
  const zoomImages = screenshots.map((src, i) => ({ src, alt: `${project.title} screenshot ${i + 1}`, title: project.title }));


  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          ref={contentRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="w-[97vw] max-w-[1800px] max-h-[90vh] overflow-y-auto p-0 gap-0"
        >
          {/* Window title bar — fully opaque (no backdrop-blur/alpha) so the flow engine's dark grid can never bleed through as it scrolls underneath */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-3 border-b border-border/50 bg-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0" aria-hidden>
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    scrollProgress > 0 ? "bg-accent shadow-[0_0_6px_1px] shadow-accent/70" : "bg-accent/30"
                  }`}
                />
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    scrollProgress > 1 / 3 ? "bg-primary shadow-[0_0_6px_1px] shadow-primary/70" : "bg-primary/25"
                  }`}
                />
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    scrollProgress > 2 / 3 ? "bg-emerald-400 shadow-[0_0_6px_1px] shadow-emerald-400/70" : "bg-emerald-400/25"
                  }`}
                />
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-lg font-bold truncate">{project.title}</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground truncate">{project.tagline}</DialogDescription>
              </div>
              {project.badge && (
                <Badge variant="outline" className="hidden md:inline-flex border-primary/30 text-primary bg-primary/10 flex-shrink-0">
                  {project.badge}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {(onPrevious || onNext) && (
                <>
                  <button onClick={onPrevious} disabled={!onPrevious} aria-label="Previous project" className="p-2 rounded-md hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={onNext} disabled={!onNext} aria-label="Next project" className="p-2 rounded-md hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Gallery with filmstrip */}
            {screenshots.length > 0 ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/10">
                  <button onClick={() => setZoomOpen(true)} className="group block w-full">
                    <img
                      src={screenshots[activeImage]}
                      alt={`${project.title} screenshot ${activeImage + 1}`}
                      className="w-full h-auto max-h-[420px] object-contain mx-auto"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="h-4 w-4 text-foreground" /> <span className="text-xs">Zoom</span>
                      </div>
                    </div>
                  </button>
                </div>
                {screenshots.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {screenshots.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveImage(i)}
                        className={`relative flex-shrink-0 w-24 aspect-[16/10] rounded-md overflow-hidden border transition-all ${
                          i === activeImage ? "border-primary ring-1 ring-primary/40" : "border-border/40 opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`Screenshot ${i + 1}`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 min-h-[160px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Screenshots coming soon</span>
              </div>
            )}

            {/* Challenge / Solution */}
            {hasChallenge ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border/50 bg-muted/10 p-5 space-y-2">
                  <SectionLabel icon={AlertCircle}>The challenge</SectionLabel>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.bottleneck}</p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-2">
                  <SectionLabel icon={Cog}>The solution</SectionLabel>
                  <p className="text-sm leading-relaxed text-foreground/90">{project.system}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-foreground/90">{project.description}</p>
            )}

            {/* KPIs — operational, confident stat tiles */}
            {project.kpis && project.kpis.length > 0 && (
              <div className="space-y-3">
                <SectionLabel icon={Gauge}>Operational KPIs</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className={`rounded-xl border p-5 ${kpi.primary ? "border-accent/40 bg-accent/[0.07]" : "border-border/50 bg-card/40"}`}
                    >
                      <div className={`text-3xl font-bold tracking-tight ${kpi.primary ? "text-accent" : "text-foreground"}`}>{kpi.value}</div>
                      <div className="text-sm font-medium text-foreground/90 mt-0.5">{kpi.label}</div>
                      <p className="text-xs leading-relaxed text-muted-foreground mt-2">{kpi.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active flow engine — the real backend workflow, node by node */}
            {flows && flows.length > 0 && (
              <div className="space-y-3">
                <SectionLabel icon={Workflow}>Active flow engine</SectionLabel>
                <p className="text-xs text-muted-foreground -mt-1">The real backend workflow behind the form — every node, its config, and what it does.</p>
                <WorkflowEngine flows={flows} onScreenshot={(src, alt) => setFlowZoom({ src, alt })} />
              </div>
            )}

            {/* What you get */}
            {project.clientGets && project.clientGets.length > 0 && (
              <div className="space-y-3">
                <SectionLabel icon={CheckCircle}>What you get</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.clientGets.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/15 border border-border/30">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROI — clearly a separate, illustrative zone */}
            {project.roi && (
              <div className="rounded-xl border border-dashed border-primary/40 bg-primary/[0.04] p-5 space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <SectionLabel icon={TrendingUp}>Return on investment</SectionLabel>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-[0.65rem] gap-1">
                    <FlaskConical className="h-3 w-3" /> {project.roi.label}
                  </Badge>
                </div>
                <p className="text-base leading-relaxed text-foreground/90">{project.roi.headline}</p>

                <button
                  onClick={() => setRoiOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${roiOpen ? "rotate-90" : ""}`} />
                  {roiOpen ? "Hide the model" : "Show the model, assumptions & sensitivity"}
                </button>

                {roiOpen && (
                  <div className="space-y-4 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.roi.assumptions.map((a) => (
                        <span key={a} className="text-[0.7rem] px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground border border-border/30">{a}</span>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.roi.categories.map((cat) => (
                        <div key={cat.title} className="rounded-lg bg-card/60 border border-border/40 p-3">
                          <div className="text-xs font-semibold text-foreground mb-1">{cat.title}</div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{cat.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-border/40">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="text-left text-muted-foreground bg-muted/20">
                            {project.roi.sensitivity.columns.map((col) => (
                              <th key={col} className="font-semibold py-2 px-3 whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {project.roi.sensitivity.rows.map((row) => (
                            <tr key={row[0]} className="border-t border-border/20">
                              <td className="py-2 px-3 text-muted-foreground whitespace-nowrap">{row[0]}</td>
                              <td className="py-2 px-3 font-medium whitespace-nowrap">{row[1]}</td>
                              <td className="py-2 px-3 font-medium text-accent whitespace-nowrap">{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[0.7rem] text-muted-foreground/80 italic">
                      Figures are a model, not a measured outcome — the −9% row shows the automation earns its keep on lead-recovery, not admin time alone.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Stack */}
            <div className="space-y-3">
              <SectionLabel icon={Cog}>Built with</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2.5 py-1">{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Footer links */}
            {(project.media.caseStudyUrl || project.media.video || project.media.liveUrl) && (
              <div className="flex flex-wrap gap-5 pt-4 border-t border-border/30">
                {project.media.caseStudyUrl && (
                  <a href={project.media.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    <BookOpen className="h-4 w-4" /> Read case study
                  </a>
                )}
                {project.media.video && (
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <PlayCircle className="h-4 w-4" /> Demo available
                  </span>
                )}
                {project.media.liveUrl && (
                  <a href={project.media.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    <ExternalLink className="h-4 w-4" /> {shortenUrl(project.media.liveUrl)}
                  </a>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ImageZoomModal isOpen={zoomOpen} onClose={() => setZoomOpen(false)} images={zoomImages} initialIndex={activeImage} />
      <ImageZoomModal
        isOpen={!!flowZoom}
        onClose={() => setFlowZoom(null)}
        images={flowZoom ? [{ src: flowZoom.src, alt: flowZoom.alt, title: flowZoom.alt }] : []}
        initialIndex={0}
      />
    </>
  );
};

export default WebProjectModal;
