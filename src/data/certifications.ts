import { itemPhase, studyGroups, visibleItems } from "@/data/education";

export type Certification = {
  title: string;
  issuer: string;
  period: string;
  status?: string;
  credentialId?: string;
  href?: string;
};

const COURSE_GROUPS = new Set(["scrimba", "animations-dev"]);

/** Derived from studyGroups so extra Scrimba / course certs stay in one place. */
export const certifications: Certification[] = studyGroups
  .filter((group) => COURSE_GROUPS.has(group.id))
  .flatMap((group) =>
    visibleItems(group)
      .filter((item) => itemPhase(item) === "completed")
      .map((item) => ({
        title: item.title,
        issuer: group.name,
        period: item.period,
        status: item.status,
        href: item.href,
      })),
  );
