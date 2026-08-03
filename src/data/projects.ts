import { Sparkles, Leaf, Search, MapPin, type LucideIcon } from "lucide-react";
import kucherov from "@/assets/projects/kucherov.png";
import ekabalance from "@/assets/projects/ekabalance.png";
import agenyz from "@/assets/projects/agenyz.png";
import masaje from "@/assets/projects/masaje.png";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  cover: string;
  year: string;
  role: string;
  status: string;
  client: string;
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
};

export const projects: Project[] = [
  {
    slug: "kucherov-studio",
    title: "Kucherov Studio",
    tagline: "Precision architecture. Immersive visualization.",
    description: "Full-stack development for an architecture & visualization studio.",
    href: "https://kucherov.studio/",
    icon: Sparkles,
    cover: kucherov,
    year: "2025 — Present",
    role: "Full Stack Engineer",
    status: "Live",
    client: "Kucherov Studio",
    industry: "Architecture · Visualization",
    location: "United States",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    highlights: [
      "95+ Lighthouse scores across performance, accessibility, and SEO.",
      "Cinematic hero with photographic typography overlays and editorial pacing.",
      "Service taxonomy spanning seven disciplines, from BIM to landscape design.",
    ],
    overview: [
      "Kucherov Studio offers architectural design, interior and landscape work, BIM, 3D modeling, photorealistic visualization and full construction documentation. The site needed to feel as precise and considered as the work itself.",
      "I built the front end end-to-end — translating a bold creative direction into a fluid, responsive interface that holds up at agency-grade scrutiny.",
    ],
    challenge:
      "Architecture studios live or die by first impression. The existing presence didn't match the studio's level of craft, and visitors weren't converting into estimation requests.",
    approach: [
      "Designed a quiet, full-bleed hero anchored by editorial display typography that overlays imagery without competing with it.",
      "Built a service grid that scales gracefully from a single column on mobile to a balanced multi-column layout on desktop.",
      "Tuned image delivery, font loading and route-level code splitting to keep the site fast on every connection.",
      "Wired the contact and estimation flows through to email so leads land in the studio's inbox without friction.",
    ],
    outcome: [
      "Consistent 95–98+ Lighthouse scores across performance, accessibility, and SEO.",
      "TTFB reduced by ~60% versus the legacy architecture.",
      "Lead capture and estimation requests flow directly to the studio team.",
      "Foundation in place to keep adding case studies as the portfolio grows.",
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
    description: "Multi-domain web infrastructure for a somatic wellness practice.",
    href: "https://ekabalance.com/",
    icon: Leaf,
    cover: ekabalance,
    year: "2021 — Present",
    role: "IT Specialist · Business Development",
    status: "Live",
    client: "EKA Balance Method",
    industry: "Wellness · Somatic Therapy",
    location: "Barcelona",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n", "WhatsApp API", "Vercel"],
    highlights: [
      "1500+ sessions delivered, 96% satisfied clients — surfaced as trust signals on the home page.",
      "Multi-language support across the full booking journey.",
      "Top local SEO presence across multiple domains and service categories.",
    ],
    overview: [
      "EKA Balance is a Barcelona-based somatic wellness practice offering kinesiology, structural and energetic body work. The site has to do two things at once: explain a sophisticated method, and get the right person to book the right session.",
      "I architected the multi-domain web infrastructure, the booking flow with WhatsApp integration, the localization layer, and the network and IT operations behind the scenes.",
    ],
    challenge:
      "A practice with a decade of clinical depth needed an online presence that explained nuanced services clearly, ranked locally in a competitive market, and made booking effortless across languages.",
    approach: [
      "Designed a clean, generous home page that leads with outcome ('Live pain-free again') instead of buzzwords.",
      "Built a service catalogue with clear hierarchy — most popular treatments first, deeper modalities one click away.",
      "Integrated WhatsApp into the booking flow so visitors can convert in the channel they actually use.",
      "Implemented a full i18n layer and per-domain SEO so each market sees a native, local-first experience.",
    ],
    outcome: [
      "1500+ sessions booked through the platform; 96% satisfied client rate as social proof.",
      "Organic local search traffic up ~150% in the first three months after relaunch.",
      "WhatsApp booking pipeline roughly tripled appointment conversion.",
      "Consistent top local search presence across Barcelona wellness categories.",
      "Lighthouse performance pushed toward 100/100 on core landing pages.",
    ],
    technical: [
      "Security headers — HSTS, CSP, X-Frame-Options, X-Content-Type-Options.",
      "Rate-limited contact API and GDPR-compliant cookie/privacy UX.",
      "Motion page transitions and scroll-driven animations; Lenis smooth scroll where appropriate.",
      "Image optimization — modern formats, lazy loading, LCP preloading.",
      "Vercel Analytics / Speed Insights for real-user monitoring.",
    ],
    relatedSites: [
      {
        name: "EKA Balance",
        url: "https://ekabalance.com",
        description: "Primary hub — service catalog, booking, case studies, multi-language.",
      },
      {
        name: "Agenyz",
        url: "https://agenyz.es",
        description: "Specialist supplement storefront with AI-assisted product discovery.",
      },
      {
        name: "masaje.barcelona",
        url: "https://masaje.barcelona",
        description: "Single-CTA micro-site for local massage intent traffic.",
      },
    ],
  },
  {
    slug: "agenyz",
    title: "Agenyz",
    tagline: "Cellular nutrition. For every body.",
    description: "Premium supplement e-commerce with AI-driven personalization.",
    href: "https://agenyz.es/",
    icon: Search,
    cover: agenyz,
    year: "2024 — Present",
    role: "Engineer · Product",
    status: "Live (beta)",
    client: "EKA Balance",
    industry: "E-commerce · Health",
    location: "Spain · EU",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI / LLM", "Stripe", "Image CDN"],
    highlights: [
      "30+ premium supplement formulas organized by goal: immunity, energy, mind, beauty, joints.",
      "AI-powered analyzer that cross-references user signals to suggest a personalized stack.",
      "98% bioavailability messaging supported by a clean, evidence-led product page system.",
    ],
    overview: [
      "Agenyz sells specialist-grade supplements with European-sourced, high-bioavailability ingredients. The product catalogue is large and technical — visitors need help finding the right fit fast.",
      "I built the storefront, the goal-based browsing system, and the AI-assisted 'Smart Search' that converts vague intent ('more energy', 'better sleep') into a concrete, tailored recommendation.",
    ],
    challenge:
      "A 30+ SKU specialist supplement catalogue is overwhelming for first-time visitors. Generic e-commerce navigation buries the right product behind too many choices.",
    approach: [
      "Designed a goal-first navigation: visitors pick what they want to feel, not what molecule they want to take.",
      "Built an AI analyzer that asks a few targeted questions and returns a personalized formula recommendation.",
      "Created a clean, premium product page system that surfaces evidence (98% bioavailability, sourcing) without clutter.",
      "Implemented a fast, image-optimized catalog with a persistent cart and Spanish-first localization.",
    ],
    outcome: [
      "A storefront that turns a complex catalogue into a guided, confident purchase.",
      "AI Smart Search live in beta, validating the personalization-first approach.",
      "Foundation in place to scale to more markets and product lines.",
    ],
    acknowledgements: [
      {
        label: "Mi Sans Latin",
        body: "Typography by the Mi Brand Type team at Xiaomi. Mi Sans Latin is a typeface I genuinely love and reach for across many of my projects — generous, modern, and quietly precise.",
        href: "https://hyperos.mi.com/font/",
      },
    ],
  },
  {
    slug: "masaje-barcelona",
    title: "masaje.barcelona",
    tagline: "Professional Massage. 100% tailored to you.",
    description: "Single-CTA micro-site ranking top for local massage in Barcelona.",
    href: "https://masaje.barcelona/",
    icon: MapPin,
    cover: masaje,
    year: "2024",
    role: "Engineer · SEO",
    status: "Live",
    client: "EKA Balance",
    industry: "Local Wellness",
    location: "Barcelona · Pelai 12",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Local SEO", "Schema.org"],
    highlights: [
      "Top local search ranking in a saturated Barcelona category.",
      "Single, focused CTA — every section drives toward Book Now.",
      "5.0 star rating surfaced as the very first trust signal under the hero.",
    ],
    overview: [
      "masaje.barcelona is the booking site for a professional massage studio at Pelai 12, near Plaza Universidad. The brief was deliberately narrow: rank locally, look premium, convert visitors into bookings.",
      "I built a single-CTA micro-site optimised end-to-end for local SEO, with rich service descriptions, on-page schema and a hero that loads instantly on mobile.",
    ],
    challenge:
      "Local massage in Barcelona is a brutally competitive search category. The site had to rank fast, build instant trust, and remove every step between landing and booking.",
    approach: [
      "Wrote semantic, locally-optimised copy and image alt text targeting the studio's actual catchment area.",
      "Implemented Schema.org markup for LocalBusiness, Service and Review so search engines can read the site clearly.",
      "Designed a single, unambiguous CTA repeated through the page — Book Now — with WhatsApp as a low-friction fallback.",
      "Pushed hero and image performance hard: warm tones, sharp edges, no layout shift.",
    ],
    outcome: [
      "Top local rankings in the Barcelona massage category.",
      "5.0-star public rating surfaced as primary social proof.",
      "Bookings flow directly through the page with no detours.",
    ],
    acknowledgements: [
      {
        label: "Mi Sans Latin",
        body: "Typography by the Mi Brand Type team at Xiaomi. Mi Sans Latin is a typeface I genuinely love and reach for across many of my projects — generous, modern, and quietly precise.",
        href: "https://hyperos.mi.com/font/",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
