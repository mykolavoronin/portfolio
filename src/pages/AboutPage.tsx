import { MapPin, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { LocalTime } from "@/components/LocalTime";
import { aboutParagraphs, principles, site } from "@/data/site";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function statusVariant(status?: string): "success" | "warn" | "info" | "muted" {
  if (status === "Completed" || status === "Issued") return "success";
  if (status === "In progress") return "warn";
  if (status === "Upcoming") return "info";
  return "muted";
}

export default function AboutPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`About — ${site.name}`}
        description={site.seoDescription}
        path="/about"
      />
      <div>
        <header className="page-header">
          <p className="section-label">About</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            About{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">Mykola.</span>
          </h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="outline">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              {site.location}
            </Badge>
            <Badge variant="muted">
              <LocalTime showIcon={false} showCity={false} />
            </Badge>
          </div>
        </header>

        <Reveal className="rounded-2xl border border-border/65 bg-card p-5 shadow-sm space-y-3 text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="section-label">Principles</h2>
          <Stagger className="flex flex-wrap gap-1.5" chips>
            {principles.map((p) => (
              <RevealItem key={p} as="span" chip>
                <Badge variant="soft">{p}</Badge>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="section-label">Experience</h2>
          <Stagger className="space-y-3" fast>
            {experience.map((job) => (
              <RevealItem
                key={job.company}
                as="article"
                className="rounded-2xl border border-border/65 bg-card p-4 shadow-sm"
              >
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="muted" className="tabular-nums">
                    {job.period}
                  </Badge>
                  <Badge variant="outline">{job.location}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {job.projectSlug ? (
                    <Link to={`/projects/${job.projectSlug}`} className="hover:text-foreground/75">
                      {job.company}
                    </Link>
                  ) : (
                    job.company
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{job.role}</p>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="section-label">Education</h2>
          <ul className="space-y-2.5">
            {education.map((ed) => (
              <li
                key={ed.school}
                className={cn(
                  "rounded-2xl border border-border/65 bg-card p-4 shadow-sm",
                  ed.programExpand && "group/edu",
                )}
              >
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="muted" className="tabular-nums">
                    {ed.period}
                  </Badge>
                  {ed.status ? <Badge variant={statusVariant(ed.status)}>{ed.status}</Badge> : null}
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {ed.pagePath ? (
                    <Link to={ed.pagePath}>{ed.school}</Link>
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
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="section-label">Certifications</h2>
          <ul className="space-y-2.5">
            {certifications.map((cert) => (
              <li
                key={`${cert.issuer}-${cert.title}`}
                className="rounded-2xl border border-border/65 bg-card p-4 shadow-sm"
              >
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="muted" className="tabular-nums">
                    {cert.period}
                  </Badge>
                  {cert.status ? (
                    <Badge variant={statusVariant(cert.status)}>{cert.status}</Badge>
                  ) : null}
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {cert.href ? (
                    <a href={cert.href} target="_blank" rel="noreferrer">
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-2">
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
            <Link to="/contact">Contact</Link>
          </Button>
        </Reveal>
      </div>
    </PageEnter>
  );
}
