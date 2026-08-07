import React from "react";
import { HelpCircle, Timer, DollarSign, ShieldCheck, Globe, Wrench, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FloatingElements from "@/components/shared/FloatingElements";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation, useStaggeredChildren } from "@/hooks/useScrollAnimation";
import { ANIMATION_PRESETS } from "@/lib/constants";

const faqData = [
  {
    id: "cost",
    icon: DollarSign,
    question: "What does an automation project cost?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>It depends on scope, and I'll always tell you before we start:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Single workflows</strong> (n8n, GHL, Zapier) — small fixed-price builds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Full AI systems</strong> (dashboard + automations) — project-based, scoped together</span>
          </div>
        </div>
        <p className="text-sm bg-primary/5 p-3 rounded-lg border border-primary/20">
          The discovery call is free and ends with a fixed quote — no commitment until you see the number.
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Single workflows:</strong> 1–3 days</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Full AI systems:</strong> 1–3 weeks depending on scope</span>
          </div>
        </div>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          You get test versions and updates throughout — never a silent gap and then a big reveal.
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
          Every system I ship logs its runs, so failures are visible instead of silent — and for full systems,
          you can see every run's status yourself in your dashboard.
        </p>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          I fix what I ship. Handoff includes a support window, and ongoing support is available if you want it.
        </p>
      </div>
    ),
  },
  {
    id: "nontechnical",
    icon: HelpCircle,
    question: "Do I need to understand the tech?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>
          No. You describe the bottleneck in plain English; I handle the technical side. Full systems come with a
          dashboard and built-in guide pages, and handoff is a walkthrough — not a document dump.
        </p>
      </div>
    ),
  },
  {
    id: "tools",
    icon: Wrench,
    question: "Do I need paid plans for the tools involved?",
    answer: (
      <div className="pl-9 space-y-3">
        <p>
          Sometimes — high-volume workflows or premium integrations can need paid tiers. I audit your requirements
          first and recommend the cheapest setup that actually fits, before anything is built.
        </p>
      </div>
    ),
  },
  {
    id: "integrations",
    icon: Globe,
    question: "Can you work with the tools I already use?",
    answer: (
      <div className="pl-9 space-y-3">
        <p className="font-medium text-foreground">
          Almost certainly — anything with an API or webhook can be connected: Gmail, Sheets, CRMs, e-commerce
          platforms, and custom software included.
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
    <section id="faq" className="py-6 md:py-8 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-transparent" />
      <FloatingElements variant="minimal" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}>
          <SectionHeader
            badge={{ icon: HelpCircle, text: "Frequently Asked Questions" }}
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
