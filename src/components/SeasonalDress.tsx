import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useVisitorGeo } from "@/hooks/useVisitorGeo";
import { occasionFromSearch, showOccasions, type DressKind } from "@/lib/occasion";
import partyHatSrc from "@/assets/dress/party-hat.webp";
import bunnySrc from "@/assets/dress/bunny.webp";
import crownSrc from "@/assets/dress/crown.webp";
import roseSrc from "@/assets/dress/rose.webp";
import starSrc from "@/assets/dress/star.webp";
import sparkSrc from "@/assets/dress/spark.webp";
import sunSrc from "@/assets/dress/sun.webp";
import heartSrc from "@/assets/dress/heart.webp";
import senyeraSrc from "@/assets/dress/senyera.webp";
import cockadeSrc from "@/assets/dress/cockade.webp";
import chestnutSrc from "@/assets/dress/chestnut.webp";
import candleSrc from "@/assets/dress/candle.webp";
import cavaSrc from "@/assets/dress/cava.webp";
import ribbonSrc from "@/assets/dress/ribbon.webp";

function DressCutout({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" draggable={false} className={cn("season-dress-cutout", className)} />;
}

const Dress = {
  "party-hat": (p: { className?: string }) => <DressCutout src={partyHatSrc} {...p} />,
  bunny: (p: { className?: string }) => <DressCutout src={bunnySrc} {...p} />,
  crown: (p: { className?: string }) => <DressCutout src={crownSrc} {...p} />,
  rose: (p: { className?: string }) => <DressCutout src={roseSrc} {...p} />,
  star: (p: { className?: string }) => <DressCutout src={starSrc} {...p} />,
  spark: (p: { className?: string }) => <DressCutout src={sparkSrc} {...p} />,
  sun: (p: { className?: string }) => <DressCutout src={sunSrc} {...p} />,
  heart: (p: { className?: string }) => <DressCutout src={heartSrc} {...p} />,
  senyera: (p: { className?: string }) => <DressCutout src={senyeraSrc} {...p} />,
  cockade: (p: { className?: string }) => <DressCutout src={cockadeSrc} {...p} />,
  chestnut: (p: { className?: string }) => <DressCutout src={chestnutSrc} {...p} />,
  candle: (p: { className?: string }) => <DressCutout src={candleSrc} {...p} />,
  cava: (p: { className?: string }) => <DressCutout src={cavaSrc} {...p} />,
  ribbon: (p: { className?: string }) => <DressCutout src={ribbonSrc} {...p} />,
} satisfies Record<DressKind, typeof DressCutout>;

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
