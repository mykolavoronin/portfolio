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
    label: "Not taking new projects",
    detail:
      "Currently focused on school and existing client work — still happy to chat about future collaborations.",
  },
  tagline:
    "I design and build clean, high-performance web applications. I care deeply about craft, performance, and the small details that quietly make a product feel right.",
  shortBio:
    "Software engineer in Barcelona building clean, fast web products with React, Next.js and TypeScript.",
  seoDescription:
    "Mykola Voronin is a software engineer in Barcelona building clean, fast web products with React, Next.js and TypeScript.",
} as const;

export const nowItems = [
  "Pursuing the Scrimba Full Stack Developer Program while shipping real products.",
  "Building and maintaining web infrastructure at Kucherov Studio and EKA Balance.",
  "Exploring AI tooling — integrating LLMs into practical developer workflows.",
  "Finishing the High School Diploma (Batxillerat) at Mriya Barcelona School.",
] as const;

export const principles = [
  "Simple beats clever — almost always.",
  "Performance is a feature, not a polish step.",
  "If it isn't accessible, it isn't finished.",
  "Ship small. Ship often. Listen.",
] as const;

export const aboutParagraphs = [
  "I'm Mykola — a software engineer based in Barcelona. I build calm, fast, considered web products and I care more about the details than I probably should.",
  "I started writing code as a teenager, taught myself by shipping small things, and slowly turned a curiosity into a craft. Today I split my time between school, client work at Kucherov Studio, and the web infrastructure at EKA Balance.",
  "My favourite work sits at the intersection of design, performance and clarity — tools that feel obvious in hindsight, even when the engineering underneath isn't.",
  "Off the screen you'll find me reading, walking the city, and hunting for the next quiet coffee shop with good wifi.",
] as const;
