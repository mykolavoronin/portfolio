export type Education = {
  period: string;
  school: string;
  program: string;
  location?: string;
  href?: string;
  notes?: string[];
  /** Expand last acronym on hover (e.g. CASIX → full Catalan title) */
  programExpand?: {
    prefix: string;
    short: string;
    full: string;
  };
};

export const education: Education[] = [
  {
    period: "Sep 2026 — Jul 2028",
    school: "Politècnics Barcelona",
    program: "CFGS CASIX",
    location: "Barcelona, Spain",
    programExpand: {
      prefix: "CFGS ",
      short: "CASIX",
      full: "Administració de Sistemes Informàtics en Xarxa — Ciberseguretat",
    },
  },
  {
    period: "Feb 2025 — Feb 2026",
    school: "Scrimba",
    program: "Full Stack Developer Program",
    href: "https://scrimba.com/",
    notes: [
      "HTML, CSS, and modern JavaScript fundamentals",
      "React and full-stack application architecture",
      "SQL and database design fundamentals",
      "Shipping real projects alongside coursework",
    ],
  },
  {
    period: "Sep 2024 — Jul 2026",
    school: "Mriya Barcelona School",
    program: "High School Diploma · Batxillerat (General Studies)",
    location: "Barcelona, Spain",
    notes: [
      "Mathematics and applied sciences",
      "Language and literature (Spanish, Catalan, English)",
      "History, philosophy, technology, and design",
      "Balancing academics with professional client work",
    ],
  },
  {
    period: "Sep 2020 — Jun 2024",
    school: "Col·legi Regina Carmeli Rubí",
    program: "Secondary Education (ESO)",
    location: "Rubí, Barcelona",
    notes: ["Technology and computing fundamentals", "Multilingual academic environment"],
  },
];

