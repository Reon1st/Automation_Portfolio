import React, { useEffect, useState } from "react";
import { FileSignature, ClipboardList, CalendarCheck, ShieldCheck } from "lucide-react";

const steps = [
  { icon: FileSignature, label: "Contract sent", detail: "Personalized contract PDF emailed first" },
  { icon: ClipboardList, label: "Survey sent", detail: "Onboarding survey link goes out next" },
  { icon: CalendarCheck, label: "Booking sent", detail: "Client gets the booking link last" },
  { icon: ShieldCheck, label: "Fail-safe", detail: "Any failed step stops the rest — never a broken half-sequence" },
];

const OnboardingFlowInteractive: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, i) => (
          <div className="contents" key={step.label}>
            <button
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                active === i ? "text-primary scale-105" : "text-muted-foreground"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  active === i ? "bg-primary/15 border-primary/40 shadow-md shadow-primary/20" : "bg-background/40 border-border/40"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-center leading-tight max-w-[80px]">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className="flex-grow h-px bg-gradient-to-r from-primary/30 to-primary/10 -mt-6" aria-hidden />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">{steps[active].detail}</p>
    </div>
  );
};

export default OnboardingFlowInteractive;
