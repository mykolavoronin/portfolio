import { cn } from "@/lib/utils";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Tiny currentColor marks for the stack. Unknown names get a quiet square. */
export function StackMark({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground", className)}
    >
      {glyph(kind(name))}
    </svg>
  );
}

function kind(name: string) {
  const key = name.toLowerCase();
  if (key.includes("whatsapp")) return "whatsapp";
  if (key.includes("stripe")) return "stripe";
  if (key.includes("next")) return "next";
  if (key === "react") return "react";
  if (key.includes("type")) return "ts";
  if (key.includes("javascript") || key === "js") return "js";
  if (key.includes("tailwind")) return "tailwind";
  if (key.includes("shadcn")) return "shadcn";
  if (key === "motion" || key.includes("framer")) return "motion";
  if (key.includes("vercel")) return "vercel";
  if (key.includes("vite")) return "vite";
  if (key.includes("node")) return "node";
  if (key.includes("github") || key.includes("git")) return "git";
  if (key === "i18n" || key.includes("international")) return "globe";
  if (key.includes("schema")) return "schema";
  if (key.includes("seo")) return "seo";
  if (key.includes("figma")) return "figma";
  if (key.includes("html")) return "html";
  if (key.includes("css")) return "css";
  if (key.includes("sql")) return "sql";
  if (key.includes("bash")) return "bash";
  if (key.includes("cloudflare") || key.includes("cdn") || key.includes("image")) return "cloud";
  if (key.includes("linear")) return "linear";
  if (key.includes("raycast")) return "ray";
  if (key.includes("accessib") || key.includes("a11y")) return "a11y";
  if (key.includes("performance")) return "bolt";
  if (key.includes("ui") || key.includes("ux") || key.includes("design")) return "frame";
  if (key.includes("deploy") || key.includes("ci")) return "ship";
  if (key.includes("system") || key.includes("admin")) return "server";
  if (key.includes("dns") || key.includes("network")) return "nodes";
  if (key.includes("monitor") || key.includes("uptime")) return "pulse";
  if (key.includes("support")) return "life";
  return "mark";
}

