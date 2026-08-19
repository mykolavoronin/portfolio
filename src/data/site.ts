/** Single source of truth for identity, links, and availability. */

import belt from "@/assets/details/belt.webp";
import book from "@/assets/details/book.webp";
import colour from "@/assets/details/colour.webp";
import stance from "@/assets/details/stance.webp";
import tech from "@/assets/details/tech.webp";

export const site = {
  name: "Mykola Voronin",
  role: "Student",
  location: "Barcelona, Spain",
  born: "2008-10-13",
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
  tagline: "Student in Barcelona · Building calm, high-performance web systems.",
  shortBio: "Student in Barcelona.",
  seoDescription: "Mykola Voronin — student in Barcelona. Engineering calm, high-performance web systems.",
} as const;

export const principles = [
  "Simple beats clever.",
  "Performance is a feature.",
  "If it isn't accessible, it isn't finished.",
  "Ship small. Ship often.",
  "Security is craft.",
] as const;

export const aboutParagraphs = [
  "Student in Barcelona. I work with Kucherov Studio and EKA Balance — the studio site, the wellness hub, and the smaller properties around them.",
  "I like understanding how things are put together: phones, software, the quiet craft in a well-made object.",
] as const;

export const hobbies = [
  {
    title: "Reading",
    detail: "Books and long essays over feeds. Design, how systems work, and anything that stays with you.",
    image: book,
  },
  {
    title: "Technology",
    detail:
      "Phones, Apple hardware, and the tools I use every day. I like objects that feel finished, and yes, I love Liquid Glass.",
    image: tech,
    owned: "I own an iPhone 17 Pro",
    swatch: { tone: "navy", label: "Navy blue" },
  },
  {
    title: "Taekwondo",
    detail: "Still training. A good way to stay disciplined outside the desk.",
    image: stance,
    badge: { src: belt, label: "Orange belt" },
  },
  {
    title: "Colour",
    detail:
      "Yellow's my favourite, but marine blue is what I actually wear — phone, clothes, nearly all of it. Look for the guy in navy.",
    image: colour,
  },
] as const;
