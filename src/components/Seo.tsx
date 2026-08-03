import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://mykolavoronin.com";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
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

export function Seo({ title, description, path, image, type = "website", jsonLd }: SeoProps) {
  const location = useLocation();
  const url = SITE_URL + (path ?? location.pathname);
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : SITE_URL + (image.startsWith("/") ? image : "/" + image)
    : undefined;

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
    if (absoluteImage) {
      setMeta('meta[property="og:image"]', "content", absoluteImage);
      setMeta('meta[name="twitter:image"]', "content", absoluteImage);
    }

    // JSON-LD structured data
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
  }, [title, description, url, absoluteImage, type, jsonLd]);

  return null;
}