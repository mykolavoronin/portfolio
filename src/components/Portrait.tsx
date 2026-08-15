import { cn } from "@/lib/utils";
import { SeasonalDress, useOccasion } from "@/components/SeasonalDress";

export function Portrait({
  src,
  alt,
  size = "md",
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  imgClassName?: string;
}) {
  const occasion = useOccasion();
  const dims = size === "lg" ? 104 : size === "md" ? 80 : 56;

  return (
    <span className={cn("portrait", `portrait-${size}`, className)}>
      <img
        src={src}
        alt={alt}
        width={dims}
        height={dims}
        className={cn("portrait-img media-frame", imgClassName)}
      />
      {occasion ? <SeasonalDress kind={occasion.dress} size={size} /> : null}
    </span>
  );
}