function glyph(id: string) {
  switch (id) {
    case "next":
      return <path d="M3 3h10v10H3zM6.2 6.1 11 13" {...stroke} />;
    case "react":
      return (
        <>
          <ellipse cx="8" cy="8" rx="6" ry="2.35" {...stroke} strokeWidth={1.2} />
          <ellipse cx="8" cy="8" rx="6" ry="2.35" transform="rotate(60 8 8)" {...stroke} strokeWidth={1.2} />
          <ellipse cx="8" cy="8" rx="6" ry="2.35" transform="rotate(120 8 8)" {...stroke} strokeWidth={1.2} />
          <circle cx="8" cy="8" r="1.05" fill="currentColor" />
        </>
      );
    case "ts":
      return <path d="M3 3h10v10H3zM5.4 6.4h5.2M8 6.4v4.4" {...stroke} />;
    case "js":
      return <path d="M3 3h10v10H3zM6.2 6.2v4.2c0 .9.6 1.4 1.5 1.4M9.8 6.2v5.6" {...stroke} />;
    case "tailwind":
      return (
        <path
          d="M2.6 8.6c1.3-2.6 2.8-3.9 4.5-3.9 1.7 0 2.5 1 3.4 1 .8 0 1.7-.6 2.5-1.6-.8 2.5-2.2 3.8-4.1 3.9-1.7.1-2.6-1-3.5-1-1 0-1.9.6-2.8 1.6Z"
          fill="currentColor"
        />
      );
    case "shadcn":
      return <path d="M13.5 2.5 2.5 13.5M13.5 8 8 13.5" {...stroke} strokeWidth={1.5} />;
    case "motion":
      return <path d="M3.2 3.2h5L4.8 8H3.2zm4.4 0 4.2 4.8H8.8L7.6 3.2zM3.2 8.6h4.2L12.8 12.8H8.4z" fill="currentColor" />;
    case "vercel":
      return <path d="M8 3.4 13 12.6H3z" fill="currentColor" />;
    case "vite":
      return <path d="M8 2.8 13.2 12.4 8 10.5 2.8 12.4z" fill="currentColor" />;
    case "node":
      return <path d="M8 2.6 13 5.5v5L8 13.4 3 10.5v-5z" {...stroke} />;
    case "git":
      return <path d="M3.4 8 8 3.4 12.6 8 8 12.6zM8 5.2v5.6M8 8h2.4" {...stroke} />;
    case "stripe":
      return <path d="M3.2 4.2h9.6v7.6H3.2zM5.2 7.6c1.5-.7 3-.5 4 .2" {...stroke} />;
    case "whatsapp":
      return <path d="M3.6 12.2 4.4 9.5A5 5 0 1 1 6.6 11.8z" {...stroke} />;
    case "globe":
      return (
        <>
          <circle cx="8" cy="8" r="5" {...stroke} />
          <path d="M3 8h10M8 3c1.6 1.8 1.6 8.2 0 10M8 3c-1.6 1.8-1.6 8.2 0 10" {...stroke} />
        </>
      );
    case "schema":
      return (
        <>
          <circle cx="4.2" cy="4.2" r="1.3" {...stroke} />
          <circle cx="11.8" cy="4.2" r="1.3" {...stroke} />
          <circle cx="8" cy="11.6" r="1.3" {...stroke} />
          <path d="M5.2 5.1 7.2 10.4M10.8 5.1 8.8 10.4" {...stroke} />
        </>
      );
    case "seo":
      return (
        <>
          <circle cx="7" cy="7" r="4" {...stroke} />
          <path d="M10 10.2 13.2 13.4" {...stroke} />
        </>
      );
    case "figma":
      return (
        <>
          <circle cx="6.2" cy="4.8" r="1.9" {...stroke} strokeWidth={1.2} />
          <circle cx="9.8" cy="4.8" r="1.9" {...stroke} strokeWidth={1.2} />
          <circle cx="6.2" cy="8" r="1.9" {...stroke} strokeWidth={1.2} />
          <circle cx="9.8" cy="8" r="1.9" {...stroke} strokeWidth={1.2} />
          <circle cx="6.2" cy="11.2" r="1.9" {...stroke} strokeWidth={1.2} />
        </>
      );
    case "html":
      return <path d="M4.2 5.2 2.6 8l1.6 2.8M11.8 5.2 13.4 8l-1.6 2.8M9.1 4.2 6.9 11.8" {...stroke} />;
    case "css":
      return <path d="M3.4 3h9.2L11.6 13 8 14.2 4.4 13zM6.2 6.4h4.2M6.6 9.4h3.4" {...stroke} />;
    case "sql":
      return (
        <>
          <ellipse cx="8" cy="4.6" rx="4.4" ry="1.6" {...stroke} />
          <path d="M3.6 4.6v6.6c0 .9 2 1.6 4.4 1.6s4.4-.7 4.4-1.6V4.6" {...stroke} />
        </>
      );
    case "bash":
      return <path d="M3 3.6h10v8.8H3zM5.2 6.4 7.2 8 5.2 9.6M8.2 10.2h2.6" {...stroke} />;
    case "cloud":
      return <path d="M5.2 11.2h6.2A2.6 2.6 0 0 0 12 6.2 3.4 3.4 0 0 0 5.6 5.6 2.5 2.5 0 0 0 5.2 11.2Z" {...stroke} />;
    case "linear":
      return <path d="M3.4 11.4 11.4 3.4M4.8 12.4h7.4v-7.4" {...stroke} />;
    case "ray":
      return <path d="M8 2.6v2.4M8 11v2.4M2.6 8h2.4M11 8h2.4M4.2 4.2l1.7 1.7M10.1 10.1l1.7 1.7M11.8 4.2 10.1 5.9M5.9 10.1 4.2 11.8" {...stroke} />;
    case "a11y":
      return (
        <>
          <circle cx="8" cy="3.8" r="1.2" fill="currentColor" />
          <path d="M4.2 6.4h7.6M8 6.4v3.2L5.6 13M8 9.6 10.4 13" {...stroke} />
        </>
      );
    case "bolt":
      return <path d="M9.2 2.6 4.6 8.6h3.2L6.8 13.4 11.6 7H8.4z" fill="currentColor" />;
    case "frame":
      return <path d="M4 4h8v8H4zM4 6.6h8M6.6 4v8" {...stroke} />;
    case "ship":
      return <path d="M8 3.2v6.4M5.6 6.4 8 3.8 10.4 6.4M3.4 11.2h9.2L11.4 13H4.6z" {...stroke} />;
    case "server":
      return <path d="M3.2 3.4h9.6v4H3.2zM3.2 8.6h9.6v4H3.2zM5 5.4h.01M5 10.6h.01" {...stroke} />;
    case "nodes":
      return (
        <>
          <circle cx="4" cy="8" r="1.4" {...stroke} />
          <circle cx="12" cy="4.6" r="1.4" {...stroke} />
          <circle cx="12" cy="11.4" r="1.4" {...stroke} />
          <path d="M5.3 7.4 10.6 5.1M5.3 8.6 10.6 10.9" {...stroke} />
        </>
      );
    case "pulse":
      return <path d="M2.4 8h2.4l1.4-3.2L8.6 12l1.6-4H13.6" {...stroke} />;
    case "life":
      return <path d="M8 13.2s-4.6-2.8-4.6-6A2.6 2.6 0 0 1 8 5.4 2.6 2.6 0 0 1 12.6 7.2c0 3.2-4.6 6-4.6 6z" {...stroke} />;
    default:
      return <rect x="3.2" y="3.2" width="9.6" height="9.6" rx="1.8" {...stroke} />;
  }
}
