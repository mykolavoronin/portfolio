import type { Transition, Variants } from "motion/react";

/** Strong ease-out (animations.dev) */
export const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** UI state swaps — snappy, no bounce */
export const springUi: Transition = {
  type: "spring",
  duration: 0.35,
  bounce: 0,
};

/** Soft entrances */
export const springSoft: Transition = {
  type: "spring",
  duration: 0.45,
  bounce: 0,
};

export const tweenOut: Transition = {
  duration: 0.4,
  ease: easeOutExpo,
};

export const tweenFast: Transition = {
  duration: 0.28,
  ease: easeOutExpo,
};

/** Subtle rise — short travel so mobile stays snappy */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};

/** Badge / chip stagger — very tight */
export const staggerChips: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

export const chipItem: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springUi,
  },
};

export const SESSION_INTRO_KEY = "portfolio-intro-seen";

export function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SESSION_INTRO_KEY) === "1";
  } catch {
    return true;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(SESSION_INTRO_KEY, "1");
  } catch {
    /* ignore */
  }
}
