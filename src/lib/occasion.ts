import { isBarcelonaArea, isCatalanArea, isValencianArea, type VisitorGeo } from "@/lib/geo";
import { site } from "@/data/site";

/**
 * Master switch. Off for now — assets and geo rules stay wired.
 * When flipped on, only visitors who celebrate that day see it.
 */
export const showOccasions = false;

export type DressKind =
  | "party-hat"
  | "bunny"
  | "crown"
  | "rose"
  | "star"
  | "spark"
  | "sun"
  | "heart"
  | "senyera"
  | "cockade"
  | "chestnut"
  | "candle"
  | "cava"
  | "ribbon";

export type OccasionId =
  | "birthday"
  | "new-year"
  | "nadal"
  | "reis"
  | "nit-reis"
  | "easter"
  | "carnival"
  | "valentine"
  | "sant-jordi"
  | "diada"
  | "hispanidad"
  | "merce"
  | "asuncion"
  | "solstice"
  | "sant-joan"
  | "castanyada"
  | "tots-sants"
  | "constitucion"
  | "santa-eulalia"
  | "bastille"
  | "victoire"
  | "armistice";

type OccasionDef = {
  id: OccasionId;
  dress: DressKind;
  label: string | ((age: number) => string);
};

const CATALOG: Record<OccasionId, OccasionDef> = {
  birthday: { id: "birthday", dress: "party-hat", label: (age) => `Today I turn ${age}.` },
  "new-year": { id: "new-year", dress: "cava", label: "Bon any nou." },
  nadal: { id: "nadal", dress: "star", label: "Bon Nadal." },
  reis: { id: "reis", dress: "crown", label: "Bon Dia de Reis." },
  "nit-reis": { id: "nit-reis", dress: "crown", label: "Nit de Reis." },
  easter: { id: "easter", dress: "bunny", label: "Bon Dia de Pasqua." },
  carnival: { id: "carnival", dress: "party-hat", label: "Carnestoltes." },
  valentine: { id: "valentine", dress: "heart", label: "Sant Valentí." },
  "sant-jordi": { id: "sant-jordi", dress: "rose", label: "Sant Jordi — a book and a rose." },
  diada: { id: "diada", dress: "ribbon", label: "Diada Nacional de Catalunya." },
  hispanidad: { id: "hispanidad", dress: "spark", label: "Fiesta Nacional de España." },
  merce: { id: "merce", dress: "spark", label: "La Mercè." },
  asuncion: { id: "asuncion", dress: "sun", label: "Midsummer — l’Assumpció." },
  solstice: { id: "solstice", dress: "sun", label: "Solstici d’estiu." },
  "sant-joan": { id: "sant-joan", dress: "spark", label: "Nit de Sant Joan." },
  castanyada: { id: "castanyada", dress: "chestnut", label: "Castanyada." },
  "tots-sants": { id: "tots-sants", dress: "candle", label: "Tots Sants." },
  constitucion: { id: "constitucion", dress: "spark", label: "Día de la Constitución." },
  "santa-eulalia": { id: "santa-eulalia", dress: "spark", label: "Santa Eulàlia." },
  bastille: { id: "bastille", dress: "cockade", label: "14 juillet." },
  victoire: { id: "victoire", dress: "cockade", label: "8 mai." },
  armistice: { id: "armistice", dress: "cockade", label: "11 novembre." },
};

export const OCCASION_IDS = Object.keys(CATALOG) as OccasionId[];

