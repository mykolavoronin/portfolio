import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Linkedin, MapPin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.webp";
import { LocalTime } from "@/components/LocalTime";
import { clientGroups, getProjectsByClient } from "@/data/projects";
import { experience } from "@/data/experience";
import { groupLane, studyGroups, visibleItems, type StudyGroup } from "@/data/education";
import { site } from "@/data/site";
import { Seo } from "@/components/Seo";
import { Portrait } from "@/components/Portrait";
import { HeroIntro, HeroItem, StoryEntry, StoryHeading } from "@/components/Motion";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";

function brandFor(slug?: string) {
  return clientGroups.find((g) => g.id === slug);
}

function StudyBeat({ group }: { group: StudyGroup }) {
  const items = visibleItems(group);
  if (items.length === 0) return null;

  return (
    <StoryEntry>
      <div className="org-head">
        <img src={group.icon} alt="" width={36} height={36} className="brand-mark" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            {group.pagePath ? (
              <Link
                to={group.pagePath}
                className="text-[15px] font-semibold tracking-tight hover:text-foreground/75 transition-colors"
              >
                {group.name}
              </Link>
            ) : group.href ? (
              <a
                href={group.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold tracking-tight hover:text-foreground/75 transition-colors"
              >
                {group.name}
              </a>
            ) : (
              <p className="text-[15px] font-semibold tracking-tight">{group.name}</p>
            )}
            {group.location ? (
              <span className="text-xs text-muted-foreground">{group.location}</span>
            ) : null}
          </div>
        </div>
      </div>

      <ul className="org-items">
        {items.map((item) => {
          const extraHref = item.href && item.href !== group.href && item.href !== group.pagePath;
          return (
            <li key={`${group.id}-${item.title}`}>
              <div className="text-sm text-muted-foreground">
                {item.programExpand ? (
                  <ExpandableAcronym
                    prefix={item.programExpand.prefix}
                    short={item.programExpand.short}
                    full={item.programExpand.full}
                    className="text-sm text-muted-foreground"
                  />
                ) : (
                  item.title
                )}
              </div>
              <div className="story-links">
                <span className="inline-flex items-center text-xs text-muted-foreground tabular-nums">
                  {item.period}
                </span>
                {extraHref ? (
                  item.href!.startsWith("/") ? (
                    <Link to={item.href!}>
                      Open
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      Certificate
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </StoryEntry>
  );
}

export default function HomePage() {
  const working = experience;
  const studied = studyGroups.filter((g) => groupLane(g) === "studied");

  return (
    <div className="relative">
      <Seo
        title={`${site.name} — Student in Barcelona`}
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

      <section className="site-shell hero-stage">
        <HeroIntro>
          <HeroItem className="hero-id">
            <Portrait src={avatar} alt={site.name} size="md" />
            <div className="min-w-0">
              <h1 className="hero-id-name">{site.name}</h1>
              <p className="hero-id-meta">
                <span>{site.role}</span>
                <span className="hero-id-dot" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Barcelona
                </span>
                <span className="hero-id-dot" aria-hidden>
                  ·
                </span>
                <LocalTime showIcon={false} showCity={false} />
              </p>
            </div>
          </HeroItem>
        </HeroIntro>
      </section>

      <section id="working" className="site-shell story-section">
        <StoryHeading tag="Work">I'm working here.</StoryHeading>
        {working.map((job) => {
          const brand = brandFor(job.projectSlug);
          const projects = job.projectSlug ? getProjectsByClient(job.projectSlug) : [];
          return (
            <StoryEntry key={job.company}>
              <div className="org-head">
                {brand ? (
                  <img src={brand.icon} alt="" width={36} height={36} className="brand-mark" />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    {job.projectSlug ? (
                      <Link
                        to={`/projects/${job.projectSlug}`}
                        className="text-[15px] font-semibold tracking-tight hover:text-foreground/75 transition-colors"
                      >
                        {job.company}
                      </Link>
                    ) : (
                      <p className="text-[15px] font-semibold tracking-tight">{job.company}</p>
                    )}
                    <span className="text-xs text-muted-foreground tabular-nums">{job.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {job.role}
                    <span className="text-border mx-1.5" aria-hidden>
                      ·
                    </span>
                    {job.location}
                  </p>
                </div>
              </div>
              <ul className="story-highlights">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {projects.length > 0 ? (
                <div className="story-links">
                  {projects.map((project) => (
                    <Link key={project.slug} to={`/projects/${project.slug}`}>
                      {project.title}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                  {job.externalHref ? (
                    <a href={job.externalHref} target="_blank" rel="noopener noreferrer">
                      Visit
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </StoryEntry>
          );
        })}
      </section>

      <section id="studied" className="site-shell story-section">
        <StoryHeading tag="Education">I've studied here.</StoryHeading>
        {studied.map((group) => (
          <StudyBeat key={group.id} group={group} />
        ))}
      </section>

      <section id="contact" className="site-shell story-close">
        <StoryHeading tag="Contact" className="story-head-center">
          Find me.
        </StoryHeading>
        <p className="max-w-sm text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
          LinkedIn, GitHub, or the card — whichever is easiest.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <Button variant="outline" asChild>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
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
        </div>
      </section>
    </div>
  );
}
