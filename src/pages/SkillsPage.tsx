import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { skillGroups, spokenLanguages } from "@/data/skills";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

        <div className="space-y-6">
          {skillGroups.map((g) => (
            <Reveal key={g.title}>
              <div className="surface p-4">
                <h2 className="mb-3 text-sm font-semibold tracking-tight">{g.title}</h2>
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
            <div className="surface p-4">
              <h2 className="mb-3 text-sm font-semibold tracking-tight">Spoken</h2>
              <Stagger className="flex flex-wrap gap-1.5" chips>
                {spokenLanguages.map((l) => (
                  <RevealItem key={l.name} as="span" chip>
                    <Badge variant="outline">
                      <img src={l.flag} alt="" width={16} height={11} className="lang-flag" />
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
