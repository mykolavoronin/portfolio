import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import itAcademyIcon from "@/assets/brands/it-academy.png";
import { itAcademy } from "@/data/itAcademy";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";

export default function ItAcademyPage() {
  const a = itAcademy;

  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`${a.name} · ${a.programEn} — ${site.name}`}
        description={a.seoDescription}
        path={a.path}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: a.programEn,
          alternateName: a.programCa,
          description: a.description,
          provider: {
            "@type": "Organization",
            name: `${a.name} · ${a.org}`,
            url: a.href,
          },
          educationalLevel: "Professional training",
          inLanguage: ["ca", "en", "es"],
          location: {
            "@type": "Place",
            name: a.location,
          },
        }}
      />

      <div>
        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 min-h-10 sm:min-h-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          About
        </Link>

        <header className="mb-10">
          <div className="org-head mb-4">
            <img src={itAcademyIcon} alt="" width={36} height={36} className="brand-mark" />
            <p className="story-tag mb-0">Education</p>
          </div>
          <h1 className="text-fluid-3xl font-semibold tracking-tight leading-[1.12]">
            {a.name}.{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">
              by {a.org}.
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground/80 font-medium">{a.programEn}</span>
            <span className="mx-1.5 text-border">·</span>
            <span className="font-serif-italic">{a.programCa}</span>
          </p>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed max-w-2xl">
            {a.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              {a.location}
            </span>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground tabular-nums">
              {a.period} · {a.status}
            </span>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Official site
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Stats */}
        <Reveal className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {a.stats.map((s) => (
              <div
                key={s.label}
                className="surface px-4 py-4 sm:py-5 text-center"
              >
                <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">{s.value}</p>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground/80 leading-relaxed">{a.statsNote}</p>
        </Reveal>

        <Reveal className="mb-16 sm:mb-20">
          <StoryHeading tag="Programme" className="story-head-static">
            What it is.
          </StoryHeading>
          <div className="surface p-5 sm:p-6 space-y-3 text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
            {a.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mb-16 sm:mb-20">
          <StoryHeading tag="Why" className="story-head-static">
            Why I chose it.
          </StoryHeading>
          <ul className="surface divide-y divide-border/50 overflow-hidden">
            {a.why.map((item) => (
              <li key={item} className="flex gap-3 px-4 sm:px-5 py-3 text-sm text-foreground/90 leading-relaxed">
                <Check className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mb-8">
          <StoryHeading tag="Itinerary" className="story-head-static">
            How it unfolds.
          </StoryHeading>
          <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">{a.programIntro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              Fundamentals {a.phaseTotals.fundamentals}
            </span>
            <span className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              Specialisation {a.phaseTotals.specialisation}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground/80">{a.phaseTotals.specialisationNote}</p>
        </Reveal>

        {/* Phases */}
        <Stagger className="space-y-4 mb-12">
          {a.phases.map((phase) => (
            <RevealItem key={phase.id}>
              <article className="surface p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {phase.phase}
                    <span className="mx-1.5 text-border">·</span>
                    <span className="tabular-nums normal-case tracking-normal">{phase.hours}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {phase.format}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {phase.method}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-tight text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground font-serif-italic">{phase.titleCa}</p>
                <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{phase.summary}</p>
                <p className="mt-2 text-xs text-muted-foreground">{phase.schedule}</p>

                <ul className="mt-4 space-y-2">
                  {phase.outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5 text-sm text-foreground/85 leading-relaxed">
                      <span
                        className="mt-2 inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0"
                        aria-hidden
                      />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
                    Credentials
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.credentials.map((c) => (
                      <span
                        key={c.name}
                        className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] sm:text-xs text-foreground"
                      >
                        {c.name}
                        <span className="text-muted-foreground"> · {c.kind}</span>
                      </span>
                    ))}
                  </div>
                  {phase.note ? (
                    <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">{phase.note}</p>
                  ) : null}
                </div>
              </article>
            </RevealItem>
          ))}
        </Stagger>

        {/* Competencies + careers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 mb-16 sm:mb-20">
          <Reveal>
            <StoryHeading tag="Competencies" className="story-head-static">
              What I take from it.
            </StoryHeading>
            <ul className="space-y-2.5">
              {a.competencies.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                  <span
                    className="mt-2 inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0"
                    aria-hidden
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <StoryHeading tag="Outcomes" className="story-head-static">
              Where it leads.
            </StoryHeading>
            <ul className="space-y-2.5">
              {a.careers.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                  <span
                    className="mt-2 inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0"
                    aria-hidden
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Support */}
        <Reveal className="mb-16 sm:mb-20">
          <StoryHeading tag="Support" className="story-head-static">
            Who walks with you.
          </StoryHeading>
          <Stagger className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3" fast>
            {a.support.map((s) => (
              <RevealItem key={s.title}>
                <div className="h-full surface p-4 sm:p-5">
                  <h3 className="text-sm font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Footer CTA */}
        <Reveal>
          <div className="surface p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Learn more from the source</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Programme details live on Barcelona Activa / Cibernarium.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button asChild>
                <a href={a.href} target="_blank" rel="noopener noreferrer">
                  Cibernarium
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={a.academyHref} target="_blank" rel="noopener noreferrer">
                  Barcelona Activa
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </PageEnter>
  );
}
