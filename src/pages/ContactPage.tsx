import { Link } from "react-router-dom";
import { Github, Linkedin, MapPin, ArrowRight, QrCode } from "lucide-react";
import { Seo } from "@/components/Seo";
import { LocalTime } from "@/components/LocalTime";
import { CopyButton } from "@/components/CopyButton";
import { site } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { PageEnter, Reveal, Stagger, RevealItem, StoryHeading } from "@/components/Motion";

const methods = [
  {
    name: "LinkedIn",
    value: site.linkedinHandle,
    href: site.linkedin,
    icon: Linkedin,
  },
  {
    name: "GitHub",
    value: `@${site.githubHandle}`,
    href: site.github,
    icon: Github,
  },
];

export default function ContactPage() {
  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`Contact — ${site.name}`}
        description={`Connect with ${site.name} on LinkedIn or GitHub. Digital card: save a contact, or scan to open this page on another phone.`}
        path="/contact"
      />
      <div>
        <header className="page-header">
          <p className="story-tag">Contact</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Find me{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">here.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed max-w-xl">
            LinkedIn or GitHub. The card has a contact file, and a code that opens this page on another phone.
          </p>
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

        <Reveal>
          <StoryHeading tag="Card" className="story-head-static">
            The short version.
          </StoryHeading>
          <Link
            to="/card"
            className="pressable pressable-soft group relative flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden surface p-5 sm:p-6 transition-colors hover:border-foreground/12"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/30 shadow-sm">
              <QrCode className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-tight text-foreground">Digital business card</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Save a contact file, or scan the code to open this page on another phone.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Open card
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>

        <Reveal className="page-section">
          <StoryHeading tag="Direct" className="story-head-static">
            Write or look me up.
          </StoryHeading>
          <Stagger className="surface divide-y divide-border/50 overflow-hidden" fast>
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <RevealItem key={m.name} as="div">
                <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 flex-1 items-center gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/30 shadow-sm">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{m.name}</span>
                      <span className="block text-sm text-muted-foreground truncate">{m.value}</span>
                    </span>
                  </a>
                  <CopyButton value={m.href} label="Copy" />
                </div>
              </RevealItem>
            );
          })}
          </Stagger>
        </Reveal>
      </div>
    </PageEnter>
  );
}
