import kucherov from "@/assets/projects/kucherov.webp";
import ekabalance from "@/assets/projects/ekabalance.webp";
import agenyz from "@/assets/projects/agenyz.webp";
import masaje from "@/assets/projects/masaje.webp";
import kucherovIcon from "@/assets/brands/kucherov.png";
import ekaIcon from "@/assets/brands/eka-favicon.png";
import agenyzIcon from "@/assets/brands/agenyz.png";
import masajeIcon from "@/assets/brands/masaje.png";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  cover: string;
  year: string;
  role: string;
  status: string;
  /** Client this work belongs to */
  client: string;
  /** Stable id for grouping on the home page */
  clientId: "kucherov-studio" | "eka-balance";
  industry: string;
  location: string;
  stack: string[];
  highlights: string[];
  overview: string[];
  challenge: string;
  approach: string[];
  outcome: string[];
  technical?: string[];
  relatedSites?: { name: string; url: string; description: string }[];
  acknowledgements?: { label: string; body: string; href?: string }[];
  /** Featured / primary site for the client group */
  primary?: boolean;
};

export type ClientGroup = {
  id: "kucherov-studio" | "eka-balance";
  name: string;
  blurb: string;
  href: string;
  location: string;
  period: string;
  icon: string;
};

export const clientGroups: ClientGroup[] = [
  {
    id: "kucherov-studio",
    name: "Kucherov Studio",
    blurb: "Architecture & visualization.",
    href: "https://kucherov.studio/",
    location: "Remote",
    period: "2025 — Present",
    icon: kucherovIcon,
  },
  {
    id: "eka-balance",
    name: "EKA Balance",
    blurb: "Wellness · multi-domain web.",
    href: "https://ekabalance.com/",
    location: "Barcelona",
    period: "2021 — Present",
    icon: ekaIcon,
  },
];

