import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skills } from "@/data/skills";
import Footer from "@/components/layout/Footer";
import WavesBackground from "@/components/WavesBackground";
import { SOCIAL_LINKS } from "@/lib/constants";

const STORY_STEPS = [
  {
    title: "Kid on a screen",
    body: "Before I could walk, I was already glued to one.",
  },
  {
    title: "Years of gaming",
    body: "Video games ate the rest of my childhood.",
  },
  {
    title: "Sick of \"normal\"",
    body: "Got tired of living a plain, cookie-cutter life.",
  },
  {
    title: "All in on AI",
    body: "Got interested in AI, and just went all in.",
  },
];

const About = () => {
  const navigate = useNavigate();

  // Animation hooks
  const introAnimation = useScrollAnimation({
    variant: 'fade',
    triggerOnce: true
  });
  const storyAnimation = useScrollAnimation({
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
                <p className="text-lg sm:text-xl font-semibold text-primary tracking-tight">
                  College Student Who's Into AI
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

          {/* My Story */}
          <div ref={storyAnimation.ref as any}>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <span className="font-semibold text-primary tracking-wider uppercase text-xs">
                  My Story
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift max-w-xl mx-auto">
                "Screen-obsessed before I could even walk."
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-5xl mx-auto">
              {STORY_STEPS.map((step, i) => (
                <div key={step.title} className="text-left">
                  <span className="pointer-events-none select-none block text-6xl sm:text-7xl font-extrabold text-primary/10 leading-none mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              ))}
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
            <div ref={skillsHeaderAnimation.ref as any} className="mb-6 max-w-5xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tools & Platforms
              </span>
            </div>

            <div
              ref={skillsContentAnimation.ref as any}
              className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
            >
              <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                {[...skills, ...skills].map((skill, i) => (
                  <div
                    key={`${skill.name}-${i}`}
                    className="flex items-center gap-3 shrink-0 px-5 py-3 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm"
                  >
                    <skill.Icon className="w-6 h-6 shrink-0" />
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
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

          {/* Case Study / How I Actually Work */}
          <div ref={caseStudyAnimation.ref as any}>
            <Card className="border border-primary/20 bg-card/95 backdrop-blur-sm max-w-3xl mx-auto">
              <CardContent className="p-8 md:p-10 text-center space-y-4">
                <div className="inline-flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Hey, curious how I actually work?</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  I keep an honest log across every project — what worked, what broke, what I'd do differently.
                  No highlight reel, just the real process. Worth a look if you're into that kind of thing before we hop on a call.
                </p>
                <a
                  href={SOCIAL_LINKS.caseStudies.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Check it out <ArrowUpRight className="h-3.5 w-3.5" />
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
