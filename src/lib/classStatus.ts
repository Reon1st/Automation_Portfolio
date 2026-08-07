import { CLASS_SCHEDULE } from "./constants";

// Date.now() is already an absolute UTC instant — shift it to Manila (fixed
// UTC+8, no DST) and read wall-clock parts with the UTC accessors so the
// visitor's own local timezone never leaks in.
export function isInClassNow(): boolean {
  const manila = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const minutesNow = manila.getUTCHours() * 60 + manila.getUTCMinutes();
  const todaysBlocks = CLASS_SCHEDULE[manila.getUTCDay()] ?? [];
  return todaysBlocks.some(([start, end]) => minutesNow >= start && minutesNow < end);
}
