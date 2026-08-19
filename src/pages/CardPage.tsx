import { useCallback, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  Github,
  Linkedin,
  MapPin,
  Share2,
  Download,
  ArrowUpRight,
  Globe,
  Mail,
  Link2,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Pressable } from "@/components/Pressable";
import { site } from "@/data/site";
import { cardUrl, downloadVCard } from "@/lib/vcard";
import { haptic } from "@/lib/haptics";
import { PageEnter } from "@/components/Motion";
import { cn } from "@/lib/utils";

const links = [
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
    key: "email",
    href: `mailto:${site.email}`,
    external: true,
    icon: Mail,
    title: "Email",
    subtitle: site.email,
  },
  {
    key: "portfolio",
    href: "/",
    external: false,
    icon: Globe,
    title: "Portfolio",
    subtitle: "mykolavoronin.com",
  },
] as const;

function canNativeShare(payload: ShareData) {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") return false;
  try {
    if (typeof navigator.canShare === "function") return navigator.canShare(payload);
  } catch {
    return false;
  }
  return true;
}

/**
 * Digital card: a centred sheet that fits the screen it is on.
 * Short viewports drop the explanation; wide ones sit identity beside the code.
 */
export default function CardPage() {
  const reduce = useReducedMotion();
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nativeShare] = useState(() =>
    canNativeShare({
      title: site.name,
      text: `${site.name} — ${site.role} in ${site.location}`,
      url: cardUrl,
    }),
  );

  const share = useCallback(async () => {
    const payload = {
      title: site.name,
      text: `${site.name} — ${site.role} in ${site.location}`,
      url: cardUrl,
    };
    try {
      if (canNativeShare(payload)) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(cardUrl);
      setShared(true);
      haptic("success");
      window.setTimeout(() => setShared(false), 1600);
    } catch {
      // user cancelled the sheet
    }
  }, []);

  const save = useCallback(() => {
    downloadVCard();
    setSaved(true);
    haptic("success");
    window.setTimeout(() => setSaved(false), 1600);
  }, []);

  const status =
    saved ? "Contact file ready." : shared ? "Link copied." : "";

  const iconSwap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
      };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <Seo
        title={`${site.name} — Digital card`}
        description={`Save ${site.name}'s contact, or scan the code to open this page on another phone. ${site.role} in Barcelona.`}
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
          image: `${site.siteUrl}/og-image-light.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressCountry: "ES",
          },
          sameAs: [site.linkedin, site.github],
        }}
      />

      <div className="card-stage">
        <PageEnter as="article" className="card-sheet">
          <header className="card-id">
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
          </header>

          <p className="card-hint">
            Save puts a contact file on your device. Share sends this page — or copies the
            link. Scan the code to open the same page on another phone.
          </p>

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
                title={`QR code — opens this same page on another phone`}
              />
            </div>
            <p className="card-qr-caption">Scan to open this page on another phone.</p>
          </div>

          <div className="card-actions">
            <Pressable
              type="button"
              haptic="medium"
              strength="firm"
              onClick={save}
              aria-describedby="card-status"
              className={cn(
                "card-action inline-flex items-center justify-center gap-1.5 rounded-full",
                "bg-foreground text-background px-3 text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <span className="relative block h-4 w-4 shrink-0">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={saved ? "check" : "down"}
                    className="absolute inset-0 inline-flex items-center justify-center"
                    {...iconSwap}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  >
                    {saved ? (
                      <Check className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Download className="h-4 w-4" strokeWidth={1.75} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="inline-grid justify-items-center">
                <span className="invisible col-start-1 row-start-1" aria-hidden>
                  Save contact
                </span>
                <span className="col-start-1 row-start-1">{saved ? "Saved" : "Save contact"}</span>
              </span>
            </Pressable>
            <Pressable
              type="button"
              haptic="light"
              onClick={share}
              aria-describedby="card-status"
              className={cn(
                "card-action inline-flex items-center justify-center gap-1.5 rounded-full",
                "border border-border/70 bg-background px-3 text-sm font-medium text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <span className="relative block h-4 w-4 shrink-0">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={shared ? "check" : nativeShare ? "share" : "link"}
                    className="absolute inset-0 inline-flex items-center justify-center"
                    {...iconSwap}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  >
                    {shared ? (
                      <Check className="h-4 w-4 text-[hsl(var(--status-success))]" strokeWidth={2} />
                    ) : nativeShare ? (
                      <Share2 className="h-4 w-4" strokeWidth={1.75} />
                    ) : (
                      <Link2 className="h-4 w-4" strokeWidth={1.75} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="inline-grid justify-items-center">
                <span className="invisible col-start-1 row-start-1" aria-hidden>
                  Share card
                </span>
                <span className="col-start-1 row-start-1">
                  {shared ? "Copied" : nativeShare ? "Share card" : "Copy link"}
                </span>
              </span>
            </Pressable>
          </div>

          <p id="card-status" className="sr-only" aria-live="polite">
            {status}
          </p>

          <ul className="card-links">
            {links.map((row) => {
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
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 card-link-go" />
                </>
              );

              return (
                <li key={row.key}>
                  {row.external ? (
                    <a
                      href={row.href}
                      target={row.key === "email" ? undefined : "_blank"}
                      rel={row.key === "email" ? undefined : "noopener noreferrer"}
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
