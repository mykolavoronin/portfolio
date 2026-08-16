import { cn } from "@/lib/utils";
import { portraits } from "@/data/portraits";
import { SeasonalDress, useOccasion } from "@/components/SeasonalDress";

export function Portrait({
  src,
  alt,
  size = "md",
  className,
  imgClassName,
}: {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  imgClassName?: string;
}) {
  const occasion = useOccasion();
  const resolved = src ?? portraits.default;
  const dims = size === "lg" ? 104 : size === "md" ? 80 : 56;

  return (
    <span className={cn("portrait", `portrait-${size}`, className)}>
      <span className="portrait-well" aria-hidden />
      <img
        src={resolved}
        alt={alt}
        width={dims}
        height={dims}
        fetchPriority={size === "sm" ? "auto" : "high"}
        decoding="async"
        className={cn("portrait-img", imgClassName)}
      />
      {occasion ? <SeasonalDress kind={occasion.dress} size={size} /> : null}
    </span>
  );
}
