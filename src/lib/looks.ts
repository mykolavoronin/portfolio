import { getLook, dailyLooks, type DailyLook, type Season } from "@/data/looks";

export type { DailyLook, Season };

/**
 * Master switch. Off for now — the fifty looks stay wired.
 * When on, a look is picked for the calendar day unless a festivity wins.
 */
export const showLooks = false;

export function seasonOf(now: Date = new Date()): Season {
  const month = now.getMonth() + 1;
  if (month === 12 || month <= 2) return "winter";
  if (month <= 5) return "spring";
  if (month <= 8) return "summer";
  return "autumn";
}

function dayKey(now: Date) {
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function fnv(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Same day, same look. Eggs show up, just less often. */
export function lookForDate(now: Date = new Date()): DailyLook {
  const season = seasonOf(now);
  const pool = dailyLooks.filter(
    (look) => look.seasons.includes(season) || look.seasons.includes("any"),
  );
  const weights = pool.map((look) => (look.egg ? 1 : 7));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let ticket = fnv(dayKey(now)) % total;
  for (let i = 0; i < pool.length; i += 1) {
    ticket -= weights[i];
    if (ticket < 0) return pool[i];
  }
  return pool[0];
}

const FORCE_KEY = "portfolio-look-force";

function readForced(): DailyLook | null {
  try {
    return getLook(sessionStorage.getItem(FORCE_KEY));
  } catch {
    return null;
  }
}

function writeForced(id: string | null) {
  try {
    if (id) sessionStorage.setItem(FORCE_KEY, id);
    else sessionStorage.removeItem(FORCE_KEY);
  } catch {
    /* ignore */
  }
}

export function lookFromSearch(search: string, now: Date = new Date()): DailyLook | null {
  if (!showLooks) return null;
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const raw = params.get("look");
  if (raw === "off" || raw === "none" || raw === "0") {
    writeForced(null);
    return lookForDate(now);
  }
  const forced = getLook(raw);
  if (forced) {
    writeForced(forced.id);
    return forced;
  }
  return readForced() ?? lookForDate(now);
}
