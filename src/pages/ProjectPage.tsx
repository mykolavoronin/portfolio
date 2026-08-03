import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Calendar, MapPin, Briefcase, CircleDot, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";
import { Seo } from "@/components/Seo";
import { PageEnter, Reveal } from "@/components/Motion";

function MetaRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" strokeWidth={1.5} />
      <div className="flex-1 flex items-baseline justify-between gap-3">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm text-foreground text-right">{value}</span>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="section-label">{children}</h2>;
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  const Icon = project.icon;
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <PageEnter>
      <article className="pb-16">
        <Seo
          title={`${project.title} — Mykola Voronin`}
          description={project.description}
          path={`/projects/${project.slug}`}
          image={project.cover}
          type="article"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            headline: project.tagline,
            description: project.description,
            url: `https://mykolavoronin.com/projects/${project.slug}`,
            image: project.cover,
            author: { "@type": "Person", name: "Mykola Voronin", url: "https://mykolavoronin.com/" },
            inLanguage: "en",
          }}
        />

        <section className="site-shell pt-8 sm:pt-10 pb-8">
          <div className="flex items-center gap-3 mb-6 text-xs text-muted-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card">
              <Icon className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
            </span>
            <p className="uppercase tracking-[0.12em]">{project.industry}</p>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
            <p className="tabular-nums">{project.year}</p>
          </div>

          <h1 className="text-fluid-3xl font-semibold tracking-tight leading-[1.1] text-foreground">
            {project.title}.{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">{project.tagline}</span>
          </h1>

          <p className="mt-5 text-fluid-base text-muted-foreground leading-relaxed">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Button asChild>
              <a href={project.href} target="_blank" rel="noreferrer">
                Visit live site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-2">
              <CircleDot className="h-3 w-3 text-emerald-500" strokeWidth={2.5} />
              {project.status}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              {project.location}
            </span>
          </div>
        </section>

        <Reveal className="site-shell pb-10">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-md"
          >
            <div className="flex items-center gap-1.5 border-b border-border/50 bg-card/90 backdrop-blur px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="ml-3 truncate text-[11px] text-muted-foreground tabular-nums">
                {project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </div>
            <div className="overflow-hidden">
              <img
                src={project.cover}
                alt={`${project.title} — homepage screenshot`}
                loading="lazy"
                className="media-frame w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </a>
        </Reveal>

        <Reveal className="site-shell py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            <MetaRow icon={Briefcase} label="Client" value={project.client} />
            <MetaRow icon={CircleDot} label="Role" value={project.role} />
            <MetaRow icon={Calendar} label="Year" value={project.year} />
            <MetaRow icon={MapPin} label="Location" value={project.location} />
          </div>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4">
            {project.overview.map((p) => (
              <p key={p} className="text-fluid-base text-foreground/90 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Highlights</SectionLabel>
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                <span className="mt-[0.55rem] inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Challenge</SectionLabel>
          <p className="text-fluid-base text-foreground/90 leading-relaxed">{project.challenge}</p>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Approach</SectionLabel>
          <ol className="space-y-5">
            {project.approach.map((step, i) => (
              <li key={step} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-xs font-medium tabular-nums text-foreground/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-foreground/90 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s} variant="outline" className="rounded-full font-normal bg-card gap-1.5">
                <Layers className="h-2.5 w-2.5 text-muted-foreground" strokeWidth={2} />
                {s}
              </Badge>
            ))}
          </div>
        </Reveal>

        <Reveal className="site-shell py-10">
          <SectionLabel>Outcome</SectionLabel>
          <ul className="space-y-3">
            {project.outcome.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                <span className="mt-[0.55rem] inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {project.technical && project.technical.length > 0 && (
          <Reveal className="site-shell py-10">
            <SectionLabel>Technical details</SectionLabel>
            <ul className="space-y-3">
              {project.technical.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                  <span className="mt-[0.55rem] inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {project.relatedSites && project.relatedSites.length > 0 && (
          <Reveal className="site-shell py-10">
            <SectionLabel>Related sites</SectionLabel>
            <ul className="divide-y divide-border/50 border-y border-border/50">
              {project.relatedSites.map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-4 py-4 interactive-row"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground group-hover:underline underline-offset-4">
                        {site.name}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-0.5 leading-relaxed">{site.description}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <section className="site-shell pt-10">
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-[border-color,box-shadow,transform] duration-250 hover:border-foreground/15 hover:shadow-md active:scale-[0.99]"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Next project</p>
              <p className="mt-1 text-sm font-semibold text-foreground truncate">{next.title}</p>
              <p className="text-xs text-muted-foreground truncate">{next.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </section>
      </article>
    </PageEnter>
  );
}
