import React, { useEffect, useRef, useState } from "react";
import {
  LucideIcon,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Webhook,
  Cog,
  GitBranch,
  BellRing,
  Mail,
  Tags,
  Briefcase,
  Clock,
  ZoomIn,
  ImageOff,
} from "lucide-react";
import { ProjectFlow, FlowKind, FlowStep, FlowKeyInfo } from "@/data/flagshipProjects";

interface WorkflowEngineProps {
  flows: ProjectFlow[];
  onScreenshot?: (src: string, alt: string) => void;
}

// Each node kind gets its own icon + accent — the "logo" identity a real automation canvas has.
// `ring` colors the selection outline, `glow` is a restrained hover shadow — both stay in the node's own hue, never generic white.
const kindStyle: Record<
  FlowKind,
  { icon: LucideIcon; label: string; badge: string; strip: string; dot: string; line: string; ring: string; glow: string }
> = {
  trigger: {
    icon: Webhook, label: "Trigger",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", strip: "from-rose-500 to-rose-500/20", dot: "bg-rose-400", line: "bg-rose-400/70",
    ring: "ring-rose-400/60", glow: "hover:border-rose-400/40 hover:shadow-[0_0_16px_-3px_rgba(251,113,133,0.5)]",
  },
  action: {
    icon: Cog, label: "Action",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30", strip: "from-sky-500 to-sky-500/20", dot: "bg-sky-400", line: "bg-sky-400/70",
    ring: "ring-sky-400/60", glow: "hover:border-sky-400/40 hover:shadow-[0_0_16px_-3px_rgba(56,189,248,0.5)]",
  },
  condition: {
    icon: GitBranch, label: "Condition",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", strip: "from-amber-500 to-amber-500/20", dot: "bg-amber-400", line: "bg-amber-400/70",
    ring: "ring-amber-400/60", glow: "hover:border-amber-400/40 hover:shadow-[0_0_16px_-3px_rgba(251,191,36,0.5)]",
  },
  notification: {
    icon: BellRing, label: "Notification",
    badge: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30", strip: "from-fuchsia-500 to-fuchsia-500/20", dot: "bg-fuchsia-400", line: "bg-fuchsia-400/70",
    ring: "ring-fuchsia-400/60", glow: "hover:border-fuchsia-400/40 hover:shadow-[0_0_16px_-3px_rgba(232,121,249,0.5)]",
  },
  email: {
    icon: Mail, label: "Email",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", strip: "from-cyan-500 to-cyan-500/20", dot: "bg-cyan-400", line: "bg-cyan-400/70",
    ring: "ring-cyan-400/60", glow: "hover:border-cyan-400/40 hover:shadow-[0_0_16px_-3px_rgba(34,211,238,0.5)]",
  },
  tag: {
    icon: Tags, label: "Tag",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", strip: "from-emerald-500 to-emerald-500/20", dot: "bg-emerald-400", line: "bg-emerald-400/70",
    ring: "ring-emerald-400/60", glow: "hover:border-emerald-400/40 hover:shadow-[0_0_16px_-3px_rgba(52,211,153,0.5)]",
  },
  pipeline: {
    icon: Briefcase, label: "Pipeline",
    badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30", strip: "from-indigo-500 to-indigo-500/20", dot: "bg-indigo-400", line: "bg-indigo-400/70",
    ring: "ring-indigo-400/60", glow: "hover:border-indigo-400/40 hover:shadow-[0_0_16px_-3px_rgba(129,140,248,0.5)]",
  },
  wait: {
    icon: Clock, label: "Wait",
    badge: "bg-slate-400/15 text-slate-300 border-slate-400/30", strip: "from-slate-400 to-slate-400/20", dot: "bg-slate-300", line: "bg-slate-300/70",
    ring: "ring-slate-300/50", glow: "hover:border-slate-300/35 hover:shadow-[0_0_14px_-3px_rgba(203,213,225,0.4)]",
  },
};

const platformLabel: Record<ProjectFlow["platform"], string> = { ghl: "GoHighLevel", n8n: "n8n" };

const STEP_MS = 1200;

// Black-and-white blueprint grid: fine + coarse white hairlines on near-black.
const gridStyle: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "36px 36px, 36px 36px, 180px 180px, 180px 180px",
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

