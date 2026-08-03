import type { Transition, Variants } from "motion/react";

/** Strong ease-out — responsive entrances (animations.dev) */
export const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

export const springUi: Transition = {
  type: "spring",
  duration: 0.35,
  bounce: 0,
};

export const tweenOut: Transition = {
  duration: 0.45,
  ease: easeOutExpo,
};

export const tweenFast: Transition = {
  duration: 0.28,
  ease: easeOutExpo,
};

/** Subtle rise — short travel so mobile feels snappy */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenOut,
  },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.03,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenOut,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.02,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0,
    },
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
