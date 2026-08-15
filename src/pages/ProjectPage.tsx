import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MapPin, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProject,
  getSiblingProjects,
  getClientGroup,
  projects,
} from "@/data/projects";
import { Seo } from "@/components/Seo";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  const Icon = project.icon;
  const client = getClientGroup(project.clientId);
  const siblings = getSiblingProjects(project.slug);
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <PageEnter>
      <article className="pb-20 sm:pb-28">
        <Seo
          title={`${project.title} — ${project.client} · Mykola Voronin`}
          description={project.description}
          path={`/projects/${project.slug}`}
          image={project.cover}
          type="article"
        />

        <section className="site-shell pt-10 sm:pt-14 pb-8">
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <Badge variant="soft">
              <Icon className="h-3 w-3" strokeWidth={1.75} />
              {project.client}
            </Badge>
            <Badge variant="muted" className="tabular-nums">
              {project.year}
            </Badge>
            <Badge variant="outline">{project.industry}</Badge>
          </div>

          <h1 className="text-fluid-3xl font-semibold tracking-tight leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-2 font-serif-italic text-[1.05rem] sm:text-xl text-muted-foreground leading-snug">
            {project.tagline}
          </p>

          <p className="mt-3 text-sm sm:text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button asChild>
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                Visit site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Badge variant="outline">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              {project.location}
            </Badge>
            <Badge variant="muted">{project.role}</Badge>
          </div>
        </section>

        <Reveal className="site-shell pb-8">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative block overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-md",
            )}
          >
            <div className="flex items-center gap-1.5 border-b border-border/50 bg-card/90 backdrop-blur px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="ml-3 truncate text-[11px] text-muted-foreground tabular-nums">
                {project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </div>
            <img
              src={project.cover}
              alt={`${project.title} screenshot`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="media-frame w-full h-auto block"
            />
          </a>
        </Reveal>

        <Reveal className="site-shell py-8">
          <StoryHeading tag="Highlights" className="story-head-static">
            What matters.
          </StoryHeading>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed rounded-xl border border-border/50 bg-card/50 px-3.5 py-2.5 shadow-sm"
              >
                <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/45 shrink-0" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="site-shell py-8">
          <StoryHeading tag="Overview" className="story-head-static">
            The story.
          </StoryHeading>
          <div className="space-y-3">
            {project.overview.slice(0, 2).map((p) => (
              <p key={p} className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="site-shell py-8">
          <StoryHeading tag="Stack" className="story-head-static">
            Built with.
          </StoryHeading>
          <Stagger className="flex flex-wrap gap-1.5" chips>
            {project.stack.map((s) => (
              <RevealItem key={s} as="span" chip>
                <Badge variant="soft">
                  <Layers className="h-2.5 w-2.5 text-muted-foreground" strokeWidth={2} />
                  {s}
                </Badge>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        {siblings.length > 0 && (
          <Reveal className="site-shell py-8">
            <StoryHeading tag="Related" className="story-head-static">
              Also for {project.client}.
            </StoryHeading>
            {client ? (
              <p className="text-xs text-muted-foreground mb-3 -mt-1">{client.blurb}</p>
            ) : null}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/projects/${s.slug}`}
                    className="pressable pressable-soft group flex gap-3 surface p-2.5 hover:border-foreground/12 transition-colors"
                  >
                    <img
                      src={s.cover}
                      alt=""
                      className="h-14 w-[4.25rem] rounded-lg object-cover object-top border border-border/50 shrink-0"
                      loading="lazy"
                    />
                    <span className="min-w-0 flex-1 py-0.5">
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold tracking-tight">{s.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                        {s.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <section className="site-shell pt-6">
          <Link
            to={`/projects/${next.slug}`}
            className="pressable pressable-soft group flex items-center justify-between gap-4 surface p-4 hover:border-foreground/12 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Next</p>
              <p className="mt-0.5 text-sm font-semibold truncate">{next.title}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                <Badge variant="muted">{next.client}</Badge>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </Link>
        </section>
      </article>
    </PageEnter>
  );
}
