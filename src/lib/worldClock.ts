// Pure helpers for the footer's live world clock. Kept dependency-free —
// Intl.DateTimeFormat already resolves DST per zone, so there's no offset
// table to hand-maintain here.

export function formatClockTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function getUtcOffsetMinutes(date: Date, tz: string): number {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";

  const match = part.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes);
}

// Offset of `tz` relative to `homeTz`, formatted like "+2h" / "−12h" / "same time".
export function getRelativeOffsetLabel(date: Date, tz: string, homeTz: string): string {
  const diffMinutes = getUtcOffsetMinutes(date, tz) - getUtcOffsetMinutes(date, homeTz);
  if (diffMinutes === 0) return "same time";
  const sign = diffMinutes > 0 ? "+" : "−";
  const hours = Math.abs(diffMinutes) / 60;
  const label = Number.isInteger(hours) ? `${hours}` : hours.toFixed(1);
  return `${sign}${label}h`;
}

export function isDaytime(date: Date, tz: string): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(date)
  );
  return hour >= 6 && hour < 18;
}

type Region = { flag: string; label: string; tz: string; country?: string };
export type DetectedClock = { flag: string; tz: string; matched: boolean; city: string };

// Matches the visitor's browser locale (e.g. "en-US" -> "US") against a
// known region. Locale/timeZone are injectable for testing; in the browser
// they default to navigator.language and the resolved system timezone.
export function detectVisitorClock(
  regions: readonly Region[],
  locale: string = (typeof navigator !== "undefined" && (navigator.languages?.[0] ?? navigator.language)) || "",
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): DetectedClock {
  const countryCode = locale.split("-")[1]?.toUpperCase();
  const matched = regions.find((r) => r.country === countryCode);
  if (matched) return { flag: matched.flag, tz: matched.tz, matched: true, city: matched.label };

  const city = timeZone.split("/").pop()?.replace(/_/g, " ") ?? timeZone;
  return { flag: "🌐", tz: timeZone, matched: false, city };
}
