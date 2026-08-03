export type Certification = {
  title: string;
  issuer: string;
  period: string;
  status?: string;
  credentialId?: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    title: "Animations on the Web",
    issuer: "animations.dev · Emil Kowalski",
    period: "2026",
    status: "Issued",
    credentialId: "2139bcb6-d432-4cd0-ad20-7ac447ad1def",
    href: "https://animations.dev/certificate/2139bcb6-d432-4cd0-ad20-7ac447ad1def",
  },
  {
    title: "Full Stack Developer Program",
    issuer: "Scrimba",
    period: "Feb 2025 — Feb 2026",
    status: "In progress",
    href: "https://scrimba.com/",
  },
];
