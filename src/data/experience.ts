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
    role: "Full Stack Engineer · Part-time",
    location: "Remote",
    projectSlug: "kucherov-studio",
    externalHref: "https://kucherov.studio/",
    points: [
      "Designed and built the studio website end-to-end with React, Next.js, and TypeScript.",
      "Translated bold creative direction into a fluid, editorial interface with strong motion craft.",
      "Tuned performance, accessibility, and SEO to 95+ Lighthouse scores.",
      "Established zero-downtime deployment pipelines on Vercel.",
    ],
  },
  {
    period: "Aug 2021 — Present",
    company: "EKA Balance",
    role: "IT Specialist · Business Development · Web",
    location: "Barcelona, Spain",
    projectSlug: "eka-balance",
    externalHref: "https://ekabalance.com/",
    points: [
      "Architected multi-domain web infrastructure with local SEO, booking, and multi-language support.",
      "Built WhatsApp-integrated booking flows and restructured the service catalogue around outcomes.",
      "Led marketing across organic, local SEO, and direct channels.",
      "Maintained IT and network operations — hardware, software, and uptime for the practice.",
      "Advised on pricing, positioning, and day-to-day operations.",
    ],
  },
];
