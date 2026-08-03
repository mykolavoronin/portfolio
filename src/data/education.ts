export type Education = {
  period: string;
  school: string;
  program: string;
  location?: string;
  href?: string;
  /** Internal portfolio page (takes precedence over external href for school link) */
  pagePath?: string;
  notes?: string[];
  status?: string;
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
    href: "https://politecnics.barcelona/",
    status: "Upcoming",
    programExpand: {
      prefix: "CFGS ",
      short: "CASIX",
      full: "Administració de Sistemes Informàtics en Xarxa — Ciberseguretat",
    },
  },
  {
    period: "2026",
    school: "IT Academy · Barcelona Activa",
    program: "Certified Cybersecurity Analyst Itinerary",
    location: "Barcelona, Spain",
    href: "https://cibernarium.barcelonactiva.cat/",
    pagePath: "/education/it-academy",
    status: "Upcoming",
    notes: [
      "Itinerari certificat d'Analista en Ciberseguretat",
      "Fundamentals, SOC / CCNA Cybersecurity, Network Security, Ethical Hacker",
      "Cisco CCST & CCNA pathways · official certificate on completion",
    ],
  },
  {
    period: "Feb 2025 — Feb 2026",
    school: "Scrimba",
    program: "Full Stack Developer Diploma",
    href: "https://scrimba.com/",
    status: "In progress",
    notes: [
      "HTML, CSS, and modern JavaScript fundamentals",
      "React and full-stack application architecture",
      "SQL and database design fundamentals",
      "Shipping real projects alongside coursework",
    ],
  },
  {
    period: "Sep 2024 — 2026",
    school: "Mriya Barcelona School",
    program: "High School Diploma · Batxillerat (General Studies)",
    location: "Barcelona, Spain",
    status: "Completed",
    notes: [
      "Mathematics and applied sciences",
      "Language and literature (Spanish, Catalan, English)",
      "History, philosophy, technology, and design",
    ],
  },
  {
    period: "Sep 2020 — Jun 2024",
    school: "Col·legi Regina Carmeli Rubí",
    program: "Secondary Education (ESO)",
    location: "Rubí, Barcelona",
    status: "Completed",
    notes: ["Technology and computing fundamentals", "Multilingual academic environment"],
  },
];
