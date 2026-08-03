import { useCallback, type PointerEvent } from "react";
import { haptic, type HapticKind } from "@/lib/haptics";

type PressHandlers = {
  onPointerDown: (e: PointerEvent) => void;
};

/**
 * Haptic + press intent for touch/primary pointer on CTAs.
 * Pair with the `.pressable` CSS class for the visual scale.
 */
export function usePressFeedback(kind: HapticKind = "light"): PressHandlers {
  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      // Only primary button / touch — skip secondary mouse buttons
      if (e.button !== 0) return;
      // Prefer touch / pen so mouse desktop stays quiet
      if (e.pointerType === "mouse") return;
      haptic(kind);
    },
    [kind],
  );

  return { onPointerDown };
}
