import { useState } from "react";
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
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5",
        "text-xs font-medium text-foreground/90",
        "hover:bg-muted/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
      ) : (
        <Copy className="h-3 w-3 text-muted-foreground" strokeWidth={1.75} />
      )}
      {copied ? "Copied" : label}
    </Pressable>
  );
}
