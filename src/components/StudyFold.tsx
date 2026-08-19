import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import { cn } from "@/lib/utils";
import type { StudyGroup, StudyItem } from "@/data/education";

export function StudyFold({
  label,
  entries,
}: {
  label: string;
  entries: { group: StudyGroup; item: StudyItem }[];
}) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `${reactId}-panel`;
  const triggerId = `${reactId}-trigger`;

  if (entries.length === 0) return null;

  const grouped = new Map<string, { group: StudyGroup; items: StudyItem[] }>();
  for (const entry of entries) {
    const existing = grouped.get(entry.group.id);
    if (existing) {
      existing.items.push(entry.item);
    } else {
      grouped.set(entry.group.id, { group: entry.group, items: [entry.item] });
    }
  }

  return (
    <div className="study-fold">
      <button
        type="button"
        id={triggerId}
        className="study-fold-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn("study-fold-panel", open && "is-open")}
        inert={!open || undefined}
      >
        <div className="study-fold-panel-inner">
          {[...grouped.values()].map(({ group, items }) => (
            <StudyFoldSchool key={group.id} group={group} items={items} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StudyFoldSchool({ group, items }: { group: StudyGroup; items: StudyItem[] }) {
  return (
    <div>
      <div className="org-head">
        <img src={group.icon} alt="" width={36} height={36} className="brand-mark" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            {group.pagePath ? (
              <Link
                to={group.pagePath}
                className="text-[15px] font-semibold tracking-tight hover:text-foreground/75 transition-colors"
              >
                {group.name}
              </Link>
            ) : group.href ? (
              <a
                href={group.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold tracking-tight hover:text-foreground/75 transition-colors"
              >
                {group.name}
              </a>
            ) : (
              <p className="text-[15px] font-semibold tracking-tight">{group.name}</p>
            )}
            {group.location ? (
              <span className="text-xs text-muted-foreground">{group.location}</span>
            ) : null}
          </div>
        </div>
      </div>
      <ul className="org-items">
        {items.map((item) => (
          <li key={`${group.id}-${item.title}`}>
            <div className="text-sm text-muted-foreground">
              {item.programExpand ? (
                <ExpandableAcronym
                  prefix={item.programExpand.prefix}
                  short={item.programExpand.short}
                  full={item.programExpand.full}
                  className="text-sm text-muted-foreground"
                />
              ) : (
                item.title
              )}
            </div>
            <div className="story-links">
              <span className="inline-flex items-center text-xs text-muted-foreground tabular-nums">
                {item.period}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
