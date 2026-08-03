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
import { LocalTime } from "@/components/LocalTime";
import { Pressable } from "@/components/Pressable";
import { site } from "@/data/site";
import { cardUrl, downloadVCard } from "@/lib/vcard";
import { haptic } from "@/lib/haptics";
import avatar from "@/assets/avatar.png";
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
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <Seo
        title={`${site.name} — Digital card`}
        description={`Save ${site.name}'s contact — ${site.role} in Barcelona. LinkedIn, GitHub, and portfolio.`}
        path="/card"
        type="profile"
        imageLight="/og-card-light.png"
        imageDark="/og-card-dark.png"
        imageTheme="auto"
        imageAlt={`${site.name} — Digital business card · Software Engineer in Barcelona`}
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

      {/* Viewport-filling stage — card adapts to available height */}
      <div
        className={cn(
          "flex flex-1 min-h-0 flex-col items-center justify-center",
          "w-full max-w-[420px] mx-auto",
          "px-3 xs:px-4 sm:px-5",
          "py-2 sm:py-4",
          "safe-pb",
        )}
      >
        <article
          className={cn(
            "card-stage relative flex w-full min-h-0 flex-col overflow-hidden",
            "rounded-[1.25rem] sm:rounded-[1.75rem]",
            "border border-border/60 bg-card",
            "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-14px_rgb(0_0_0/0.14)]",
            "dark:shadow-[0_1px_2px_rgb(0_0_0/0.4),0_20px_48px_-14px_rgb(0_0_0/0.55)]",
            "max-h-full",
          )}
        >
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain",
              "px-4 pt-4 pb-4",
              "min-[380px]:px-5 min-[380px]:pt-5 min-[380px]:pb-5",
              "sm:px-7 sm:pt-7 sm:pb-6",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            {/* Identity — compact on short viewports */}
            <div className="flex shrink-0 flex-col items-center text-center">
              <img
                src={avatar}
                alt=""
                width={80}
                height={80}
                className={cn(
                  "rounded-full object-cover object-top ring-1 ring-border/60 shadow-md bg-muted",
                  "h-14 w-14 min-[380px]:h-16 min-[380px]:w-16 sm:h-[5.25rem] sm:w-[5.25rem]",
                )}
              />
              <h1
                className={cn(
                  "mt-2.5 min-[380px]:mt-3 sm:mt-4 font-semibold tracking-tight text-foreground",
                  "text-lg min-[380px]:text-[1.25rem] sm:text-xl",
                )}
              >
                {site.name}
              </h1>
              <p className="mt-0.5 text-xs min-[380px]:text-sm text-muted-foreground">{site.role}</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] min-[380px]:text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" strokeWidth={1.75} />
                {site.location}
              </p>
              <p className="mt-1 text-[10px] min-[380px]:text-[11px] text-muted-foreground/90">
                <LocalTime showIcon className="justify-center" />
              </p>
            </div>

            {/* QR — scales with viewport */}
            <div className="mt-3 min-[380px]:mt-4 sm:mt-6 flex shrink-0 flex-col items-center">
              <div
                className={cn(
                  "rounded-xl min-[380px]:rounded-2xl border border-border/60 bg-white shadow-sm",
                  "p-2.5 min-[380px]:p-3 sm:p-4",
                  "w-[min(42vw,9.5rem)] min-[380px]:w-[min(40vw,10.5rem)] sm:w-[11.5rem]",
                  "aspect-square",
                )}
              >
                <QRCode
                  value={cardUrl}
                  size={256}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#1a1816"
                  className="h-full w-full"
                  style={{ height: "100%", width: "100%", maxWidth: "100%" }}
                  title={`QR code linking to ${site.name}'s digital card`}
                />
              </div>
              <p className="mt-2 text-[10px] min-[380px]:text-[11px] text-muted-foreground text-center leading-snug max-w-[15rem]">
                Scan · save to contacts · share
              </p>
            </div>

            {/* Primary actions */}
            <div className="mt-3 min-[380px]:mt-4 sm:mt-5 grid shrink-0 grid-cols-1 gap-1.5 min-[380px]:gap-2">
              <Pressable
                type="button"
                haptic="medium"
                strength="firm"
                onClick={() => {
                  downloadVCard();
                  haptic("success");
                }}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full",
                  "bg-foreground text-background px-4 text-sm font-medium",
                  "min-h-11 min-[380px]:min-h-12 py-2.5 hover:opacity-90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <Download className="h-4 w-4" strokeWidth={1.75} />
                Save to contacts
              </Pressable>
              <Pressable
                type="button"
                haptic="light"
                onClick={share}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full",
                  "border border-border/70 bg-background px-4 text-sm font-medium text-foreground",
                  "min-h-11 min-[380px]:min-h-12 py-2.5 hover:bg-muted/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                {shared ? (
                  <Check className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                ) : (
                  <Share2 className="h-4 w-4" strokeWidth={1.75} />
                )}
                {shared ? "Link copied" : "Share card"}
              </Pressable>
            </div>

            {/* Social rows — denser on mobile */}
            <ul className="mt-3 min-[380px]:mt-4 sm:mt-5 shrink-0 divide-y divide-border/50 border-y border-border/50">
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
                const className =
                  "pressable pressable-soft flex items-center gap-2.5 min-[380px]:gap-3 py-2.5 min-[380px]:py-3 min-h-11 min-[380px]:min-h-12 group";
                const onPointerDown = (e: PointerEvent) => {
                  if (e.pointerType !== "mouse" && e.button === 0) haptic("selection");
                };
                const body = (
                  <>
                    <span className="flex h-8 w-8 min-[380px]:h-9 min-[380px]:w-9 items-center justify-center rounded-xl border border-border/60 bg-muted/40 shrink-0">
                      <Icon className="h-3.5 w-3.5 min-[380px]:h-4 min-[380px]:w-4 text-foreground/80" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 min-w-0 text-left">
                      <span className="block text-[13px] min-[380px]:text-sm font-medium text-foreground">
                        {row.title}
                      </span>
                      <span className="block text-[11px] min-[380px]:text-xs text-muted-foreground truncate">
                        {row.subtitle}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
                  </>
                );

                return (
                  <li key={row.key}>
                    {row.external ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noreferrer"
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

            {/* Bio — hide on very short screens to keep card on one view */}
            <p className="mt-3 sm:mt-4 text-center text-[10px] min-[380px]:text-[11px] text-muted-foreground leading-relaxed max-sm:line-clamp-2 sm:line-clamp-none [@media(max-height:700px)]:hidden">
              {site.shortBio}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
