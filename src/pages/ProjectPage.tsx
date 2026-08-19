import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProject,
  getSiblingProjects,
  getClientGroup,
  projects,
} from "@/data/projects";
import { Seo } from "@/components/Seo";
import { StackMark } from "@/components/StackMark";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import NotFound from "@/pages/NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  const client = getClientGroup(project.clientId);
  const siblings = getSiblingProjects(project.slug);
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];
  const host = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <PageEnter className="site-shell page-pad">
      <article>
        <Seo
          title={`${project.title} — ${project.client} · Mykola Voronin`}
          description={project.description}
          path={`/projects/${project.slug}`}
          image={project.cover}
          type="article"
        />

        <header className="page-header">
          <p className="story-tag">Work</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-2 font-serif-italic text-[1.05rem] sm:text-xl text-muted-foreground leading-snug">
            {project.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="soft">
              <img
                src={project.icon}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 rounded-sm object-contain"
              />
              {project.client}
            </Badge>
            <Badge variant="muted" className="tabular-nums">
              {project.year}
            </Badge>
            <Badge variant="outline">{project.industry}</Badge>
          </div>
          <p className="mt-4 text-sm sm:text-[15px] text-muted-foreground max-w-xl leading-relaxed">
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
        </header>

        <Reveal>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden surface"
          >
            <div className="flex items-center gap-1.5 border-b border-border/50 bg-card px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              <span className="ml-2.5 truncate text-[11px] text-muted-foreground tabular-nums">
                {host}
              </span>
            </div>
            <img
              src={project.cover}
              alt={`${project.title} website`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="media-frame w-full h-auto block"
            />
          </a>
        </Reveal>

        {project.highlights && project.highlights.length > 0 ? (
          <Reveal className="page-section">
            <StoryHeading tag="Impact" className="story-head-static">
              Key highlights &amp; metrics.
            </StoryHeading>
            <ul className="surface divide-y divide-border/50 overflow-hidden">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-baseline gap-3 px-4 sm:px-5 py-3 text-sm text-foreground/90 leading-relaxed">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/60 shrink-0 mt-0.5" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal className="page-section">
          <StoryHeading tag="Overview" className="story-head-static">
            The story.
          </StoryHeading>
          <div className="surface p-5 sm:p-6 space-y-3 text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
            {project.overview.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="The brief" className="story-head-static">
            What it had to do.
          </StoryHeading>
          <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
            {project.challenge}
          </p>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Approach" className="story-head-static">
            How I built it.
          </StoryHeading>
          <ul className="surface divide-y divide-border/50 overflow-hidden">
            {project.approach.map((line) => (
              <li key={line} className="px-4 sm:px-5 py-3 text-sm text-foreground/90 leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Outcome" className="story-head-static">
            What changed.
          </StoryHeading>
          <ul className="surface divide-y divide-border/50 overflow-hidden">
            {project.outcome.map((line) => (
              <li key={line} className="px-4 sm:px-5 py-3 text-sm text-foreground/90 leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        {project.technical && project.technical.length > 0 ? (
          <Reveal className="page-section">
            <StoryHeading tag="Notes" className="story-head-static">
              Under the hood.
            </StoryHeading>
            <ul className="surface divide-y divide-border/50 overflow-hidden">
              {project.technical.map((line) => (
                <li key={line} className="px-4 sm:px-5 py-3 text-sm text-muted-foreground leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal className="page-section">
          <StoryHeading tag="Stack" className="story-head-static">
            Built with.
          </StoryHeading>
          <Stagger className="flex flex-wrap gap-1.5" chips>
            {project.stack.map((s) => (
              <RevealItem key={s} as="span" chip>
                <span className="stack-chip">
                  <StackMark name={s} />
                  {s}
                </span>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        {siblings.length > 0 ? (
          <Reveal className="page-section">
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
        ) : null}

        <Reveal className="page-section">
          <Link
            to={`/projects/${next.slug}`}
            className="pressable pressable-soft group flex items-center justify-between gap-4 surface p-4 hover:border-foreground/12 transition-colors"
          >
            <div className="min-w-0">
              <p className="story-tag mb-0">Next</p>
              <p className="mt-0.5 text-sm font-semibold truncate">{next.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{next.client}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </Link>
        </Reveal>
      </article>
    </PageEnter>
  );
}
