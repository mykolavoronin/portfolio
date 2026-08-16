import politecnicsIcon from "@/assets/brands/politecnics.png";
import itAcademyIcon from "@/assets/brands/it-academy.png";
import scrimbaIcon from "@/assets/brands/scrimba.png";
import animationsIcon from "@/assets/brands/animations-dev.png";
import mriyaIcon from "@/assets/brands/mriya.png";
import reginaIcon from "@/assets/brands/regina-carmeli.png";
import { laneFromRange, type TimeLane } from "@/lib/timeline";

export type StudyItem = {
  title: string;
  period: string;
  /** ISO YYYY-MM-DD — drives whether this is upcoming, current, or done. */
  start?: string;
  end?: string;
  /** On hold: stays in data, not shown as studying or finished. */
  hold?: boolean;
  status?: string;
  href?: string;
  programExpand?: {
    prefix: string;
    short: string;
    full: string;
  };
};

export type StudyGroup = {
  id: string;
  name: string;
  location?: string;
  href?: string;
  pagePath?: string;
  icon: string;
  /** Keep in data, leave off the public plan until a start date is set. */
  hidden?: boolean;
  /** In data, but never named on the public site. */
  private?: boolean;
  items: StudyItem[];
};

export type StudyPhase = TimeLane | "hold" | "hidden";

export function itemPhase(item: StudyItem, now: Date = new Date()): StudyPhase {
  if (item.hold) return "hold";
  if (item.start || item.end) {
    const lane = laneFromRange(item.start, item.end, now);
    if (item.status === "Issued" || item.status === "Completed") {
      return lane === "upcoming" ? "upcoming" : "completed";
    }
    return lane;
  }
  if (item.status === "Upcoming") return "upcoming";
  if (item.status === "In progress") return "current";
  if (item.status === "Issued" || item.status === "Completed") return "completed";
  return "upcoming";
}

export function visibleItems(group: StudyGroup, now: Date = new Date()): StudyItem[] {
  if (group.hidden || group.private) return [];
  return group.items.filter((item) => itemPhase(item, now) === "completed");
}

export function groupLane(
  group: StudyGroup,
  now: Date = new Date(),
): "studying" | "studied" | null {
  const items = visibleItems(group, now);
  if (items.length === 0) return null;
  if (items.some((item) => itemPhase(item, now) === "current")) return "studying";
  return "studied";
}

/** Institution groups — add another Scrimba / Politècnics item here, not as a new section. */
export const studyGroups: StudyGroup[] = [
  {
    id: "politecnics",
    name: "Politècnics Barcelona",
    location: "Barcelona",
    href: "https://politecnics.barcelona/",
    icon: politecnicsIcon,
    private: true,
    items: [
      {
        title: "CFGS CASIX",
        period: "Sep 2026 — Jul 2028",
        start: "2026-09-01",
        end: "2028-07-31",
        status: "Upcoming",
        programExpand: {
          prefix: "CFGS ",
          short: "CASIX",
          full: "Administració de Sistemes Informàtics en Xarxa — Ciberseguretat",
        },
      },
    ],
  },
  {
    id: "it-academy",
    name: "IT Academy · Barcelona Activa",
    location: "Barcelona",
    href: "https://cibernarium.barcelonactiva.cat/",
    pagePath: "/education/it-academy",
    icon: itAcademyIcon,
    hidden: true,
    items: [
      {
        title: "Certified Cybersecurity Analyst Itinerary",
        period: "2026",
        status: "Upcoming",
        href: "/education/it-academy",
      },
    ],
  },
  {
    id: "scrimba",
    name: "Scrimba",
    location: "Online",
    href: "https://scrimba.com/",
    icon: scrimbaIcon,
    items: [
      {
        title: "Full Stack Developer Diploma",
        period: "Feb 2025 — Feb 2026",
        start: "2025-02-01",
        hold: true,
        status: "In progress",
        href: "https://scrimba.com/",
      },
    ],
  },
  {
    id: "animations-dev",
    name: "animations.dev",
    location: "Online",
    href: "https://animations.dev/",
    icon: animationsIcon,
    items: [
      {
        title: "Animations on the Web",
        period: "2026",
        start: "2026-01-01",
        end: "2026-08-01",
        status: "Issued",
        href: "https://animations.dev/certificate/2139bcb6-d432-4cd0-ad20-7ac447ad1def",
      },
    ],
  },
  {
    id: "mriya",
    name: "Mriya Barcelona School",
    location: "Barcelona",
    icon: mriyaIcon,
    items: [
      {
        title: "High School Diploma · Batxillerat (General Studies)",
        period: "Sep 2024 — 2026",
        start: "2024-09-01",
        end: "2026-06-30",
        status: "Completed",
      },
    ],
  },
  {
    id: "regina-carmeli",
    name: "Col·legi Regina Carmeli Rubí",
    location: "Rubí",
    href: "https://reginacarmeli.com/",
    icon: reginaIcon,
    items: [
      {
        title: "Secondary Education (ESO)",
        period: "Sep 2020 — Jun 2024",
        start: "2020-09-01",
        end: "2024-06-30",
        status: "Completed",
      },
    ],
  },
];
