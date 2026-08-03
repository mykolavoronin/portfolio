import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { aboutParagraphs, principles, site } from "@/data/site";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";

export default function AboutPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`About — ${site.name}, Software Engineer in Barcelona`}
        description={`A short story about ${site.name} — a Barcelona-based software engineer who builds calm, fast, considered web products.`}
        path="/about"
      />
      <div>
        <header className="mb-10">
          <p className="section-label">About</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            About{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">Mykola — a short story.</span>
          </h1>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" strokeWidth={1.75} /> {site.location} · {site.timezone}
          </p>
        </header>

        <Reveal className="space-y-5 text-fluid-base text-foreground/90 leading-relaxed">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Principles</p>
          <ul className="space-y-3">
            {principles.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                <span className="mt-2 inline-block h-1 w-1 rounded-full bg-muted-foreground/60 shrink-0" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Experience</p>
          <Stagger className="space-y-6" fast>
            {experience.map((job) => (
              <RevealItem key={job.company} as="article">
                <p className="text-xs text-muted-foreground">
                  {job.period} · {job.location}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {job.projectSlug ? (
                    <Link
                      to={`/projects/${job.projectSlug}`}
                      className="hover:underline underline-offset-4 decoration-foreground/30"
                    >
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
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Education</p>
          <ul className="space-y-5">
            {education.map((ed) => (
              <li
                key={ed.school}
                className={
                  ed.programExpand
                    ? "group/edu -mx-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-muted/40"
                    : undefined
                }
              >
                <p className="text-xs text-muted-foreground">{ed.period}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{ed.school}</p>
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
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Certifications</p>
          <ul className="space-y-5">
            {certifications.map((cert) => (
              <li key={`${cert.issuer}-${cert.title}`}>
                <p className="text-xs text-muted-foreground">
                  {cert.period}
                  {cert.status ? ` · ${cert.status}` : ""}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4 decoration-foreground/30"
                    >
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

        <Reveal className="mt-12">
          <p className="text-sm text-muted-foreground">
            Find me on{" "}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>
    </PageEnter>
  );
}
