import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { skillGroups, spokenLanguages } from "@/data/skills";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { StackMark } from "@/components/StackMark";

export default function SkillsPage() {
  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`Skills — ${site.name}`}
        description="Languages, frameworks, tools."
        path="/skills"
      />
      <div>
        <header className="page-header">
          <p className="story-tag">Skills</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Tools of the{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">trade.</span>
          </h1>
        </header>

        <div className="space-y-16 sm:space-y-20">
          {skillGroups.map((g) => (
            <Reveal key={g.title}>
              <StoryHeading tag={g.title} className="story-head-static">
                {g.title === "Languages"
                  ? "I write in these."
                  : g.title === "Frameworks"
                    ? "I build with these."
                    : g.title === "Tooling"
                      ? "Day to day."
                      : g.title === "Practice"
                        ? "How I work."
                        : "Keeping things up."}
              </StoryHeading>
              <Stagger className="flex flex-wrap gap-1.5" chips>
                {g.items.map((it) => (
                  <RevealItem key={it} as="span" chip>
                    <span className="stack-chip">
                      <StackMark name={it} />
                      {it}
                    </span>
                  </RevealItem>
                ))}
              </Stagger>
            </Reveal>
          ))}

          <Reveal>
            <StoryHeading tag="Spoken" className="story-head-static">
              I speak these.
            </StoryHeading>
            <ul className="surface divide-y divide-border/50 overflow-hidden">
              {spokenLanguages.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <img src={l.flag} alt="" width={20} height={14} className="lang-flag" />
                    <span className="text-sm font-medium text-foreground">{l.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/">Back home</Link>
          </Button>
        </Reveal>
      </div>
    </PageEnter>
  );
}
