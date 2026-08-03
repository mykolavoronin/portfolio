import {
  forwardRef,
  type ButtonHTMLAttributes,
  type PointerEvent,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { usePressFeedback } from "@/hooks/usePressFeedback";
import type { HapticKind } from "@/lib/haptics";

type PressableProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  haptic?: HapticKind | false;
  /** Visual scale intensity */
  strength?: "soft" | "default" | "firm";
};

const strengthClass = {
  soft: "pressable pressable-soft",
  default: "pressable",
  firm: "pressable pressable-firm",
} as const;

/**
 * CTA wrapper: haptic-style scale on press + optional device vibration on touch.
 */
export const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  (
    {
      asChild = false,
      haptic: hapticKind = "light",
      strength = "default",
      className,
      onPointerDown,
      type,
      ...props
    },
    ref,
  ) => {
    const feedback = usePressFeedback(hapticKind === false ? "light" : hapticKind);
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type ?? "button"}
        className={cn(strengthClass[strength], className)}
        onPointerDown={(e: PointerEvent<HTMLButtonElement>) => {
          if (hapticKind !== false) feedback.onPointerDown(e);
          onPointerDown?.(e);
        }}
        {...props}
      />
    );
  },
);
Pressable.displayName = "Pressable";
