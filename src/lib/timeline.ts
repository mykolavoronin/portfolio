/** Parse YYYY-MM-DD as a local calendar day — not UTC midnight. */
function parseLocalDay(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Inclusive end of an ISO date (YYYY-MM-DD). */
function endOfDay(iso: string): number {
  const d = parseLocalDay(iso);
  if (!d) return NaN;
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function startOfDay(iso: string): number {
  const d = parseLocalDay(iso);
  if (!d) return NaN;
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export type TimeLane = "upcoming" | "current" | "completed";

/** Where a dated span sits relative to `now`. */
export function laneFromRange(
  start?: string,
  end?: string,
  now: Date = new Date(),
): TimeLane {
  const t = now.getTime();
  if (start) {
    const s = startOfDay(start);
    if (!Number.isNaN(s) && t < s) return "upcoming";
  }
  if (end) {
    const e = endOfDay(end);
    if (!Number.isNaN(e) && t > e) return "completed";
  }
  if (start || end) return "current";
  return "completed";
}
