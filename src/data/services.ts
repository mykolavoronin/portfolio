export type Service = {
  slug: string;
  title: string;
  price: string;
  short: string;
  description: string;
  features?: string[];
  category: "ai" | "build" | "advisory";
  tiers?: { name: string; price: string; description: string; features: string[] }[];
};

export const services: Service[] = [
  {
    slug: "ai-workflow-integration",
    title: "AI Workflow Integration",
    price: "From $80/hr",
    category: "ai",
    short: "Embed LLMs and copilots into your team's day-to-day, wired to your context.",
    description:
      "Embed LLMs and AI copilots into your team's day-to-day — research, writing, support, ops. Tools chosen, wired up and trained on your context.",
    features: [
      "Tool selection and model routing for each job",
      "Context wiring (docs, repos, knowledge bases)",
      "Team onboarding and prompt playbooks",
      "Guardrails and usage guidelines",
    ],
  },
  {
    slug: "ai-usage-optimization",
    title: "AI Usage Optimization",
    price: "Audit + retainer",
    category: "ai",
    short: "Cut AI spend, raise quality, and pick the right model for each job.",
    description:
      "Audit how your team and product use AI today. Cut spend, raise quality, and pick the right model for each job — with guardrails that stick.",
  },
  {
    slug: "ai-product-development",
    title: "AI Product Development",
    price: "Project",
    category: "ai",
    short: "Design and ship AI-native features — chat, search, agents, automation.",
    description:
      "Design and build AI-native features end-to-end — chat, search, agents, automation. Production-grade architecture, evaluation and observability.",
  },
  {
    slug: "ai-site-rescue",
    title: "AI-built Site Rescue",
    price: "From $80/hr",
    category: "build",
    short: "Refactor and harden sites built with Lovable, v0, Bolt or Cursor.",
    description:
      "Did you ship a site with Lovable, v0, Bolt or Cursor? I refactor, harden and accelerate it — clean architecture, real performance, no spaghetti.",
  },
  {
    slug: "coding-setup",
    title: "AI & Coding Setup",
    price: "$50/hr",
    category: "ai",
    short: "Cursor, Copilot, and modern AI coding workflows set up for you.",
    description:
      "Feeling left behind by the AI coding wave? A focused remote session to set up Cursor, Copilot, agents, and a hyper-productive environment you actually own.",
    features: [
      "Cursor and VS Code extensions setup and personalization",
      "LLM prompts, system instructions, and agent configurations",
      "Git, terminal, and local development environment customization",
      "Integrating AI efficiently without losing ownership of your code",
      "Onboarding and training for modern AI-assisted workflows",
    ],
  },
  {
    slug: "prompt-agent-engineering",
    title: "Prompt & Agent Engineering",
    price: "$80/hr",
    category: "ai",
    short: "Reliable prompts, tools, and multi-step agents with evaluation suites.",
    description:
      "Design reliable prompts, tools and multi-step agents. Evaluation suites included so quality stays measurable as you iterate.",
  },
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
    slug: "technical-advisory",
    title: "Technical Advisory",
    price: "Monthly retainer",
    category: "advisory",
    short: "Fractional engineering partner for founders.",
    description:
      "Fractional engineering partner for founders — stack choices, AI strategy, hiring sanity-checks and weekly architecture reviews.",
  },
];

/** Compact list for home (order & subset can differ from full catalog) */
export const homeServices = services.map((s) => ({
  title: s.title,
  price: s.price,
  description: s.short,
  slug: s.slug,
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
