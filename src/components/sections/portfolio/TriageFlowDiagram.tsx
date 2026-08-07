import React from "react";
import { Mail, BrainCircuit, Send, UserCheck } from "lucide-react";

const Node: React.FC<{ icon: React.ElementType; label: string; tone: "primary" | "accent" }> = ({ icon: Icon, label, tone }) => (
  <div className={`flex flex-col items-center gap-1.5 ${tone === "primary" ? "text-primary" : "text-accent"}`}>
    <div className={`p-2.5 rounded-xl border ${tone === "primary" ? "bg-primary/10 border-primary/30" : "bg-accent/10 border-accent/30"}`}>
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight max-w-[90px]">{label}</span>
  </div>
);

const Connector: React.FC<{ delay?: string }> = ({ delay }) => (
  <div className="flex items-center flex-shrink-0" aria-hidden>
    <div className="w-8 h-px bg-gradient-to-r from-primary/40 to-primary/10 relative">
      <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: delay }} />
    </div>
  </div>
);

const TriageFlowDiagram: React.FC = () => (
  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-5">
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Node icon={Mail} label="Support email arrives" tone="primary" />
      <Connector />
      <Node icon={BrainCircuit} label="AI reads it against your docs" tone="primary" />
      <Connector delay="0.5s" />
      <div className="flex flex-col gap-3">
        <Node icon={Send} label="Confident → answer sent" tone="accent" />
        <Node icon={UserCheck} label="Uncertain → human + draft" tone="primary" />
      </div>
    </div>
  </div>
);

export default TriageFlowDiagram;
