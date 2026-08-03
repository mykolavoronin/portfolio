export type Service = {
  slug: string;
  title: string;
  price: string;
  short: string;
  description: string;
  features?: string[];
  category: "build" | "advisory";
  tiers?: { name: string; price: string; description: string; features: string[] }[];
};

export const services: Service[] = [
  {
    slug: "personal-consultation",
    title: "Personal Consultation",
    price: "$50/hr",
    category: "advisory",
    short: "1-on-1 sessions for architecture review, debugging, or career guidance.",
    description:
      "Whether you're stuck on a tricky bug, choosing architecture, or need a career roadmap — focused 1-on-1 sessions with async follow-up notes.",
    features: [
      "Architecture review for full-stack apps (Next.js, Node.js, databases)",
      "Code reviews and best-practice guidance",
      "Career and learning roadmap for aspiring developers",
      "Debugging complex front-end or back-end issues",
      "Performance profiling and UI/UX improvements",
    ],
  },
  {
    slug: "deployment-setup",
    title: "Deployment Setup",
    price: "$50/hr",
    category: "build",
    short: "Get your code from localhost to production safely and efficiently.",
    description:
      "From localhost to production — Vercel, Netlify, or custom VPS. CI/CD, custom domains, previews, and safe release habits.",
    features: [
      "Hosting platform setup and DNS",
      "CI/CD pipelines and preview deployments",
      "Environment variables and secrets hygiene",
      "Basic monitoring and rollback plan",
    ],
  },
  {
    slug: "portfolio-building",
    title: "Portfolio Building",
    price: "Fixed tiers",
    category: "build",
    short: "Lightning-fast, bespoke personal websites that convert.",
    description:
      "Your digital presence matters. Lightning-fast, bespoke personal websites designed and built end-to-end to showcase work and convert visitors.",
    tiers: [
      {
        name: "Basic",
        price: "$499",
        description: "A simple, fast, elegant personal presence.",
        features: [
          "1–3 pages (Home, About, Contact)",
          "Next.js + Tailwind CSS",
          "Responsive & accessible",
          "Basic SEO setup",
          "Deployed to Vercel or Netlify",
        ],
      },
      {
        name: "Standard",
        price: "$999",
        description: "For freelancers and creators who need project showcases.",
        features: [
          "Up to 6 pages (incl. Projects)",
          "CMS or MDX for content",
          "Motion and polish pass",
          "Advanced SEO & analytics",
          "Custom domain setup",
        ],
      },
      {
        name: "Premium",
        price: "$1,999+",
        description: "A complete custom web experience.",
        features: [
          "Flexible page count",
          "Bespoke interactions / richer motion",
          "API integrations (Calendly, Stripe, etc.)",
          "Multi-language support (i18n)",
          "1 month free support & maintenance",
        ],
      },
    ],
  },
  {
    slug: "optimization-maintenance",
    title: "Optimization & Maintenance",
    price: "Monthly",
    category: "build",
    short: "Keep your site blazing fast, optimized, and secure.",
    description:
      "Keep your site fast, optimized and secure. Proactive updates and 95+ Lighthouse targets on a monthly retainer.",
  },
  {
    slug: "website-exporting",
    title: "Website Exporting",
    price: "Custom",
    category: "build",
    short: "Migrate from Wix or Squarespace to clean React / Next.js.",
    description:
      "Migrate from Wix, Squarespace or Webflow to clean React / Next.js — no vendor lock-in, better performance, full ownership of the code.",
  },
  {
    slug: "design-to-code",
    title: "Design to Code",
    price: "$50/hr & fixed",
    category: "build",
    short: "Turn Figma or Sketch designs into clean, scalable code.",
    description:
      "Turn Figma or Sketch designs into clean, accessible, scalable React components and pages.",
  },
  {
    slug: "site-rescue",
    title: "Site Rescue",
    price: "From $80/hr",
    category: "build",
    short: "Refactor and harden fragile sites into clean, maintainable code.",
    description:
      "Ship happened fast and the codebase got messy? I refactor, harden, and accelerate it — clean architecture, real performance, no spaghetti.",
    features: [
      "Architecture cleanup and dependency hygiene",
      "Performance and accessibility fixes",
      "TypeScript / React / Next.js modernization",
      "Deploy pipeline and environment stability",
    ],
  },
  {
    slug: "technical-advisory",
    title: "Technical Advisory",
    price: "Monthly retainer",
    category: "advisory",
    short: "Fractional engineering partner for founders.",
    description:
      "Fractional engineering partner for founders — stack choices, hiring sanity-checks, and weekly architecture reviews.",
  },
];

/** Compact list for home */
export const homeServices = services.map((s) => ({
  title: s.title,
  price: s.price,
  description: s.short,
  slug: s.slug,
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
