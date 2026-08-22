import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, MapPin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import {
  clientGroups,
  getProjectsByClient,
  getSiblingProjects,
  projects,
  workHref,
} from "@/data/projects";
import { experience } from "@/data/experience";
import { courseEntries, type StudyGroup, type StudyItem } from "@/data/education";
import { site } from "@/data/site";
import { Seo } from "@/components/Seo";
import { OccasionNote } from "@/components/SeasonalDress";
import { HeroIntro, HeroItem, StoryEntry, StoryHeading } from "@/components/Motion";
import { ExpandableAcronym } from "@/components/ExpandableAcronym";

function brandFor(slug?: string) {
  return clientGroups.find((g) => g.id === slug);
}

function StudyBeat({ group, items }: { group: StudyGroup; items: StudyItem[] }) {
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
                    <Link to={item.href!}>Open</Link>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      Certificate
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
  const courses = courseEntries();

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
            image: `${site.siteUrl}/og-image-light.png`,
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
            <div className="min-w-0">
              <h1 className="hero-id-name">{site.name}</h1>
              <p className="hero-id-subtitle">{site.subtitle}</p>
              <p className="hero-id-meta">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Studying in Barcelona
                </span>
              </p>
              <OccasionNote />
            </div>
          </HeroItem>

          <HeroItem className="hero-actions">
            <Button variant="hero" asChild>
              <Link to="/about">About me</Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <a href="#work">Selected work</a>
            </Button>
          </HeroItem>

          <HeroItem className="hero-scroll-cue" as="p">
            <a href="#work" aria-label="Scroll to see my work and experience">
              <span>Scroll to see more about my work and experience</span>
              <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </a>
          </HeroItem>
        </HeroIntro>
      </section>

      {/* Selected Work section */}
      <section id="work" className="site-shell story-section">
        <StoryHeading tag="Selected Work">Things I've built.</StoryHeading>
        <div className="space-y-6 sm:space-y-8">
          {projects.map((project) => {
            const siblings = getSiblingProjects(project.slug);
            return (
              <StoryEntry key={project.slug}>
                <article id={project.slug} className="work-card">
                  <div className="work-card-copy">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={project.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-md object-contain border border-border/60 bg-card p-0.5 shrink-0 shadow-sm"
                        />
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                        {project.year}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-snug text-pretty">
                      {project.description}
                    </p>

                    {siblings.length > 0 ? (
                      <div className="work-tags">
                        {siblings.map((sibling) => (
                          <Link key={sibling.slug} to={workHref(sibling.slug)}>
                            {sibling.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-card-site pressable"
                    aria-label={`Open ${project.title}`}
                  >
                    <img
                      src={project.cover}
                      alt=""
                      width={1200}
                      height={750}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </article>
              </StoryEntry>
            );
          })}
        </div>
      </section>

      {/* Experience section */}
      <section id="working" className="site-shell story-section">
        <StoryHeading tag="Experience">I'm working with.</StoryHeading>
        {working.map((job) => {
          const brand = brandFor(job.projectSlug);
          const projectList = job.projectSlug ? getProjectsByClient(job.projectSlug) : [];
          return (
            <StoryEntry key={job.company}>
              <div className="org-head">
                {brand ? (
                  <img src={brand.icon} alt="" width={36} height={36} className="brand-mark" />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="text-[15px] font-semibold tracking-tight">{job.company}</p>
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
              {projectList.length > 0 ? (
                <div className="story-links">
                  {projectList.map((project) => (
                    <Link key={project.slug} to={workHref(project.slug)}>
                      {project.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </StoryEntry>
          );
        })}
      </section>

      {courses.length > 0 ? (
        <section id="courses" className="site-shell story-section">
          <StoryHeading tag="Courses">Courses.</StoryHeading>
          {courses.map(({ group, items }) => (
            <StudyBeat key={group.id} group={group} items={items} />
          ))}
        </section>
      ) : null}

      {/* Contact & Bridge section */}
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