export const projects: Project[] = [
  {
    slug: "kucherov-studio",
    title: "Kucherov Studio",
    tagline: "Precision architecture. Immersive visualization.",
    description: "I work with Kucherov Studio on the architecture site.",
    href: "https://kucherov.studio/",
    icon: kucherovIcon,
    cover: kucherov,
    year: "2025 — Present",
    role: "Full Stack Engineer",
    status: "Live",
    client: "Kucherov Studio",
    clientId: "kucherov-studio",
    primary: true,
    industry: "Architecture · Visualization",
    location: "United States",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    highlights: [
      "95+ Lighthouse scores across performance, accessibility, and SEO.",
      "Cinematic hero with photographic typography overlays and editorial pacing.",
      "Service taxonomy spanning seven disciplines, from BIM to landscape design.",
    ],
    overview: [
      "Kucherov Studio offers architectural design, interior and landscape work, BIM, 3D modeling, photorealistic visualization, and construction documentation. The site needed to feel as precise as the work itself.",
      "I built the front end end-to-end — translating a bold creative direction into a fluid, responsive interface that holds up at agency-grade scrutiny.",
    ],
    challenge:
      "Architecture studios live or die by first impression. The existing presence didn't match the studio's craft, and visitors weren't converting into estimation requests.",
    approach: [
      "Quiet full-bleed hero with editorial display type that overlays imagery without competing with it.",
      "Service grid that scales from one column on mobile to a balanced multi-column layout on desktop.",
      "Image delivery, font loading, and route-level code splitting tuned for every connection.",
      "Contact and estimation flows wired so leads land in the studio inbox without friction.",
    ],
    outcome: [
      "Consistent 95–98+ Lighthouse scores across performance, accessibility, and SEO.",
      "TTFB reduced by ~60% versus the legacy architecture.",
      "Lead capture and estimation requests flow directly to the studio team.",
      "Foundation ready for case studies as the portfolio grows.",
    ],
    technical: [
      "Next.js App Router with nested layouts and SSR where it earns its keep.",
      "Motion layout animations, scroll-linked orchestrations, and exit transitions.",
      "Zod schema validation across internal API endpoints.",
      "Edge caching and image optimization via Vercel.",
      "Zero-downtime release pipeline with preview deployments.",
    ],
  },
  {
    slug: "eka-balance",
    title: "EKA Balance",
    tagline: "Live pain-free again.",
    description: "I work with EKA Balance on the Barcelona wellness hub.",
    href: "https://ekabalance.com/",
    icon: ekaIcon,
    cover: ekabalance,
    year: "2021 — Present",
    role: "IT Specialist · Business Development · Web",
    status: "Live",
    client: "EKA Balance",
    clientId: "eka-balance",
    primary: true,
    industry: "Wellness · Somatic Therapy",
    location: "Barcelona",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n", "WhatsApp API", "Vercel"],
    highlights: [
      "1500+ sessions delivered, 96% satisfied clients — surfaced as trust signals.",
      "Multi-language support across the full booking journey.",
      "Hub for the wider EKA stack: Agenyz and masaje.barcelona.",
    ],
    overview: [
      "EKA Balance is a Barcelona-based somatic wellness practice offering kinesiology, structural and energetic body work. The main site has to explain a sophisticated method and get the right person to book the right session.",
      "I own the multi-domain web infrastructure for the practice: this primary hub, the Agenyz storefront, and masaje.barcelona — plus booking, localization, and day-to-day IT.",
    ],
    challenge:
      "A practice with a decade of clinical depth needed a clear digital home that ranked locally, converted across languages, and stayed consistent across every property under the EKA umbrella.",
    approach: [
      "Home page that leads with outcome ('Live pain-free again') instead of buzzwords.",
      "Service catalogue with clear hierarchy — popular treatments first, deeper modalities one click away.",
      "WhatsApp in the booking flow so visitors convert in the channel they actually use.",
      "i18n and per-domain SEO so each market sees a native, local-first experience.",
    ],
    outcome: [
      "1500+ sessions booked through the platform; 96% satisfied client rate as social proof.",
      "Organic local search traffic up ~150% in the first three months after relaunch.",
      "WhatsApp booking pipeline roughly tripled appointment conversion.",
      "Consistent top local search presence across Barcelona wellness categories.",
    ],
    technical: [
      "Security headers — HSTS, CSP, X-Frame-Options, X-Content-Type-Options.",
      "Rate-limited contact API and GDPR-compliant cookie/privacy UX.",
      "Image optimization — modern formats, lazy loading, LCP preloading.",
      "Vercel Analytics / Speed Insights for real-user monitoring.",
    ],
    relatedSites: [
      {
        name: "Agenyz",
        url: "https://agenyz.es",
        description: "Supplement storefront with guided discovery.",
      },
      {
        name: "masaje.barcelona",
        url: "https://masaje.barcelona",
        description: "Local massage page with one booking path.",
      },
    ],
  },
  {
    slug: "agenyz",
    title: "Agenyz",
    tagline: "Cellular nutrition. For every body.",
    description: "I work with EKA Balance on the Agenyz storefront.",
    href: "https://agenyz.es/",
    icon: agenyzIcon,
    cover: agenyz,
    year: "2024 — Present",
    role: "Engineer · Product",
    status: "Live (beta)",
    client: "EKA Balance",
    clientId: "eka-balance",
    industry: "E-commerce · Health",
    location: "Spain · EU",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "Image CDN"],
    highlights: [
      "30+ premium formulas organized by goal: immunity, energy, mind, beauty, joints.",
      "Guided analyzer that maps needs to a personalized stack.",
      "Built under the EKA Balance web infrastructure.",
    ],
    overview: [
      "Agenyz is EKA Balance's specialist-grade supplement storefront — European-sourced, high-bioavailability ingredients with a catalogue that can overwhelm first-time visitors.",
      "I built the storefront, goal-based browsing, and a guided Smart Search that turns vague intent into a tailored recommendation — same client stack as ekabalance.com and masaje.barcelona.",
    ],
    challenge:
      "A 30+ SKU specialist catalogue is overwhelming. Generic e-commerce navigation buries the right product behind too many choices.",
    approach: [
      "Goal-first navigation: visitors pick what they want to feel, not a molecule name.",
      "Guided analyzer with a few targeted questions and a concrete formula recommendation.",
      "Premium product pages that surface evidence without clutter.",
      "Fast, image-optimized catalog with Spanish-first localization.",
    ],
    outcome: [
      "Storefront that turns a complex catalogue into a guided purchase.",
      "Smart Search live in beta, validating personalization-first discovery.",
      "Ready to scale across more markets and product lines under EKA.",
    ],
  },
  {
    slug: "masaje-barcelona",
    title: "masaje.barcelona",
    tagline: "Professional Massage. 100% tailored to you.",
    description: "I work with EKA Balance on the Barcelona massage page.",
    href: "https://masaje.barcelona/",
    icon: masajeIcon,
    cover: masaje,
    year: "2024",
    role: "Engineer · SEO",
    status: "Live",
    client: "EKA Balance",
    clientId: "eka-balance",
    industry: "Local Wellness",
    location: "Barcelona · Pelai 12",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Local SEO", "Schema.org"],
    highlights: [
      "Top local search ranking in a saturated Barcelona category.",
      "Single focused CTA — every section drives toward Book Now.",
      "Part of the EKA Balance multi-domain presence.",
    ],
    overview: [
      "masaje.barcelona is EKA Balance's booking site for professional massage at Pelai 12, near Plaza Universidad. Narrow brief: rank locally, look premium, convert into bookings.",
      "I built a single-CTA micro-site optimised for local SEO — rich service copy, on-page schema, and a hero that loads instantly on mobile — alongside the main EKA hub and Agenyz.",
    ],
    challenge:
      "Local massage in Barcelona is a competitive search category. The site had to rank fast, build trust, and remove every step between landing and booking.",
    approach: [
      "Semantic, locally optimised copy and alt text for the real catchment area.",
      "Schema.org for LocalBusiness, Service, and Review.",
      "One unambiguous CTA — Book Now — with WhatsApp as a low-friction fallback.",
      "Hero and image performance pushed hard: no layout shift, instant LCP on mobile.",
    ],
    outcome: [
      "Top local rankings in the Barcelona massage category.",
      "5.0-star public rating as primary social proof.",
      "Bookings flow directly through the page with no detours.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const workHref = (slug: string) => `/#${slug}`;

export const getProjectsByClient = (clientId: ClientGroup["id"]) =>
  projects.filter((p) => p.clientId === clientId);

export const getSiblingProjects = (slug: string) => {
  const project = getProject(slug);
  if (!project) return [];
  return projects.filter((p) => p.clientId === project.clientId && p.slug !== slug);
};

export const getClientGroup = (clientId: ClientGroup["id"]) =>
  clientGroups.find((g) => g.id === clientId);
