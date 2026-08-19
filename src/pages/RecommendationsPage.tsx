import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { books, tools, writers, places } from "@/data/recommendations";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import { Button } from "@/components/ui/button";

export default function RecommendationsPage() {
  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`Recommendations — Books, tools & writers · ${site.name}`}
        description="Books, tools and writers Mykola Voronin keeps coming back to."
        path="/recommendations"
      />
      <div>
        <header className="page-header">
          <p className="story-tag">Recommendations</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Things worth your{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">attention.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed max-w-xl">
            A small, curated list of books, tools and writers that have shaped how I think and work.
          </p>
        </header>

        <Reveal>
          <StoryHeading tag="Books" className="story-head-static">
            Worth reading.
          </StoryHeading>
          <Stagger as="ul" className="space-y-2.5" fast>
            {books.map((b) => (
              <RevealItem key={b.title} as="li" className="surface p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-foreground/75"
                    >
                      {b.title}
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                    </a>
                  </h3>
                  <span className="text-xs text-muted-foreground shrink-0">{b.author}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.note}</p>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Tools" className="story-head-static">
            What I use.
          </StoryHeading>
          <Stagger as="ul" className="surface divide-y divide-border/50 overflow-hidden" fast>
            {tools.map((t) => (
              <RevealItem
                key={t.name}
                as="li"
                className="px-4 sm:px-5 py-3.5 flex items-baseline justify-between gap-4"
              >
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground text-right">{t.note}</span>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Writers" className="story-head-static">
            People I read.
          </StoryHeading>
          <Stagger as="ul" className="flex flex-wrap gap-2" chips>
            {writers.map((r) => (
              <RevealItem key={r.name} as="li" chip>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-10 rounded-full border border-border/65 bg-card px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-foreground/15"
                >
                  {r.name}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Barcelona" className="story-head-static">
            If you&apos;re here.
          </StoryHeading>
          <Stagger as="ul" className="space-y-2.5" fast>
            {places.map((p) => (
              <RevealItem key={p.name} as="li" className="surface p-4 sm:p-5">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-foreground/75"
                >
                  {p.name}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
                <p className="text-xs text-muted-foreground mt-0.5">{p.location}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/">Back home</Link>
          </Button>
        </Reveal>
      </div>
    </PageEnter>
  );
}
