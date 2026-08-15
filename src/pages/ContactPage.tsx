import { Link } from "react-router-dom";
import { Github, Linkedin, MapPin, ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { LocalTime } from "@/components/LocalTime";
import { CopyButton } from "@/components/CopyButton";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";

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
        description={`Connect with ${site.name} on LinkedIn or GitHub. Digital business card with QR and save to contacts.`}
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
            LinkedIn or GitHub. The card is there if you want a QR or a contact file.
          </p>
        </header>

        <Reveal className="mb-8 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm">
            <MapPin className="h-3 w-3" strokeWidth={1.75} />
            {site.location}
          </span>
          <span className="inline-flex items-center rounded-full border border-border/70 bg-card px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm">
            <LocalTime />
          </span>
        </Reveal>

        <Reveal className="mb-10">
          <Link
            to="/card"
            className="pressable pressable-soft group relative flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden surface p-5 sm:p-6 transition-[border-color] duration-150 hover:border-foreground/12"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted/40">
              <QrCode className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-tight text-foreground">Digital business card</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Full-page mobile card with QR, save to contacts, and share.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 group-hover:text-foreground">
              Open card
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>

        <Reveal className="mb-10 flex flex-wrap gap-2.5">
          <Button asChild>
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
        </Reveal>

        <Stagger
          className="surface divide-y divide-border/50 overflow-hidden"
          fast
        >
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
      </div>
    </PageEnter>
  );
}
