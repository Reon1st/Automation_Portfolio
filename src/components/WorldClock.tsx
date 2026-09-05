import React, { useEffect, useMemo, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { WORLD_CLOCKS } from "@/lib/constants";
import { formatClockTime, getRelativeOffsetLabel, isDaytime, detectVisitorClock } from "@/lib/worldClock";

const HOME = WORLD_CLOCKS.find((c) => c.isHome)!;
const REGIONS = WORLD_CLOCKS.filter((c) => !c.isHome);

// Isolated from Footer so its per-second re-render doesn't touch the rest
// of the footer's static content.
const WorldClock: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  // Detected once per load — the visitor's locale/timezone won't change mid-session.
  const visitor = useMemo(() => detectVisitorClock(REGIONS), []);
  const sameAsHome = visitor.tz === HOME.tz;

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const visitorLabel = visitor.matched ? "You" : `You — ${visitor.city}`;

  return (
    <div className="p-3 rounded-xl bg-card/40 border border-border/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        Live Time Conversion
      </p>
      <div className="space-y-1">
        {!sameAsHome && (
          <ClockRow
            flag={visitor.flag}
            label={visitorLabel}
            time={formatClockTime(now, visitor.tz)}
            icon={isDaytime(now, visitor.tz) ? Sun : Moon}
            offset={getRelativeOffsetLabel(now, visitor.tz, HOME.tz)}
          />
        )}
        <ClockRow
          flag={HOME.flag}
          label={sameAsHome ? "Same time as you" : "Reon — Manila"}
          time={formatClockTime(now, HOME.tz)}
          icon={isDaytime(now, HOME.tz) ? Sun : Moon}
          highlight
        />
      </div>
    </div>
  );
};

const ClockRow: React.FC<{
  flag: string;
  label: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  offset?: string;
  highlight?: boolean;
}> = ({ flag, label, time, icon: Icon, offset, highlight }) => (
  <div
    className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs ${
      highlight ? "bg-primary/5 border-l-2 border-primary" : ""
    }`}
  >
    <span className="flex items-center gap-1.5 text-foreground/80">
      <span>{flag}</span>
      <span className={highlight ? "font-semibold text-foreground" : ""}>{label}</span>
    </span>
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="h-3 w-3 shrink-0" />
      <span className="font-mono tabular-nums text-foreground/90">{time}</span>
      {offset && <span className="text-[10px] text-muted-foreground/70">{offset}</span>}
    </span>
  </div>
);

export default WorldClock;
