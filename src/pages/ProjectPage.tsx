import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MapPin, Layers } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProject,
  getSiblingProjects,
  getClientGroup,
  projects,
} from "@/data/projects";
import { Seo } from "@/components/Seo";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { springUi } from "@/lib/motion";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const reduce = useReducedMotion();

  if (!project) return <NotFound />;

  const Icon = project.icon;
  const client = getClientGroup(project.clientId);
  const siblings = getSiblingProjects(project.slug);
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <PageEnter>
      <article className="pb-16">
        <Seo
          title={`${project.title} — ${project.client} · Mykola Voronin`}
          description={project.description}
          path={`/projects/${project.slug}`}
          image={project.cover}
          type="article"
        />

        <section className="site-shell pt-8 sm:pt-10 pb-6">
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
            <span className="font-serif-italic font-normal text-muted-foreground">
              {" "}
              — {project.tagline}
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button asChild>
              <a href={project.href} target="_blank" rel="noreferrer">
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
          <motion.a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group relative block overflow-hidden rounded-2xl border border-border/70 bg-muted/30",
              "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-14px_rgb(0_0_0/0.12)]",
            )}
            whileHover={reduce ? undefined : { y: -2 }}
            transition={springUi}
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
              loading="lazy"
              className="media-frame w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </motion.a>
        </Reveal>

        <Reveal className="site-shell py-8">
          <h2 className="section-label">Highlights</h2>
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
          <h2 className="section-label">Overview</h2>
          <div className="space-y-3">
            {project.overview.slice(0, 2).map((p) => (
              <p key={p} className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="site-shell py-8">
          <h2 className="section-label">Stack</h2>
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
            <h2 className="section-label">Also for {project.client}</h2>
            {client ? (
              <p className="text-xs text-muted-foreground mb-3 -mt-1">{client.blurb}</p>
            ) : null}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/projects/${s.slug}`}
                    className="pressable pressable-soft group flex gap-3 rounded-2xl border border-border/65 bg-card p-2.5 shadow-sm hover:border-foreground/12 transition-colors"
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
            className="pressable pressable-soft group flex items-center justify-between gap-4 rounded-2xl border border-border/65 bg-card p-4 shadow-sm hover:border-foreground/12 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Next</p>
              <p className="mt-0.5 text-sm font-semibold truncate">{next.title}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                <Badge variant="muted">{next.client}</Badge>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </article>
    </PageEnter>
  );
}
