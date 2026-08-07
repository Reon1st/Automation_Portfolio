import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ZoomIn, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import FloatingElements from "@/components/shared/FloatingElements";
import SectionHeader from "@/components/shared/SectionHeader";
import { ShimmerSkeleton, ProjectDetailsSkeleton } from "@/components/ui/shimmer-skeleton";
import { automationProjects, AutomationProject } from "@/data/automationProjects";
import { ProjectDetailModal, ProjectDetailData } from "./ProjectDetailModal";
import { SOCIAL_LINKS } from "@/lib/constants";

const platforms = ["Zapier", "Make.com", "GoHighLevel", "N8N"];

const toDetailData = (project: AutomationProject): ProjectDetailData => ({
  title: project.title,
  badge: project.platform,
  summary: project.description,
  detail: project.clientValue,
  highlights: project.keyFeatures,
  stack: project.technologies,
  images: [project.workflowImage],
});

const AutomationsSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Zapier");
  const [selectedProject, setSelectedProject] = useState(automationProjects.Zapier[0]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: "-50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getCurrentPlatformProjects = () => automationProjects[selectedPlatform as keyof typeof automationProjects] || [];

  const handleProjectChange = (project: typeof selectedProject, index: number) => {
    if (project.id === selectedProject.id) return;
    setIsProjectLoading(true);
    setTimeout(() => {
      setSelectedProject(project);
      setCurrentProjectIndex(index);
      setTimeout(() => setIsProjectLoading(false), 400);
    }, 250);
  };

  const handlePlatformChange = (platform: string) => {
    if (platform === selectedPlatform) return;
    setIsProjectLoading(true);
    setSelectedPlatform(platform);
    const platformProjects = automationProjects[platform as keyof typeof automationProjects];
    if (platformProjects?.length > 0) {
      setTimeout(() => {
        setSelectedProject(platformProjects[0]);
        setCurrentProjectIndex(0);
        setTimeout(() => setIsProjectLoading(false), 400);
      }, 250);
    }
  };

  const handleNextProject = () => {
    const projects = getCurrentPlatformProjects();
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    handleProjectChange(projects[nextIndex], nextIndex);
  };

  const handlePrevProject = () => {
    const projects = getCurrentPlatformProjects();
    const prevIndex = currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
    handleProjectChange(projects[prevIndex], prevIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="automations"
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
      aria-labelledby="automations-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.04)_0%,transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      <FloatingElements variant="default" />

      <div className="container mx-auto max-w-6xl relative z-10 space-y-8">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <SectionHeader
          badge={{ text: "Automation Builds" }}
          title="Automations"
          titleId="automations-heading"
          subtitle="Live Zapier, Make, GoHighLevel, and n8n workflows across real business functions"
        />
      </div>

      <div className={`space-y-8 transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className="flex flex-wrap justify-center gap-3">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => handlePlatformChange(platform)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 ${
              selectedPlatform === platform
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-2 ring-primary/20"
                : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50 hover:border-primary/30 hover:shadow-md"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
        <div
          className={`relative rounded-xl overflow-hidden border bg-card/90 backdrop-blur-sm cursor-pointer group transition-all duration-700 ease-out self-center ${
            isProjectLoading ? "border-border/30 scale-[0.99]" : "border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 scale-100"
          }`}
          onClick={!isProjectLoading ? () => setIsDetailOpen(true) : undefined}
        >
          {isProjectLoading ? (
            <ShimmerSkeleton variant="image" className="min-h-[200px]" />
          ) : (
            <div className="relative select-none overflow-hidden flex items-center justify-center" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
              <img
                src={selectedProject.workflowImage}
                alt={selectedProject.title}
                className="w-full h-auto max-h-[500px] object-contain transition-all duration-700 ease-out group-hover:scale-[1.02] pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="p-2 rounded-lg bg-background/80 backdrop-blur-md border border-border/50 shadow-lg">
                    <ZoomIn className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
            </div>
          )}
        </div>

        <Card className={`border-border/50 bg-card/90 backdrop-blur-sm self-center transition-all duration-500 ease-out ${isProjectLoading ? "opacity-70 scale-[0.99]" : "opacity-100 scale-100"}`}>
          {isProjectLoading ? (
            <ProjectDetailsSkeleton />
          ) : (
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <CardTitle className="text-xl font-bold">{selectedProject.title}</CardTitle>
                  <Badge variant="outline" className="border-accent/30 text-accent bg-accent/10 text-xs">{selectedProject.platform}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-accent font-medium text-sm">{selectedProject.impact}</span>
                </div>
                <CardDescription className="text-sm leading-relaxed">{selectedProject.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h4>
                  <div className="grid gap-1.5">
                    {selectedProject.keyFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 p-2 rounded-md bg-muted/15 hover:bg-muted/25 transition-all duration-300 hover:translate-x-0.5">
                        <ArrowRight className="h-3 w-3 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5 transition-all duration-300 hover:scale-105 hover:bg-accent/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevProject(); }}
                    disabled={isProjectLoading}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 hover:-translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    <span className="text-sm font-medium">Previous</span>
                  </button>
                  <div className="flex items-center gap-2">
                    {getCurrentPlatformProjects().map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); handleProjectChange(getCurrentPlatformProjects()[idx], idx); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentProjectIndex ? "bg-primary w-6 shadow-lg shadow-primary/30" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextProject(); }}
                    disabled={isProjectLoading}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="text-sm font-medium">Next</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </CardContent>
            </div>
          )}
        </Card>
      </div>

      <a
        href={SOCIAL_LINKS.caseStudies.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">View Full Case Studies</h4>
              <p className="text-muted-foreground text-sm">Detailed breakdowns of automation projects and results</p>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
        </div>
      </a>
      </div>
      </div>

      <ProjectDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={toDetailData(selectedProject)}
        onPrevious={handlePrevProject}
        onNext={handleNextProject}
      />
    </section>
  );
};

export default AutomationsSection;
