import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, PlayCircle, ZoomIn, Zap } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import VideoPlayer, { parseVideoSource } from "./VideoPlayer";
import { WebProjectModal } from "./WebProjectModal";
import { webShowcaseProjects } from "@/data/flagshipProjects";

const shortenUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const STACK_PREVIEW_LIMIT = 4;

// Landing here from a Services metric card scrolls to the Websites section first, then the
// case-study modal opens a beat later — the visitor sees where they arrived, not just an overlay
// appearing out of nowhere. Chosen over an instant-open (compared both; this one won).
const SCROLL_TO_OPEN_DELAY_MS = 450;

const WebsitesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoProjectId, setVideoProjectId] = useState<string | null>(null);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: "-50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Open the matching case study when the URL hash is #case-<projectId> (set by the Services
  // metric cards, or arriving via a shared link). Runs on mount and on every hashchange, so the
  // browser/phone Back button — which clears the hash — closes the modal for free.
  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#case-(.+)$/);
      if (!match) {
        clearTimeout(openTimer);
        setDetailIndex((prev) => (prev !== null ? null : prev));
        return;
      }
      const idx = webShowcaseProjects.findIndex((p) => p.id === match[1]);
      if (idx < 0) return;

      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      openTimer = setTimeout(() => setDetailIndex(idx), SCROLL_TO_OPEN_DELAY_MS);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      clearTimeout(openTimer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const closeDetail = () => {
    if (window.location.hash.startsWith("#case-")) {
      // Drop the hash without adding a history entry, keeping modal state and URL in sync.
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setDetailIndex(null);
  };

  const activeVideoProject = webShowcaseProjects.find((p) => p.id === videoProjectId);
  const detailProject = detailIndex !== null ? webShowcaseProjects[detailIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="websites"
      className="py-8 px-6 relative overflow-hidden"
      aria-labelledby="websites-heading"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <SectionHeader
            badge={{ text: "Web Design" }}
            title="Websites I've Built"
            titleId="websites-heading"
            subtitle="The front-end side of the work — design, motion, and, where it matters, real functionality under the hood"
          />
        </div>

        <div className={`grid md:grid-cols-3 gap-4 items-start transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {webShowcaseProjects.map((project, index) => {
            const screenshots = project.media.screenshots ?? [];
            const extraStack = project.stack.length - STACK_PREVIEW_LIMIT;
            return (
              <Card
                key={project.id}
                onClick={() => setDetailIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDetailIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${project.title}`}
                className="border-border/50 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 flex flex-col overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-muted/10 border-b border-border/40 group">
                  {screenshots.length > 0 ? (
                    <img
                      src={screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4">
                      <ZoomIn className="h-8 w-8 text-muted-foreground/40" />
                      <span className="text-xs text-muted-foreground">Screenshots coming soon</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 flex flex-col gap-2.5 flex-grow">
                  <div>
                    <h3 className="font-bold text-base leading-snug">{project.title}</h3>
                    <p className="text-xs font-medium text-accent mt-0.5">{project.tagline}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>

                  {project.highlight && (
                    <div className="flex items-start gap-2 p-2 rounded-md bg-accent/10 border border-accent/20">
                      <Zap className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed text-foreground/90">{project.highlight}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, STACK_PREVIEW_LIMIT).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">{tech}</Badge>
                    ))}
                    {extraStack > 0 && (
                      <Badge variant="secondary" className="bg-muted/30 text-muted-foreground text-xs px-2 py-0.5">+{extraStack} more</Badge>
                    )}
                  </div>

                  {(project.media.video || project.media.liveUrl) && (
                    <div className="flex items-center gap-2 pt-1">
                      {project.media.video && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideoProjectId(project.id);
                          }}
                          aria-label="Watch demo"
                          className="flex items-center justify-center h-9 w-9 rounded-md border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors flex-shrink-0"
                        >
                          <PlayCircle className="h-4 w-4" />
                        </button>
                      )}
                      {project.media.liveUrl && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-grow font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                        >
                          <a
                            href={project.media.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Website <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <WebProjectModal
        isOpen={detailIndex !== null}
        onClose={closeDetail}
        project={detailProject ?? null}
        onPrevious={
          detailIndex !== null
            ? () => setDetailIndex((detailIndex - 1 + webShowcaseProjects.length) % webShowcaseProjects.length)
            : undefined
        }
        onNext={
          detailIndex !== null
            ? () => setDetailIndex((detailIndex + 1) % webShowcaseProjects.length)
            : undefined
        }
      />

      <Dialog open={!!videoProjectId} onOpenChange={(open) => !open && setVideoProjectId(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border-border/50">
          <DialogTitle className="sr-only">{activeVideoProject?.title ?? "Demo video"}</DialogTitle>
          <DialogDescription className="sr-only">Demo video walkthrough</DialogDescription>
          {activeVideoProject?.media.video && (
            <VideoPlayer source={parseVideoSource(activeVideoProject.media.video)} title={activeVideoProject.title} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WebsitesSection;
