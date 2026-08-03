import { type ComponentType, type SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

interface BrandLinkProps {
  href: string;
  label: string;
  icon: IconType;
  external?: boolean;
}

/**
 * Inline link with a small rounded "favicon" tile next to the label —
 * the signature jakub.kr touch for brand / external mentions in prose.
 */
export function BrandLink({ href, label, icon: Icon, external = true }: BrandLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-1.5 align-baseline text-foreground underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground transition-[text-decoration-color,color] duration-150 break-words"
    >
      <span
        className="relative -mb-0.5 inline-flex h-[1.15em] w-[1.15em] items-center justify-center rounded-[5px] border border-border/60 bg-card shadow-sm transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:scale-105"
        aria-hidden
      >
        <Icon className="h-[0.8em] w-[0.8em] text-foreground/85" strokeWidth={2.1} />
      </span>
      <span>{label}</span>
    </a>
  );
}