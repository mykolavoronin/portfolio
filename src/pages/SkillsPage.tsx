import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { skillGroups, spokenLanguages } from "@/data/skills";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SkillsPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`Skills — ${site.name}`}
        description="Languages, frameworks, tools."
        path="/skills"
      />
      <div>
        <header className="page-header">
          <p className="section-label">Skills</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Tools of the{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">trade.</span>
          </h1>
        </header>

        <div className="space-y-6">
          {skillGroups.map((g) => (
            <Reveal key={g.title}>
              <div className="rounded-2xl border border-border/65 bg-card p-4 shadow-sm">
                <h2 className="section-label mb-3">{g.title}</h2>
                <Stagger className="flex flex-wrap gap-1.5" chips>
                  {g.items.map((it) => (
                    <RevealItem key={it} as="span" chip>
                      <Badge variant="soft">{it}</Badge>
                    </RevealItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-2xl border border-border/65 bg-card p-4 shadow-sm">
              <h2 className="section-label mb-3">Spoken</h2>
              <Stagger className="flex flex-wrap gap-1.5" chips>
                {spokenLanguages.map((l) => (
                  <RevealItem key={l.name} as="span" chip>
                    <Badge variant="outline">
                      {l.name}
                      <span className="text-muted-foreground/50">·</span>
                      <span className="text-muted-foreground">{l.level}</span>
                    </Badge>
                  </RevealItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
        </Reveal>
      </div>
    </PageEnter>
  );
}
