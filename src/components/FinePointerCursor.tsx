import { useEffect, useState } from "react";
import { Cursor } from "motion-plus/react";
import { useReducedMotion } from "motion/react";

/**
 * Motion+ custom cursor — desktop fine pointers only.
 * Uses pointer mode (not follow) so Motion+ hides the system cursor
 * and centers the dot correctly under the pointer.
 */
export function FinePointerCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();

    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  if (!enabled || reduceMotion) return null;

  return (
    <Cursor
      // Pointer mode: centered under mouse + injects cursor:none globally
      follow={false}
      center={{ x: 0.5, y: 0.5 }}
      // Soft spring so it feels alive without lagging badly
      spring={{ stiffness: 900, damping: 55, mass: 0.2 }}
      // Magnetic snap without morphing into giant button shapes
      magnetic={{ morph: false, padding: 0, snap: 0.25 }}
      matchTextSize={false}
      style={{
        width: 14,
        height: 14,
        borderRadius: 9999,
        backgroundColor: "#facc15", // yellow-400
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(250, 204, 21, 0.45)",
        mixBlendMode: "normal",
      }}
      variants={{
        default: {
          opacity: 1,
          scale: 1,
          backgroundColor: "#facc15",
        },
        pointer: {
          scale: 1.15,
          backgroundColor: "#fde047", // yellow-300 on links/buttons
        },
        text: {
          // Thin I-beam for text fields
          width: 3,
          height: 22,
          borderRadius: 2,
          backgroundColor: "#eab308",
          scale: 1,
        },
        pressed: {
          scale: 0.88,
          backgroundColor: "#eab308",
        },
        exit: {
          opacity: 0,
          scale: 0,
        },
      }}
    />
  );
}
