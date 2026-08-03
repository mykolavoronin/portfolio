import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://mykolavoronin.com";

export type SeoImageTheme = "light" | "dark" | "auto";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  /** Primary image (absolute or site-relative). Used when theme images are not set. */
  image?: string;
  /**
   * Theme-aware Open Graph images. When `theme` is `auto` (default),
   * picks light/dark from the document theme class.
   */
  imageLight?: string;
  imageDark?: string;
  imageTheme?: SeoImageTheme;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    if (selector.startsWith("link")) {
      el = document.createElement("link");
      const rel = selector.match(/rel="([^"]+)"/)?.[1];
      if (rel) (el as HTMLLinkElement).rel = rel;
    } else {
      el = document.createElement("meta");
      const name = selector.match(/name="([^"]+)"/)?.[1];
      const prop = selector.match(/property="([^"]+)"/)?.[1];
      if (name) (el as HTMLMetaElement).name = name;
      if (prop) (el as HTMLMetaElement).setAttribute("property", prop);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function toAbsolute(image: string) {
  if (image.startsWith("http")) return image;
  return SITE_URL + (image.startsWith("/") ? image : "/" + image);
}

function resolveThemeImage(
  image: string | undefined,
  imageLight: string | undefined,
  imageDark: string | undefined,
  imageTheme: SeoImageTheme,
): string | undefined {
  const hasPair = Boolean(imageLight && imageDark);
  if (!hasPair) {
    return image ? toAbsolute(image) : undefined;
  }

  let preferDark = false;
  if (imageTheme === "dark") preferDark = true;
  else if (imageTheme === "light") preferDark = false;
  else {
    preferDark =
      document.documentElement.classList.contains("dark") ||
      (!document.documentElement.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  return toAbsolute(preferDark ? imageDark! : imageLight!);
}

export function Seo({
  title,
  description,
  path,
  image,
  imageLight,
  imageDark,
  imageTheme = "auto",
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  type = "website",
  jsonLd,
}: SeoProps) {
  const location = useLocation();
  const url = SITE_URL + (path ?? location.pathname);

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");

    const absoluteImage = resolveThemeImage(image, imageLight, imageDark, imageTheme);

    if (absoluteImage) {
      setMeta('meta[property="og:image"]', "content", absoluteImage);
      setMeta('meta[property="og:image:secure_url"]', "content", absoluteImage);
      setMeta('meta[property="og:image:width"]', "content", String(imageWidth));
      setMeta('meta[property="og:image:height"]', "content", String(imageHeight));
      setMeta('meta[property="og:image:type"]', "content", "image/png");
      if (imageAlt) {
        setMeta('meta[property="og:image:alt"]', "content", imageAlt);
      }
      setMeta('meta[name="twitter:image"]', "content", absoluteImage);
      if (imageAlt) {
        setMeta('meta[name="twitter:image:alt"]', "content", imageAlt);
      }
    }

    // Alternate theme image (some unfurlers pick the first; we keep both)
    const altId = "seo-og-image-alt-theme";
    let altMeta = document.getElementById(altId) as HTMLMetaElement | null;
    if (imageLight && imageDark && absoluteImage) {
      const lightAbs = toAbsolute(imageLight);
      const darkAbs = toAbsolute(imageDark);
      const secondary = absoluteImage === lightAbs ? darkAbs : lightAbs;
      if (!altMeta) {
        altMeta = document.createElement("meta");
        altMeta.id = altId;
        altMeta.setAttribute("property", "og:image");
        document.head.appendChild(altMeta);
      }
      altMeta.setAttribute("content", secondary);
    } else if (altMeta) {
      altMeta.remove();
    }

    const id = "seo-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    // Re-resolve when user toggles theme
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (imageTheme !== "auto" || !imageLight || !imageDark) return;
      const next = resolveThemeImage(image, imageLight, imageDark, "auto");
      if (!next) return;
      setMeta('meta[property="og:image"]', "content", next);
      setMeta('meta[property="og:image:secure_url"]', "content", next);
      setMeta('meta[name="twitter:image"]', "content", next);
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [
    title,
    description,
    url,
    image,
    imageLight,
    imageDark,
    imageTheme,
    imageAlt,
    imageWidth,
    imageHeight,
    type,
    jsonLd,
  ]);

  return null;
}