const ALIASES: Record<string, OccasionId> = {
  birthday: "birthday",
  bday: "birthday",
  age: "birthday",
  "new-year": "new-year",
  newyear: "new-year",
  nye: "new-year",
  "any-nou": "new-year",
  nadal: "nadal",
  christmas: "nadal",
  xmas: "nadal",
  reis: "reis",
  kings: "reis",
  "nit-reis": "nit-reis",
  "nitdereis": "nit-reis",
  castanyada: "castanyada",
  "tots-sants": "tots-sants",
  totsants: "tots-sants",
  "all-saints": "tots-sants",
  constitucion: "constitucion",
  constitution: "constitucion",
  "santa-eulalia": "santa-eulalia",
  eulalia: "santa-eulalia",
  easter: "easter",
  pasqua: "easter",
  carnival: "carnival",
  carnestoltes: "carnival",
  "mardi-gras": "carnival",
  valentine: "valentine",
  valenti: "valentine",
  "sant-jordi": "sant-jordi",
  jordi: "sant-jordi",
  diada: "diada",
  hispanidad: "hispanidad",
  spain: "hispanidad",
  merce: "merce",
  "la-merce": "merce",
  asuncion: "asuncion",
  assumpcio: "asuncion",
  summer: "asuncion",
  solstice: "solstice",
  "sant-joan": "sant-joan",
  joan: "sant-joan",
  bastille: "bastille",
  "14-juillet": "bastille",
  france: "bastille",
  victoire: "victoire",
  armistice: "armistice",
};

export type Occasion = {
  id: OccasionId;
  label: string;
  dress: DressKind;
};

const FR = ["FR", "GP", "MQ", "GF", "RE", "YT", "NC", "PF", "WF", "BL", "MF", "PM"];
const WEST = [
  "ES", "FR", "PT", "IT", "AD", "BE", "DE", "NL", "IE", "GB", "AT", "CH",
  "US", "CA", "MX", "AR", "CL", "CO", "PE", "BR", "UY", "AU", "NZ", "PL",
];
const CATHOLIC = [
  "ES", "FR", "IT", "PT", "AD", "BE", "AT", "PL", "HR", "IE", "MX", "AR",
  "CL", "CO", "PE", "BR", "UY", "PH",
];

/** Where this day is actually kept — not “speaks the language”. */
export function celebratesOccasion(id: OccasionId, geo: VisitorGeo | null | undefined): boolean {
  if (!geo) return id === "birthday" || id === "new-year";
  const c = geo.country.toUpperCase();
  const inList = (list: string[]) => Boolean(c) && list.includes(c);

  switch (id) {
    case "birthday":
    case "new-year":
    case "valentine":
      return true;
    case "nadal":
    case "easter":
      return !c || inList(WEST);
    case "reis":
    case "nit-reis":
      return inList(["ES", "AD", "PT", "IT", "FR", "MX", "AR", "CL", "CO", "PE", "GT"]);
    case "carnival":
      return inList(["ES", "FR", "IT", "PT", "BR", "BE", "DE", "NL", "CO", "UY", "PA"]);
    case "sant-jordi":
      return c === "AD" || isCatalanArea(geo) || isValencianArea(geo);
    case "diada":
    case "castanyada":
      return isCatalanArea(geo);
    case "hispanidad":
    case "constitucion":
      return c === "ES";
    case "merce":
    case "santa-eulalia":
      return isBarcelonaArea(geo);
    case "tots-sants":
      return inList(["ES", "AD", "PT", "IT", "FR", "MX", "AR", "CL", "CO", "PE", "BR"]);
    case "asuncion":
      return inList(CATHOLIC);
    case "solstice":
      return !c || inList(["ES", "FR", "PT", "IT", "AD", "SE", "NO", "FI", "DK", "EE", "LV", "LT"]);
    case "sant-joan":
      return inList(["ES", "AD", "FR", "PT"]);
    case "bastille":
    case "victoire":
      return inList(FR);
    case "armistice":
      return inList(["FR", "BE", "GB", "UK", "CA", "AU", "NZ", "US"]);
    default:
      return false;
  }
}

export function resolveOccasionId(raw: string | null | undefined): OccasionId | null {
  if (!raw) return null;
  return ALIASES[raw.trim().toLowerCase()] ?? null;
}

function westernEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function ymd(d: Date) {
  return { y: d.getFullYear(), m: d.getMonth() + 1, day: d.getDate() };
}

function dayStamp(d: Date) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

