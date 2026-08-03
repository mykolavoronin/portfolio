import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { haptic, type HapticKind } from "@/lib/haptics";

const buttonVariants = cva(
  "pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground pressable-soft",
        link:
          "text-secondary underline-offset-4 hover:underline !transform-none",
        hero:
          "bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 pressable-firm",
        "hero-outline":
          "border-2 border-foreground/20 bg-transparent text-foreground font-semibold hover:bg-foreground/5 hover:border-foreground/30",
        accent:
          "bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-secondary/90 pressable-firm",
      },
      size: {
        default: "h-10 min-h-10 px-5 py-2",
        sm: "h-9 min-h-9 px-4 text-xs",
        lg: "h-12 min-h-12 px-8 text-base",
        xl: "h-14 min-h-14 px-10 text-lg",
        icon: "h-10 w-10 min-h-10 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Device vibration on touch. `false` disables. Default light. */
  haptic?: HapticKind | false;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      haptic: hapticKind = "light",
      onPointerDown,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
          if (
            hapticKind !== false &&
            e.button === 0 &&
            e.pointerType !== "mouse" &&
            variant !== "link"
          ) {
            haptic(hapticKind);
          }
          onPointerDown?.(e);
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
