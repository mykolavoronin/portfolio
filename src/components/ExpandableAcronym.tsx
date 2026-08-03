import { cn } from "@/lib/utils";

type ExpandableAcronymProps = {
  prefix?: string;
  short: string;
  full: string;
  className?: string;
  groupName?: "edu";
};

/**
 * CFGS CASIX → full title on desktop hover (parent group/edu).
 * On touch devices, full title is always shown (no hover).
 */
export function ExpandableAcronym({ prefix, short, full, className }: ExpandableAcronymProps) {
  const lead = prefix?.trimEnd() ?? "";

  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} title={full}>
      <span className="sr-only">
        {lead} {short}: {full}
      </span>

      {/* Touch / coarse pointer — always show full (hover unavailable) */}
      <span aria-hidden className="inline [@media(hover:hover)_and_(pointer:fine)]:hidden">
        {lead ? `${lead} ` : null}
        {full}
      </span>

      {/* Fine pointer — expand CASIX on parent group hover */}
      <span
        aria-hidden
        className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline-flex items-baseline gap-x-[0.3em]"
      >
        {lead ? <span className="shrink-0">{lead}</span> : null}
        <span className="inline-flex overflow-hidden min-w-0">
          <span
            className={cn(
              "inline-block overflow-hidden whitespace-nowrap",
              "max-w-[6rem] opacity-100",
              "transition-[max-width,opacity] duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]",
              "group-hover/edu:max-w-0 group-hover/edu:opacity-0",
              "group-focus-within/edu:max-w-0 group-focus-within/edu:opacity-0",
            )}
          >
            {short}
          </span>
          <span
            className={cn(
              "inline-block overflow-hidden whitespace-nowrap",
              "max-w-0 opacity-0",
              "transition-[max-width,opacity] duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]",
              "group-hover/edu:max-w-[min(40rem,90vw)] group-hover/edu:opacity-100",
              "group-focus-within/edu:max-w-[min(40rem,90vw)] group-focus-within/edu:opacity-100",
            )}
          >
            {full}
          </span>
        </span>
      </span>
    </p>
  );
}
