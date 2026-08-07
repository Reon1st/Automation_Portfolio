import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import VideoPlayer, { parseVideoSource } from "./VideoPlayer";
import ProcessWalkthrough, { ProcessStep } from "./ProcessWalkthrough";
import {
  ExternalLink,
  ImageIcon,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

export interface ProjectDetailData {
  title: string;
  badge: string;
  summary: string;
  detail: string;
  highlights: string[];
  stack: string[];
  images: string[];
  process?: ProcessStep[];
  processStepVisuals?: Record<string, React.ReactNode>;
  video?: string;
  liveUrl?: string;
  caseStudyNotes?: string;
  interactiveVisual?: React.ReactNode;
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetailData | null;
  initialTab?: "visual" | "video";
  onPrevious?: () => void;
  onNext?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = "visual",
  onPrevious,
  onNext,
}) => {
  const [mediaTab, setMediaTab] = useState<"visual" | "video">(initialTab);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setMediaTab(initialTab);
  }, [isOpen, initialTab]);

  const videoSource = useMemo(() => (project?.video ? parseVideoSource(project.video) : null), [project?.video]);

  if (!project) return null;

  const hasProcess = !!project.process && project.process.length > 0;
  const hasVisual = hasProcess || project.images.length > 0 || !!project.interactiveVisual;
  const hasVideo = !!project.video;
  const activeTab = hasVisual ? mediaTab : "video";

  const zoomImages = hasProcess
    ? (project.process ?? []).flatMap((step) =>
        (step.images ?? []).map((src) => ({ src, alt: `${project.title} — ${step.label}`, title: step.label }))
      )
    : project.images.map((src) => ({ src, alt: project.title, title: project.title }));

  const openZoom = (index: number) => {
    setZoomIndex(index);
    setZoomOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent data-lenis-prevent className="max-w-3xl max-h-[88vh] overflow-y-auto p-0 gap-0">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                  {project.badge}
                </Badge>
              </div>
              {(onPrevious || onNext) && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={onPrevious}
                    disabled={!onPrevious}
                    className="p-2 rounded-md hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!onNext}
                    className="p-2 rounded-md hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Media area */}
            <div className="space-y-3">
              {hasVisual && hasVideo && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setMediaTab("visual")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === "visual" ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    <ImageIcon className="h-3.5 w-3.5" /> Overview
                  </button>
                  <button
                    onClick={() => setMediaTab("video")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === "video" ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    <PlayCircle className="h-3.5 w-3.5" /> Demo Video
                  </button>
                </div>
              )}

              {activeTab === "visual" && hasVisual && (
                <>
                  {hasProcess ? (
                    <ProcessWalkthrough
                      title={project.title}
                      steps={project.process!}
                      onImageClick={openZoom}
                      stepVisuals={project.processStepVisuals}
                    />
                  ) : project.images.length > 0 ? (
                    <div className={`grid gap-2 ${project.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {project.images.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => openZoom(i)}
                          className="relative rounded-lg overflow-hidden border border-border/50 group"
                        >
                          <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="h-6 w-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    project.interactiveVisual
                  )}
                </>
              )}

              {activeTab === "video" && hasVideo && videoSource && (
                <VideoPlayer source={videoSource} title={`${project.title} demo video`} />
              )}

              {!hasVisual && !hasVideo && (
                <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 min-h-[140px] flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Demo assets coming soon</span>
                </div>
              )}
            </div>

            {/* Story: real case-study notes if written, otherwise a one-line recap (full details live on the card behind this modal) */}
            <DialogDescription className="text-sm leading-relaxed text-foreground/90">
              {project.caseStudyNotes || project.summary}
            </DialogDescription>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Footer links */}
            {project.liveUrl && (
              <div className="flex flex-wrap gap-4 pt-2 border-t border-border/30">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" /> View live
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ImageZoomModal isOpen={zoomOpen} onClose={() => setZoomOpen(false)} images={zoomImages} initialIndex={zoomIndex} />
    </>
  );
};

export default ProjectDetailModal;
