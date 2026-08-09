import React from "react";
import { Mail, BrainCircuit, Send, UserCheck, LucideIcon } from "lucide-react";

const nodes: { icon: LucideIcon; label: string; tone: "primary" | "accent" }[] = [
  { icon: Mail, label: "Support email arrives", tone: "primary" },
  { icon: BrainCircuit, label: "AI reads it against your docs", tone: "primary" },
  { icon: Send, label: "Confident → answer sent", tone: "accent" },
  { icon: UserCheck, label: "Uncertain → human + draft", tone: "primary" },
];

const toneClasses = (tone: "primary" | "accent") =>
  tone === "primary"
    ? { text: "text-primary", box: "bg-primary/10 border-primary/30" }
    : { text: "text-accent", box: "bg-accent/10 border-accent/30" };

const Node: React.FC<{ icon: LucideIcon; label: string; tone: "primary" | "accent" }> = ({ icon: Icon, label, tone }) => {
  const c = toneClasses(tone);
  return (
    <div className={`flex items-center gap-3 sm:flex-col sm:gap-1.5 ${c.text}`}>
      <div className={`p-2.5 rounded-xl border flex-shrink-0 ${c.box}`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[11px] font-medium text-muted-foreground text-left sm:text-center leading-tight sm:max-w-[90px]">
        {label}
      </span>
    </div>
  );
};

const Connector: React.FC<{ delay?: string }> = ({ delay }) => (
  <div className="hidden sm:flex items-center flex-shrink-0" aria-hidden>
    <div className="w-8 h-px bg-gradient-to-r from-primary/40 to-primary/10 relative">
      <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: delay }} />
    </div>
  </div>
);

const TriageFlowDiagram: React.FC = () => (
  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-5">
    {/* Mobile: straight top-to-bottom sequence, no wrap-prone connectors */}
    <div className="flex flex-col gap-3.5 sm:hidden">
      {nodes.map((node) => (
        <Node key={node.label} {...node} />
      ))}
    </div>

    {/* Desktop: original branching layout (two outcomes converging from "AI reads") */}
    <div className="hidden sm:flex items-center justify-center gap-2">
      <Node {...nodes[0]} />
      <Connector />
      <Node {...nodes[1]} />
      <Connector delay="0.5s" />
      <div className="flex flex-col gap-3">
        <Node {...nodes[2]} />
        <Node {...nodes[3]} />
      </div>
    </div>
  </div>
);

export default TriageFlowDiagram;
