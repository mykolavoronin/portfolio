import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { PageEnter, Reveal, Stagger, RevealItem } from "@/components/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`Services — ${site.name}`}
        description="Web development, deployment, and advisory."
        path="/services"
      />
      <div>
        <header className="page-header">
          <p className="section-label">Services</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Services
          </h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="muted">{site.availability.label}</Badge>
          </div>
        </header>

        <Stagger className="space-y-2" fast>
          {services.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="pressable pressable-soft flex items-center justify-between gap-3 rounded-2xl border border-border/65 bg-card px-4 py-3.5 shadow-sm hover:border-foreground/12 transition-colors"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold tracking-tight">{s.title}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {s.short}
                  </span>
                </span>
                <Badge variant="outline" className="tabular-nums shrink-0">
                  {s.price}
                </Badge>
              </Link>
            </RevealItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
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
