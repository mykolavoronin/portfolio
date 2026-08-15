import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] sm:text-xs font-medium tracking-tight transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background",
        secondary: "border-border/70 bg-card text-foreground shadow-sm",
        outline: "border-border/70 bg-transparent text-muted-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        soft: "border-border/50 bg-card/80 text-foreground/85 shadow-sm",
        success:
          "border-[hsl(var(--status-success)/0.22)] bg-[hsl(var(--status-success)/0.12)] text-[hsl(var(--status-success-fg))]",
        warn: "border-[hsl(var(--status-warn)/0.22)] bg-[hsl(var(--status-warn)/0.12)] text-[hsl(var(--status-warn-fg))]",
        info: "border-[hsl(var(--status-info)/0.22)] bg-[hsl(var(--status-info)/0.12)] text-[hsl(var(--status-info-fg))]",
      },
    },
    defaultVariants: {
      variant: "soft",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
