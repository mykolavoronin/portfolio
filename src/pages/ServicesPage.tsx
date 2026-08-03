import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { PageEnter, Stagger, RevealItem } from "@/components/Motion";

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mykola Voronin — Software Engineering & AI Services",
    url: `${site.siteUrl}/services`,
    areaServed: "Worldwide",
    provider: {
      "@type": "Person",
      name: site.name,
      url: site.siteUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
        priceSpecification: { "@type": "PriceSpecification", price: s.price },
      })),
    },
  };

  return (
    <PageEnter className="site-shell pt-8 pb-16">
      <Seo
        title="Services — Mykola Voronin"
        description="AI workflow integration, AI product development, site rescue and technical advisory by Mykola Voronin — a Barcelona-based software engineer."
        path="/services"
        jsonLd={servicesJsonLd}
      />
      <div>
        <header className="mb-10">
          <p className="section-label">Services</p>
          <h1 className="text-fluid-3xl font-semibold tracking-tight">
            Services —{" "}
            <span className="font-serif-italic font-normal text-muted-foreground">quiet craft, loud results.</span>
          </h1>
          <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">
            A short menu of things I do well. Pricing is a starting point — every engagement is scoped to your goals.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-serif-italic text-foreground">{site.availability.label}</span> while I focus on
            school. Still happy to chat about future work.
          </p>
        </header>

        <Stagger className="divide-y divide-border/60 border-y border-border/60">
          {services.map((s) => (
            <RevealItem key={s.slug} as="article" className="py-6">
              <Link to={`/services/${s.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h2 className="text-base font-semibold text-foreground group-hover:underline underline-offset-4">
                    {s.title}
                  </h2>
                  <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
                    {s.price}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-10 flex flex-wrap gap-2.5">
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
        </div>
      </div>
    </PageEnter>
  );
}