function inDayRange(now: Date, from: Date, to: Date) {
  const n = dayStamp(now);
  return n >= dayStamp(from) && n <= dayStamp(to);
}

export function ageOn(date: Date, bornIso = site.born): number {
  const born = new Date(`${bornIso}T00:00:00`);
  let age = date.getFullYear() - born.getFullYear();
  const month = date.getMonth() - born.getMonth();
  if (month < 0 || (month === 0 && date.getDate() < born.getDate())) age -= 1;
  return Math.max(0, age);
}

export function fromId(id: OccasionId, now: Date = new Date()): Occasion {
  const def = CATALOG[id];
  const age = ageOn(now);
  return {
    id: def.id,
    dress: def.dress,
    label: typeof def.label === "function" ? def.label(age) : def.label,
  };
}

const FORCE_KEY = "portfolio-occasion-force";

function readForced(): OccasionId | null {
  try {
    return resolveOccasionId(sessionStorage.getItem(FORCE_KEY));
  } catch {
    return null;
  }
}

function writeForced(id: OccasionId | null) {
  try {
    if (id) sessionStorage.setItem(FORCE_KEY, id);
    else sessionStorage.removeItem(FORCE_KEY);
  } catch {
    /* ignore */
  }
}

export function occasionFromSearch(
  search: string,
  now: Date = new Date(),
  geo?: VisitorGeo | null,
): Occasion | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const raw = params.get("occasion") ?? params.get("tag") ?? params.get("season");
  if (raw === "off" || raw === "none" || raw === "0") {
    writeForced(null);
    return occasionFromDate(now, geo);
  }
  const forced = resolveOccasionId(raw);
  if (forced) {
    writeForced(forced);
    return fromId(forced, now);
  }
  const stored = readForced();
  if (stored) return fromId(stored, now);
  return occasionFromDate(now, geo);
}

export function currentOccasion(now: Date = new Date(), geo?: VisitorGeo | null): Occasion | null {
  if (typeof window !== "undefined") {
    return occasionFromSearch(window.location.search, now, geo);
  }
  return occasionFromDate(now, geo);
}

/** Calendar order: personal and local first, then the rest. */
export function occasionFromDate(now: Date = new Date(), geo?: VisitorGeo | null): Occasion | null {
  const { y, m, day } = ymd(now);
  const easter = westernEaster(y);
  const mardiGras = addDays(easter, -47);

  const pick = (id: OccasionId) => (celebratesOccasion(id, geo) ? fromId(id, now) : null);

  if (m === 10 && day === 13) return pick("birthday");
  if (m === 10 && day === 12) return pick("hispanidad");
  if (m === 10 && day === 31) return pick("castanyada");
  if (m === 11 && day === 1) return pick("tots-sants");
  if (m === 12 && day === 6) return pick("constitucion");
  if ((m === 12 && day === 31) || (m === 1 && day <= 2)) return pick("new-year");
  if (m === 1 && day === 5) return pick("nit-reis");
  if (m === 1 && day === 6) return pick("reis");
  if (m === 12 && day >= 24 && day <= 26) return pick("nadal");
  if (inDayRange(now, addDays(easter, -1), addDays(easter, 1))) return pick("easter");
  if (m === mardiGras.getMonth() + 1 && day === mardiGras.getDate()) return pick("carnival");
  if (m === 2 && day === 12) return pick("santa-eulalia");
  if (m === 2 && day === 14) return pick("valentine");
  if (m === 4 && day === 23) return pick("sant-jordi");
  if (m === 9 && day === 11) return pick("diada");
  if (m === 9 && day === 24) return pick("merce");
  if (m === 8 && day === 15) return pick("asuncion");
  if (m === 6 && day === 21) return pick("solstice");
  if (m === 6 && (day === 23 || day === 24)) return pick("sant-joan");
  if (m === 7 && day === 14) return pick("bastille");
  if (m === 5 && day === 8) return pick("victoire");
  if (m === 11 && day === 11) return pick("armistice");
  return null;
}
