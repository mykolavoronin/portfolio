export type HapticKind = "light" | "medium" | "selection" | "success";

const PATTERNS: Record<HapticKind, number | number[]> = {
  light: 8,
  medium: 14,
  selection: 6,
  success: [10, 40, 12],
};

function canVibrate() {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Subtle vibration feedback on supporting mobile browsers.
 * No-ops on desktop / reduced-motion / unsupported APIs.
 */
export function haptic(kind: HapticKind = "light") {
  if (!canVibrate() || prefersReducedMotion()) return;
  try {
    navigator.vibrate(PATTERNS[kind]);
  } catch {
    // ignore
  }
}
