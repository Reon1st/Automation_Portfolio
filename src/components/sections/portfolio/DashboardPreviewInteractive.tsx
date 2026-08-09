import React, { useState } from "react";
import { LayoutGrid, Activity, BookOpen, CheckCircle2, Clock, PlayCircle } from "lucide-react";

type TabId = "automations" | "history" | "guide";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "automations", label: "Automations", icon: LayoutGrid },
  { id: "history", label: "Run History", icon: Activity },
  { id: "guide", label: "Guide", icon: BookOpen },
];

const AutomationsPanel: React.FC = () => (
  <div className="space-y-2">
    {[
      { name: "Support Ticket Triage", status: "Active" },
      { name: "Invoice Automation", status: "Active" },
      { name: "Client Onboarding", status: "Active" },
    ].map((row) => (
      <div key={row.name} className="flex items-center justify-between px-3 py-2 rounded-md bg-background/60 border border-border/40">
        <span className="text-xs font-medium">{row.name}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.status === "Active" ? "bg-accent/15 text-accent" : "bg-muted-foreground/15 text-muted-foreground"}`}>
          {row.status}
        </span>
      </div>
    ))}
    <p className="text-[10px] text-muted-foreground text-center pt-1">
      "Active" only appears after a real production run — never just switched on.
    </p>
  </div>
);

const HistoryPanel: React.FC = () => (
  <div className="space-y-2">
    {[
      { label: "Support ticket answered", time: "2m ago" },
      { label: "Invoice sent to client", time: "1h ago" },
      { label: "New lead onboarded", time: "3h ago" },
    ].map((row) => (
      <div key={row.label} className="flex items-center gap-2 px-3 py-2 rounded-md bg-background/60 border border-border/40">
        <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" />
        <span className="text-xs flex-grow">{row.label}</span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3" /> {row.time}
        </span>
      </div>
    ))}
  </div>
);

const GuidePanel: React.FC = () => (
  <div className="flex items-center gap-3 px-3 py-4 rounded-md bg-background/60 border border-border/40">
    <PlayCircle className="h-6 w-6 text-primary flex-shrink-0" />
    <div>
      <p className="text-xs font-semibold">Built-in setup guide</p>
      <p className="text-[11px] text-muted-foreground">Every automation ships with a walkthrough your team can follow without calling me.</p>
    </div>
  </div>
);

const DashboardPreviewInteractive: React.FC = () => {
  const [active, setActive] = useState<TabId>("automations");

  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-4">
      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
              active === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-background/40 text-muted-foreground hover:bg-background/70 hover:text-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>
      {active === "automations" && <AutomationsPanel />}
      {active === "history" && <HistoryPanel />}
      {active === "guide" && <GuidePanel />}
    </div>
  );
};

export default DashboardPreviewInteractive;