const FieldRows: React.FC<{ rows: FlowKeyInfo[] }> = ({ rows }) => (
  <dl className="rounded-md border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
    {rows.map((row) => (
      <div key={row.label} className="grid grid-cols-[128px_1fr] gap-4 px-3 py-2.5">
        <dt className="text-[0.7rem] text-muted-foreground/80 pt-0.5">{row.label}</dt>
        <dd className="text-[0.74rem] font-mono text-foreground/90 leading-relaxed">
          {Array.isArray(row.value) ? (
            <ul className="space-y-1">
              {row.value.map((v) => (
                <li key={v} className="flex items-baseline gap-2">
                  <span className="text-muted-foreground/40 flex-shrink-0">—</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="break-words">{row.value}</span>
          )}
        </dd>
      </div>
    ))}
  </dl>
);

const WorkflowEngine: React.FC<WorkflowEngineProps> = ({ flows, onScreenshot }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [flowId, setFlowId] = useState(flows[0]?.id);
  const flow = flows.find((f) => f.id === flowId) ?? flows[0];
  const steps = flow.steps;

  const [step, setStep] = useState(-1); // -1 idle; else last-fired index
  const [running, setRunning] = useState(false);
  const [inspected, setInspected] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const clearTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
  };

  useEffect(() => {
    clearTimer();
    setStep(-1);
    setRunning(false);
    setInspected(0);
  }, [flowId]);

  useEffect(() => () => clearTimer(), []);

  const run = () => {
    clearTimer();
    setStep(0);
    setInspected(0);
    setRunning(true);
    timer.current = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearTimer();
          setRunning(false);
          return steps.length - 1;
        }
        setInspected(next);
        return next;
      });
    }, STEP_MS);
  };

  const reset = () => {
    clearTimer();
    setStep(-1);
    setRunning(false);
    setInspected(0);
  };

  const inspect = (i: number) => {
    clearTimer();
    setRunning(false);
    setInspected(i);
  };

  const status = (i: number): "done" | "active" | "pending" => {
    if (step < 0) return "pending";
    if (i < step) return "done";
    if (i === step) return running ? "active" : "done";
    return "pending";
  };

  const activeStep = steps[inspected];
  const meta = kindStyle[activeStep.kind];
  const ActiveIcon = meta.icon;
  const firedLogs = step < 0 ? [] : steps.slice(0, step + 1).map((s) => s.log);
  const kindsInFlow = Array.from(new Set(steps.map((s) => s.kind)));

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <style>{`
        @keyframes wf-pulse-travel {
          0% { left: 0%; opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          12% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          88% { opacity: 1; }
          100% { left: 100%; opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
        }
      `}</style>

      {/* Console title bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-black/50 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {flows.length > 1 ? (
            flows.map((f) => (
              <button
                key={f.id}
                onClick={() => setFlowId(f.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  f.id === flowId ? "bg-white/[0.08] text-foreground border border-white/15" : "text-muted-foreground hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))
          ) : (
            <span className="text-xs font-medium text-foreground/80">{flow.label}</span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-[0.65rem] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 motion-safe:animate-pulse" aria-hidden />
            {platformLabel[flow.platform]} · {steps.length} nodes
          </span>
          {!reducedMotion && (
            <button
              onClick={running ? reset : run}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white/[0.06] text-foreground border border-white/15 hover:bg-white/[0.12] transition-colors"
            >
              {running ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {running ? "Stop" : step >= 0 ? "Execute" : "Run flow"}
            </button>
          )}
        </div>
      </div>

      {/* Node-kind legend */}
      <div className="flex flex-wrap gap-2 px-4 py-2 border-b border-white/10 bg-black/20">
        {kindsInFlow.map((k) => (
          <span key={k} className={`flex items-center gap-1.5 text-[0.62rem] px-1.5 py-0.5 rounded border ${kindStyle[k].badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${kindStyle[k].dot}`} /> {kindStyle[k].label}
          </span>
        ))}
      </div>

      <div className="flex flex-col min-[1800px]:grid min-[1800px]:grid-cols-[1fr_400px]">
        {/* Node canvas — stacked full-width below ~1800px so nodes never shrink or scroll; on genuinely wide windows
            (a live demo on a big monitor) it sits beside the inspector instead, like a real split-pane editor. */}
        <div className="relative border-b border-white/10 min-[1800px]:border-b-0 min-[1800px]:border-r flex items-center" style={gridStyle}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" aria-hidden />
          <div className="overflow-x-auto w-full py-8 px-6">
            <div className="flex items-center w-max mx-auto">
              {steps.map((s, i) => {
                const st = status(i);
                const isInspected = i === inspected;
                const k = kindStyle[s.kind];
                const Icon = k.icon;
                return (
                  <div className="flex items-center" key={`${flow.id}-${i}`}>
                    <button
                      onClick={() => inspect(i)}
                      className={`relative w-[144px] h-[108px] flex-shrink-0 text-left rounded-xl border overflow-hidden bg-[#111]/95 shadow-md shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 ${k.glow} ${
                        st === "active" ? "border-white/25 scale-[1.05]" : st === "done" ? "border-white/15" : "border-white/10 opacity-80 hover:opacity-100"
                      } ${isInspected ? `ring-2 ${k.ring}` : ""}`}
                    >
                      <span className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${k.strip} ${st === "pending" ? "opacity-40" : "opacity-100"}`} aria-hidden />
                      <div className="p-3 pt-3.5 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`p-1.5 rounded-md border ${k.badge}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-[0.55rem] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-muted-foreground border border-white/10">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground/70">{k.label}</div>
                        <div className={`text-xs font-semibold leading-tight line-clamp-2 ${st === "pending" ? "text-foreground/75" : "text-foreground"}`}>{s.title}</div>
                      </div>
                    </button>

                    {i < steps.length - 1 && (
                      <div className="relative flex items-center w-10 flex-shrink-0" aria-hidden>
                        <span className={`h-px w-full transition-colors duration-300 ${status(i + 1) !== "pending" ? kindStyle[s.kind].line : "bg-white/15"}`} />
                        {running && step === i && (
                          <span
                            className={`absolute top-1/2 h-2 w-2 rounded-full ${kindStyle[s.kind].dot} shadow-[0_0_8px_2px] shadow-current`}
                            style={{ animation: `wf-pulse-travel ${STEP_MS}ms linear forwards` }}
                          />
                        )}
                        <ChevronRight
                          className={`h-3.5 w-3.5 absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${
                            status(i + 1) !== "pending" ? "text-white/60" : "text-white/25"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inspector — click any node above to reveal its full functionality here. Full width now, laid out in two columns so text never has to stretch edge to edge. */}
        <div className="p-5 sm:p-6 bg-card/70">
          <div className="grid md:grid-cols-2 min-[1800px]:grid-cols-1 gap-6">
            {/* Left: identity, detail, config */}
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <span className={`p-2 rounded-lg border flex-shrink-0 ${meta.badge}`}>
                  <ActiveIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-grow">
                  <div className="text-sm font-bold text-foreground leading-tight">{activeStep.title}</div>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">{meta.label}</span>
                    <span className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-muted-foreground">{activeStep.node}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">{activeStep.detail}</p>

              <FieldRows rows={activeStep.keyInfo} />
            </div>

            {/* Right: visual proof + execution log */}
            <div className="space-y-4">
              {activeStep.screenshot ? (
                <button
                  onClick={() => onScreenshot?.(activeStep.screenshot!.src, activeStep.screenshot!.alt)}
                  className="group relative block w-full rounded-md overflow-hidden border border-white/10"
                >
                  <img src={activeStep.screenshot.src} alt={activeStep.screenshot.alt} className="w-full h-auto" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[0.68rem] text-muted-foreground/50 border border-dashed border-white/10 rounded-md px-2.5 py-2">
                  <ImageOff className="h-3.5 w-3.5 flex-shrink-0" /> No screenshot yet — info & log is the real behavior.
                </div>
              )}

              <div>
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mb-1.5">Execution log</div>
                <div className="rounded-md border border-white/10 bg-black/60 p-2.5 font-mono text-[0.7rem] space-y-0.5 min-h-[52px]">
                  {firedLogs.length === 0 ? (
                    <div className="text-muted-foreground/50">› {activeStep.log}</div>
                  ) : (
                    firedLogs.map((line, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400/70 flex-shrink-0">›</span>
                        <span className={i === step && running ? "text-emerald-300" : "text-emerald-300/70"}>{line}</span>
                      </div>
                    ))
                  )}
                  {running && <span className="inline-block w-1.5 h-3 bg-primary/70 animate-pulse" aria-hidden />}
                </div>
              </div>
            </div>
          </div>

          {steps.length > 1 && (
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
              <button
                onClick={() => inspect(inspected === 0 ? steps.length - 1 : inspected - 1)}
                className="flex items-center gap-1 text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>
              <span className="text-[0.65rem] font-mono text-muted-foreground/60">
                {inspected + 1} / {steps.length}
              </span>
              <button
                onClick={() => inspect(inspected === steps.length - 1 ? 0 : inspected + 1)}
                className="flex items-center gap-1 text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowEngine;
