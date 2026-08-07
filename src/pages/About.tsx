import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Zap, Target, MessageSquare, FlaskConical, ShieldCheck, Server, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skills } from "@/data/skills";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layout/Footer";
const About = () => {
  const navigate = useNavigate();

  // Animation hooks
  const videoAnimation = useScrollAnimation({
    variant: 'fade',
    triggerOnce: true
  });
  const benefitsAnimation = useScrollAnimation({
    variant: 'slideUp',
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

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = "About Me - Reon Martin | AI Automation Specialist";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Reon Martin, an AI automation professional from Manila specializing in Zapier, Make.com, N8N, GoHighLevel, and business process automation.');
    }
  }, []);
  const benefits = [{
    icon: Target,
    title: "Fixed Scope, Fixed Timeline",
    description: "You get a scoped project with a clear price and a deadline — not an open-ended retainer running up hours you can't predict."
  }, {
    icon: MessageSquare,
    title: "Direct Line, No Middleman",
    description: "You're talking to the person actually building it. No account manager relaying messages, no surprises found out later."
  }, {
    icon: FlaskConical,
    title: "Tested Before It Touches Your Systems",
    description: "Every automation runs against real scenarios in a sandbox first — you see it working before it ever reaches your live setup."
  }, {
    icon: ShieldCheck,
    title: "Built to Prove Itself",
    description: "An automation isn't done when the demo looks good. It's done when it holds up against real data and edge cases, not just the happy path."
  }, {
    icon: Server,
    title: "You Own It, Outright",
    description: "It runs on your own accounts and infrastructure — no dependency on me to keep it alive, no recurring fee just to keep using what you paid for."
  }, {
    icon: Compass,
    title: "I'll Tell You If It's Not a Fit",
    description: "If the scope's off or the timeline's unrealistic, that's what you'll hear upfront — not a sales pitch to close the deal."
  }];
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
          
          {/* Video Section */}
          <div ref={videoAnimation.ref as any} className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-semibold text-primary tracking-wider uppercase text-xs">
                  Introduction
                </span>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift sm:text-3xl">
                Meet Reon Martin
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Workflow Automation Specialist • AI & Process Optimization Enthusiast
              </p>
              
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              
              <div className="relative aspect-video rounded-xl overflow-hidden bg-card/90 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 shadow-xl group-hover:shadow-[0_20px_50px_hsl(var(--primary)/0.2)] transition-all duration-500 ring-1 ring-primary/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <iframe src="https://www.youtube.com/embed/6KVVshuh8tk" title="Reon Martin - AI Automation Specialist" className="w-full h-full relative z-10" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
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
                <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Why Work With Me - Benefits Grid */}
          <div ref={benefitsAnimation.ref as any}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
                <Target className="w-4 h-4 text-accent" />
                <span className="font-semibold text-accent tracking-wider uppercase text-xs">
                  Why Work With Me
                </span>
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-3 sm:text-2xl">
                What You Get When We Work Together
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                No retainers, no vague promises — here's what actually happens when we work together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => <Card key={benefit.title} className="group relative bg-card/60 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.12)] overflow-hidden animate-fade-in" style={{
              animationDelay: `${index * 120}ms`,
              animationFillMode: 'both'
            }}>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner index indicator */}
                  <span className="absolute top-4 right-5 text-[11px] font-mono font-semibold text-primary/15 group-hover:text-primary/30 transition-colors duration-300">
                    0{index + 1}
                  </span>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start gap-5">
                      <div className="p-3.5 bg-gradient-to-br from-primary/12 to-accent/8 rounded-2xl group-hover:scale-105 transition-all duration-400 shrink-0 ring-1 ring-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-2.5 flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-[15px] leading-tight">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
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
            
            <div ref={skillsContentAnimation.ref as any} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => <Card key={skill.name} className="group relative bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_hsl(var(--primary)/0.3)] hover:scale-[1.05] cursor-pointer overflow-hidden" style={{
              animationDelay: `${index * 150}ms`
            }}>
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-8 flex flex-col items-center space-y-5 relative z-10">
                    {/* Icon Container */}
                    <div className="relative w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                      <div className="relative w-20 h-20 transition-all duration-300">
                        <skill.Icon className="w-full h-full" />
                      </div>
                    </div>
                    
                    {/* Skill Name */}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight text-lg">{skill.name}</h3>
                    
                    {/* Expertise Description */}
                    <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300 leading-relaxed min-h-[3rem] flex items-center">{skill.expertise}</p>
                    
                    {/* Animated Line - Inside card, below description */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-2/3 transition-all duration-700 ease-out mt-2" />
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      
    </div>;
};
export default About;