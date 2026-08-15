export type VisitorGeo = {
  country: string;
  region: string;
  city: string;
  languages: string[];
};

const STORAGE_KEY = "portfolio-geo";

const TZ_COUNTRY: Record<string, string> = {
  "Europe/Madrid": "ES",
  "Atlantic/Canary": "ES",
  "Africa/Ceuta": "ES",
  "Europe/Paris": "FR",
  "Europe/Andorra": "AD",
  "Europe/Lisbon": "PT",
  "Atlantic/Madeira": "PT",
  "Atlantic/Azores": "PT",
  "Europe/Rome": "IT",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "Europe/Luxembourg": "LU",
  "Europe/Monaco": "MC",
  "Europe/London": "GB",
  "Europe/Berlin": "DE",
  "Europe/Amsterdam": "NL",
  "America/Martinique": "MQ",
  "America/Guadeloupe": "GP",
  "America/Cayenne": "GF",
  "Indian/Reunion": "RE",
  "Indian/Mayotte": "YT",
  "Pacific/Noumea": "NC",
  "Pacific/Tahiti": "PF",
  "America/New_York": "US",
  "America/Toronto": "CA",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Bogota": "CO",
  "America/Santiago": "CL",
  "America/Lima": "PE",
};

function languagesFromNavigator(): string[] {
  if (typeof navigator === "undefined") return [];
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  return list.filter(Boolean).map((l) => l.toLowerCase());
}

function fromTimezone(): VisitorGeo {
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    tz = "";
  }
  return {
    country: TZ_COUNTRY[tz] ?? "",
    region: "",
    city: "",
    languages: languagesFromNavigator(),
  };
}

function readCache(): VisitorGeo | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as VisitorGeo;
    if (!parsed || typeof parsed.country !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(geo: VisitorGeo) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(geo));
  } catch {
    /* ignore */
  }
}

let inflight: Promise<VisitorGeo> | null = null;

async function lookupIp(): Promise<VisitorGeo | null> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 2200);
  try {
    const res = await fetch("https://ipwho.is/", { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success?: boolean;
      country_code?: string;
      region?: string;
      city?: string;
    };
    if (!data.success || !data.country_code) return null;
    return {
      country: data.country_code.toUpperCase(),
      region: data.region ?? "",
      city: data.city ?? "",
      languages: languagesFromNavigator(),
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

export function guessVisitorGeo(): VisitorGeo {
  return readCache() ?? fromTimezone();
}

export async function resolveVisitorGeo(): Promise<VisitorGeo> {
  const cached = readCache();
  // Trust a real IP hit (country + place). Country-only leftovers are timezone guesses.
  if (cached?.country && (cached.region || cached.city)) return cached;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const looked = await lookupIp();
      if (looked?.country) {
        writeCache(looked);
        return looked;
      }
      // Timezone fallback is a guess — don't persist it or we never retry IP.
      return cached?.country ? cached : fromTimezone();
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

function placeBlob(geo: VisitorGeo): string {
  return `${geo.region} ${geo.city}`.toLowerCase();
}

/** Catalonia proper — not Valencia, the Balearics, or Andorra. */
export function isCatalanArea(geo: VisitorGeo): boolean {
  const blob = placeBlob(geo);
  if (/(valenc|illes balears|islas baleares|balearic|palma|andorra)/.test(blob)) return false;
  if (/(catal|barcelona|girona|gerona|tarragona|lleida|l[eé]rida)/.test(blob)) return true;
  // Language is only a hint when we have no city/region of our own.
  if (blob.trim()) return false;
  const c = geo.country.toUpperCase();
  if (c && c !== "ES") return false;
  return geo.languages.some((l) => l === "ca" || (l.startsWith("ca-") && !l.startsWith("ca-valenc")));
}

export function isValencianArea(geo: VisitorGeo): boolean {
  return /valenc/.test(placeBlob(geo));
}

/** La Mercè is Barcelona's festival, not the rest of Catalonia. */
export function isBarcelonaArea(geo: VisitorGeo): boolean {
  return /\bbarcelona\b/.test(placeBlob(geo));
}
