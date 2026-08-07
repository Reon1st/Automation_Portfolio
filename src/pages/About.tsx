import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, Zap, BookOpen, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skills } from "@/data/skills";
import Footer from "@/components/layout/Footer";
import WavesBackground from "@/components/WavesBackground";
import { SOCIAL_LINKS } from "@/lib/constants";
const About = () => {
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  // Animation hooks
  const introAnimation = useScrollAnimation({
    variant: 'fade',
    triggerOnce: true
  });
  const skillsHeaderAnimation = useScrollAnimation({
    variant: 'slideLeft',
    triggerOnce: true
  });
  const skillsContentAnimation = useScrollAnimation({
    variant: 'fade',
    triggerOnce: true
  });
  const caseStudyAnimation = useScrollAnimation({
    variant: 'slideUp',
    triggerOnce: true
  });

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = "About Me - Reon Martin | AI Systems Consultant";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Reon Martin, an AI systems consultant from Manila specializing in AI automation, CRM systems, and full-stack development.');
    }
  }, []);
  return <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/[0.15] to-primary/[0.03]" />

      {/* Dynamic Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl animate-float opacity-50" style={{
      animationDuration: '20s'
    }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl animate-float opacity-40" style={{
      animationDuration: '25s',
      animationDelay: '5s'
    }} />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-float opacity-30" style={{
      animationDuration: '30s',
      animationDelay: '10s'
    }} />

      {/* Subtle horizontal scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-pulse" style={{
        top: '35%',
        animationDuration: '6s'
      }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-pulse" style={{
        top: '65%',
        animationDuration: '8s',
        animationDelay: '3s'
      }} />
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
      backgroundSize: '48px 48px'
    }} />


      {/* Header with Back Button */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-5">
          <Button onClick={() => navigate('/')} className="group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 text-xs font-bold text-center text-muted">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Portfolio
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="container mx-auto max-w-6xl px-6 py-12 space-y-20">

          {/* Intro */}
          <div ref={introAnimation.ref as any} className="w-full max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 min-h-[380px] flex items-center justify-center">
              <WavesBackground />
              <div className="absolute inset-0 bg-background/35" />
              <div className="relative z-10 text-center px-6 py-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/40 backdrop-blur-sm border border-primary/20 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="font-semibold text-primary tracking-wider uppercase text-xs">
                    About
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-foreground sm:text-3xl">
                  Reon Martin
                </h1>
                <p className="text-base text-foreground/90 max-w-xl mx-auto leading-relaxed">
                  AI Systems Consultant based in Manila. Freelance, project-based, currently juggling this with college.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/10"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6">
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Skills Showcase */}
          <div>
            <div ref={skillsHeaderAnimation.ref as any} className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary tracking-wider uppercase text-xs">
                  Tech Stack
                </span>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift mb-3 sm:text-2xl">
                Tools & Platforms I Work With
              </h2>
            </div>

            <div ref={skillsContentAnimation.ref as any} className="px-8 sm:px-12">
              <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} className="w-full">
                <CarouselContent>
                  {skills.map((skill) => (
                    <CarouselItem key={skill.name} className="basis-full sm:basis-1/2 lg:basis-1/4">
                      <Card className="group relative h-full bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_hsl(var(--primary)/0.3)] overflow-hidden">
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <CardContent className="p-8 flex flex-col items-center space-y-4 relative z-10">
                          {/* Icon Container */}
                          <div className="relative w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                            <div className="relative w-20 h-20 transition-all duration-300">
                              <skill.Icon className="w-full h-full" />
                            </div>
                          </div>

                          {/* Skill Name */}
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight text-lg">{skill.name}</h3>

                          {/* Level pill */}
                          <span className="text-[11px] font-medium text-muted-foreground/80 tracking-wide">
                            {skill.level}
                          </span>

                          {/* Expertise Description */}
                          <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300 leading-relaxed min-h-[3rem] flex items-center">{skill.expertise}</p>

                          {/* Animated Line - Inside card, below description */}
                          <div className="w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-2/3 transition-all duration-700 ease-out" />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Section Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/10"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6">
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Case Study / How I Actually Work */}
          <div ref={caseStudyAnimation.ref as any}>
            <Card className="border border-primary/20 bg-card/95 backdrop-blur-sm max-w-3xl mx-auto">
              <CardContent className="p-8 md:p-10 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-accent tracking-wider uppercase text-xs">
                    How I Actually Work
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  A running, honest log across every project — the calls I made, what broke, what I'd do differently.
                  Not a highlight reel, the actual process, if you want a real read on how I think before you commit to working together.
                </p>
                <a
                  href={SOCIAL_LINKS.caseStudies.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Read the case studies <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>

      <Footer />
    </div>;
};
export default About;
