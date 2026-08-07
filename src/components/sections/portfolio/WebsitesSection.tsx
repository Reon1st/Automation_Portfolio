import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, PlayCircle, ZoomIn, Images } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import VideoPlayer, { parseVideoSource } from "./VideoPlayer";
import { webShowcaseProjects } from "@/data/flagshipProjects";

const shortenUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const WebsitesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<{ projectId: string; index: number } | null>(null);
  const [videoProjectId, setVideoProjectId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: "-50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeVideoProject = webShowcaseProjects.find((p) => p.id === videoProjectId);

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

        <div className={`grid md:grid-cols-3 gap-4 transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {webShowcaseProjects.map((project) => {
            const screenshots = project.media.screenshots ?? [];
            return (
              <Card
                key={project.id}
                className="border-border/50 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-muted/10 border-b border-border/40">
                  {screenshots.length > 0 ? (
                    <button
                      onClick={() => setZoom({ projectId: project.id, index: 0 })}
                      className="group w-full h-full block"
                    >
                      <img
                        src={screenshots[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-3">
                        <div className="p-2 rounded-lg bg-background/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Images className="h-3.5 w-3.5" /> {screenshots.length > 1 ? `${screenshots.length} shots` : "View"}
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4">
                      <ZoomIn className="h-8 w-8 text-muted-foreground/40" />
                      <span className="text-xs text-muted-foreground">Screenshots coming soon</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 flex flex-col gap-2 flex-grow">
                  <div>
                    <h3 className="font-bold text-base leading-snug">{project.title}</h3>
                    <p className="text-xs font-medium text-accent mt-0.5">{project.tagline}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">{tech}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-border/30">
                    {project.media.video && (
                      <button
                        onClick={() => setVideoProjectId(project.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
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
                        <ExternalLink className="h-3.5 w-3.5" /> {shortenUrl(project.media.liveUrl)}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {zoom && (() => {
        const project = webShowcaseProjects.find((p) => p.id === zoom.projectId);
        const screenshots = project?.media.screenshots ?? [];
        return (
          <ImageZoomModal
            isOpen={!!zoom}
            onClose={() => setZoom(null)}
            images={screenshots.map((src) => ({ src, alt: project?.title ?? "" }))}
            initialIndex={zoom.index}
          />
        );
      })()}

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
