import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pressable } from "@/components/Pressable";
import { haptic } from "@/lib/haptics";

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      haptic("success");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  }

  return (
    <Pressable
      type="button"
      haptic="selection"
      strength="soft"
      onClick={onCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card",
        "min-h-10 px-3 text-xs font-medium text-foreground/90",
        "hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      <span className="relative block h-3 w-3">
        <AnimatePresence initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            className="absolute inset-0 inline-flex items-center justify-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            {copied ? (
              <Check className="h-3 w-3 text-[hsl(var(--status-success))]" strokeWidth={2} />
            ) : (
              <Copy className="h-3 w-3 text-muted-foreground" strokeWidth={1.75} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="inline-grid justify-items-center">
        <span className="invisible col-start-1 row-start-1" aria-hidden>
          Copied
        </span>
        <span className="col-start-1 row-start-1">{copied ? "Copied" : label}</span>
      </span>
    </Pressable>
  );
}
