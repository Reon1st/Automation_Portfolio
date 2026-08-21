import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATION_PRESETS } from "@/lib/constants";
const ContactSection: React.FC = () => {
  const headerAnimation = useScrollAnimation(ANIMATION_PRESETS.default);
  const formAnimation = useScrollAnimation({
    ...ANIMATION_PRESETS.default,
    rootMargin: "0px 0px -80px 0px",
    duration: 600
  });
  return <section id="contact" className="py-6 md:py-8 px-6 md:px-8 relative">
      <div className="container mx-auto">
        {/* Clean Header — kept narrow regardless of the calendar's width */}
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>} className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-accent">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm">
            Tell me what's slowing your business down, and I'll show you how to fix it.
            Fill out a quick form below, then grab a time that works for you.
          </p>

          {/* Subtle divider */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-border" />
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Two minutes, no pressure</span>
            <div className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* Contact Form — wider container so Cal.com renders side-by-side */}
        <div ref={formAnimation.ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>;
};
export default ContactSection;