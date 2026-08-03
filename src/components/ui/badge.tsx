import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary",
        secondary:
          "border-transparent bg-secondary/10 text-secondary",
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        outline:
          "border-border text-foreground",
        muted:
          "border-transparent bg-muted text-muted-foreground",
        language:
          "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors",
        code:
          "border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary/10 transition-colors",
        skill:
          "border-border bg-card text-foreground hover:bg-muted transition-colors",
        tag:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer transition-all",
        "tag-active":
          "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 cursor-pointer transition-all",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
