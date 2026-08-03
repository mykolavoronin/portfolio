import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { books, tools, writers, places } from "@/data/recommendations";
import { site } from "@/data/site";
import { PageEnter, Reveal } from "@/components/Motion";
import { Button } from "@/components/ui/button";

export default function RecommendationsPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`Recommendations — Books, tools & writers · ${site.name}`}
        description="Books, tools and writers that shape how Mykola Voronin designs and builds software."
        path="/recommendations"
      />
      <div>
        <header className="page-header">
          <p className="section-label">Recommendations</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Things worth your{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">attention.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed max-w-xl">
            A small, curated list of books, tools and writers that have shaped how I think and work.
          </p>
        </header>

        <Reveal className="mb-10 sm:mb-12">
          <h2 className="section-label">Books</h2>
          <ul className="space-y-2.5">
            {books.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-border/65 bg-card p-4 sm:p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-foreground/75"
                    >
                      {b.title}
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                    </a>
                  </h3>
                  <span className="text-xs text-muted-foreground shrink-0">{b.author}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mb-10 sm:mb-12">
          <h2 className="section-label">Tools</h2>
          <ul className="rounded-2xl border border-border/65 bg-card shadow-sm divide-y divide-border/50 overflow-hidden">
            {tools.map((t) => (
              <li key={t.name} className="px-4 sm:px-5 py-3.5 flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground text-right">{t.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mb-10 sm:mb-12">
          <h2 className="section-label">Writers I follow</h2>
          <ul className="flex flex-wrap gap-2">
            {writers.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-border/65 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-foreground/15"
                >
                  {r.name}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="section-label">If you&apos;re in Barcelona</h2>
          <ul className="space-y-2.5">
            {places.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-border/65 bg-card p-4 sm:p-5 shadow-sm"
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-foreground/75"
                >
                  {p.name}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
                <p className="text-xs text-muted-foreground mt-0.5">{p.location}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
              </li>
            ))}
          </ul>
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
