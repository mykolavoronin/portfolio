import { Seo } from "@/components/Seo";
import { skillGroups, spokenLanguages } from "@/data/skills";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";

export default function SkillsPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`Skills — ${site.name}, Software Engineer in Barcelona`}
        description="Languages, frameworks, tools and practice areas Mykola Voronin reaches for daily — from TypeScript and React to AI-assisted workflows."
        path="/skills"
      />
      <div>
        <header className="mb-10">
          <p className="section-label">Skills</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Tools of the{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">trade.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">
            A working list of things I reach for daily — kept short, kept honest.
          </p>
        </header>

        <div className="space-y-10">
          {skillGroups.map((g) => (
            <Reveal key={g.title}>
              <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">{g.title}</h2>
              <Stagger className="flex flex-wrap gap-1.5" fast>
                {g.items.map((it) => (
                  <RevealItem
                    key={it}
                    as="span"
                    className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-foreground"
                  >
                    {it}
                  </RevealItem>
                ))}
              </Stagger>
            </Reveal>
          ))}

          <Reveal>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Spoken languages</h2>
            <ul className="space-y-1.5 text-sm">
              {spokenLanguages.map((l) => (
                <li
                  key={l.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-1.5"
                >
                  <span className="text-foreground">{l.name}</span>
                  <span className="text-muted-foreground">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </PageEnter>
  );
}
