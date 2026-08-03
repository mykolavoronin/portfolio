import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Decorative only when paired with visible text elsewhere */
  title?: string;
};

/** Monoline M mark — matches favicon, theme-aware via currentColor */
export function Logo({ className, title = "Mykola Voronin" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-7 shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="13"
        className="fill-background stroke-border"
        strokeWidth="1.4"
      />
      <path
        d="M10.5 28V12.8C10.5 12.55 10.82 12.46 10.95 12.67L19.95 26.35C20.05 26.5 20.27 26.5 20.37 26.35L29.05 12.69C29.19 12.47 29.52 12.57 29.52 12.83V28"
        className="stroke-foreground"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="34.5"
        cy="34.5"
        r="5.5"
        className="fill-amber-500 stroke-background"
        strokeWidth="2"
      />
    </svg>
  );
}
