import { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyCalendar } from "@/components/LazyCalendar";
import { LazyYouform } from "@/components/LazyYouform";

// Youform only posts a submission signal to the parent page when its
// "redirect after submission" setting is on, and that setting is Pro-only.
// On the free plan there's no cross-origin signal to detect a real
// submission, so Step 2 unlocks on an honest manual click instead.
const RevealPrompt = ({ onReveal }: { onReveal: () => void }) => (
  <div className="flex flex-col items-center gap-3 text-center py-2">
    <p className="text-sm text-muted-foreground">Already filled out the form above?</p>
    <Button variant="outline" onClick={onReveal} className="gap-2">
      Show booking calendar
      <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
);

export const ContactForm = () => {
  const [hasQualified, setHasQualified] = useState(false);

  return (
    <>
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:block space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Tell me about your project</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A few quick questions so I know how to help — takes about 2 minutes.
          </p>
          <div className="rounded-xl border border-border/40 bg-card/30 overflow-hidden">
            <LazyYouform
              formId="trpddhfw"
              title="Quick qualification form for Reon - AI Automation Specialist"
            />
          </div>
        </div>

        {hasQualified ? (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Book a call</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you'd like to discuss your project in more detail, you can schedule a call below.
            </p>
            <div className="rounded-xl border border-border/40 bg-card/30 overflow-hidden">
              <LazyCalendar
                calLink="reonfirst-8cbzxp/discovery-call"
                title="Schedule a consultation with Reon - AI Automation Specialist"
              />
            </div>
          </div>
        ) : (
          <RevealPrompt onReveal={() => setHasQualified(true)} />
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Tell me about your project</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A few quick questions so I know how to help — takes about 2 minutes.
          </p>
          <div className="rounded-xl border border-border/40 bg-card/30 overflow-hidden">
            <LazyYouform
              formId="trpddhfw"
              title="Quick qualification form for Reon - AI Automation Specialist"
            />
          </div>
        </div>

        {hasQualified ? (
          <div className="text-center space-y-6">
            <div className="rounded-xl border border-border/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-[10px] p-6">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Book a call</h3>
                  <p className="text-sm text-muted-foreground">
                    If you'd like to discuss your project in more detail, you can schedule a call below.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-11"
                >
                  <a
                    href="https://cal.com/reonfirst-8cbzxp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Free Call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <RevealPrompt onReveal={() => setHasQualified(true)} />
        )}
      </div>
    </>
  );
};
