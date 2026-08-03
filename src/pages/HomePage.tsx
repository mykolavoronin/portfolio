import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowRight,
  Building2,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Award,
  QrCode,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import avatar from "@/assets/avatar.png";
import { LocalTime } from "@/components/LocalTime";
import { clientGroups, getProjectsByClient, type Project } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { homeStack, spokenLanguages } from "@/data/skills";
import { site } from "@/data/site";
import { Seo } from "@/components/Seo";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import {
  HeroIntro,
  HeroItem,
  Reveal,
  Stagger,
  RevealItem,
} from "@/components/Motion";
import { springUi } from "@/lib/motion";
import { cn } from "@/lib/utils";

function statusVariant(status?: string): "success" | "warn" | "info" | "muted" {
  if (status === "Completed" || status === "Issued") return "success";
  if (status === "In progress") return "warn";
  if (status === "Upcoming") return "info";
  return "muted";
}

function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={springUi}
      className="h-full"
    >
      <Link to={`/projects/${project.slug}`} className="project-card h-full p-2.5 sm:p-3">
        <div className="project-card-media mb-3">
          <img
            src={project.cover}
            alt=""
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="project-card-img media-frame absolute inset-0 h-full w-full"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 tabular-nums shadow-sm backdrop-blur-sm bg-background/90"
          >
            {project.year.split(" ")[0]}
          </Badge>
        </div>
        <div className="px-1 pb-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight leading-snug">{project.title}</h3>
            <ArrowUpRight
              className="project-card-arrow h-3.5 w-3.5 shrink-0 mt-0.5"
              strokeWidth={1.75}
            />
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="relative pb-8 sm:pb-12">
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

      {/* Hero — editorial identity + context card */}
      <section className="site-shell pt-10 sm:pt-16 pb-4 sm:pb-6">
        <HeroIntro className="flex flex-col gap-8 sm:gap-10">
          <HeroItem className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <img
                src={avatar}
                alt={site.name}
                width={96}
                height={96}
                className={cn(
                  "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24",
                  "rounded-full object-cover object-top",
                  "ring-1 ring-border/70 shadow-md",
                  "bg-muted",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {site.role}
              </p>
              <h1 className="mt-1 text-[1.65rem] sm:text-[2.15rem] font-semibold tracking-tight leading-[1.12] text-foreground">
                {site.name}
              </h1>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Barcelona
                </span>
                <span className="text-border" aria-hidden>
                  ·
                </span>
                <LocalTime showIcon={false} showCity={false} />
              </p>
            </div>
          </HeroItem>

          <HeroItem>
            <p className="text-fluid-lg sm:text-[1.25rem] text-foreground leading-[1.55] tracking-[-0.01em] max-w-[36rem]">
              I design and build{" "}
              <span className="font-serif-italic text-foreground/90">calm, high-performance</span> web
              products — where craft, performance, and clarity meet.
            </p>
          </HeroItem>

          <HeroItem>
            <div
              className={cn(
                "rounded-2xl border border-border/65 bg-card p-4 sm:p-5",
                "shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_24px_-12px_rgb(0_0_0/0.08)]",
                "dark:shadow-[0_1px_2px_rgb(0_0_0/0.3),0_12px_28px_-12px_rgb(0_0_0/0.45)]",
              )}
            >
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                Full-stack work for{" "}
                <Link
                  to="/projects/kucherov-studio"
                  className="font-medium text-foreground underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50 hover:underline transition-colors"
                >
                  Kucherov Studio
                </Link>{" "}
                and{" "}
                <Link
                  to="/projects/eka-balance"
                  className="font-medium text-foreground underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50 hover:underline transition-colors"
                >
                  EKA Balance
                </Link>
                <span className="text-muted-foreground/90">
                  {" "}
                  (hub, VIP, Business, Agenyz, masaje.barcelona). Studying systems and cybersecurity
                  alongside client work.
                </span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="status-chip">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground/55 shrink-0"
                    aria-hidden
                  />
                  {site.availability.label}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button size="default" className="h-10" asChild>
                  <a href="#projects">
                    View work
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button variant="outline" size="default" className="h-10" asChild>
                  <a href={site.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="default" className="h-10" asChild>
                  <a href={site.github} target="_blank" rel="noreferrer">
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </Button>
                <Button variant="ghost" size="default" className="h-10 text-muted-foreground" asChild>
                  <Link to="/card">
                    <QrCode className="h-3.5 w-3.5" />
                    Card
                  </Link>
                </Button>
              </div>
            </div>
          </HeroItem>
        </HeroIntro>
      </section>

      {/* Work */}
      <section id="projects" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Work</h2>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          {clientGroups.map((group) => {
            const groupProjects = getProjectsByClient(group.id);
            return (
              <Reveal key={group.id}>
                <div className="rounded-2xl border border-border/65 bg-card/50 p-3 sm:p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 px-0.5">
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <h3 className="text-[15px] font-semibold tracking-tight">{group.name}</h3>
                      <Badge variant="outline">{group.blurb}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="muted" className="tabular-nums">
                        {group.period}
                      </Badge>
                      <a
                        href={group.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Visit
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <Stagger
                    className={cn(
                      "grid gap-2.5 sm:gap-3",
                      groupProjects.length === 1 ? "grid-cols-1 max-w-md" : "grid-cols-1 sm:grid-cols-2",
                    )}
                    fast
                  >
                    {groupProjects.map((p) => (
                      <RevealItem key={p.slug}>
                        <ProjectCard project={p} />
                      </RevealItem>
                    ))}
                  </Stagger>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Experience</h2>
        </Reveal>
        <Stagger className="space-y-5 sm:space-y-6" fast>
          {experience.map((e) => (
            <RevealItem key={e.company} as="article" className="grid grid-cols-[auto_1fr] gap-3.5">
              <span className="icon-tile">
                <Building2 className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="muted" className="tabular-nums">
                    {e.period}
                  </Badge>
                  <Badge variant="outline">{e.location}</Badge>
                </div>
                <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight">
                  {e.projectSlug ? (
                    <Link
                      to={`/projects/${e.projectSlug}`}
                      className="hover:text-foreground/75 transition-colors"
                    >
                      {e.company}
                    </Link>
                  ) : (
                    e.company
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{e.role}</p>
                <ul className="mt-2 space-y-1">
                  {e.points.map((pt) => (
                    <li key={pt} className="text-sm text-foreground/85 leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </section>

      {/* Education + certs */}
      <section id="education" className="site-shell section-block">
        <Reveal>
          <h2 className="section-label">Education</h2>
        </Reveal>
        <Stagger className="space-y-1" fast>
          {education.map((ed) => (
            <RevealItem
              key={ed.school}
              as="li"
              className={cn(
                "grid grid-cols-[auto_1fr] gap-3.5 items-start rounded-xl -mx-2 px-2 py-2.5 list-none",
                ed.programExpand && "group/edu [@media(hover:hover)]:hover:bg-muted/40",
              )}
            >
              <span className="icon-tile">
                <GraduationCap className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="muted" className="tabular-nums">
                    {ed.period}
                  </Badge>
                  {ed.status ? <Badge variant={statusVariant(ed.status)}>{ed.status}</Badge> : null}
                </div>
                <p className="mt-1 text-[15px] font-semibold tracking-tight">
                  {ed.pagePath ? (
                    <Link to={ed.pagePath} className="hover:text-foreground/75 transition-colors">
                      {ed.school}
                    </Link>
                  ) : ed.href ? (
                    <a
                      href={ed.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-foreground/75 transition-colors"
                    >
                      {ed.school}
                    </a>
                  ) : (
                    ed.school
                  )}
                </p>
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
            </RevealItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <h2 className="section-label">Certifications</h2>
          <Stagger className="space-y-4" fast>
            {certifications.map((cert) => (
              <RevealItem
                key={`${cert.issuer}-${cert.title}`}
                className="grid grid-cols-[auto_1fr] gap-3.5 items-start"
              >
                <span className="icon-tile">
                  <Award className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="muted" className="tabular-nums">
                      {cert.period}
                    </Badge>
                    {cert.status ? (
                      <Badge variant={statusVariant(cert.status)}>{cert.status}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[15px] font-semibold tracking-tight">
                    {cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground/75 transition-colors"
                      >
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>
      </section>

      {/* Stack + languages */}
      <section id="skills" className="site-shell section-block">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="section-label mb-0">Stack</h2>
            <Link
              to="/skills"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <Stagger className="flex flex-wrap gap-1.5" chips>
            {homeStack.map((s) => (
              <RevealItem key={s} as="span" chip>
                <Badge variant="soft">{s}</Badge>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-10">
          <h2 className="section-label">Languages</h2>
          <Stagger className="flex flex-wrap gap-1.5" chips>
            {spokenLanguages.map((l) => (
              <RevealItem key={l.name} as="span" chip>
                <Badge variant="outline">
                  <span className="text-foreground">{l.name}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span className="text-muted-foreground">{l.level}</span>
                </Badge>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="site-shell pt-10 sm:pt-14 pb-4">
        <Reveal>
          <h2 className="section-label">Contact</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/card">
                <QrCode className="h-4 w-4" />
                Card
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground" asChild>
              <Link to="/contact">More</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
