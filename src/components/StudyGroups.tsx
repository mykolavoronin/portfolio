import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import {
  basicEducationEntries,
  basicEducationLabel,
  courseEntries,
  type StudyGroup,
  type StudyItem,
} from "@/data/education";
import { StudyFold } from "@/components/StudyFold";
import { cn } from "@/lib/utils";

function statusVariant(status?: string): "success" | "warn" | "info" | "muted" {
  if (status === "Completed" || status === "Issued") return "success";
  if (status === "In progress") return "warn";
  if (status === "Upcoming") return "info";
  return "muted";
}

function GroupName({ group }: { group: StudyGroup }) {
  const className = "text-[15px] font-semibold tracking-tight";
  if (group.pagePath) {
    return (
      <Link to={group.pagePath} className={cn(className, "hover:text-foreground/75 transition-colors")}>
        {group.name}
      </Link>
    );
  }
  if (group.href) {
    return (
      <a
        href={group.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className, "hover:text-foreground/75 transition-colors")}
      >
        {group.name}
      </a>
    );
  }
  return <span className={className}>{group.name}</span>;
}

function ItemTitle({ item }: { item: StudyItem }) {
  if (item.programExpand) {
    return (
      <ExpandableAcronym
        prefix={item.programExpand.prefix}
        short={item.programExpand.short}
        full={item.programExpand.full}
        className="text-sm font-medium text-foreground"
      />
    );
  }

  const title = <span className="text-sm font-medium text-foreground">{item.title}</span>;
  if (!item.href) return title;

  const isInternal = item.href.startsWith("/");
  if (isInternal) {
    return (
      <Link to={item.href} className="text-sm font-medium text-foreground hover:text-foreground/75 transition-colors">
        {item.title}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-foreground hover:text-foreground/75 transition-colors"
    >
      {item.title}
    </a>
  );
}

export function CourseGroups({ variant = "plain" }: { variant?: "plain" | "surface" }) {
  const entries = courseEntries();
  if (entries.length === 0) return null;

  return (
    <div className="space-y-6 sm:space-y-7">
      {entries.map(({ group, items }) => (
        <article key={group.id} className={cn(variant === "surface" && "surface p-4")}>
          <header className="org-head">
            <img
              src={group.icon}
              alt=""
              width={36}
              height={36}
              className="brand-mark"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <GroupName group={group} />
                {group.location ? (
                  <span className="text-xs text-muted-foreground">{group.location}</span>
                ) : null}
              </div>
            </div>
          </header>

          <ul className="org-items">
            {items.map((item) => (
              <li key={`${group.id}-${item.title}`} className="org-item">
                <div className="min-w-0 flex-1">
                  <ItemTitle item={item} />
                  <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">{item.period}</p>
                </div>
                {item.status ? (
                  <Badge variant={statusVariant(item.status)} className="shrink-0">
                    {item.status}
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function BasicEducationFold({ variant = "plain" }: { variant?: "plain" | "surface" }) {
  const entries = basicEducationEntries();
  if (entries.length === 0) return null;

  return (
    <div className={cn(variant === "surface" && "surface px-4 py-1")}>
      <StudyFold label={basicEducationLabel} entries={entries} />
    </div>
  );
}
