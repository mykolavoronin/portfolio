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
      "Release pipeline on Vercel.",
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
      "Multi-domain stack: hub, Agenyz, masaje.barcelona.",
      "Booking, SEO, i18n, and day-to-day IT.",
    ],
  },
];
