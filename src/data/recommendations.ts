export const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    note: "The clearest mental model I've found for compounding small actions.",
    href: "https://jamesclear.com/atomic-habits",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    note: "Required reading if you build things for a living.",
    href: "https://www.calnewport.com/books/deep-work/",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    note: "Foundational. You'll never look at a door handle the same way.",
    href: "https://jnd.org/the-design-of-everyday-things-revised-and-expanded-edition/",
  },
  {
    title: "Shape Up",
    author: "Ryan Singer",
    note: "A saner way to scope, build and ship product work.",
    href: "https://basecamp.com/shapeup",
  },
] as const;

export const tools = [
  { name: "VS Code + Cursor", note: "Daily editor — fast, extensible, AI-native." },
  { name: "Figma", note: "Where every interface starts." },
  { name: "Linear", note: "Product management without the drag." },
  { name: "Raycast", note: "Spotlight, but actually useful." },
  { name: "Vercel", note: "Deploys that just work." },
  { name: "Arc", note: "A browser that finally feels designed." },
  { name: "Mobbin", note: "The reference library for real product UI patterns." },
] as const;

export const writers = [
  { name: "Paul Graham — Essays", href: "https://paulgraham.com/articles.html" },
  { name: "Josh Comeau", href: "https://www.joshwcomeau.com/" },
  { name: "Rauno Freiberg", href: "https://rauno.me/" },
  { name: "Jakub Krehel", href: "https://jakub.kr/" },
  { name: "Emil Kowalski", href: "https://emilkowal.ski/" },
  { name: "Animations.dev — Emil Kowalski", href: "https://animations.dev/" },
  { name: "Growth.Design — UX case studies", href: "https://growth.design/case-studies" },
] as const;

export const places = [
  {
    name: "Disseny Hub Barcelona (DHUB)",
    location: "Plaça de les Glòries Catalanes, Barcelona",
    href: "https://ajuntament.barcelona.cat/dhub/en",
    note: "A short, sharp visit for designers, PMs and curious minds — Catalan and Barcelona design told from a different angle. Home to the city's design, decorative arts and graphic design collections.",
  },
] as const;
