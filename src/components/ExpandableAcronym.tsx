import { cn } from "@/lib/utils";

type ExpandableAcronymProps = {
  prefix?: string;
  short: string;
  full: string;
  className?: string;
  groupName?: "edu";
};

/** Full program name. `short` is kept for callers / title, not animated. */
export function ExpandableAcronym({ prefix, short, full, className }: ExpandableAcronymProps) {
  const lead = prefix?.trimEnd() ?? "";

  return (
    <span className={cn("block text-sm text-muted-foreground leading-relaxed", className)} title={short}>
      {lead ? `${lead} ` : null}
      {full}
    </span>
  );
}
