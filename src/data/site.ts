/** Single source of truth for identity, links, and availability. */

export const site = {
  name: "Mykola Voronin",
  role: "Software Engineer",
  location: "Barcelona, Spain",
  timezone: "GMT+1",
  email: "mykola@mykolavoronin.com",
  siteUrl: "https://mykolavoronin.com",
  github: "https://github.com/mykolavoronin",
  githubHandle: "mykolavoronin",
  linkedin: "https://www.linkedin.com/in/mykolavoronin",
  linkedinHandle: "in/mykolavoronin",
  contra: "https://contra.com/mykolavoronin",
  availability: {
    open: false,
    label: "Not taking projects",
    detail: "Focused on school and existing work — open to conversations.",
  },
  tagline: "Calm, high-performance web products.",
  shortBio: "Software engineer in Barcelona. React, Next.js, TypeScript.",
  seoDescription:
    "Mykola Voronin — software engineer in Barcelona. Clean, fast web with React, Next.js and TypeScript.",
} as const;

export const principles = [
  "Simple beats clever.",
  "Performance is a feature.",
  "If it isn't accessible, it isn't finished.",
  "Ship small. Ship often.",
  "Security is craft.",
] as const;

export const aboutParagraphs = [
  "Software engineer in Barcelona. I build calm, fast web products and care about the details.",
  "Client work: Kucherov Studio and EKA Balance (hub, VIP, Business, Agenyz, masaje.barcelona).",
  "Studying systems and cybersecurity — Scrimba full-stack, CFGS CASIX at Politècnics, IT Academy analyst path.",
] as const;
