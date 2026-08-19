import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { PageEnter, Reveal, StoryHeading } from "@/components/Motion";

export default function ServicePage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  if (!service) return <Navigate to="/services" replace />;

  const currentIdx = services.findIndex((s) => s.slug === service.slug);
  const next = services[(currentIdx + 1) % services.length];

  return (
    <PageEnter className="site-shell page-pad">
      <Seo
        title={`${service.title} — ${site.name}`}
        description={service.description}
        path={`/services/${service.slug}`}
      />
      <div>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 min-h-10 sm:min-h-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          All services
        </Link>

        <header className="page-header">
          <p className="story-tag">Service</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">{service.title}</h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed max-w-xl">
            {service.description}
          </p>
        </header>

        <Reveal className="surface p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Pricing</p>
            <p className="text-sm text-muted-foreground mt-1">
              Starting point — every engagement is scoped to your goals.
            </p>
          </div>
          <p className="text-xl font-semibold tracking-tight shrink-0 tabular-nums">{service.price}</p>
        </Reveal>

        {!site.availability.open && (
          <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
            <span className="font-serif-italic text-foreground">{site.availability.label}</span>
            {" — "}
            {site.availability.detail}
          </p>
        )}

        {service.features && service.features.length > 0 && (
          <Reveal className="mb-16 sm:mb-20">
            <StoryHeading tag="Included" className="story-head-static">
              What you get.
            </StoryHeading>
            <ul className="surface divide-y divide-border/50 overflow-hidden">
              {service.features.map((f) => (
                <li key={f} className="flex gap-3 px-4 sm:px-5 py-3 text-sm text-foreground/90 leading-relaxed">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {service.tiers && service.tiers.length > 0 && (
          <Reveal className="mb-16 sm:mb-20">
            <StoryHeading tag="Tiers" className="story-head-static">
              How it can go.
            </StoryHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {service.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="surface p-5 flex flex-col"
                >
                  <p className="text-sm font-semibold text-foreground">{tier.name}</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums">{tier.price}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tier.description}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                        <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className="flex flex-wrap items-center gap-2.5 mb-10">
          <Button variant="outline" asChild>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </Reveal>

        <Reveal>
          <Link
            to={`/services/${next.slug}`}
            className="pressable pressable-soft group flex items-center justify-between gap-4 surface p-5 transition-colors hover:border-foreground/12"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Next service</p>
              <p className="mt-1 text-sm font-semibold text-foreground truncate">{next.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </Link>
        </Reveal>
      </div>
    </PageEnter>
  );
}
