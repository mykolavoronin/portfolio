import { Clock, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { site } from "@/data/site";
import { PageEnter, Reveal } from "@/components/Motion";

const methods = [
  {
    name: "LinkedIn",
    value: site.linkedinHandle,
    href: site.linkedin,
    icon: Linkedin,
  },
  {
    name: "GitHub",
    value: site.githubHandle,
    href: site.github,
    icon: Github,
  },
];

export default function ContactPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`Contact — ${site.name}, Software Engineer in Barcelona`}
        description={`Connect with ${site.name} on LinkedIn or GitHub — software engineer based in Barcelona.`}
        path="/contact"
      />
      <div>
        <header className="mb-10">
          <p className="section-label">Contact</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Find me{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">online.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">
            Best places to reach me are LinkedIn and GitHub.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-serif-italic text-foreground">{site.availability.label}</span>
            {" — "}
            {site.availability.detail}
          </p>
        </header>

        <Reveal className="mb-8 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" strokeWidth={1.75} />
            {site.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" strokeWidth={1.75} />
            {site.timezone}
          </span>
        </Reveal>

        <div className="mb-10 flex flex-wrap gap-2.5">
          <Button variant="outline" size="default" asChild>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="default" asChild>
            <a href={site.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>

        <ul className="divide-y divide-border/60 border-y border-border/60">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.name}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                  </span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {m.value}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </PageEnter>
  );
}
