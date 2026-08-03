export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL", "Bash"],
  },
  {
    title: "Frameworks",
    items: ["Next.js", "React", "Tailwind CSS", "Motion", "Vite", "Node.js"],
  },
  {
    title: "Tooling",
    items: ["Git / GitHub", "Vercel", "Cloudflare", "Figma", "Cursor", "Linear", "Raycast"],
  },
  {
    title: "Practice",
    items: [
      "UI / UX design",
      "Performance optimization",
      "Accessibility (a11y)",
      "SEO & local SEO",
      "Internationalization",
      "AI-assisted workflows",
    ],
  },
  {
    title: "Operations",
    items: [
      "Deployment & CI/CD",
      "System administration",
      "DNS & networking",
      "Monitoring & uptime",
      "IT support",
    ],
  },
] as const;

/** Compact stack chips shown on the home page */
export const homeStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "AI Tooling",
  "UI / UX Design",
  "Deployment & CI/CD",
  "System Administration",
] as const;

export const spokenLanguages = [
  { name: "Ukrainian", level: "Native" },
  { name: "Spanish", level: "Native" },
  { name: "Catalan", level: "Native" },
  { name: "Russian", level: "Native" },
  { name: "English", level: "Proficient" },
  { name: "German", level: "Basic" },
] as const;
