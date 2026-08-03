import { Seo } from "@/components/Seo";
import { books, tools, writers, places } from "@/data/recommendations";
import { PageEnter, Reveal } from "@/components/Motion";

export default function RecommendationsPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title="Recommendations — Books, Tools & Writers · Mykola Voronin"
        description="A curated list of books, tools and writers that have shaped how Mykola Voronin thinks, designs and builds software."
        path="/recommendations"
      />
      <div>
        <header className="mb-10">
          <p className="section-label">Reading</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Things worth your{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">attention.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">
            A small, curated list of books, tools and writers that have shaped how I think and work.
          </p>
        </header>

        <Reveal className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Books</h2>
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {books.map((b) => (
              <li key={b.title} className="py-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      {b.title}
                    </a>
                  </h3>
                  <span className="text-xs text-muted-foreground">{b.author}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Tools</h2>
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {tools.map((t) => (
              <li key={t.name} className="py-3 flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground text-right">{t.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Writers I follow</h2>
          <ul className="space-y-2">
            {writers.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">If you're in Barcelona</h2>
          <ul className="space-y-4">
            {places.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  {p.name}
                </a>
                <p className="text-xs text-muted-foreground mt-0.5">{p.location}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </PageEnter>
  );
}
