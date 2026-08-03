import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { PageEnter } from "@/components/Motion";

export default function ServicePage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  if (!service) return <Navigate to="/services" replace />;

  const currentIdx = services.findIndex((s) => s.slug === service.slug);
  const next = services[(currentIdx + 1) % services.length];

  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title={`${service.title} — Mykola Voronin`}
        description={service.description}
        path={`/services/${service.slug}`}
      />
      <div>
        <header className="mb-10">
          <p className="section-label">Service</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">{service.title}</h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">{service.description}</p>
        </header>

        <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Pricing</p>
            <p className="text-sm text-muted-foreground mt-1">
              Starting point — every engagement is scoped to your goals.
            </p>
          </div>
          <p className="text-xl font-semibold tracking-tight shrink-0">{service.price}</p>
        </div>

        {!site.availability.open && (
          <p className="mb-8 text-sm text-muted-foreground">
            <span className="font-serif-italic text-foreground">{site.availability.label}</span>
            {" — "}
            {site.availability.detail}
          </p>
        )}

        {service.features && service.features.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.16em] text-muted-foreground font-medium mb-5">
              What's included
            </h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                  <Check className="h-4 w-4 text-foreground/70 shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.tiers && service.tiers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.16em] text-muted-foreground font-medium mb-5">
              Tiers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {service.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-border/70 bg-card p-5 flex flex-col"
                >
                  <p className="text-sm font-semibold text-foreground">{tier.name}</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{tier.price}</p>
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
          </section>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Button variant="outline" size="default" asChild>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="default" asChild>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="default" asChild>
            <Link to="/services">All services</Link>
          </Button>
        </div>

        <Link
          to={`/services/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:border-foreground/25"
        >
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Next service</p>
            <p className="mt-1 text-sm font-semibold text-foreground truncate">{next.title}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </PageEnter>
  );
}
