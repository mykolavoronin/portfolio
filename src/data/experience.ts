export type Experience = {
  period: string;
  company: string;
  role: string;
  location: string;
  projectSlug?: string;
  externalHref?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    period: "Nov 2025 — Present",
    company: "Kucherov Studio",
    role: "Full Stack Engineer",
    location: "Remote",
    projectSlug: "kucherov-studio",
    externalHref: "https://kucherov.studio/",
    points: [
      "Studio site — Next.js, TypeScript, Motion.",
      "The public face of the practice, and the release path behind it.",
    ],
  },
  {
    period: "Aug 2021 — Present",
    company: "EKA Balance",
    role: "IT · Web · Growth",
    location: "Barcelona",
    projectSlug: "eka-balance",
    externalHref: "https://ekabalance.com/",
    points: [
      "The hub and the smaller properties around it — Agenyz, masaje.barcelona.",
      "Booking, SEO, i18n, and the day-to-day of keeping it all up.",
    ],
  },
];
