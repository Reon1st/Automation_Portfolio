import React from "react";
import { Timer, DollarSign, ShieldCheck, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { ANIMATION_PRESETS } from "@/lib/constants";

const faqData = [
  {
    id: "cost",
    icon: DollarSign,
    question: "Website, funnel, automation — what's it cost?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>Depends what we're building, and I'll always tell you the number before anything starts — no surprise invoices.</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Automation:</strong> we hop on a call, figure out what it'd actually take to build right, and price it around how much manual work it saves you</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>GHL funnels:</strong> let's get it live first — once leads start coming in and you're seeing real ROI, we land on a price that makes sense</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Custom websites:</strong> start with a working prototype, you take it for a spin, then we settle on a fair number together</span>
          </div>
        </div>
        <p className="text-sm bg-primary/5 p-3 rounded-lg border border-primary/20">
          No long client list to point to yet, so I'm putting the risk on me: doesn't do what we agreed, you don't pay.
        </p>
      </div>
    ),
  },
  {
    id: "timing",
    icon: Timer,
    question: "How long does a build take?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>
          As fast as the project genuinely allows, no artificial waiting around. Simple workflows are usually
          a matter of days. Anything with real complexity gets a straight, specific estimate on the discovery
          call, not a guess before I've actually seen the scope.
        </p>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          I'll keep you updated consistently throughout the project, not just when it's done.
        </p>
      </div>
    ),
  },
  {
    id: "breaks",
    icon: ShieldCheck,
    question: "What happens if something breaks after handoff?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>
          Contact me right away and I'll get on it.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>My mistake, my fix:</strong> a bug, or the system not doing what we agreed — fixed free, no argument</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Outside my control:</strong> a third-party API changing, the code being edited after handoff, or new business needs — a separate, quoted fix</span>
          </div>
        </div>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          That free-fix coverage runs 14 days after handoff. After that, or for anything outside it, ongoing
          support is available if you want it.
        </p>
      </div>
    ),
  },
];

const FAQSection: React.FC = () => {
  const headerAnimation = useScrollAnimation(ANIMATION_PRESETS.default);
  const contentAnimation = useScrollAnimation({ ...ANIMATION_PRESETS.default, duration: 600 });
  const faqItems = useStaggeredChildren(ANIMATION_PRESETS.stagger.faq.count, ANIMATION_PRESETS.stagger.faq.delay);

  return (
    <section id="faq" className="py-6 md:py-8 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}>
          <SectionHeader
            title="Got Questions? We've Got Answers"
            subtitle="Clear answers to help you understand how AI workflow automation can transform your business"
          />
        </div>

        <Card ref={contentAnimation.ref as React.RefObject<HTMLDivElement>} className="enhanced-card border border-primary/20 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-5 md:p-6">
            <Accordion ref={faqItems.ref as React.RefObject<HTMLDivElement>} type="single" collapsible className="space-y-2">
              {faqData.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border border-primary/10 rounded-lg px-3 hover:border-primary/30 transition-colors duration-300">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="font-semibold text-sm">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-3 text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
