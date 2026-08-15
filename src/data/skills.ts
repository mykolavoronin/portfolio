import flagUa from "@/assets/flags/ua.png";
import flagEs from "@/assets/flags/es.png";
import flagCt from "@/assets/flags/ct.png";
import flagRu from "@/assets/flags/ru.png";
import flagGb from "@/assets/flags/gb.png";
import flagDe from "@/assets/flags/de.png";

/** Flip to true to show the home stack block, /skills page, and nav link. */
export const showSkills = false;

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
    items: ["Git / GitHub", "Vercel", "Cloudflare", "Figma", "Linear", "Raycast"],
  },
  {
    title: "Practice",
    items: [
      "UI / UX design",
      "Performance optimization",
      "Accessibility (a11y)",
      "SEO & local SEO",
      "Internationalization",
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
  "UI / UX Design",
  "Deployment & CI/CD",
  "System Administration",
] as const;

export const spokenLanguages = [
  { name: "Ukrainian", level: "Native", flag: flagUa },
  { name: "Spanish", level: "Native", flag: flagEs },
  { name: "Catalan", level: "Native", flag: flagCt },
  { name: "Russian", level: "Native", flag: flagRu },
  { name: "English", level: "Proficient", flag: flagGb },
  { name: "German", level: "Basic", flag: flagDe },
] as const;
