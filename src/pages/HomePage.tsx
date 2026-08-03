import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Building2,
  Github,
  Leaf,
  Linkedin,
  Sparkles,
  MapPin,
  Clock,
  GraduationCap,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.svg";
import { BrandLink } from "@/components/BrandLink";
import { projects as allProjects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { homeServices } from "@/data/services";
import { homeStack, spokenLanguages } from "@/data/skills";
import { nowItems, site } from "@/data/site";
import { Seo } from "@/components/Seo";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import { HeroIntro, HeroItem, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { cn } from "@/lib/utils";

type Project = (typeof allProjects)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card p-2.5 sm:p-3">
      <div className="project-card-media mb-3 sm:mb-3.5">
        <img
          src={project.cover}
          alt={`${project.title} preview`}
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="project-card-img media-frame absolute inset-0 h-full w-full"
        />
        <span className="absolute top-2 right-2 rounded-md border border-border/50 bg-background/90 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium tabular-nums tracking-wide text-muted-foreground shadow-sm">
          {project.year.split(" ")[0]}
        </span>
      </div>
      <div className="px-1 sm:px-1.5 pb-1 sm:pb-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-foreground leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="project-card-arrow h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={1.75} />
        </div>
        <p className="mt-1 text-[13px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="relative pb-6 sm:pb-10">
      <Seo
        title={`${site.name} — Software Engineer in Barcelona`}
        description={site.seoDescription}
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            url: site.siteUrl,
            jobTitle: site.role,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barcelona",
              addressCountry: "ES",
            },
            sameAs: [site.github, site.linkedin],
          },
        ]}
      />

      {/* Hero */}
      <section className="site-shell pt-8 sm:pt-14 pb-2 sm:pb-4">
        <HeroIntro>
          <HeroItem className="flex items-center gap-3.5 sm:gap-4 mb-7 sm:mb-9">
            <img
              src={avatar}
              alt={site.name}
              width={64}
              height={64}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover ring-1 ring-border/50 shadow-sm shrink-0"
            />
            <div className="min-w-0">
              <p className="text-base sm:text-[17px] font-semibold tracking-tight text-foreground leading-tight">
                {site.name}
              </p>
              <p className="mt-1 text-[13px] sm:text-sm text-muted-foreground inline-flex items-center gap-1.5 flex-wrap">
                <span>{site.role}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" strokeWidth={1.75} />
                  Barcelona
                </span>
              </p>
            </div>
          </HeroItem>

          <h1 className="sr-only">
            {site.name} — Software Engineer in Barcelona
          </h1>

          <HeroItem as="p" className="text-fluid-lg text-foreground/90 leading-[1.65] max-w-[38rem]">
            I design and build clean, high-performance web applications. I{" "}
            <span className="font-serif-italic text-foreground">care deeply</span> about craft, performance, and the
            small details that quietly make a product feel right. Currently at{" "}
            <BrandLink href="https://kucherov.studio/" label="Kucherov Studio" icon={Sparkles} /> and{" "}
            <BrandLink href="https://ekabalance.com/" label="EKA Balance" icon={Leaf} />.
          </HeroItem>

          <HeroItem as="p" className="mt-4 sm:mt-5 text-fluid-base text-muted-foreground leading-relaxed max-w-[36rem]">
            Finishing Scrimba&apos;s Full Stack program and Batxillerat at Mriya Barcelona School. Find me on{" "}
            <BrandLink href={site.linkedin} label="LinkedIn" icon={Linkedin} /> or{" "}
            <BrandLink href={site.github} label="GitHub" icon={Github} />.
          </HeroItem>

          <HeroItem className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2">
            <span className="status-chip">
              <Clock className="h-3 w-3" strokeWidth={1.75} />
              {site.timezone} · Barcelona
            </span>
            <span className="status-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden />
              {site.availability.label}
            </span>
          </HeroItem>
        </HeroIntro>
      </section>

      {/* Now */}
      <section id="now" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Now</h2>
          <ul className="space-y-3 sm:space-y-3.5">
            {nowItems.map((item) => (
              <li key={item} className="flex gap-3 text-[14px] sm:text-[15px] text-foreground/90 leading-relaxed">
                <span
                  className="mt-[0.55rem] inline-block h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Selected work</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {allProjects.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectCard project={p} />
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* Services */}
      <section id="services" className="site-shell section-block">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-4 sm:mb-5">
            <h2 className="section-label mb-0">Services</h2>
            <Link
              to="/services"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 min-h-10 sm:min-h-0 py-2 sm:py-0 transition-colors duration-150"
            >
              All services <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
            <span className="font-serif-italic text-foreground/85">Currently unavailable for hire</span> — open to
            conversations about future work.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3" fast>
          {homeServices.slice(0, 6).map((s) => (
            <RevealItem key={s.slug}>
              <Link to={`/services/${s.slug}`} className="surface-card group">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3 mb-1.5">
                  <h3 className="text-sm font-semibold tracking-tight group-hover:underline underline-offset-4 decoration-foreground/15">
                    {s.title}
                  </h3>
                  <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">{s.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* Experience */}
      <section id="experience" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Experience</h2>
        </Reveal>
        <Stagger className="space-y-9 sm:space-y-10">
          {experience.map((e) => (
            <RevealItem key={e.company} as="article" className="grid grid-cols-[auto_1fr] gap-3.5 sm:gap-4">
              <span className="icon-tile">
                <Building2 className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground tabular-nums leading-relaxed">
                  {e.period}
                  <span className="mx-1.5 text-border">·</span>
                  {e.location}
                </p>
                <h3 className="mt-1 text-[15px] font-semibold tracking-tight">
                  {e.projectSlug ? (
                    <Link
                      to={`/projects/${e.projectSlug}`}
                      className="hover:underline underline-offset-4 decoration-foreground/20"
                    >
                      {e.company}
                    </Link>
                  ) : (
                    e.company
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{e.role}</p>
                <ul className="mt-3 space-y-2">
                  {e.points.slice(0, 4).map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                      <span
                        className="mt-[0.55rem] inline-block h-1 w-1 rounded-full bg-muted-foreground/45 shrink-0"
                        aria-hidden
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* Education */}
      <section id="education" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Education</h2>
          <ul className="space-y-1 sm:space-y-2">
            {education.map((ed) => (
              <li
                key={ed.school}
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-3.5 sm:gap-4 items-start rounded-xl -mx-2 px-2 py-2.5 sm:py-3 transition-colors duration-200",
                  ed.programExpand && "group/edu [@media(hover:hover)]:hover:bg-muted/40",
                )}
              >
                <span className="icon-tile">
                  <GraduationCap className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground tabular-nums">{ed.period}</p>
                  <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{ed.school}</p>
                  {ed.programExpand ? (
                    <ExpandableAcronym
                      prefix={ed.programExpand.prefix}
                      short={ed.programExpand.short}
                      full={ed.programExpand.full}
                      groupName="edu"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{ed.program}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Certifications */}
      <section id="certifications" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Certifications</h2>
          <ul className="space-y-5">
            {certifications.map((cert) => {
              const body = (
                <>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {cert.period}
                    {cert.status ? (
                      <>
                        <span className="mx-1.5 text-border">·</span>
                        {cert.status}
                      </>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{cert.title}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </>
              );

              return (
                <li key={`${cert.issuer}-${cert.title}`} className="grid grid-cols-[auto_1fr] gap-3.5 sm:gap-4 items-start">
                  <span className="icon-tile">
                    <Award className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    {cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg -m-1 p-1 transition-opacity hover:opacity-90"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      {/* Stack */}
      <section id="skills" className="site-shell section-block">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-4 sm:mb-5">
            <h2 className="section-label mb-0">Stack</h2>
            <Link
              to="/skills"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 min-h-10 sm:min-h-0 py-2 sm:py-0 transition-colors duration-150"
            >
              All skills <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {homeStack.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="rounded-full font-normal bg-card border-border/60 shadow-sm px-3 py-1 text-xs hover:border-foreground/20 transition-colors duration-150"
              >
                {s}
              </Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Languages */}
      <section className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Languages</h2>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {spokenLanguages.map((l) => (
              <li
                key={l.name}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs shadow-sm"
              >
                <span className="text-foreground font-medium">{l.name}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-muted-foreground">{l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Social */}
      <section id="contact" className="site-shell pt-12 sm:pt-16 pb-6 sm:pb-8">
        <Reveal>
          <h2 className="section-label">Elsewhere</h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
            {site.availability.detail}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="outline" size="default" className="justify-center" asChild>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="default" className="justify-center" asChild>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
