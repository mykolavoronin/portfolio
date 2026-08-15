import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useVisitorGeo } from "@/hooks/useVisitorGeo";
import { occasionFromSearch, showOccasions, type DressKind } from "@/lib/occasion";

function PartyHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 58" className={className} aria-hidden>
      <path d="M32 6.5 56 49.5H8Z" fill="#b83232" />
      <path d="M32 6.5 38 49.5H26Z" fill="#fff" opacity="0.12" />
      <path d="M10 46h44" stroke="#e8c56b" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="32" cy="7" r="4.4" fill="#e8c56b" />
    </svg>
  );
}

function BunnyEars({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 50" className={className} aria-hidden>
      <ellipse cx="23" cy="23" rx="8" ry="21" fill="#f3eee7" transform="rotate(-14 23 23)" />
      <ellipse cx="23" cy="25" rx="3.4" ry="13" fill="#efc4c8" transform="rotate(-14 23 25)" />
      <ellipse cx="49" cy="23" rx="8" ry="21" fill="#f3eee7" transform="rotate(14 49 23)" />
      <ellipse cx="49" cy="25" rx="3.4" ry="13" fill="#efc4c8" transform="rotate(14 49 25)" />
    </svg>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 34" className={className} aria-hidden>
      <path d="M8 27 15 11l13 10L36 7l8 14 13-10 7 16Z" fill="#e2bc4e" />
      <rect x="8" y="25" width="56" height="5" rx="1.2" fill="#c9a43a" />
    </svg>
  );
}

function Rose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 34" className={className} aria-hidden>
      <rect x="18" y="18" width="14" height="12" rx="1.4" fill="#f4efe6" stroke="#1f1b16" strokeWidth="0.8" />
      <path d="M20 21h10M20 24h8" stroke="#1f1b16" strokeWidth="0.8" opacity="0.35" />
      <path d="M12 26v5" stroke="#3d6a3a" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="14" r="7" fill="#b4232a" />
      <circle cx="12" cy="14" r="3.4" fill="#d24a4a" />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 3.2 18.6 12h9l-7.3 5.3 2.8 8.7L16 20.8l-7.1 5.2 2.8-8.7L4.4 12h9Z" fill="#e2bc4e" />
    </svg>
  );
}

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 4v8M16 20v8M4 16h8M20 16h8" stroke="#e2bc4e" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.2" fill="#b83232" />
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="6" fill="#e2bc4e" />
      <path d="M16 3.5v4M16 24.5v4M3.5 16h4M24.5 16h4M7.2 7.2l2.8 2.8M22 22l2.8 2.8M7.2 24.8 10 22M22 10l2.8-2.8" stroke="#e2bc4e" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 26" className={className} aria-hidden>
      <path d="M14 23S3 15.4 3 9.2C3 5.8 5.6 3.5 8.7 3.5c1.9 0 3.6 1 4.3 2.5.7-1.5 2.4-2.5 4.3-2.5 3.1 0 5.7 2.3 5.7 5.7C23 15.4 14 23 14 23Z" fill="#b4232a" />
    </svg>
  );
}

function Senyera({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 22" className={className} aria-hidden>
      <rect width="32" height="22" rx="2" fill="#f5d000" />
      <rect y="4.4" width="32" height="3.3" fill="#da121a" />
      <rect y="11" width="32" height="3.3" fill="#da121a" />
      <rect y="17.6" width="32" height="3.3" fill="#da121a" />
    </svg>
  );
}

function Cockade({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <circle cx="14" cy="14" r="12" fill="#0055a4" />
      <circle cx="14" cy="14" r="8" fill="#f5f5f5" />
      <circle cx="14" cy="14" r="4" fill="#ef4135" />
    </svg>
  );
}

const Dress = {
  "party-hat": PartyHat,
  bunny: BunnyEars,
  crown: Crown,
  rose: Rose,
  star: Star,
  spark: Spark,
  sun: Sun,
  heart: Heart,
  senyera: Senyera,
  cockade: Cockade,
} satisfies Record<DressKind, typeof PartyHat>;

export function SeasonalDress({
  kind,
  size = "md",
  className,
}: {
  kind: DressKind;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const Graphic = Dress[kind];

  return (
    <button
      type="button"
      className={cn("season-dress", `season-dress-${kind}`, `season-dress-${size}`, className)}
      aria-label="Seasonal detail"
      onClick={() => {
        if (reduce) return;
        setBurst((n) => n + 1);
      }}
    >
      <motion.span
        className="season-dress-graphic"
        whileHover={reduce ? undefined : { rotate: -7, scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96, rotate: 9 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Graphic />
      </motion.span>
      {burst > 0 ? (
        <span key={burst} className="season-burst" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      ) : null}
    </button>
  );
}

export function OccasionNote({ className }: { className?: string }) {
  const occasion = useOccasion();
  if (!occasion) return null;
  return <p className={cn("occasion-note", className)}>{occasion.label}</p>;
}

export function useOccasion() {
  const [params] = useSearchParams();
  const geo = useVisitorGeo();
  if (!showOccasions) return null;
  return occasionFromSearch(params.toString(), new Date(), geo);
}

/** Keep the preview tag when moving around the site. */
export function withOccasion(to: string, occasionId: string | null | undefined): string {
  if (!showOccasions || !occasionId) return to;
  const [path, hash = ""] = to.split("#");
  const url = new URL(path || "/", "https://preview.local");
  url.searchParams.set("occasion", occasionId);
  return `${url.pathname}${url.search}${hash ? `#${hash}` : ""}`;
}
