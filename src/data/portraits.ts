import type { DressKind } from "@/lib/occasion";

import defaultPortrait from "@/assets/portraits/default.webp";

/** Photographic cut-out. Seasonal marks sit on top as painted dress. */
export const portraits = {
  default: defaultPortrait,
} as const;

export type PortraitId = keyof typeof portraits;

export function portraitFor(_dress?: DressKind | null): string {
  return portraits.default;
}

/** Public OG stills. */
export const ogImages = {
  light: "/og-image-light.png",
  dark: "/og-image-dark.png",
  cardLight: "/og-card-light.png",
  cardDark: "/og-card-dark.png",
  square: "/og-square.png",
  occasion: (_dress: DressKind) => "/og-image-light.png",
} as const;
