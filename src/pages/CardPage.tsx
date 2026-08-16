import { useCallback, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  Check,
  Github,
  Linkedin,
  MapPin,
  Share2,
  Download,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Pressable } from "@/components/Pressable";
import { site } from "@/data/site";
import { cardUrl, downloadVCard } from "@/lib/vcard";
import { haptic } from "@/lib/haptics";
import avatar from "@/assets/avatar.webp";
import { Portrait } from "@/components/Portrait";
import { PageEnter } from "@/components/Motion";
import { cn } from "@/lib/utils";

/**
 * Mobile-first digital business card — fills the viewport, scales down on short screens.
 */
export default function CardPage() {
  const [shared, setShared] = useState(false);

  const share = useCallback(async () => {
    const payload = {
      title: site.name,
      text: `${site.name} — ${site.role} in ${site.location}`,
      url: cardUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(cardUrl);
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    } catch {
      // user cancelled share
    }
  }, []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <Seo
        title={`${site.name} — Digital card`}
        description={`Save ${site.name}'s contact — ${site.role} in Barcelona. LinkedIn, GitHub, and portfolio.`}
        path="/card"
        type="profile"
        imageLight="/og-card-light.png"
        imageDark="/og-card-dark.png"
        imageTheme="auto"
        imageAlt={`${site.name} — Digital business card · Student in Barcelona`}
        imageWidth={1200}
        imageHeight={630}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          jobTitle: site.role,
          url: site.siteUrl,
          email: site.email,
          image: `${site.siteUrl}/og-card-light.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressCountry: "ES",
          },
          sameAs: [site.linkedin, site.github],
        }}
      />

      <div className="card-stage">
        <PageEnter as="article" className="card-sheet surface">
          <div className="card-id">
            <Portrait
              src={avatar}
              alt={site.name}
              size="sm"
              imgClassName="card-id-photo rounded-full"
            />
            <div className="card-id-copy">
              <h1 className="card-id-name">{site.name}</h1>
              <p className="card-id-meta">
                <span className="card-id-role">{site.role}</span>
                <span className="card-id-sep" aria-hidden>
                  ·
                </span>
                <span className="card-id-place">
                  <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                  {site.location}
                </span>
              </p>
            </div>
          </div>

          <div className="card-qr">
            <div className="card-qr-frame">
              <QRCode
                value={cardUrl}
                size={256}
                level="M"
                bgColor="#ffffff"
                fgColor="#1a1816"
                className="h-full w-full"
                style={{ height: "100%", width: "100%" }}
                title={`QR code linking to ${site.name}'s digital card`}
              />
            </div>
          </div>

          <div className="card-actions">
            <Pressable
              type="button"
              haptic="medium"
              strength="firm"
              onClick={() => {
                downloadVCard();
                haptic("success");
              }}
              className={cn(
                "card-action inline-flex items-center justify-center gap-1.5 rounded-full",
                "bg-foreground text-background px-3 text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <Download className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              Save
            </Pressable>
            <Pressable
              type="button"
              haptic="light"
              onClick={share}
              className={cn(
                "card-action inline-flex items-center justify-center gap-1.5 rounded-full",
                "border border-border/70 bg-background px-3 text-sm font-medium text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {shared ? (
                <Check className="h-4 w-4 shrink-0 text-[hsl(var(--status-success))]" strokeWidth={2} />
              ) : (
                <Share2 className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              )}
              <span className="inline-grid justify-items-center">
                <span className="invisible col-start-1 row-start-1" aria-hidden>
                  Copied
                </span>
                <span className="col-start-1 row-start-1">{shared ? "Copied" : "Share"}</span>
              </span>
            </Pressable>
          </div>

          <ul className="card-links">
            {(
              [
                {
                  key: "linkedin",
                  href: site.linkedin,
                  external: true,
                  icon: Linkedin,
                  title: "LinkedIn",
                  subtitle: site.linkedinHandle,
                },
                {
                  key: "github",
                  href: site.github,
                  external: true,
                  icon: Github,
                  title: "GitHub",
                  subtitle: `@${site.githubHandle}`,
                },
                {
                  key: "portfolio",
                  href: "/",
                  external: false,
                  icon: Globe,
                  title: "Portfolio",
                  subtitle: "mykolavoronin.com",
                },
              ] as const
            ).map((row) => {
              const Icon = row.icon;
              const className = "card-link pressable pressable-soft";
              const onPointerDown = (e: PointerEvent) => {
                if (e.pointerType !== "mouse" && e.button === 0) haptic("selection");
              };
              const body = (
                <>
                  <span className="card-link-icon">
                    <Icon className="h-3.5 w-3.5 text-foreground/80" strokeWidth={1.75} />
                  </span>
                  <span className="card-link-copy">
                    <span className="card-link-title">{row.title}</span>
                    <span className="card-link-sub">{row.subtitle}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </>
              );

              return (
                <li key={row.key}>
                  {row.external ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      onPointerDown={onPointerDown}
                    >
                      {body}
                    </a>
                  ) : (
                    <Link to={row.href} className={className} onPointerDown={onPointerDown}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </PageEnter>
      </div>
    </div>
  );
}
