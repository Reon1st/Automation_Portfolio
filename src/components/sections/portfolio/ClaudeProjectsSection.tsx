import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  Cog,
  Gift,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ExternalLink,
  PlayCircle,
  MonitorSmartphone,
  Images,
  FileSignature,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
  FileEdit,
  FileText,
  Mail,
  HardDrive,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { flagshipProjects, FlagshipProject } from "@/data/flagshipProjects";
import { ProjectDetailModal, ProjectDetailData } from "./ProjectDetailModal";
import TriageFlowDiagram from "./TriageFlowDiagram";
import DashboardPreviewInteractive from "./DashboardPreviewInteractive";
import AutoFlowDiagram from "./AutoFlowDiagram";
import SupportReplyInteractive from "./SupportReplyInteractive";

const onboardingSteps = [
  { icon: FileSignature, label: "Contract sent", detail: "Personalized contract PDF emailed first" },
  { icon: ClipboardList, label: "Survey sent", detail: "Onboarding survey link goes out next" },
  { icon: CalendarCheck, label: "Booking sent", detail: "Client gets the booking link last" },
  { icon: ShieldCheck, label: "Fail-safe", detail: "Any failed step stops the rest — never a broken half-sequence" },
];

const invoiceSteps = [
  { icon: FileEdit, label: "Form filled", detail: "Client and invoice details entered once" },
  { icon: FileText, label: "PDF generated", detail: "Branded invoice built automatically" },
  { icon: Mail, label: "Gmail drafted", detail: "Ready to send, no copy-paste" },
  { icon: HardDrive, label: "Filed to Drive", detail: "A copy saved for your records" },
];

const interactiveVisuals: Record<string, React.ReactNode> = {
  "support-triage": <TriageFlowDiagram />,
  "ops-dashboard": <DashboardPreviewInteractive />,
  "invoice-automation": <AutoFlowDiagram steps={invoiceSteps} />,
  "client-onboarding": <AutoFlowDiagram steps={onboardingSteps} />,
};

const processStepVisuals: Record<string, Record<string, React.ReactNode>> = {
  "support-triage": { "Auto-answered": <SupportReplyInteractive /> },
};

const toDetailData = (project: FlagshipProject): ProjectDetailData => ({
  title: project.title,
  badge: project.badge,
  summary: project.bottleneck,
  detail: project.system,
  highlights: project.clientGets,
  stack: project.stack,
  images: project.media.screenshots ?? [],
  process: project.media.process,
  processStepVisuals: processStepVisuals[project.id],
  video: project.media.video,
  liveUrl: project.media.liveUrl,
  caseStudyNotes: project.media.caseStudyNotes,
  interactiveVisual: interactiveVisuals[project.id],
});

const shortenUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const MediaPreview: React.FC<{ project: FlagshipProject; onOpen: () => void }> = ({ project, onOpen }) => {
  const screenshots = project.media.screenshots ?? [];
  const visual = interactiveVisuals[project.id];

  return (
    <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/90 backdrop-blur-sm group hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-700 ease-out">
      {visual ? (
        <div className="p-4">{visual}</div>
      ) : screenshots.length > 0 ? (
        <div className="relative select-none overflow-hidden flex items-center justify-center">
          <img
            src={screenshots[0]}
            alt={project.title}
            className="w-full h-auto max-h-[220px] object-contain pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <div className="p-2 rounded-lg bg-background/80 backdrop-blur-md border border-border/50 shadow-lg">
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 min-h-[180px] flex flex-col items-center justify-center gap-3 p-6">
            <MonitorSmartphone className="h-10 w-10 text-primary/70" />
            <span className="text-sm text-muted-foreground text-center">Live production system — walkthrough on request</span>
          </div>
        </div>
      )}

      <button
        onClick={onOpen}
        className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 border-t border-border/40 bg-muted/10 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-300"
      >
        <Images className="h-3.5 w-3.5" />
        Click to explore screenshots, demo & full details
      </button>

      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

const ClaudeProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailInitialTab, setDetailInitialTab] = useState<"visual" | "video">("visual");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const project = flagshipProjects[currentIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: "-50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % flagshipProjects.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? flagshipProjects.length - 1 : prev - 1));

  // Open the matching flagship project when the URL hash is #flagship-<id> (set by the Services
  // metric cards' project picker, or arriving via a shared link) — mirrors WebsitesSection's
  // #case-<id> mechanism, distinct prefix so the two never collide.
  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#flagship-(.+)$/);
      if (!match) {
        clearTimeout(openTimer);
        return;
      }
      const idx = flagshipProjects.findIndex((p) => p.id === match[1]);
      if (idx < 0) return;

      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      openTimer = setTimeout(() => {
        setCurrentIndex(idx);
        setDetailInitialTab("visual");
        setIsDetailOpen(true);
      }, 450);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      clearTimeout(openTimer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const closeDetail = () => {
    if (window.location.hash.startsWith("#flagship-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setIsDetailOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-8 px-6 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto max-w-6xl relative z-10 space-y-5">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <SectionHeader
          badge={{ text: "Flagship Systems" }}
          title="Automation Projects"
          titleId="portfolio-heading"
          subtitle="Production AI systems I built and run — the same systems I deliver for clients"
        />
      </div>

      <div className={`space-y-5 transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className="grid lg:grid-cols-2 gap-4 items-center max-w-6xl mx-auto">
        <MediaPreview
          project={project}
          onOpen={() => {
            setDetailInitialTab("visual");
            setIsDetailOpen(true);
          }}
        />

        <Card className="border-border/50 bg-card/90 backdrop-blur-sm self-center hover:border-primary/40 transition-all duration-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">{project.badge}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <AlertCircle className="h-3.5 w-3.5 text-accent" /> The bottleneck
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.bottleneck}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Cog className="h-3.5 w-3.5 text-primary" /> The system
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{project.system}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                <Gift className="h-3.5 w-3.5 text-primary" /> What you get
              </div>
              <div className="grid gap-1">
                {project.clientGets.map((item) => (
                  <div key={item} className="flex items-start gap-2 p-1.5 rounded-md bg-muted/15">
                    <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.roi && (
              <div className="flex items-start gap-2 p-2 rounded-md bg-accent/10 border border-accent/20">
                <TrendingUp className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{project.roi}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">{tech}</Badge>
              ))}
            </div>

            {(project.media.liveUrl || project.media.video) && (
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/30">
                {project.media.video && (
                  <button
                    onClick={() => {
                      setDetailInitialTab("video");
                      setIsDetailOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <PlayCircle className="h-3.5 w-3.5" /> Watch demo
                  </button>
                )}
                {project.media.liveUrl && (
                  <a
                    href={project.media.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> {project.media.liveLabel ?? shortenUrl(project.media.liveUrl)}
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 hover:-translate-x-1 group"
              >
                <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">Previous</span>
              </button>
              <div className="flex items-center gap-2">
                {flagshipProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-primary w-6 shadow-lg shadow-primary/30" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 hover:translate-x-1 group"
              >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
      </div>

      <ProjectDetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        project={toDetailData(project)}
        initialTab={detailInitialTab}
        onPrevious={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default ClaudeProjectsSection;
