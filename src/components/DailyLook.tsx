import { useEffect, useId, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOccasion } from "@/components/SeasonalDress";
import { lookFromSearch, showLooks, type DailyLook } from "@/lib/looks";

const lookLoaders = import.meta.glob("../assets/looks/*.webp", {
  import: "default",
}) as Record<string, () => Promise<string>>;

function useLookSrc(id: string) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = lookLoaders[`../assets/looks/${id}.webp`];
    if (!load) {
      setSrc(null);
      return;
    }
    load().then((url) => {
      if (alive) setSrc(url);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  return src;
}

export function DailyLook({
  look,
  size = "md",
  className,
}: {
  look: DailyLook;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const [said, setSaid] = useState(false);
  const liveId = useId();
  const src = useLookSrc(look.id);
  if (!src) return null;

  return (
    <button
      type="button"
      className={cn(
        "season-dress daily-look",
        `daily-look-${look.motion}`,
        `season-dress-${size}`,
        className,
      )}
      aria-label={look.label}
      aria-describedby={look.note && said ? liveId : undefined}
      onClick={() => {
        if (look.note) setSaid(true);
        if (reduce) return;
        setBurst((n) => n + 1);
      }}
    >
      <motion.span
        className="season-dress-graphic daily-look-graphic"
        whileTap={reduce ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <img src={src} alt="" draggable={false} className="season-dress-cutout" />
      </motion.span>
      {burst > 0 ? (
        <span key={burst} className="season-burst" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      ) : null}
      {look.note && said ? (
        <span id={liveId} className="sr-only" role="status">
          {look.note}
        </span>
      ) : null}
    </button>
  );
}

/** Festivity wins. Looks stay off until `showLooks` is flipped. */
export function useDailyLook() {
  const [params] = useSearchParams();
  const occasion = useOccasion();
  if (!showLooks || occasion) return null;
  return lookFromSearch(params.toString(), new Date());
}

export function DailyLookNote({ className }: { className?: string }) {
  const look = useDailyLook();
  if (!look) return null;
  return <p className={cn("occasion-note", className)}>{look.label}</p>;
}
