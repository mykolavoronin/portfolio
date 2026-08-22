import { MapPin, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { LocalTime } from "@/components/LocalTime";
import { aboutParagraphs, hobbies, site } from "@/data/site";
import { experience } from "@/data/experience";
import { clientGroups, getProjectsByClient, workHref } from "@/data/projects";
import { homeStack, spokenLanguages } from "@/data/skills";
import { CourseGroups, BasicEducationFold } from "@/components/StudyGroups";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";
import { StackMark } from "@/components/StackMark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`About — ${site.name}`}
        description={site.seoDescription}
        path="/about"
      />
      <div>
        <header className="page-header">
          <p className="story-tag">About</p>
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

        <Reveal className="surface p-5 sm:p-6 space-y-3 text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Focus" className="story-head-static">
            Core stack.
          </StoryHeading>
          <div className="surface p-4 sm:p-5">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3.5">
              Tools and technologies I use to build and ship production software.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {homeStack.map((tech) => (
                <span key={tech} className="stack-chip">
                  <StackMark name={tech} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Languages" className="story-head-static">
            I speak these.
          </StoryHeading>
          <ul className="surface divide-y divide-border/50 overflow-hidden">
            {spokenLanguages.map((lang) => (
              <li key={lang.name} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
                <span className="inline-flex items-center gap-2.5 min-w-0">
                  <img
                    src={lang.flag}
                    alt=""
                    width={20}
                    height={14}
                    className="lang-flag"
                  />
                  <span className="text-sm font-medium text-foreground">{lang.name}</span>
                </span>
                <span className="text-xs text-muted-foreground shrink-0">{lang.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Life" className="story-head-static">
            Outside the work.
          </StoryHeading>
          <Stagger as="ul" className="space-y-2.5" fast>
            {hobbies.map((h) => (
              <RevealItem key={h.title} as="li" className="surface life-card">
                {"image" in h && h.image ? (
                  <img src={h.image} alt="" width={88} height={88} className="life-mark" />
                ) : null}
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-tight">{h.title}</p>
                  {"owned" in h || "badge" in h || "swatch" in h ? (
                    <span className="life-meta">
                      {"owned" in h && h.owned ? (
                        <span className="life-owned">{h.owned}</span>
                      ) : null}
                      {"badge" in h && h.badge ? (
                        <span className="life-badge">
                          <img src={h.badge.src} alt="" width={28} height={28} />
                          {h.badge.label}
                        </span>
                      ) : null}
                      {"swatch" in h && h.swatch ? (
                        <span className="life-badge">
                          <span className="life-swatch" data-tone={h.swatch.tone} />
                          {h.swatch.label}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{h.detail}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Work" className="story-head-static">
            I'm working with.
          </StoryHeading>
          <Stagger className="space-y-2.5" fast>
            {experience.map((job) => {
              const brand = clientGroups.find((g) => g.id === job.projectSlug);
              const projectList = job.projectSlug ? getProjectsByClient(job.projectSlug) : [];
              return (
                <RevealItem
                  key={job.company}
                  as="article"
                  className="surface p-4 sm:p-5"
                >
                  <div className="org-head">
                    {brand ? (
                      <img src={brand.icon} alt="" width={36} height={36} className="brand-mark" />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <p className="text-sm font-semibold tracking-tight">{job.company}</p>
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
                  {projectList.length > 0 ? (
                    <div className="story-links">
                      {projectList.map((project) => (
                        <Link key={project.slug} to={workHref(project.slug)}>
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </RevealItem>
              );
            })}
          </Stagger>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Courses" className="story-head-static">
            Courses.
          </StoryHeading>
          <CourseGroups variant="surface" />
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Education" className="story-head-static">
            I've studied here.
          </StoryHeading>
          <BasicEducationFold variant="surface" />
        </Reveal>

        <Reveal className="page-section flex flex-wrap gap-2">
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
            <Link to="/contact">Find me</Link>
          </Button>
        </Reveal>
      </div>
    </PageEnter>
  );
}
