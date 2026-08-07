import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyCalendar } from "@/components/LazyCalendar";

export const ContactForm = () => {
  return (
    <>
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:block">
        <div className="rounded-xl border border-border/40 bg-card/30 overflow-hidden">
          <LazyCalendar
            calLink="reonfirst-8cbzxp/discovery-call"
            title="Schedule a consultation with Reon - AI Automation Specialist"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="text-center space-y-6">
          <div className="rounded-xl border border-border/40 bg-card/30 p-6">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Book Your Free Call</h3>
                <p className="text-sm text-muted-foreground">
                  View available times and schedule your consultation
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
      </div>
    </>
  );
};
